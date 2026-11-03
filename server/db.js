const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { DatabaseSync } = require('node:sqlite');

const root = path.resolve(__dirname, '..');

const schema = `
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY, category TEXT NOT NULL, brand TEXT NOT NULL,
  name_fr TEXT NOT NULL, name_ar TEXT NOT NULL, desc_fr TEXT NOT NULL, desc_ar TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1, sort INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS variants (
  id INTEGER PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id), size TEXT NOT NULL, sort INTEGER NOT NULL DEFAULT 0,
  price INTEGER, business_price INTEGER, reference_price INTEGER, price_confirmed INTEGER NOT NULL DEFAULT 0,
  stock INTEGER, image TEXT, active INTEGER NOT NULL DEFAULT 1, UNIQUE(product_id, size)
);
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, name TEXT NOT NULL, phone TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'customer', type TEXT NOT NULL DEFAULT 'individual', company TEXT NOT NULL DEFAULT '', tax_id TEXT NOT NULL DEFAULT '',
  business_status TEXT NOT NULL DEFAULT 'none', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users(id), expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS zones (id TEXT PRIMARY KEY, name_fr TEXT NOT NULL, name_ar TEXT NOT NULL, fee INTEGER NOT NULL, active INTEGER NOT NULL DEFAULT 1, sort INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY, ref TEXT NOT NULL UNIQUE, access_token TEXT NOT NULL, user_id INTEGER REFERENCES users(id), customer_type TEXT NOT NULL,
  name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL DEFAULT '', company TEXT NOT NULL DEFAULT '', tax_id TEXT NOT NULL DEFAULT '',
  zone_id TEXT NOT NULL, city TEXT NOT NULL, address TEXT NOT NULL, notes TEXT NOT NULL DEFAULT '',
  payment_method TEXT NOT NULL, payment_status TEXT NOT NULL DEFAULT 'pending', payment_ref TEXT,
  status TEXT NOT NULL DEFAULT 'new', restocked INTEGER NOT NULL DEFAULT 0,
  subtotal INTEGER NOT NULL, delivery_fee INTEGER NOT NULL, total INTEGER NOT NULL, language TEXT NOT NULL DEFAULT 'fr',
  created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(id), variant_id INTEGER NOT NULL REFERENCES variants(id),
  product_id TEXT NOT NULL, size TEXT NOT NULL, name_fr TEXT NOT NULL, name_ar TEXT NOT NULL, unit_price INTEGER NOT NULL, quantity INTEGER NOT NULL, line_total INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS order_events (id INTEGER PRIMARY KEY, order_id INTEGER NOT NULL REFERENCES orders(id), status TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY, ref TEXT NOT NULL UNIQUE, user_id INTEGER REFERENCES users(id), name TEXT NOT NULL, company TEXT NOT NULL, email TEXT NOT NULL,
  phone TEXT NOT NULL, business_type TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS outbox (id INTEGER PRIMARY KEY, channel TEXT NOT NULL, recipient TEXT NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, sent_at TEXT, error TEXT);
CREATE INDEX IF NOT EXISTS orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS items_order ON order_items(order_id);
`;

// Governorates of Tunisia. Fees are starting values in millimes, to be set by El Jawhara in the admin.
const zones = [
  ['tunis', 'Tunis', 'تونس', 7000], ['ariana', 'Ariana', 'أريانة', 7000], ['ben-arous', 'Ben Arous', 'بن عروس', 7000], ['manouba', 'Manouba', 'منوبة', 7000],
  ['nabeul', 'Nabeul', 'نابل', 8000], ['zaghouan', 'Zaghouan', 'زغوان', 8000], ['bizerte', 'Bizerte', 'بنزرت', 8000], ['beja', 'Béja', 'باجة', 9000],
  ['jendouba', 'Jendouba', 'جندوبة', 9000], ['kef', 'Le Kef', 'الكاف', 9000], ['siliana', 'Siliana', 'سليانة', 9000], ['sousse', 'Sousse', 'سوسة', 8000],
  ['monastir', 'Monastir', 'المنستير', 8000], ['mahdia', 'Mahdia', 'المهدية', 8000], ['sfax', 'Sfax', 'صفاقس', 9000], ['kairouan', 'Kairouan', 'القيروان', 9000],
  ['kasserine', 'Kasserine', 'القصرين', 9000], ['sidi-bouzid', 'Sidi Bouzid', 'سيدي بوزيد', 9000], ['gabes', 'Gabès', 'قابس', 9000], ['medenine', 'Médenine', 'مدنين', 9000],
  ['tataouine', 'Tataouine', 'تطاوين', 9000], ['gafsa', 'Gafsa', 'قفصة', 9000], ['tozeur', 'Tozeur', 'توزر', 9000], ['kebili', 'Kébili', 'قبلي', 9000]
];

