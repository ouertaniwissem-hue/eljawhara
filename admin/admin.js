const view = document.getElementById('view');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dt = value => value === null || value === undefined ? '—' : `${Number(value).toFixed(3).replace('.', ',')} DT`;
const date = iso => new Date(iso).toLocaleString('fr-TN', { dateStyle: 'short', timeStyle: 'short' });
const STATUS = { new: 'Nouvelle', confirmed: 'Confirmée', preparing: 'En préparation', shipped: 'En livraison', delivered: 'Livrée', cancelled: 'Annulée' };
const PAYMENT = { pending: 'En attente', paid: 'Payé', failed: 'Échoué', refunded: 'Remboursé' };
const METHOD = { cod: 'À la livraison', card: 'Carte / e-DINAR', transfer: 'Virement' };
const CATEGORY = { juice: 'Jus concentrés', aroma: 'Arômes', colorant: 'Colorants', syrup: 'Sirops', water: 'Eaux florales', vinegar: 'Vinaigres' };
const QUOTE = { new: 'Nouveau', contacted: 'Contacté', won: 'Gagné', lost: 'Perdu' };
const ERRORS = { invalid_credentials: 'E-mail ou mot de passe incorrect.', admin_only: 'Ce compte n’a pas accès à l’administration.', too_many_requests: 'Trop de tentatives, réessayez plus tard.', invalid_number: 'Valeur numérique invalide.', order_cancelled: 'Une commande annulée ne peut plus changer de statut.' };
let tab = 'dashboard';
let cache = {};

async function api(url, method = 'GET', body) {
  const response = await fetch(url, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(ERRORS[data.error] || data.error || 'Erreur serveur'), { code: data.error, status: response.status });
  return data;
}
let toastTimer;
function toast(message, error = false) {
  const el = document.getElementById('toast');
  el.textContent = message; el.className = `visible ${error ? 'error' : ''}`;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.className = ''; }, 3000);
}

function loginView(message = '') {
  document.getElementById('tabs').hidden = true; document.getElementById('logout').hidden = true;
  view.innerHTML = `<form class="card login" id="login"><h1>Connexion administrateur</h1>${message ? `<p class="error">${esc(message)}</p>` : ''}<label>E-mail<input name="email" type="email" required autocomplete="username"></label><label>Mot de passe<input name="password" type="password" required autocomplete="current-password"></label><button class="btn">Se connecter</button><p class="muted">Créez le premier compte avec <code>node scripts/create-admin.js</code>.</p></form>`;
  document.getElementById('login').addEventListener('submit', async event => {
    event.preventDefault();
    try {
      const { user } = await api('/api/auth/login', 'POST', Object.fromEntries(new FormData(event.target)));
      if (user.role !== 'admin') { await api('/api/auth/logout', 'POST', {}); return loginView(ERRORS.admin_only); }
      start();
    } catch (error) { loginView(error.message); }
  });
}

