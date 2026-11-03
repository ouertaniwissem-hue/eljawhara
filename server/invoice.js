// Printable invoice (HTML, "Imprimer / Enregistrer en PDF" from the browser). Prices are entered TTC; HT and VAT are derived.
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dt = value => `${Number(value).toFixed(3).replace('.', ',')} DT`;

function render(order, view, s) {
  const vat = Number(s.vat_rate) || 0;
  const stamp = Number(s.stamp_duty) / 1000 || 0;
  const ttc = view.total;
  const ht = Math.round((ttc / (1 + vat / 100)) * 1000) / 1000;
  const rows = view.items.map(i => `<tr><td>${escape(i.name.fr)} — ${escape(i.size)}</td><td>${i.quantity}</td><td>${dt(i.unitPrice)}</td><td>${dt(i.lineTotal)}</td></tr>`).join('');
  const isInvoice = order.payment_status === 'paid' || order.status === 'delivered';
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${isInvoice ? 'Facture' : 'Bon de commande'} ${escape(view.ref)}</title><link rel="stylesheet" href="/admin/invoice.css"></head><body>
<header><img src="/assets/logo.png" alt="El Jawhara" width="160"><div><strong>${escape(s.company_name)}</strong><br>${escape(s.company_address)}<br>MF : ${escape(s.company_tax_id)}<br>${escape(s.company_phone)} · ${escape(s.company_email)}</div></header>
<h1>${isInvoice ? 'Facture' : 'Bon de commande'} n° ${escape(view.ref)}</h1>
<p>Date : ${new Date(view.createdAt).toLocaleDateString('fr-TN')}</p>
<section class="parties"><div><b>Client</b><br>${escape(view.company || view.name)}${view.company ? `<br>${escape(view.name)}` : ''}${order.tax_id ? `<br>MF : ${escape(order.tax_id)}` : ''}<br>${escape(view.phone)}${view.email ? `<br>${escape(view.email)}` : ''}</div>
<div><b>Livraison</b><br>${escape(view.address)}<br>${escape(view.city)}${view.zone ? `, ${escape(view.zone.fr)}` : ''}</div></section>
<table><thead><tr><th>Désignation</th><th>Qté</th><th>P.U. TTC</th><th>Total TTC</th></tr></thead><tbody>${rows}<tr><td>Livraison</td><td>1</td><td>${dt(view.deliveryFee)}</td><td>${dt(view.deliveryFee)}</td></tr></tbody></table>
<table class="totals"><tr><td>Total HT</td><td>${dt(ht)}</td></tr><tr><td>TVA ${vat} %</td><td>${dt(ttc - ht)}</td></tr>${stamp ? `<tr><td>Timbre fiscal</td><td>${dt(stamp)}</td></tr>` : ''}<tr class="grand"><td>Total TTC</td><td>${dt(ttc + stamp)}</td></tr></table>
<p>Paiement : ${{ cod: 'à la livraison', card: 'carte bancaire en ligne', transfer: 'virement bancaire' }[order.payment_method]} · ${order.payment_status === 'paid' ? 'payé' : 'à régler'}</p>
${order.payment_method === 'transfer' ? `<p>RIB : ${escape(s.bank_details)}</p>` : ''}
<button class="no-print" id="print">Imprimer / PDF</button><script src="/admin/print.js"></script>
</body></html>`;
}

module.exports = { render };
