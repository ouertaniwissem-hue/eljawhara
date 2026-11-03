const script = document.currentScript;
document.querySelectorAll('[data-result]').forEach(button => button.addEventListener('click', async () => {
  const response = await fetch('/api/payments/mock', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: script.dataset.ref, token: script.dataset.token, result: button.dataset.result }) });
  const data = await response.json();
  if (data.redirect) location.href = data.redirect;
}));
