// Online card payment through Konnect (Tunisian gateway: bank card, e-DINAR, wallet).
// KONNECT_API_KEY + KONNECT_WALLET_ID enable it. PAYMENT_MODE=mock serves a local test page instead (development only).
const config = () => ({
  mode: process.env.PAYMENT_MODE || (process.env.KONNECT_API_KEY ? 'konnect' : 'off'),
  apiKey: process.env.KONNECT_API_KEY,
  walletId: process.env.KONNECT_WALLET_ID,
  api: process.env.KONNECT_API_URL || 'https://api.sandbox.konnect.network/api/v2',
  publicUrl: (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 5173}`).replace(/\/$/, '')
});

const cardAvailable = () => config().mode !== 'off';

async function initPayment(order) {
  const c = config();
  if (c.mode === 'mock') return { payUrl: `${c.publicUrl}/pay/mock?ref=${order.ref}&token=${order.access_token}`, paymentRef: `mock-${order.ref}` };
  if (c.mode !== 'konnect') throw new Error('Card payment is not configured');
  const [firstName, ...rest] = order.name.split(' ');
  const response = await fetch(`${c.api}/payments/init-payment`, {
    method: 'POST',
    headers: { 'x-api-key': c.apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      receiverWalletId: c.walletId, token: 'TND', amount: order.total, type: 'immediate',
      description: `El Jawhara — commande ${order.ref}`, acceptedPaymentMethods: ['bank_card', 'e-DINAR', 'wallet'],
      lifespan: 30, checkoutForm: false, addPaymentFeesToAmount: false,
      firstName, lastName: rest.join(' ') || firstName, phoneNumber: order.phone.replace(/\D/g, '').slice(-8), email: order.email || undefined,
      orderId: order.ref, webhook: `${c.publicUrl}/api/payments/konnect/webhook`, theme: 'light'
    }),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`Konnect init failed: ${response.status} ${await response.text()}`);
  return response.json();
}

// The webhook only carries a reference; the status is always re-read from Konnect.
async function paymentStatus(paymentRef) {
  const c = config();
  if (c.mode === 'mock') return null;
  const response = await fetch(`${c.api}/payments/${encodeURIComponent(paymentRef)}`, { headers: { 'x-api-key': c.apiKey }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Konnect status failed: ${response.status}`);
  const { payment } = await response.json();
  return { completed: payment.status === 'completed', orderRef: payment.orderId, amount: payment.amount };
}

module.exports = { config, cardAvailable, initPayment, paymentStatus };
