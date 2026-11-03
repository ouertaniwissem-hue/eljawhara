// Every e-mail/SMS is written to the outbox table first, so nothing is lost if a provider is down.
// RESEND_API_KEY + MAIL_FROM send e-mails through Resend. Without it, messages stay in the outbox (visible in the admin).
const { now } = require('./db');

async function deliver(db, id) {
  const message = db.prepare('SELECT * FROM outbox WHERE id = ?').get(id);
  if (!message || message.channel !== 'email' || !process.env.RESEND_API_KEY || !process.env.MAIL_FROM) return;
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.MAIL_FROM, to: [message.recipient], subject: message.subject, text: message.body }),
      signal: AbortSignal.timeout(15000)
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    db.prepare('UPDATE outbox SET sent_at = ?, error = NULL WHERE id = ?').run(now(), id);
  } catch (error) {
    db.prepare('UPDATE outbox SET error = ? WHERE id = ?').run(String(error.message).slice(0, 500), id);
  }
}

function notify(db, channel, recipient, subject, body) {
  if (!recipient) return;
  const { lastInsertRowid } = db.prepare('INSERT INTO outbox (channel, recipient, subject, body, created_at) VALUES (?, ?, ?, ?, ?)').run(channel, recipient, subject, body, now());
  deliver(db, Number(lastInsertRowid));
}

module.exports = { notify };