const render = {
  async dashboard() {
    const s = await api('/api/admin/summary');
    const warnings = [
      !s.payments.card && 'Le paiement par carte n’est pas encore activé : les clients peuvent payer à la livraison ou par virement (professionnels). Pour l’activer, il faut un compte Konnect.',
      s.payments.mode === 'mock' && 'Le paiement par carte est en mode test : aucun argent n’est réellement encaissé. À remplacer par Konnect avant le lancement.',
      !s.email && `L’envoi d’e-mails n’est pas encore activé : ${s.unsentMessages} message(s) attendent dans « Paramètres → Messages envoyés ».`,
      s.unconfirmedPrices && `${s.unconfirmedPrices} format(s) sont vendus à un prix relevé chez Géant, pas encore validé. Vérifiez-les dans « Produits & prix ».`,
      s.noPrice && `${s.noPrice} format(s) n’ont pas de prix : ils sont proposés « sur devis ».`
    ].filter(Boolean);
    const recent = s.recentOrders || [];
    view.innerHTML = `<h1>Tableau de bord</h1><div class="stats">
      <button class="stat" data-go="orders" data-status="new"><span>Nouvelles commandes</span><b>${s.newOrders}</b><small>à confirmer</small></button>
      <button class="stat" data-go="orders"><span>Commandes en cours</span><b>${s.open}</b><small>non livrées</small></button>
      <div class="stat"><span>Aujourd’hui</span><b>${s.ordersToday.n}</b><small>${dt(s.ordersToday.t / 1000)}</small></div>
      <div class="stat"><span>Ce mois-ci</span><b>${s.ordersMonth.n}</b><small>${dt(s.ordersMonth.t / 1000)}</small></div>
      <button class="stat" data-go="customers"><span>Comptes pro à valider</span><b>${s.pendingBusiness}</b><small>professionnels</small></button>
      <button class="stat" data-go="quotes"><span>Nouveaux devis</span><b>${s.newQuotes}</b><small>demandes</small></button></div>
      <div class="card"><div class="card-head"><h2>Dernières commandes</h2><button class="ghost-link" data-go="orders">Tout voir →</button></div>${recent.length ? `<ul class="recent-orders">${recent.map(o => `<li class="clickable" data-order="${esc(o.ref)}"><span><b>${esc(o.ref)}</b><small>${date(o.createdAt)} · ${esc(o.name)}</small></span><span class="recent-meta"><b>${dt(o.total)}</b><span class="badge s-${o.status}">${STATUS[o.status]}</span></span></li>`).join('')}</ul>` : '<p class="muted">Aucune commande pour le moment.</p>'}</div>
      ${warnings.length ? `<div class="card warn"><h2>À faire avant le lancement</h2><ul>${warnings.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>` : ''}
      ${s.lowStock.length ? `<div class="card"><h2>Stock faible</h2><table><tr><th>Produit</th><th>Format</th><th>Stock</th></tr>${s.lowStock.map(v => `<tr><td>${esc(v.name_fr)}</td><td>${esc(v.size)}</td><td class="${v.stock === 0 ? 'error' : ''}">${v.stock}</td></tr>`).join('')}</table></div>` : ''}`;
  },

  async orders(params = {}) {
    const query = new URLSearchParams({ ...(params.status ? { status: params.status } : {}), ...(params.q ? { q: params.q } : {}) });
    const { orders } = await api(`/api/admin/orders?${query}`);
    cache.orders = orders;
    view.innerHTML = `<h1>Commandes</h1><form class="toolbar" id="order-filter"><input name="q" type="search" placeholder="Réf., nom, téléphone, entreprise" value="${esc(params.q || '')}"><select name="status"><option value="">Tous les statuts</option>${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${params.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select><button class="btn ghost">Filtrer</button><span class="spacer"></span><a class="btn ghost" href="/api/admin/orders.csv">Export CSV (Excel)</a></form>
      ${orders.length ? `<table class="list cards"><tr><th>Réf.</th><th>Date</th><th>Client</th><th>Livraison</th><th>Total</th><th>Paiement</th><th>Statut</th></tr>${orders.map(o => `<tr class="clickable" data-order="${esc(o.ref)}"><td data-label="Réf."><b>${esc(o.ref)}</b></td><td data-label="Date">${date(o.createdAt)}</td><td data-label="Client">${esc(o.company || o.name)}${o.customerType === 'business' ? ' <span class="tag">PRO</span>' : ''}<br><small>${esc(o.phone)}</small></td><td data-label="Livraison">${esc(o.zone?.fr || '')}<br><small>${esc(o.city)}</small></td><td data-label="Total">${dt(o.total)}</td><td data-label="Paiement">${METHOD[o.paymentMethod]}<br><small class="pay-${o.paymentStatus}">${PAYMENT[o.paymentStatus]}</small></td><td data-label="Statut"><span class="badge s-${o.status}">${STATUS[o.status]}</span></td></tr>`).join('')}</table>` : '<p class="muted">Aucune commande.</p>'}`;
    document.getElementById('order-filter').addEventListener('submit', event => { event.preventDefault(); show('orders', Object.fromEntries(new FormData(event.target))); });
  },

  async order(params) {
    let o = (cache.orders || []).find(entry => entry.ref === params.ref);
    if (!o) { cache.orders = (await api(`/api/admin/orders?${new URLSearchParams({ q: params.ref })}`)).orders; o = cache.orders.find(entry => entry.ref === params.ref); }
    if (!o) { view.innerHTML = '<p class="error">Commande introuvable.</p>'; return; }
    view.innerHTML = `<button class="ghost-link" data-go="orders">← Toutes les commandes</button><h1>Commande ${esc(o.ref)} <span class="badge s-${o.status}">${STATUS[o.status]}</span></h1>
      <div class="grid2"><div class="card"><h2>Client</h2><p><b>${esc(o.name)}</b>${o.company ? `<br>${esc(o.company)}${o.taxId ? ` · MF ${esc(o.taxId)}` : ''}` : ''}<br><a href="tel:${esc(o.phone)}">${esc(o.phone)}</a>${o.email ? `<br><a href="mailto:${esc(o.email)}">${esc(o.email)}</a>` : ''}</p><h2>Livraison</h2><p>${esc(o.address)}<br>${esc(o.city)}, ${esc(o.zone?.fr || o.zoneId)}</p>${o.notes ? `<p class="note">${esc(o.notes)}</p>` : ''}</div>
      <div class="card"><h2>Traitement</h2><form id="order-update"><label>Statut<select name="status" ${o.status === 'cancelled' ? 'disabled' : ''}>${Object.entries(STATUS).map(([k, v]) => `<option value="${k}" ${o.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label><label>Paiement (${METHOD[o.paymentMethod]})<select name="paymentStatus">${Object.entries(PAYMENT).map(([k, v]) => `<option value="${k}" ${o.paymentStatus === k ? 'selected' : ''}>${v}</option>`).join('')}</select></label><label>Note (envoyée au client avec le changement de statut)<textarea name="note" maxlength="500" rows="2"></textarea></label><button class="btn">Enregistrer</button> <a class="btn ghost" target="_blank" href="/api/orders/${esc(o.ref)}/invoice">Facture / bon</a></form>${o.status !== 'cancelled' ? '<p class="muted">Annuler une commande remet automatiquement les quantités en stock.</p>' : ''}</div></div>
      <div class="card"><h2>Articles</h2><table><tr><th>Produit</th><th>Format</th><th>Qté</th><th>P.U.</th><th>Total</th></tr>${o.items.map(i => `<tr><td>${esc(i.name.fr)}</td><td>${esc(i.size)}</td><td>${i.quantity}</td><td>${dt(i.unitPrice)}</td><td>${dt(i.lineTotal)}</td></tr>`).join('')}<tr><td colspan="4">Livraison</td><td>${dt(o.deliveryFee)}</td></tr><tr class="total"><td colspan="4">Total TTC</td><td>${dt(o.total)}</td></tr></table></div>
      <div class="card"><h2>Historique</h2><ul class="timeline">${o.events.map(e => `<li><small>${date(e.at)}</small> ${esc(STATUS[e.status] || { paid: 'Paiement reçu', note: 'Note' }[e.status] || e.status.replace('payment_', 'Paiement : '))}${e.note ? ` — ${esc(e.note)}` : ''}</li>`).join('')}</ul></div>`;
    document.getElementById('order-update').addEventListener('submit', async event => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(event.target));
      if (values.status === 'cancelled' && o.status !== 'cancelled' && !confirm('Annuler cette commande ? Le stock sera remis à jour.')) return;
      try {
        const { order } = await api(`/api/admin/orders/${encodeURIComponent(o.ref)}`, 'PATCH', values);
        cache.orders = cache.orders.map(entry => entry.ref === order.ref ? order : entry);
        toast('Commande mise à jour'); render.order({ ref: o.ref });
      } catch (error) { toast(error.message, true); }
    });
  },

  async products(params = {}) {
    const { products } = await api('/api/admin/products');
    const filter = params.filter || '';
    const isGeant = v => !v.priceConfirmed && v.price !== null && v.referencePrice !== null;
    const matches = p => !filter || (filter === 'geant' ? p.variants.some(isGeant) : filter === 'noprice' ? p.variants.some(v => v.price === null) : filter === 'hidden' ? !p.active || p.variants.some(v => !v.active) : p.category === filter);
    const geantCount = products.reduce((n, p) => n + p.variants.filter(isGeant).length, 0);
    const variantRow = v => `<div class="variant-row" data-variant="${v.id}">
      <span class="v-size" data-label="Format">${esc(v.size === 'bottle' ? 'Bouteille' : v.size)}${v.code ? `<small class="v-code"${v.code.includes('?') ? ' title="Code à confirmer avec El Jawhara"' : ''}>${esc(v.code.replace(/\?/g, ' (à confirmer)'))}</small>` : ''}</span>
      <label data-label="Prix public"><input class="num" name="price" inputmode="decimal" value="${v.price ?? ''}" placeholder="sur devis" aria-label="Prix public">${isGeant(v) ? '<span class="geant-flag" title="Prix relevé chez Géant, pas encore validé">Prix Géant</span>' : ''}</label>
      <label data-label="Prix pro"><input class="num" name="businessPrice" inputmode="decimal" value="${v.businessPrice ?? ''}" placeholder="= public" aria-label="Prix pro"></label>
      <label data-label="Stock"><input class="num" name="stock" inputmode="numeric" value="${v.stock ?? ''}" placeholder="∞" aria-label="Stock"></label>
      <label class="inline" data-label="Prix validé"><input type="checkbox" name="priceConfirmed" ${v.priceConfirmed ? 'checked' : ''} aria-label="Prix validé"><span>Prix validé</span></label>
      <label class="inline" data-label="En ligne"><input type="checkbox" name="active" ${v.active ? 'checked' : ''} aria-label="Format en ligne"><span>En ligne</span></label></div>`;
    const list = query => {
      const q = query.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
      const shown = products.filter(p => matches(p) && (!q || `${p.name.fr} ${p.name.ar} ${p.brand} ${CATEGORY[p.category]} ${p.variants.map(v => v.code || '').join(' ')}`.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(q)));
      document.getElementById('product-count').textContent = `${shown.length} produit(s)`;
      document.getElementById('product-list').innerHTML = shown.length ? shown.map(p => `<article class="product-item ${p.active ? '' : 'inactive'}"><div class="product-item-head">${p.variants.find(v => v.image) ? `<img src="/${esc(p.variants.find(v => v.image).image)}" alt="" width="36" height="66">` : '<span class="no-photo"></span>'}<div><b>${esc(p.name.fr)}</b><small>${esc(p.name.ar)} · ${CATEGORY[p.category]} · ${esc(p.brand)}</small></div><label class="inline visible-toggle"><input type="checkbox" data-product-active="${esc(p.id)}" ${p.active ? 'checked' : ''}> Visible</label></div><div class="variant-rows">${p.variants.map(variantRow).join('')}</div></article>`).join('') : '<p class="muted">Aucun produit ne correspond.</p>';
    };
    view.innerHTML = `<h1>Produits &amp; prix</h1><p class="muted">Prix TTC en dinars. <b>Prix pro</b> : tarif des comptes professionnels validés (vide = prix public). <b>Stock</b> vide = non suivi. Un prix vide affiche « sur devis ». Saisir un prix public le valide automatiquement.</p>
      ${geantCount ? `<p class="notice-geant"><span class="geant-flag">Prix Géant</span> ${geantCount} format(s) utilisent un prix relevé chez Géant. Vérifiez-les puis cochez « Prix validé ». <button class="ghost-link" data-product-filter="geant">Les afficher</button></p>` : ''}
      <div class="toolbar"><input type="search" id="product-search" placeholder="Rechercher un produit (FR, AR ou code PF_…)" value="${esc(params.q || '')}"><select id="product-filter"><option value="">Toutes les familles</option><option value="geant" ${filter === 'geant' ? 'selected' : ''}>Prix Géant à valider</option><option value="noprice" ${filter === 'noprice' ? 'selected' : ''}>Sans prix (sur devis)</option><option value="hidden" ${filter === 'hidden' ? 'selected' : ''}>Masqués</option>${Object.entries(CATEGORY).map(([k, v]) => `<option value="${k}" ${filter === k ? 'selected' : ''}>${v}</option>`).join('')}</select><span class="spacer"></span><small id="product-count"></small></div>
      <div class="variant-head" aria-hidden="true"><span>Format</span><span>Prix public</span><span>Prix pro</span><span>Stock</span><span>Prix validé</span><span>En ligne</span></div>
      <div id="product-list"></div>`;
    const search = document.getElementById('product-search');
    list(search.value);
    search.addEventListener('input', () => list(search.value));
    document.getElementById('product-filter').addEventListener('change', event => show('products', { filter: event.target.value, q: search.value }));
    view.querySelector('[data-product-filter]')?.addEventListener('click', () => show('products', { filter: 'geant', q: search.value }));
    view.onchange = async event => {
      const input = event.target;
      if (input.dataset.productActive) {
        try { await api(`/api/admin/products/${encodeURIComponent(input.dataset.productActive)}`, 'PATCH', { active: input.checked }); input.closest('.product-item').classList.toggle('inactive', !input.checked); toast(input.checked ? 'Produit visible' : 'Produit masqué'); }
        catch (error) { toast(error.message, true); }
        return;
      }
      const row = input.closest('[data-variant]');
      if (!row) return;
      const value = input.type === 'checkbox' ? input.checked : input.value.trim().replace(',', '.');
      try {
        await api(`/api/admin/variants/${row.dataset.variant}`, 'PATCH', { [input.name]: value === '' ? null : value });
        const variant = products.flatMap(p => p.variants).find(v => String(v.id) === row.dataset.variant);
        if (variant) { if (input.name === 'price') variant.price = value === '' ? null : Number(value); if (input.name === 'price' && value !== '') variant.priceConfirmed = true; if (input.name === 'priceConfirmed') variant.priceConfirmed = value; }
        if (input.name === 'price' && value !== '') row.querySelector('[name="priceConfirmed"]').checked = true;
        if (variant && !isGeant(variant)) row.querySelector('.geant-flag')?.remove();
        input.classList.remove('invalid'); input.classList.add('saved'); setTimeout(() => input.classList.remove('saved'), 900);
      } catch (error) { toast(error.message, true); input.classList.add('invalid'); }
    };
  },

  async customers() {
    const { customers } = await api('/api/admin/customers');
    const label = { none: '', pending: 'À valider', approved: 'Validé', rejected: 'Refusé' };
    view.innerHTML = `<h1>Clients</h1><table class="list"><tr><th>Client</th><th>Contact</th><th>Type</th><th>Commandes</th><th>Inscrit le</th><th></th></tr>${customers.map(c => `<tr><td><b>${esc(c.name)}</b>${c.role === 'admin' ? ' <span class="tag">ADMIN</span>' : ''}${c.company ? `<br>${esc(c.company)}${c.taxId ? ` · MF ${esc(c.taxId)}` : ''}` : ''}</td><td>${esc(c.email)}<br><small>${esc(c.phone)}</small></td><td>${c.type === 'business' ? `Professionnel<br><span class="badge b-${c.businessStatus}">${label[c.businessStatus]}</span>` : 'Particulier'}</td><td>${c.orders} · ${dt(c.spent)}</td><td>${date(c.createdAt)}</td><td>${c.type === 'business' ? `${c.businessStatus !== 'approved' ? `<button class="btn small" data-business="${c.id}" data-status="approved">Valider</button>` : ''} ${c.businessStatus !== 'rejected' ? `<button class="btn small ghost" data-business="${c.id}" data-status="rejected">Refuser</button>` : ''}` : ''}</td></tr>`).join('')}</table>`;
  },

  async quotes() {
    const { quotes } = await api('/api/admin/quotes');
    const types = { cafe: 'Café / restaurant', shop: 'Commerce', distributor: 'Distribution', other: 'Autre' };
    view.innerHTML = `<h1>Demandes de devis</h1>${quotes.length ? quotes.map(q => `<div class="card quote"><div class="quote-head"><b>${esc(q.ref)} · ${esc(q.company)}</b><small>${date(q.created_at)} · ${types[q.business_type] || ''}</small><select data-quote="${q.id}">${Object.entries(QUOTE).map(([k, v]) => `<option value="${k}" ${q.status === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div><p>${esc(q.name)} · <a href="tel:${esc(q.phone)}">${esc(q.phone)}</a> · <a href="mailto:${esc(q.email)}">${esc(q.email)}</a></p><p class="note">${esc(q.message)}</p></div>`).join('') : '<p class="muted">Aucune demande.</p>'}`;
    view.querySelectorAll('[data-quote]').forEach(select => select.addEventListener('change', async () => {
      try { await api(`/api/admin/quotes/${select.dataset.quote}`, 'PATCH', { status: select.value }); toast('Devis mis à jour'); } catch (error) { toast(error.message, true); }
    }));
  },

  async zones() {
    const { zones } = await api('/api/admin/zones');
    view.innerHTML = `<h1>Zones de livraison</h1><p class="muted">Frais de livraison TTC par gouvernorat. Décochez une zone pour ne plus y livrer.</p><table class="list"><tr><th>Gouvernorat</th><th>Frais (DT)</th><th>Livré</th></tr>${zones.map(z => `<tr data-zone="${esc(z.id)}"><td>${esc(z.name_fr)} <small>${esc(z.name_ar)}</small></td><td><input class="num" name="fee" inputmode="decimal" value="${z.fee}"></td><td><input type="checkbox" name="active" ${z.active ? 'checked' : ''}></td></tr>`).join('')}</table>`;
    view.querySelectorAll('tr[data-zone] input').forEach(input => input.addEventListener('change', async () => {
      try { await api(`/api/admin/zones/${input.closest('tr').dataset.zone}`, 'PATCH', { [input.name]: input.type === 'checkbox' ? input.checked : input.value.replace(',', '.') }); input.classList.add('saved'); setTimeout(() => input.classList.remove('saved'), 900); }
      catch (error) { toast(error.message, true); }
    }));
  },

  async settings() {
    const [{ settings: s }, { messages }] = await Promise.all([api('/api/admin/settings'), api('/api/admin/outbox')]);
    const input = (key, label, type = 'text') => `<label>${label}<input name="${key}" type="${type}" value="${esc(s[key])}"></label>`;
    const check = (key, label) => `<label class="inline"><input type="checkbox" name="${key}" ${s[key] === '1' ? 'checked' : ''}> ${label}</label>`;
    view.innerHTML = `<h1>Paramètres</h1><form id="settings" class="grid2"><div class="card"><h2>Société (factures)</h2>${input('company_name', 'Raison sociale')}${input('company_address', 'Adresse')}${input('company_tax_id', 'Matricule fiscal')}${input('company_phone', 'Téléphone')}${input('company_email', 'E-mail')}${input('bank_details', 'RIB (virements)')}${input('vat_rate', 'TVA (%)')}${input('stamp_duty', 'Timbre fiscal (DT, 0 = aucun)')}</div>
      <div class="card"><h2>Ventes</h2>${check('cod_enabled', 'Paiement à la livraison')}${check('card_enabled', 'Paiement en ligne (Konnect)')}${check('transfer_enabled', 'Virement (professionnels validés)')}${check('sell_unconfirmed_prices', 'Vendre aux prix de référence non confirmés (à désactiver au lancement)')}${input('min_order', 'Commande minimum particuliers (DT)')}${input('business_min_order', 'Commande minimum professionnels (DT)')}${input('free_delivery_from', 'Livraison offerte dès (DT, 0 = jamais)')}<h2>Notifications équipe</h2>${input('staff_email', 'E-mail qui reçoit les nouvelles commandes', 'email')}</div><button class="btn">Enregistrer les paramètres</button></form>
      <div class="card"><h2>Messages envoyés</h2>${messages.length ? `<table class="list"><tr><th>Date</th><th>Destinataire</th><th>Objet</th><th>État</th></tr>${messages.map(m => `<tr><td>${date(m.created_at)}</td><td>${esc(m.recipient)}</td><td>${esc(m.subject)}</td><td>${m.sent_at ? 'Envoyé' : m.error ? `<span class="error" title="${esc(m.error)}">Erreur</span>` : 'En attente (e-mail non configuré)'}</td></tr>`).join('')}</table>` : '<p class="muted">Aucun message.</p>'}</div>`;
    document.getElementById('settings').addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.target;
      const values = Object.fromEntries([...form.querySelectorAll('input')].map(i => [i.name, i.type === 'checkbox' ? (i.checked ? '1' : '0') : i.value.replace(/^(\d+),(\d+)$/, '$1.$2')]));
      try { await api('/api/admin/settings', 'PATCH', values); toast('Paramètres enregistrés'); } catch (error) { toast(error.message, true); }
    });
  }
};

async function show(next, params = {}) {
  tab = next === 'order' ? 'orders' : next;
  view.onchange = null;
  document.querySelectorAll('#tabs button').forEach(button => button.classList.toggle('active', button.dataset.tab === tab));
  try { await render[next](params); }
  catch (error) { if (error.status === 401 || error.status === 403) loginView(error.status === 403 ? ERRORS.admin_only : ''); else view.innerHTML = `<p class="error">${esc(error.message)}</p>`; }
}

document.addEventListener('click', async event => {
  const el = event.target.closest('[data-tab],[data-go],[data-order],[data-business]');
  if (!el) return;
  if (el.dataset.tab) show(el.dataset.tab);
  if (el.dataset.go) show(el.dataset.go, el.dataset.status ? { status: el.dataset.status } : {});
  if (el.dataset.order) show('order', { ref: el.dataset.order });
  if (el.dataset.business) {
    try { await api(`/api/admin/users/${el.dataset.business}`, 'PATCH', { businessStatus: el.dataset.status }); toast(el.dataset.status === 'approved' ? 'Compte validé — le client est prévenu par e-mail' : 'Compte refusé'); show('customers'); }
    catch (error) { toast(error.message, true); }
  }
});
document.getElementById('logout').addEventListener('click', async () => { await api('/api/auth/logout', 'POST', {}).catch(() => {}); loginView(); });

async function start() {
  const { user } = await api('/api/me');
  if (!user || user.role !== 'admin') return loginView(user ? ERRORS.admin_only : '');
  document.getElementById('tabs').hidden = false; document.getElementById('logout').hidden = false;
  show('dashboard');
}
start().catch(() => loginView());
