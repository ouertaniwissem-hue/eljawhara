const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { settings, now } = require('./db');
const auth = require('./auth');
const payments = require('./payments');
const { notify } = require('./notify');
const invoice = require('./invoice');

const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };
// Only the storefront, admin and product assets are public. Database, server code, originals and docs are never served.
const publicRootFiles = new Set(['index.html', 'styles.css', 'brand.css', 'cutouts.css', 'photography.css', 'store.css', 'retailer-data.js', 'photo-overrides.js', 'catalog.js', 'lang-en.js', 'app.js', 'store.js', 'favicon.svg', 'manifest.webmanifest', 'sw.js']);
const publicDirs = ['assets/', 'admin/'];
// The administration panel is off unless ADMIN_ENABLED=1. Its stylesheet stays public for the test payment and invoice pages.
const adminPanelFiles = new Set(['admin/index.html', 'admin/admin.js']);
const ORDER_STATUSES = ['new', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'];
const QUOTE_STATUSES = ['new', 'contacted', 'won', 'lost'];

class HttpError extends Error { constructor(status, code, message = code) { super(message); this.status = status; this.code = code; } }
const fail = (status, code) => { throw new HttpError(status, code); };

const buckets = new Map();
function rateLimit(key, limit, windowMs) {
  const t = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.reset < t) { buckets.set(key, { count: 1, reset: t + windowMs }); return; }
  if (++entry.count > limit) fail(429, 'too_many_requests');
}
setInterval(() => { const t = Date.now(); for (const [k, v] of buckets) if (v.reset < t) buckets.delete(k); }, 60000).unref();

