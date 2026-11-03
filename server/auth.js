const crypto = require('node:crypto');

const SESSION_DAYS = 30;
const hashToken = token => crypto.createHash('sha256').update(token).digest('hex');

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored).split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = crypto.scryptSync(password, Buffer.from(salt, 'hex'), expected.length);
  return crypto.timingSafeEqual(actual, expected);
}

function createSession(db, userId) {
  const token = crypto.randomBytes(32).toString('base64url');
  const expires = Date.now() + SESSION_DAYS * 86400000;
  db.prepare('DELETE FROM sessions WHERE expires_at < ?').run(Date.now());
  db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').run(hashToken(token), userId, expires);
  return { token, maxAge: SESSION_DAYS * 86400 };
}

function sessionUser(db, token) {
  if (!token) return null;
  const row = db.prepare(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?`).get(hashToken(token), Date.now());
  return row || null;
}

function destroySession(db, token) {
  if (token) db.prepare('DELETE FROM sessions WHERE token_hash = ?').run(hashToken(token));
}

const publicUser = user => user && {
  id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role, type: user.type,
  company: user.company, taxId: user.tax_id, businessStatus: user.business_status
};

module.exports = { hashPassword, verifyPassword, createSession, sessionUser, destroySession, publicUser };