const defaultSettings = {
  company_name: 'Société El Jawhara', company_address: '[Adresse à compléter]', company_tax_id: '[Matricule fiscal à compléter]',
  company_phone: '[Téléphone à compléter]', company_email: '[E-mail à compléter]', bank_details: '[RIB à compléter]',
  vat_rate: '19', stamp_duty: '0', free_delivery_from: '0', min_order: '0', business_min_order: '0',
  cod_enabled: '1', card_enabled: '1', transfer_enabled: '1', staff_email: '', staff_phone: '',
  // 1 = Géant reference prices can be sold until El Jawhara confirms its own price list. Set to 0 before launch.
  sell_unconfirmed_prices: '1'
};

function loadStaticCatalog() {
  const context = vm.createContext({});
  for (const file of ['retailer-data.js', 'photo-overrides.js', 'catalog.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
  return vm.runInContext('products', context);
}

const now = () => new Date().toISOString();
const toMillimes = price => price === null || price === undefined ? null : Math.round(price * 1000);

function open(file = process.env.DB_FILE || path.join(root, 'data', 'eljawhara.db')) {
  if (file !== ':memory:') fs.mkdirSync(path.dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;');
  db.exec(schema);
  if (!db.prepare('PRAGMA table_info(variants)').all().some(column => column.name === 'code')) db.exec('ALTER TABLE variants ADD COLUMN code TEXT');
  sync(db);
  return db;
}

// Adds new products, sizes and photos from catalog.js. Prices and stock already in the database are never overwritten.
function sync(db) {
  const catalog = loadStaticCatalog();
  const upsertProduct = db.prepare(`INSERT INTO products (id, category, brand, name_fr, name_ar, desc_fr, desc_ar, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET category = excluded.category, brand = excluded.brand, name_fr = excluded.name_fr, name_ar = excluded.name_ar, desc_fr = excluded.desc_fr, desc_ar = excluded.desc_ar, sort = excluded.sort`);
  const insertVariant = db.prepare(`INSERT INTO variants (product_id, size, sort, price, reference_price, image, code) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(product_id, size) DO UPDATE SET sort = excluded.sort, image = excluded.image, reference_price = excluded.reference_price, code = excluded.code`);
  db.exec('BEGIN');
  catalog.forEach((product, index) => {
    upsertProduct.run(product.id, product.category, product.brand, product.name.fr, product.name.ar, product.description.fr, product.description.ar, index);
    product.variants.forEach((variant, sort) => insertVariant.run(product.id, variant.size, sort, toMillimes(variant.price), toMillimes(variant.price), variant.image || null, variant.codes.map(code => variant.codesToConfirm ? code + '?' : code).join(' ') || null));
  });
  // Sizes removed from catalog.js: deleted when never ordered, otherwise hidden so order history stays intact.
  const sizes = new Set(catalog.flatMap(product => product.variants.map(variant => `${product.id}|${variant.size}`)));
  for (const row of db.prepare('SELECT id, product_id, size FROM variants').all()) {
    if (sizes.has(`${row.product_id}|${row.size}`)) continue;
    if (db.prepare('SELECT 1 FROM order_items WHERE variant_id = ? LIMIT 1').get(row.id)) db.prepare('UPDATE variants SET active = 0 WHERE id = ?').run(row.id);
    else db.prepare('DELETE FROM variants WHERE id = ?').run(row.id);
  }
  const ids = new Set(catalog.map(product => product.id));
  for (const { id } of db.prepare('SELECT id FROM products').all()) {
    if (ids.has(id)) continue;
    if (db.prepare('SELECT 1 FROM variants WHERE product_id = ? LIMIT 1').get(id)) db.prepare('UPDATE products SET active = 0 WHERE id = ?').run(id);
    else db.prepare('DELETE FROM products WHERE id = ?').run(id);
  }
  const insertZone = db.prepare('INSERT OR IGNORE INTO zones (id, name_fr, name_ar, fee, sort) VALUES (?, ?, ?, ?, ?)');
  zones.forEach(([id, fr, ar, fee], index) => insertZone.run(id, fr, ar, fee, index));
  const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
  for (const [key, value] of Object.entries(defaultSettings)) insertSetting.run(key, value);
  db.exec('COMMIT');
}

function settings(db) {
  return Object.fromEntries(db.prepare('SELECT key, value FROM settings').all().map(row => [row.key, row.value]));
}

module.exports = { open, settings, now, toMillimes, loadStaticCatalog };