const text = (value, max, required = true) => {
  const v = typeof value === 'string' ? value.trim() : '';
  if (required && !v) fail(400, 'missing_field');
  if (v.length > max) fail(400, 'field_too_long');
  return v;
};
const email = (value, required = true) => {
  const v = text(value, 160, required).toLowerCase();
  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) fail(400, 'invalid_email');
  return v;
};
const phone = value => {
  const v = text(value, 30);
  if (v.replace(/\D/g, '').length < 8) fail(400, 'invalid_phone');
  return v;
};
const int = (value, { min = 0, max = 1e9, nullable = false } = {}) => {
  if (nullable && (value === null || value === '')) return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) fail(400, 'invalid_number');
  return n;
};
const token = () => crypto.randomBytes(16).toString('base64url');
const orderRef = () => `EJ-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
const money = m => `${(m / 1000).toFixed(3).replace('.', ',')} DT`;

function readBody(req, limit = 100000) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', chunk => { size += chunk.length; if (size > limit) { reject(new HttpError(413, 'payload_too_large')); req.destroy(); } else chunks.push(chunk); });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new HttpError(400, 'invalid_json')); }
    });
    req.on('error', reject);
  });
}

const cookies = req => Object.fromEntries((req.headers.cookie || '').split(';').map(part => part.trim().split('=')).filter(([k]) => k).map(([k, ...v]) => [k, decodeURIComponent(v.join('='))]));
const secureCookies = () => /^https:/.test(process.env.PUBLIC_URL || '');

function send(res, status, body, headers = {}) {
  const json = typeof body !== 'string';
  res.writeHead(status, { 'Content-Type': json ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...headers });
  res.end(json ? JSON.stringify(body) : body);
}

function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
  if (secureCookies()) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
}

function serveStatic(req, res, pathname, adminEnabled) {
  let file = pathname === '/' ? 'index.html' : pathname === '/admin' || pathname === '/admin/' ? 'admin/index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
  file = path.posix.normalize(file);
  const allowed = (publicRootFiles.has(file) || publicDirs.some(dir => file.startsWith(dir))) && (adminEnabled || !adminPanelFiles.has(file));
  const full = path.resolve(root, file);
  if (!allowed || file.includes('..') || !full.startsWith(root + path.sep)) return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' });
  fs.stat(full, (statErr, stat) => {
    if (statErr || !stat.isFile()) return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' });
    // Images are revalidated so edited photos show up immediately; unchanged ones answer 304.
    const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
    const ext = path.extname(full).toLowerCase();
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, { ETag: etag, 'Cache-Control': 'no-cache' });
      return res.end();
    }
  fs.readFile(full, (err, data) => {
    if (err) return send(res, 404, 'Not found', { 'Content-Type': 'text/plain' });
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache', ETag: etag });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
  });
}

function createApp(db, { adminEnabled = process.env.ADMIN_ENABLED === '1' } = {}) {
  const priceFor = (variant, user) => user && user.type === 'business' && user.business_status === 'approved' && variant.business_price !== null ? variant.business_price : variant.price;
  // Unconfirmed (reference) prices are only sellable while the sell_unconfirmed_prices setting is on.
  const sellPrice = (variant, user, s) => {
    const price = priceFor(variant, user);
    return price !== null && (price !== variant.price || variant.price_confirmed || s.sell_unconfirmed_prices === '1') ? price : null;
  };
  const isBusiness = user => user && user.type === 'business' && user.business_status === 'approved';
  const cfg = () => settings(db);
  const methods = user => {
    const s = cfg();
    return [s.cod_enabled === '1' && 'cod', s.card_enabled === '1' && payments.cardAvailable() && 'card', s.transfer_enabled === '1' && isBusiness(user) && 'transfer'].filter(Boolean);
  };

  function catalog(user) {
    const s = cfg();
    const variants = db.prepare('SELECT v.* FROM variants v JOIN products p ON p.id = v.product_id WHERE v.active = 1 AND p.active = 1 ORDER BY p.sort, v.sort').all();
    const products = db.prepare('SELECT id FROM products WHERE active = 1 ORDER BY sort').all().map(({ id }) => ({
      id,
      variants: variants.filter(v => v.product_id === id).map(v => {
        const price = sellPrice(v, user, s);
        return { id: v.id, size: v.size, code: v.code && v.code.replace(/\?/g, ''), price: price === null ? null : price / 1000, priceConfirmed: !!v.price_confirmed || price !== v.price, businessPrice: price !== v.price, inStock: v.stock === null || v.stock > 0, stockLeft: v.stock !== null && v.stock <= 10 ? v.stock : null };
      })
    })).filter(product => product.variants.length);
    const zones = db.prepare('SELECT id, name_fr, name_ar, fee FROM zones WHERE active = 1 ORDER BY sort').all().map(z => ({ id: z.id, name: { fr: z.name_fr, ar: z.name_ar }, fee: z.fee / 1000 }));
    return {
      products, zones, paymentMethods: methods(user),
      rules: { freeDeliveryFrom: Number(s.free_delivery_from) / 1000, minOrder: Number(isBusiness(user) ? s.business_min_order : s.min_order) / 1000, maxQuantity: isBusiness(user) ? 9999 : 99 },
      user: auth.publicUser(user)
    };
  }

  function orderView(order, { admin = false } = {}) {
    const items = db.prepare('SELECT product_id, size, name_fr, name_ar, unit_price, quantity, line_total FROM order_items WHERE order_id = ? ORDER BY id').all(order.id)
      .map(i => ({ productId: i.product_id, size: i.size, name: { fr: i.name_fr, ar: i.name_ar }, unitPrice: i.unit_price / 1000, quantity: i.quantity, lineTotal: i.line_total / 1000 }));
    const events = db.prepare('SELECT status, note, created_at FROM order_events WHERE order_id = ? ORDER BY id').all(order.id).map(e => ({ status: e.status, note: e.note, at: e.created_at }));
    const zone = db.prepare('SELECT name_fr, name_ar FROM zones WHERE id = ?').get(order.zone_id);
    const view = {
      ref: order.ref, token: order.access_token, status: order.status, paymentMethod: order.payment_method, paymentStatus: order.payment_status,
      customerType: order.customer_type, name: order.name, phone: order.phone, email: order.email, company: order.company,
      zone: zone ? { fr: zone.name_fr, ar: zone.name_ar } : null, zoneId: order.zone_id, city: order.city, address: order.address, notes: order.notes,
      subtotal: order.subtotal / 1000, deliveryFee: order.delivery_fee / 1000, total: order.total / 1000, createdAt: order.created_at, items, events
    };
    if (admin) Object.assign(view, { id: order.id, taxId: order.tax_id, paymentRef: order.payment_ref, userId: order.user_id, updatedAt: order.updated_at });
    return view;
  }

  function addEvent(orderId, status, note = '') {
    db.prepare('INSERT INTO order_events (order_id, status, note, created_at) VALUES (?, ?, ?, ?)').run(orderId, status, note, now());
  }

  function restock(order) {
    if (order.restocked) return;
    for (const item of db.prepare('SELECT variant_id, quantity FROM order_items WHERE order_id = ?').all(order.id)) {
      db.prepare('UPDATE variants SET stock = stock + ? WHERE id = ? AND stock IS NOT NULL').run(item.quantity, item.variant_id);
    }
    db.prepare('UPDATE orders SET restocked = 1 WHERE id = ?').run(order.id);
  }

  function markPaid(order, paymentRef) {
    const changed = db.prepare("UPDATE orders SET payment_status = 'paid', payment_ref = COALESCE(?, payment_ref), status = CASE WHEN status = 'new' THEN 'confirmed' ELSE status END, updated_at = ? WHERE id = ? AND payment_status != 'paid'").run(paymentRef, now(), order.id).changes;
    if (!changed) return;
    addEvent(order.id, 'paid', 'Paiement en ligne confirmé');
    const s = cfg();
    notify(db, 'email', order.email, `Paiement reçu — commande ${order.ref}`, `Bonjour ${order.name},\n\nNous avons bien reçu votre paiement de ${money(order.total)} pour la commande ${order.ref}.\n\n${s.company_name}`);
  }

  function createOrder(body, user) {
    const s = cfg();
    if (!Array.isArray(body.items) || !body.items.length || body.items.length > 60) fail(400, 'empty_cart');
    const business = isBusiness(user);
    const maxQty = business ? 9999 : 99;
    const zone = db.prepare('SELECT * FROM zones WHERE id = ? AND active = 1').get(text(body.zoneId, 40));
    if (!zone) fail(400, 'invalid_zone');
    const paymentMethod = text(body.paymentMethod, 20);
    if (!methods(user).includes(paymentMethod)) fail(400, 'payment_unavailable');
    const customer = {
      name: text(body.name, 100), phone: phone(body.phone), email: email(body.email, paymentMethod === 'card'),
      city: text(body.city, 100), address: text(body.address, 250), notes: text(body.notes, 500, false),
      company: business ? user.company : '', taxId: business ? user.tax_id : '', language: body.language === 'ar' ? 'ar' : 'fr'
    };
    const merged = new Map();
    for (const item of body.items) {
      const key = `${text(item.productId, 60)}|${text(item.size, 30)}`;
      merged.set(key, (merged.get(key) || 0) + int(item.quantity, { min: 1, max: maxQty }));
    }
    db.exec('BEGIN IMMEDIATE');
    try {
      const lines = [];
      for (const [key, quantity] of merged) {
        if (quantity > maxQty) fail(400, 'quantity_limit');
        const [productId, size] = key.split('|');
        const row = db.prepare('SELECT v.*, p.name_fr, p.name_ar FROM variants v JOIN products p ON p.id = v.product_id WHERE v.product_id = ? AND v.size = ? AND v.active = 1 AND p.active = 1').get(productId, size);
        if (!row) fail(409, 'product_unavailable');
        const unit = sellPrice(row, user, s);
        if (unit === null) fail(409, 'price_on_request');
        if (row.stock !== null && db.prepare('UPDATE variants SET stock = stock - ? WHERE id = ? AND stock >= ?').run(quantity, row.id, quantity).changes === 0) fail(409, 'out_of_stock');
        lines.push({ row, unit, quantity });
      }
      const subtotal = lines.reduce((sum, line) => sum + line.unit * line.quantity, 0);
      const minimum = Number(business ? s.business_min_order : s.min_order);
      if (subtotal < minimum) fail(400, 'below_minimum');
      const freeFrom = Number(s.free_delivery_from);
      const deliveryFee = freeFrom > 0 && subtotal >= freeFrom ? 0 : zone.fee;
      const ref = orderRef(); const access = token(); const t = now();
      const { lastInsertRowid } = db.prepare(`INSERT INTO orders (ref, access_token, user_id, customer_type, name, phone, email, company, tax_id, zone_id, city, address, notes, payment_method, subtotal, delivery_fee, total, language, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(ref, access, user ? user.id : null, business ? 'business' : 'individual', customer.name, customer.phone, customer.email, customer.company, customer.taxId, zone.id, customer.city, customer.address, customer.notes, paymentMethod, subtotal, deliveryFee, subtotal + deliveryFee, customer.language, t, t);
      const orderId = Number(lastInsertRowid);
      const insertItem = db.prepare('INSERT INTO order_items (order_id, variant_id, product_id, size, name_fr, name_ar, unit_price, quantity, line_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
      for (const { row, unit, quantity } of lines) insertItem.run(orderId, row.id, row.product_id, row.size, row.name_fr, row.name_ar, unit, quantity, unit * quantity);
      addEvent(orderId, 'new');
      db.exec('COMMIT');
      const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
      const summary = lines.map(l => `- ${l.row.name_fr} ${l.row.size} × ${l.quantity} = ${money(l.unit * l.quantity)}`).join('\n');
      notify(db, 'email', order.email, `Commande ${ref} reçue — El Jawhara`, `Bonjour ${order.name},\n\nMerci pour votre commande ${ref}.\n\n${summary}\nLivraison : ${money(deliveryFee)}\nTotal : ${money(order.total)}\n\nSuivi : ${payments.config().publicUrl}/#/commande/${ref}/${access}\n\n${s.company_name}`);
      notify(db, 'email', s.staff_email, `Nouvelle commande ${ref} — ${money(order.total)}`, `${order.name} · ${order.phone}\n${zone.name_fr}, ${order.city}\n${order.address}\nPaiement : ${paymentMethod}\n\n${summary}\nTotal : ${money(order.total)}`);
      return order;
    } catch (error) {
      if (db.isTransaction) db.exec('ROLLBACK');
      throw error;
    }
  }

  const routes = [];
  const route = (method, pattern, handler, options = {}) => routes.push({ method, pattern: new RegExp(`^${pattern.replace(/:(\w+)/g, '(?<$1>[^/]+)')}$`), handler, ...options });
  const requireUser = ctx => ctx.user || fail(401, 'login_required');
  const requireAdmin = ctx => (ctx.user && ctx.user.role === 'admin') || fail(403, 'admin_only');

  function setSession(ctx, userId) {
    const session = auth.createSession(db, userId);
    ctx.headers['Set-Cookie'] = `sid=${session.token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${session.maxAge}${secureCookies() ? '; Secure' : ''}`;
  }

  route('GET', '/api/health', () => ({ ok: true }));
  route('GET', '/api/catalog', ctx => catalog(ctx.user));

  route('POST', '/api/auth/register', ctx => {
    rateLimit(`register:${ctx.ip}`, 10, 3600000);
    const b = ctx.body;
    const type = b.type === 'business' ? 'business' : 'individual';
    const password = typeof b.password === 'string' ? b.password : '';
    if (password.length < 8 || password.length > 200) fail(400, 'weak_password');
    const user = { email: email(b.email), name: text(b.name, 100), phone: phone(b.phone), company: type === 'business' ? text(b.company, 120) : '', taxId: type === 'business' ? text(b.taxId, 40, false) : '' };
    if (db.prepare('SELECT 1 FROM users WHERE email = ?').get(user.email)) fail(409, 'email_taken');
    const { lastInsertRowid } = db.prepare('INSERT INTO users (email, password_hash, name, phone, type, company, tax_id, business_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .run(user.email, auth.hashPassword(password), user.name, user.phone, type, user.company, user.taxId, type === 'business' ? 'pending' : 'none', now());
    if (type === 'business') notify(db, 'email', cfg().staff_email, `Nouveau compte professionnel à valider : ${user.company}`, `${user.name} · ${user.email} · ${user.phone}\nMatricule fiscal : ${user.taxId || '—'}\n\nÀ valider dans l’administration, rubrique Clients.`);
    setSession(ctx, Number(lastInsertRowid));
    return { user: auth.publicUser(db.prepare('SELECT * FROM users WHERE id = ?').get(lastInsertRowid)) };
  });

  route('POST', '/api/auth/login', ctx => {
    rateLimit(`login:${ctx.ip}`, 20, 900000);
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email(ctx.body.email));
    if (!user || !auth.verifyPassword(String(ctx.body.password || ''), user.password_hash)) fail(401, 'invalid_credentials');
    setSession(ctx, user.id);
    return { user: auth.publicUser(user) };
  });

  route('POST', '/api/auth/logout', ctx => {
    auth.destroySession(db, ctx.cookies.sid);
    ctx.headers['Set-Cookie'] = 'sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0';
    return { ok: true };
  });

  route('GET', '/api/me', ctx => ({ user: auth.publicUser(ctx.user) }));
  route('GET', '/api/me/orders', ctx => {
    const user = requireUser(ctx);
    return { orders: db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC LIMIT 100').all(user.id).map(order => orderView(order)) };
  });

  route('POST', '/api/orders', async ctx => {
    rateLimit(`order:${ctx.ip}`, 30, 3600000);
    const order = createOrder(ctx.body, ctx.user);
    const result = { order: orderView(order) };
    if (order.payment_method === 'card') {
      try {
        const payment = await payments.initPayment(order);
        db.prepare('UPDATE orders SET payment_ref = ? WHERE id = ?').run(payment.paymentRef, order.id);
        result.payUrl = payment.payUrl;
      } catch (error) {
        console.error(error);
        result.paymentError = true;
      }
    }
    return result;
  });

  const safeEqual = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
  const findOrder = ctx => {
    const order = db.prepare('SELECT * FROM orders WHERE ref = ?').get(ctx.params.ref);
    const allowed = order && ((ctx.query.get('token') && safeEqual(order.access_token, ctx.query.get('token')))
      || (ctx.user && (ctx.user.role === 'admin' || ctx.user.id === order.user_id)));
    if (!allowed) fail(404, 'order_not_found');
    return order;
  };
  route('GET', '/api/orders/:ref', ctx => ({ order: orderView(findOrder(ctx)) }));
  route('POST', '/api/orders/:ref/pay', async ctx => {
    const order = findOrder(ctx);
    if (order.payment_method !== 'card' || order.payment_status === 'paid' || order.status === 'cancelled') fail(409, 'not_payable');
    const payment = await payments.initPayment(order);
    db.prepare('UPDATE orders SET payment_ref = ? WHERE id = ?').run(payment.paymentRef, order.id);
    return { payUrl: payment.payUrl };
  });
  route('GET', '/api/orders/:ref/invoice', ctx => { const order = findOrder(ctx); return invoice.render(order, orderView(order), cfg()); }, { html: true });

  route('POST', '/api/quotes', ctx => {
    rateLimit(`quote:${ctx.ip}`, 20, 3600000);
    const b = ctx.body;
    const types = ['cafe', 'shop', 'distributor', 'other'];
    const quote = { ref: `DV-${crypto.randomBytes(3).toString('hex').toUpperCase()}`, name: text(b.name, 100), company: text(b.company, 120), email: email(b.email), phone: phone(b.phone), type: types.includes(b.businessType) ? b.businessType : 'other', message: text(b.message, 2000) };
    db.prepare('INSERT INTO quotes (ref, user_id, name, company, email, phone, business_type, message, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)').run(quote.ref, ctx.user ? ctx.user.id : null, quote.name, quote.company, quote.email, quote.phone, quote.type, quote.message, now());
    notify(db, 'email', cfg().staff_email, `Demande de devis ${quote.ref} — ${quote.company}`, `${quote.name} · ${quote.email} · ${quote.phone}\nActivité : ${quote.type}\n\n${quote.message}`);
    notify(db, 'email', quote.email, `Demande de devis ${quote.ref} reçue — El Jawhara`, `Bonjour ${quote.name},\n\nNous avons bien reçu votre demande. Notre équipe commerciale vous recontactera rapidement.\n\n${cfg().company_name}`);
    return { ref: quote.ref };
  });

  // Konnect calls this URL (and redirects the customer to it) with ?payment_ref=…; the status is verified with Konnect.
  route('GET', '/api/payments/konnect/webhook', async ctx => {
    const paymentRef = text(ctx.query.get('payment_ref'), 100);
    const order = db.prepare('SELECT * FROM orders WHERE payment_ref = ?').get(paymentRef);
    if (order) {
      const status = await payments.paymentStatus(paymentRef);
      if (status && status.completed && status.orderRef === order.ref && status.amount === order.total) markPaid(order, paymentRef);
      else if (status && !status.completed && order.payment_status === 'pending') db.prepare("UPDATE orders SET payment_status = 'failed', updated_at = ? WHERE id = ?").run(now(), order.id);
    }
    ctx.redirect = order ? `/#/commande/${order.ref}/${order.access_token}` : '/';
  });

  route('POST', '/api/payments/mock', ctx => {
    if (payments.config().mode !== 'mock') fail(404, 'not_found');
    const order = db.prepare('SELECT * FROM orders WHERE ref = ? AND access_token = ?').get(text(ctx.body.ref, 40), text(ctx.body.token, 60));
    if (!order) fail(404, 'order_not_found');
    if (ctx.body.result === 'success') markPaid(order, `mock-${order.ref}`);
    else db.prepare("UPDATE orders SET payment_status = 'failed', updated_at = ? WHERE id = ?").run(now(), order.id);
    return { redirect: `/#/commande/${order.ref}/${order.access_token}` };
  });

  // ---- Administration ----
  route('GET', '/api/admin/summary', ctx => {
    requireAdmin(ctx);
    const one = sql => db.prepare(sql).get();
    return {
      ordersToday: one("SELECT COUNT(*) n, COALESCE(SUM(total),0) t FROM orders WHERE created_at >= date('now') AND status != 'cancelled'"),
      ordersMonth: one("SELECT COUNT(*) n, COALESCE(SUM(total),0) t FROM orders WHERE created_at >= date('now','start of month') AND status != 'cancelled'"),
      open: one("SELECT COUNT(*) n FROM orders WHERE status IN ('new','confirmed','preparing','shipped')").n,
      newOrders: one("SELECT COUNT(*) n FROM orders WHERE status = 'new'").n,
      pendingBusiness: one("SELECT COUNT(*) n FROM users WHERE type = 'business' AND business_status = 'pending'").n,
      newQuotes: one("SELECT COUNT(*) n FROM quotes WHERE status = 'new'").n,
      unconfirmedPrices: one('SELECT COUNT(*) n FROM variants WHERE active = 1 AND price_confirmed = 0 AND price IS NOT NULL').n,
      noPrice: one('SELECT COUNT(*) n FROM variants WHERE active = 1 AND price IS NULL').n,
      lowStock: db.prepare('SELECT v.id, v.size, v.stock, p.name_fr FROM variants v JOIN products p ON p.id = v.product_id WHERE v.stock IS NOT NULL AND v.stock <= 10 AND v.active = 1 ORDER BY v.stock LIMIT 20').all(),
      recentOrders: db.prepare('SELECT ref, name, company, total, status, payment_method, payment_status, created_at FROM orders ORDER BY id DESC LIMIT 6').all()
        .map(o => ({ ref: o.ref, name: o.company || o.name, total: o.total / 1000, status: o.status, paymentMethod: o.payment_method, paymentStatus: o.payment_status, createdAt: o.created_at })),
      unsentMessages: one('SELECT COUNT(*) n FROM outbox WHERE sent_at IS NULL').n,
      payments: { card: payments.cardAvailable(), mode: payments.config().mode },
      email: !!(process.env.RESEND_API_KEY && process.env.MAIL_FROM)
    };
  });

  route('GET', '/api/admin/orders', ctx => {
    requireAdmin(ctx);
    const status = ctx.query.get('status');
    const q = `%${ctx.query.get('q') || ''}%`;
    const rows = db.prepare(`SELECT * FROM orders WHERE (? IS NULL OR status = ?) AND (ref LIKE ? OR name LIKE ? OR phone LIKE ? OR company LIKE ?) ORDER BY id DESC LIMIT 300`).all(status || null, status || null, q, q, q, q);
    return { orders: rows.map(order => orderView(order, { admin: true })) };
  });

  route('PATCH', '/api/admin/orders/:ref', ctx => {
    requireAdmin(ctx);
    const order = db.prepare('SELECT * FROM orders WHERE ref = ?').get(ctx.params.ref) || fail(404, 'order_not_found');
    const b = ctx.body;
    const note = text(b.note, 500, false);
    db.exec('BEGIN IMMEDIATE');
    try {
      if (b.status && b.status !== order.status) {
        if (!ORDER_STATUSES.includes(b.status)) fail(400, 'invalid_status');
        if (order.status === 'cancelled') fail(409, 'order_cancelled');
        db.prepare('UPDATE orders SET status = ?, updated_at = ? WHERE id = ?').run(b.status, now(), order.id);
        if (b.status === 'cancelled') restock(order);
        addEvent(order.id, b.status, note);
      } else if (note) addEvent(order.id, 'note', note);
      if (b.paymentStatus && b.paymentStatus !== order.payment_status) {
        if (!PAYMENT_STATUSES.includes(b.paymentStatus)) fail(400, 'invalid_status');
        db.prepare('UPDATE orders SET payment_status = ?, updated_at = ? WHERE id = ?').run(b.paymentStatus, now(), order.id);
        addEvent(order.id, `payment_${b.paymentStatus}`);
      }
      db.exec('COMMIT');
    } catch (error) { if (db.isTransaction) db.exec('ROLLBACK'); throw error; }
    const labels = { confirmed: 'confirmée', preparing: 'en préparation', shipped: 'expédiée', delivered: 'livrée', cancelled: 'annulée' };
    if (b.status && labels[b.status] && b.status !== order.status) notify(db, 'email', order.email, `Commande ${order.ref} ${labels[b.status]}`, `Bonjour ${order.name},\n\nVotre commande ${order.ref} est ${labels[b.status]}.${note ? `\n\n${note}` : ''}\n\nSuivi : ${payments.config().publicUrl}/#/commande/${order.ref}/${order.access_token}\n\n${cfg().company_name}`);
    return { order: orderView(db.prepare('SELECT * FROM orders WHERE id = ?').get(order.id), { admin: true }) };
  });

  route('GET', '/api/admin/orders.csv', ctx => {
    requireAdmin(ctx);
    const rows = db.prepare('SELECT o.ref, o.created_at, o.status, o.payment_method, o.payment_status, o.customer_type, o.name, o.company, o.phone, o.email, o.zone_id, o.city, o.address, i.product_id, i.size, i.quantity, i.unit_price, i.line_total, o.delivery_fee, o.total FROM orders o JOIN order_items i ON i.order_id = o.id ORDER BY o.id DESC, i.id').all();
    const header = ['ref', 'date', 'statut', 'paiement', 'statut_paiement', 'client', 'nom', 'entreprise', 'telephone', 'email', 'gouvernorat', 'ville', 'adresse', 'produit', 'format', 'quantite', 'prix_unitaire', 'total_ligne', 'livraison', 'total_commande'];
    const cell = v => { const s = String(v ?? ''); return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const priced = rows.map(r => ({ ...r, unit_price: (r.unit_price / 1000).toFixed(3), line_total: (r.line_total / 1000).toFixed(3), delivery_fee: (r.delivery_fee / 1000).toFixed(3), total: (r.total / 1000).toFixed(3) }));
    ctx.raw = { type: 'text/csv; charset=utf-8', body: '\ufeff' + [header, ...priced.map(r => Object.values(r))].map(row => row.map(cell).join(';')).join('\n'), filename: 'commandes-el-jawhara.csv' };
  });

  route('GET', '/api/admin/products', ctx => {
    requireAdmin(ctx);
    const variants = db.prepare('SELECT * FROM variants ORDER BY sort').all();
    return { products: db.prepare('SELECT * FROM products ORDER BY sort').all().map(p => ({
      id: p.id, category: p.category, brand: p.brand, name: { fr: p.name_fr, ar: p.name_ar }, description: { fr: p.desc_fr, ar: p.desc_ar }, active: !!p.active,
      variants: variants.filter(v => v.product_id === p.id).map(v => ({ id: v.id, size: v.size, code: v.code, image: v.image, active: !!v.active, stock: v.stock, priceConfirmed: !!v.price_confirmed, price: v.price === null ? null : v.price / 1000, businessPrice: v.business_price === null ? null : v.business_price / 1000, referencePrice: v.reference_price === null ? null : v.reference_price / 1000 }))
    })) };
  });

  const priceInput = value => value === null || value === '' ? null : Math.round(Number(value) * 1000);
  route('PATCH', '/api/admin/variants/:id', ctx => {
    requireAdmin(ctx);
    const variant = db.prepare('SELECT * FROM variants WHERE id = ?').get(int(ctx.params.id, { min: 1 })) || fail(404, 'not_found');
    const b = ctx.body;
    const next = { ...variant };
    if ('price' in b) { next.price = priceInput(b.price); if (next.price !== null && (!Number.isFinite(next.price) || next.price < 0 || next.price > 1e9)) fail(400, 'invalid_number'); if (!('priceConfirmed' in b)) next.price_confirmed = next.price === null ? 0 : 1; }
    if ('businessPrice' in b) { next.business_price = priceInput(b.businessPrice); if (next.business_price !== null && (!Number.isFinite(next.business_price) || next.business_price < 0 || next.business_price > 1e9)) fail(400, 'invalid_number'); }
    if ('stock' in b) next.stock = int(b.stock, { min: 0, max: 1e7, nullable: true });
    if ('active' in b) next.active = b.active ? 1 : 0;
    if ('priceConfirmed' in b) next.price_confirmed = b.priceConfirmed ? 1 : 0;
    db.prepare('UPDATE variants SET price = ?, business_price = ?, stock = ?, active = ?, price_confirmed = ? WHERE id = ?').run(next.price, next.business_price, next.stock, next.active, next.price_confirmed, variant.id);
    return { ok: true };
  });

  route('PATCH', '/api/admin/products/:id', ctx => {
    requireAdmin(ctx);
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(ctx.params.id) || fail(404, 'not_found');
    const b = ctx.body;
    db.prepare('UPDATE products SET active = ?, name_fr = ?, name_ar = ?, desc_fr = ?, desc_ar = ? WHERE id = ?').run(
      'active' in b ? (b.active ? 1 : 0) : product.active,
      b.name?.fr !== undefined ? text(b.name.fr, 120) : product.name_fr, b.name?.ar !== undefined ? text(b.name.ar, 120) : product.name_ar,
      b.description?.fr !== undefined ? text(b.description.fr, 1000) : product.desc_fr, b.description?.ar !== undefined ? text(b.description.ar, 1000) : product.desc_ar, product.id);
    return { ok: true };
  });

  route('GET', '/api/admin/customers', ctx => {
    requireAdmin(ctx);
    return { customers: db.prepare(`SELECT u.*, COUNT(o.id) orders, COALESCE(SUM(CASE WHEN o.status != 'cancelled' THEN o.total END),0) spent FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id ORDER BY (u.business_status = 'pending') DESC, u.id DESC LIMIT 500`).all()
      .map(u => ({ ...auth.publicUser(u), createdAt: u.created_at, orders: u.orders, spent: u.spent / 1000 })) };
  });

  route('PATCH', '/api/admin/users/:id', ctx => {
    requireAdmin(ctx);
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(int(ctx.params.id, { min: 1 })) || fail(404, 'not_found');
    const status = ctx.body.businessStatus;
    if (!['pending', 'approved', 'rejected'].includes(status) || user.type !== 'business') fail(400, 'invalid_status');
    db.prepare('UPDATE users SET business_status = ? WHERE id = ?').run(status, user.id);
    if (status !== user.business_status && status !== 'pending') notify(db, 'email', user.email, status === 'approved' ? 'Votre compte professionnel El Jawhara est validé' : 'Votre compte professionnel El Jawhara', status === 'approved' ? `Bonjour ${user.name},\n\nVotre compte professionnel ${user.company} est validé. Vos tarifs professionnels sont visibles dès votre prochaine connexion.\n\n${cfg().company_name}` : `Bonjour ${user.name},\n\nNous n’avons pas pu valider votre compte professionnel pour le moment. Notre équipe vous recontactera.\n\n${cfg().company_name}`);
    return { ok: true };
  });

  route('GET', '/api/admin/quotes', ctx => {
    requireAdmin(ctx);
    return { quotes: db.prepare('SELECT * FROM quotes ORDER BY id DESC LIMIT 300').all() };
  });
  route('PATCH', '/api/admin/quotes/:id', ctx => {
    requireAdmin(ctx);
    if (!QUOTE_STATUSES.includes(ctx.body.status)) fail(400, 'invalid_status');
    db.prepare('UPDATE quotes SET status = ? WHERE id = ?').run(ctx.body.status, int(ctx.params.id, { min: 1 }));
    return { ok: true };
  });

  route('GET', '/api/admin/zones', ctx => { requireAdmin(ctx); return { zones: db.prepare('SELECT * FROM zones ORDER BY sort').all().map(z => ({ ...z, fee: z.fee / 1000, active: !!z.active })) }; });
  route('PATCH', '/api/admin/zones/:id', ctx => {
    requireAdmin(ctx);
    const zone = db.prepare('SELECT * FROM zones WHERE id = ?').get(ctx.params.id) || fail(404, 'not_found');
    const fee = 'fee' in ctx.body ? Math.round(Number(ctx.body.fee) * 1000) : zone.fee;
    if (!Number.isFinite(fee) || fee < 0 || fee > 1e7) fail(400, 'invalid_number');
    db.prepare('UPDATE zones SET fee = ?, active = ? WHERE id = ?').run(fee, 'active' in ctx.body ? (ctx.body.active ? 1 : 0) : zone.active, zone.id);
    return { ok: true };
  });

  const moneySettings = ['stamp_duty', 'free_delivery_from', 'min_order', 'business_min_order'];
  route('GET', '/api/admin/settings', ctx => {
    requireAdmin(ctx);
    const s = cfg();
    for (const key of moneySettings) s[key] = String(Number(s[key]) / 1000);
    return { settings: s };
  });
  route('PATCH', '/api/admin/settings', ctx => {
    requireAdmin(ctx);
    const current = cfg();
    const update = db.prepare('UPDATE settings SET value = ? WHERE key = ?');
    for (const [key, value] of Object.entries(ctx.body)) {
      if (!(key in current)) continue;
      let v = text(String(value ?? ''), 500, false);
      if (moneySettings.includes(key)) { const m = Math.round(Number(v || 0) * 1000); if (!Number.isFinite(m) || m < 0) fail(400, 'invalid_number'); v = String(m); }
      if (key === 'vat_rate' && !(Number(v) >= 0 && Number(v) <= 100)) fail(400, 'invalid_number');
      if (key.endsWith('_enabled')) v = v === '1' || v === 'true' ? '1' : '0';
      update.run(v, key);
    }
    return { ok: true };
  });

  route('GET', '/api/admin/outbox', ctx => { requireAdmin(ctx); return { messages: db.prepare('SELECT * FROM outbox ORDER BY id DESC LIMIT 200').all() }; });

  async function handleApi(req, res, url) {
    const ip = (process.env.TRUST_PROXY === '1' && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress;
    const match = routes.map(r => ({ r, m: req.method === r.method && url.pathname.match(r.pattern) })).find(x => x.m);
    if (!match) return send(res, 404, { error: 'not_found' });
    const ctx = { req, ip, query: url.searchParams, params: match.m.groups || {}, cookies: cookies(req), headers: {}, body: {} };
    try {
      if (req.method !== 'GET') {
        // CSRF protection: state-changing calls must be JSON and same-origin.
        if (!String(req.headers['content-type'] || '').startsWith('application/json')) fail(415, 'json_required');
        const origin = req.headers.origin;
        if (origin && new URL(origin).host !== req.headers.host) fail(403, 'bad_origin');
        ctx.body = await readBody(req);
        if (!ctx.body || typeof ctx.body !== 'object' || Array.isArray(ctx.body)) fail(400, 'invalid_json');
      }
      ctx.user = auth.sessionUser(db, ctx.cookies.sid);
      const result = await match.r.handler(ctx);
      if (ctx.redirect) { res.writeHead(302, { Location: ctx.redirect, ...ctx.headers }); return res.end(); }
      if (ctx.raw) { res.writeHead(200, { 'Content-Type': ctx.raw.type, 'Content-Disposition': `attachment; filename="${ctx.raw.filename}"`, 'Cache-Control': 'no-store', ...ctx.headers }); return res.end(ctx.raw.body); }
      send(res, 200, match.r.html ? result : result || { ok: true }, ctx.headers);
    } catch (error) {
      if (error instanceof HttpError) return send(res, error.status, { error: error.code }, ctx.headers);
      console.error(error);
      send(res, 500, { error: 'server_error' });
    }
  }

  function mockPayPage(url) {
    const ref = String(url.searchParams.get('ref') || '').replace(/[^\w-]/g, '');
    const tk = String(url.searchParams.get('token') || '').replace(/[^\w-]/g, '');
    const order = db.prepare('SELECT total FROM orders WHERE ref = ? AND access_token = ?').get(ref, tk);
    if (!order) return 'Commande introuvable';
    return `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Paiement test</title><link rel="stylesheet" href="/admin/admin.css"><body class="mock-pay"><main><h1>Paiement de test</h1><p>Mode développement : aucun paiement réel. Commande <b>${ref}</b> · ${money(order.total)}</p><button class="btn" data-result="success">Simuler un paiement réussi</button> <button class="btn ghost" data-result="fail">Simuler un échec</button></main><script src="/admin/mock-pay.js" data-ref="${ref}" data-token="${tk}"></script></body></html>`;
  }

  return http.createServer((req, res) => {
    securityHeaders(res);
    const url = new URL(req.url, 'http://localhost');
    if (!adminEnabled && url.pathname.startsWith('/api/admin/')) return send(res, 404, { error: 'not_found' });
    if (url.pathname.startsWith('/api/')) return void handleApi(req, res, url);
    if (url.pathname === '/pay/mock' && payments.config().mode === 'mock') return send(res, 200, mockPayPage(url));
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed', { 'Content-Type': 'text/plain' });
    serveStatic(req, res, url.pathname, adminEnabled);
  });
}

module.exports = { createApp };
