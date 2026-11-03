// Live store layer. When the API answers, it replaces the prototype flows with real ones:
// server prices and stock, checkout with delivery and payment, customer accounts, order tracking and quote requests.
// Without the API (static hosting, file://), the prototype keeps working unchanged.
Object.assign(icons, { user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/>' });
byId('account-button').innerHTML = icon('user');

const liveText = {
  fr: {
    prototype: 'Livraison partout en Tunisie', footerNote: '© El Jawhara · Tous droits réservés',
    demoPrices: 'Prix TTC en dinars tunisiens (DT)', demoPrice: 'Prix TTC', officialPrice: 'Prix TTC', proPrice: 'Tarif professionnel',
    catalogNote: 'Prix TTC en dinars tunisiens. Les produits sans prix sont disponibles sur devis.',
    detailNote: 'Prix TTC en dinars tunisiens. La photo peut légèrement différer du produit livré.',
    priceNote: 'Prix TTC. Les frais de livraison dépendent de votre gouvernorat.', deliveryPending: 'Calculée à l’étape suivante',
    demoNotice: 'Livraison dans les 24 gouvernorats · paiement sécurisé.',
    inStock: 'En stock', maxQuantity: 'Quantité maximale atteinte pour ce format.',
    checkoutDescription: 'Livraison à domicile partout en Tunisie.', placeOrder: 'Confirmer la commande',
    sendInquiry: 'Envoyer la demande', wholesaleFormDescription: 'Dites-nous ce dont vous avez besoin : notre équipe commerciale vous répond rapidement.',
    privacyNote: 'Vos informations servent uniquement à traiter votre commande et à vous contacter à son sujet.', payment: 'Mode de paiement', total: 'Total TTC'
  },
  ar: {
    prototype: 'التوصيل إلى كامل تراب الجمهورية', footerNote: '© الجوهرة · جميع الحقوق محفوظة',
    demoPrices: 'الأسعار بالدينار التونسي شاملة الأداءات', demoPrice: 'السعر شامل الأداءات', officialPrice: 'السعر شامل الأداءات', proPrice: 'سعر المهنيين',
    catalogNote: 'الأسعار بالدينار التونسي شاملة الأداءات. المنتجات دون سعر متوفّرة حسب عرض أسعار.',
    detailNote: 'الأسعار بالدينار التونسي شاملة الأداءات. قد تختلف الصورة قليلاً عن المنتج المسلَّم.',
    priceNote: 'الأسعار شاملة الأداءات. تُحتسب معاليم التوصيل حسب الولاية.', deliveryPending: 'تُحتسب في الخطوة التالية',
    demoNotice: 'التوصيل إلى الولايات الأربع والعشرين · دفع آمن.',
    inStock: 'متوفّر', maxQuantity: 'تم بلوغ الكمية القصوى لهذا الحجم.',
    checkoutDescription: 'التوصيل إلى المنزل في كامل أنحاء تونس.', placeOrder: 'تأكيد الطلب',
    sendInquiry: 'إرسال الطلب', wholesaleFormDescription: 'أخبرنا بما تحتاجه وسيتواصل معك فريقنا التجاري في أقرب وقت.',
    privacyNote: 'تُستخدم معلوماتك فقط لمعالجة طلبك والتواصل معك بشأنه.', payment: 'طريقة الدفع', total: 'المجموع شامل الأداءات'
  }
};
Object.assign(translations.fr, {
  outOfStock: 'Rupture de stock', stockLeft: 'Plus que {n} en stock', officialPrice: 'Prix TTC', proPrice: 'Tarif professionnel',
  account: 'Mon compte', login: 'Se connecter', register: 'Créer un compte', password: 'Mot de passe', passwordHint: '8 caractères minimum',
  accountType: 'Type de compte', individual: 'Particulier', business: 'Professionnel', taxId: 'Matricule fiscal (facultatif)',
  noAccount: 'Pas encore de compte ? Créer un compte', haveAccount: 'Déjà un compte ? Se connecter', haveAccountLogin: 'Déjà client ? Connectez-vous pour retrouver vos informations.',
  logout: 'Se déconnecter', myOrders: 'Mes commandes', deviceOrders: 'Commandes passées sur cet appareil', noOrders: 'Aucune commande pour le moment.',
  businessPending: 'Compte professionnel en cours de validation. Vos tarifs professionnels s’afficheront dès la validation.',
  businessApproved: 'Compte professionnel validé · tarifs professionnels actifs.', businessRejected: 'Compte professionnel non validé. Contactez-nous pour en savoir plus.',
  reorder: 'Commander à nouveau', track: 'Suivre', invoice: 'Facture / bon de commande', adminLink: 'Ouvrir l’administration',
  orderPlaced: 'Merci ! Votre commande est enregistrée.', orderRef: 'Commande', trackingSaved: 'Gardez ce lien pour suivre votre commande :',
  payNow: 'Payer maintenant', paymentInitError: 'Le paiement en ligne est momentanément indisponible. Votre commande est enregistrée : vous pouvez réessayer ci-dessous.',
  paymentFailed: 'Le paiement n’a pas abouti. Vous pouvez réessayer.', orderTracking: 'Suivi de commande', paymentStatus: 'Paiement',
  deliveryZone: 'Gouvernorat', notes: 'Instructions de livraison (facultatif)', freeDelivery: 'Offerte', chooseZone: 'Choisissez votre gouvernorat',
  freeDeliveryFrom: 'Livraison offerte dès {n}', minOrderNotice: 'Montant minimum de commande : {n}', orderingAs: 'Commande au nom de',
  quoteSent: 'Demande envoyée !', quoteSentText: 'Référence {ref}. Notre équipe commerciale vous recontacte rapidement.',
  orderNotFound: 'Commande introuvable. Vérifiez le lien de suivi.', loading: 'Chargement…', welcome: 'Bonjour {name}',
  unavailableRemoved: 'Certains produits de votre panier ne sont plus disponibles et ont été retirés.', redirectingPayment: 'Redirection vers le paiement sécurisé…',
  deliveryAddress: 'Livraison', items: 'Articles', continueCheckout: 'Continuer ma commande', noPaymentMethod: 'Aucun mode de paiement n’est disponible pour le moment. Contactez-nous.',
  checkoutEyebrow: 'Commande', editCart: 'Modifier', quantityShort: 'Qté',
  status_new: 'Reçue', status_confirmed: 'Confirmée', status_preparing: 'En préparation', status_shipped: 'En livraison', status_delivered: 'Livrée', status_cancelled: 'Annulée',
  payment_pending: 'En attente', payment_paid: 'Payé', payment_failed: 'Échoué', payment_refunded: 'Remboursé',
  pay_cod: 'Paiement à la livraison', pay_cod_note: 'En espèces, à la réception de la commande.',
  pay_card: 'Carte bancaire ou e-DINAR', pay_card_note: 'Paiement sécurisé via Konnect. E-mail requis.',
  pay_transfer: 'Virement bancaire', pay_transfer_note: 'Réservé aux professionnels. RIB indiqué sur le bon de commande.',
  err_missing_field: 'Merci de remplir tous les champs obligatoires.', err_invalid_email: 'Adresse e-mail invalide.', err_invalid_phone: 'Numéro de téléphone invalide.',
  err_invalid_zone: 'Choisissez votre gouvernorat.', err_payment_unavailable: 'Ce mode de paiement n’est pas disponible.', err_empty_cart: 'Votre panier est vide.',
  err_product_unavailable: 'Un produit n’est plus disponible. Votre panier a été mis à jour.', err_price_on_request: 'Un produit est désormais disponible sur devis uniquement. Votre panier a été mis à jour.',
  err_out_of_stock: 'Stock insuffisant pour un produit. Votre panier a été mis à jour.', err_below_minimum: 'Le montant minimum de commande n’est pas atteint.',
  err_quantity_limit: 'Quantité trop élevée pour un produit.', err_too_many_requests: 'Trop de tentatives. Réessayez dans quelques minutes.',
  err_email_taken: 'Un compte existe déjà avec cette adresse e-mail.', err_weak_password: 'Le mot de passe doit contenir au moins 8 caractères.',
  err_invalid_credentials: 'E-mail ou mot de passe incorrect.', err_server_error: 'Une erreur est survenue. Réessayez dans un instant.',
  err_network: 'Connexion impossible. Vérifiez votre réseau et réessayez.', err_not_payable: 'Cette commande ne peut plus être payée en ligne.'
});
Object.assign(translations.ar, {
  outOfStock: 'غير متوفّر حالياً', stockLeft: 'بقي {n} فقط', officialPrice: 'السعر شامل الأداءات', proPrice: 'سعر المهنيين',
  account: 'حسابي', login: 'تسجيل الدخول', register: 'إنشاء حساب', password: 'كلمة المرور', passwordHint: '٨ أحرف على الأقل',
  accountType: 'نوع الحساب', individual: 'حريف خاص', business: 'مهني', taxId: 'المعرّف الجبائي (اختياري)',
  noAccount: 'ليس لديك حساب؟ أنشئ حساباً', haveAccount: 'لديك حساب؟ سجّل الدخول', haveAccountLogin: 'حريف سابق؟ سجّل الدخول لاسترجاع معلوماتك.',
  logout: 'تسجيل الخروج', myOrders: 'طلباتي', deviceOrders: 'الطلبات المنجزة من هذا الجهاز', noOrders: 'لا توجد طلبات حالياً.',
  businessPending: 'حسابك المهني قيد المراجعة. ستظهر أسعار المهنيين فور المصادقة عليه.',
  businessApproved: 'تمت المصادقة على حسابك المهني · أسعار المهنيين مفعّلة.', businessRejected: 'لم تتم المصادقة على حسابك المهني. تواصل معنا لمزيد من المعلومات.',
  reorder: 'إعادة الطلب', track: 'تتبّع', invoice: 'الفاتورة / وصل الطلب', adminLink: 'فتح لوحة الإدارة',
  orderPlaced: 'شكراً! تم تسجيل طلبك.', orderRef: 'الطلب', trackingSaved: 'احتفظ بهذا الرابط لتتبّع طلبك:',
  payNow: 'ادفع الآن', paymentInitError: 'الدفع الإلكتروني غير متاح حالياً. تم تسجيل طلبك ويمكنك إعادة المحاولة أدناه.',
  paymentFailed: 'لم تتم عملية الدفع. يمكنك إعادة المحاولة.', orderTracking: 'تتبّع الطلب', paymentStatus: 'الدفع',
  deliveryZone: 'الولاية', notes: 'تعليمات التوصيل (اختياري)', freeDelivery: 'مجاني', chooseZone: 'اختر ولايتك',
  freeDeliveryFrom: 'التوصيل مجاني ابتداءً من {n}', minOrderNotice: 'الحد الأدنى للطلب: {n}', orderingAs: 'الطلب باسم',
  quoteSent: 'تم إرسال طلبك!', quoteSentText: 'المرجع {ref}. سيتواصل معك فريقنا التجاري في أقرب وقت.',
  orderNotFound: 'لم نجد هذا الطلب. تحقّق من رابط التتبّع.', loading: 'جارٍ التحميل…', welcome: 'مرحباً {name}',
  unavailableRemoved: 'بعض المنتجات في سلتك لم تعد متوفّرة وتمت إزالتها.', redirectingPayment: 'جارٍ التحويل إلى صفحة الدفع الآمن…',
  deliveryAddress: 'التوصيل', items: 'المنتجات', continueCheckout: 'متابعة الطلب', noPaymentMethod: 'لا توجد طريقة دفع متاحة حالياً. تواصل معنا.',
  checkoutEyebrow: 'الطلب', editCart: 'تعديل', quantityShort: 'الكمية',
  status_new: 'مستلمة', status_confirmed: 'مؤكّدة', status_preparing: 'قيد التحضير', status_shipped: 'قيد التوصيل', status_delivered: 'تم التسليم', status_cancelled: 'ملغاة',
  payment_pending: 'في الانتظار', payment_paid: 'مدفوع', payment_failed: 'لم يتم', payment_refunded: 'مسترجع',
  pay_cod: 'الدفع عند الاستلام', pay_cod_note: 'نقداً عند استلام الطلب.',
  pay_card: 'بطاقة بنكية أو e-DINAR', pay_card_note: 'دفع آمن عبر Konnect. البريد الإلكتروني إجباري.',
  pay_transfer: 'تحويل بنكي', pay_transfer_note: 'خاص بالمهنيين. الحساب البنكي مذكور في وصل الطلب.',
  err_missing_field: 'يرجى تعمير كل الخانات الإجبارية.', err_invalid_email: 'البريد الإلكتروني غير صالح.', err_invalid_phone: 'رقم الهاتف غير صالح.',
  err_invalid_zone: 'اختر ولايتك.', err_payment_unavailable: 'طريقة الدفع هذه غير متاحة.', err_empty_cart: 'سلتك فارغة.',
  err_product_unavailable: 'أحد المنتجات لم يعد متوفّراً. تم تحديث سلتك.', err_price_on_request: 'أحد المنتجات أصبح متوفّراً حسب عرض أسعار فقط. تم تحديث سلتك.',
  err_out_of_stock: 'المخزون غير كافٍ لأحد المنتجات. تم تحديث سلتك.', err_below_minimum: 'لم يتم بلوغ الحد الأدنى للطلب.',
  err_quantity_limit: 'الكمية مرتفعة جداً لأحد المنتجات.', err_too_many_requests: 'محاولات كثيرة. أعد المحاولة بعد بضع دقائق.',
  err_email_taken: 'يوجد حساب بهذا البريد الإلكتروني.', err_weak_password: 'يجب أن تتكوّن كلمة المرور من ٨ أحرف على الأقل.',
  err_invalid_credentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.', err_server_error: 'حدث خطأ. أعد المحاولة بعد قليل.',
  err_network: 'تعذّر الاتصال. تحقّق من الشبكة وأعد المحاولة.', err_not_payable: 'لم يعد بالإمكان دفع هذا الطلب إلكترونياً.'
});

let live = false;
let store = { zones: [], paymentMethods: [], rules: { freeDeliveryFrom: 0, minOrder: 0, maxQuantity: 99 }, user: null };
let currentOrder = null;
let accountView = 'login';
let myOrders = null;
let quoteResult = null;
const staticProducts = products.slice();
for (const product of staticProducts) product.allVariants = product.variants.slice();

async function api(url, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(url, { method, credentials: 'same-origin', headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined });
  } catch { throw Object.assign(new Error('network'), { code: 'network' }); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(data.error || 'server_error'), { code: data.error || 'server_error' });
  return data;
}
const errorText = error => (translations[language][`err_${error.code}`] || translations.fr[`err_${error.code}`]) || t('err_server_error');
const plainMoney = value => `${new Intl.NumberFormat(locale(), { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(value)} ${t('currency')}`;
const formatDate = iso => new Intl.DateTimeFormat(locale(), { dateStyle: 'medium' }).format(new Date(iso));
const trackingUrl = order => `${location.origin}/#/commande/${order.ref}/${order.token}`;
const invoiceUrl = order => `/api/orders/${encodeURIComponent(order.ref)}/invoice?token=${encodeURIComponent(order.token)}`;

function sanitizeCart(silent = false) {
  const before = cart.length;
  cart = cart.filter(item => {
    const product = productById(item.id);
    const variant = product && variantFor(product, item.size);
    if (!variant || variant.price === null || variant.inStock === false || !Number.isInteger(item.quantity) || item.quantity < 1) return false;
    item.quantity = Math.min(item.quantity, maxQty(variant));
    return true;
  });
  if (!silent && cart.length < before) toast(t('unavailableRemoved'));
}

function applyCatalog(data) {
  const remote = new Map(data.products.map(product => [product.id, product]));
  const visible = [];
  for (const product of staticProducts) {
    const source = remote.get(product.id);
    if (!source) continue;
    if (source.name) product.name = { ...source.name, en: product.name.en };
    if (source.description) product.description = { ...source.description, en: product.description.en };
    product.variants = product.allVariants.filter(variant => source.variants.some(item => item.size === variant.size)).map(variant => {
      const item = source.variants.find(entry => entry.size === variant.size);
      return Object.assign(variant, { variantId: item.id, price: item.price, priceConfirmed: item.priceConfirmed, businessPrice: item.businessPrice, inStock: item.inStock, stockLeft: item.stockLeft, references: [] });
    });
    if (!product.variants.length) continue;
    product.sizes = product.variants.map(variant => variant.size);
    product.price = product.variants[0].price;
    product.image = (product.variants.find(variant => variant.image) || {}).image || null;
    visible.push(product);
  }
  products.splice(0, products.length, ...visible);
  store = { zones: data.zones, paymentMethods: data.paymentMethods, rules: data.rules, user: data.user };
  maxQuantity = data.rules.maxQuantity;
  if (selectedProduct && !products.includes(selectedProduct)) { selectedProduct = null; closeDialog('product-dialog'); }
  if (selectedProduct && !variantFor(selectedProduct, selectedSize)) { selectedSize = selectedProduct.sizes[0]; selectedPhoto = 0; }
  byId('account-button').classList.toggle('signed-in', !!store.user);
  sanitizeCart();
  setLanguage(language);
}
const refreshCatalog = async () => { try { applyCatalog(await api('/api/catalog')); } catch {} };

function rememberOrder(order) {
  try {
    const saved = JSON.parse(localStorage.getItem('jawhara-orders') || '[]').filter(entry => entry.ref !== order.ref);
    saved.unshift({ ref: order.ref, token: order.token, createdAt: order.createdAt, total: order.total });
    localStorage.setItem('jawhara-orders', JSON.stringify(saved.slice(0, 20)));
  } catch {}
}
function deviceOrders() { try { return JSON.parse(localStorage.getItem('jawhara-orders') || '[]'); } catch { return []; } }

function field(key, { type = 'text', autocomplete = '', value = '', required = true, max = 100, min = 0, label = t(key) } = {}) {
  return `<label>${label}<input name="${key}" type="${type}" ${required ? 'required' : ''} maxlength="${max}" ${min ? `minlength="${min}"` : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${type === 'tel' ? 'inputmode="tel"' : ''} value="${escapeHTML(value || '')}"></label>`;
}
const formShell = (eyebrow, title, description, body) => `<div class="form-wrapper"><div class="eyebrow">${eyebrow}</div><h2>${title}</h2>${description ? `<p>${description}</p>` : ''}${body}</div>`;
const errorBox = '<p class="form-error" id="form-error" role="alert" hidden></p>';
function showError(form, error) { const box = form.querySelector('#form-error'); box.textContent = errorText(error); box.hidden = false; box.scrollIntoView({ block: 'nearest' }); }
function setBusy(form, busy) {
  form.setAttribute('aria-busy', busy);
  form.querySelectorAll('button[type="submit"]').forEach(button => { button.disabled = busy; });
  if (busy) form.querySelector('#form-error').hidden = true;
}
function onSubmit(handler) {
  byId('prototype-form').addEventListener('submit', async event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setBusy(form, true);
    try { await handler(form, Object.fromEntries(new FormData(form))); }
    catch (error) { showError(form, error); }
    finally { if (form.isConnected) setBusy(form, false); }
  });
}

function deliveryFee(zoneId) {
  const zone = store.zones.find(item => item.id === zoneId);
  if (!zone) return null;
  return store.rules.freeDeliveryFrom > 0 && cartTotal() >= store.rules.freeDeliveryFrom ? 0 : zone.fee;
}
function updateCheckoutSummary(form) {
  const subtotal = cartTotal();
  const fee = deliveryFee(form.elements.zoneId.value);
  const { minOrder, freeDeliveryFrom } = store.rules;
  byId('checkout-summary').innerHTML = `<div class="summary-row"><span>${t('subtotal')}</span><span>${money(subtotal)}</span></div><div class="summary-row"><span>${t('delivery')}</span><span>${fee === null ? t('chooseZone') : fee === 0 ? t('freeDelivery') : money(fee)}</span></div><div class="summary-row summary-total"><span>${t('total')}</span><span>${money(Math.round((subtotal + (fee || 0)) * 1000) / 1000)}</span></div>${freeDeliveryFrom > 0 && subtotal < freeDeliveryFrom ? `<p class="form-note">${t('freeDeliveryFrom').replace('{n}', plainMoney(freeDeliveryFrom))}</p>` : ''}${minOrder > 0 && subtotal < minOrder ? `<p class="form-error">${t('minOrderNotice').replace('{n}', plainMoney(minOrder))}</p>` : ''}`;
  form.querySelector('button[type="submit"]').toggleAttribute('data-below-minimum', minOrder > 0 && subtotal < minOrder);
}

function checkoutItems() {
  return `<div class="checkout-items"><div class="checkout-items-head"><strong>${t('items')} · ${formatNumber(cart.reduce((n, item) => n + item.quantity, 0))}</strong><button type="button" class="link-button" data-action="back-cart">${t('editCart')}</button></div><ul>${cart.map(item => {
    const product = productById(item.id);
    return `<li><div class="cart-thumb" style="--tint:${product.tint}">${productPhoto(product, variantFor(product, item.size).image, true, true)}</div><span><strong>${pick(product.name)}</strong><small>${formatVariant(product, item.size)} · ${t('quantityShort')} ${formatNumber(item.quantity)}</small></span><b>${money(unitPrice(product, item.size) * item.quantity)}</b></li>`;
  }).join('')}</ul></div>`;
}

function renderCheckout() {
  const user = store.user || {};
  const methods = store.paymentMethods;
  byId('form-dialog').setAttribute('aria-label', t('checkoutTitle'));
  byId('form-content').innerHTML = formShell(t('checkoutEyebrow'), t('checkoutTitle'), t('checkoutDescription'), `${checkoutItems()}${store.user ? (user.company && user.businessStatus === 'approved' ? `<p class="form-note">${t('orderingAs')} <strong>${escapeHTML(user.company)}</strong></p>` : '') : `<p class="form-note"><button type="button" class="link-button" data-store-action="account">${t('haveAccountLogin')}</button></p>`}
    <form class="prototype-form" id="prototype-form"><div class="form-row">${field('name', { autocomplete: 'name', value: user.name })}${field('phone', { type: 'tel', autocomplete: 'tel', value: user.phone, max: 30 })}</div>${field('email', { type: 'email', autocomplete: 'email', value: user.email, required: false, max: 160 })}
    <div class="form-row"><label>${t('deliveryZone')}<select name="zoneId" required autocomplete="address-level1"><option value="">${t('chooseZone')}</option>${store.zones.map(zone => `<option value="${zone.id}">${escapeHTML(pick(zone.name))}</option>`).join('')}</select></label>${field('city', { autocomplete: 'address-level2' })}</div>
    ${field('address', { autocomplete: 'street-address', max: 250 })}<label>${t('notes')}<textarea name="notes" maxlength="500" rows="1" class="notes-input"></textarea></label>
    ${methods.length ? `<fieldset class="payment-options"><legend>${t('payment')}</legend>${methods.map((method, index) => `<label class="payment-option"><input type="radio" name="paymentMethod" value="${method}" ${index === 0 ? 'checked' : ''} required><span><strong>${t(`pay_${method}`)}</strong><small>${t(`pay_${method}_note`)}</small></span></label>`).join('')}</fieldset>` : `<p class="form-error">${t('noPaymentMethod')}</p>`}
    <div class="checkout-summary" id="checkout-summary"></div>${errorBox}<p class="form-note">${t('privacyNote')}</p>
    <button type="submit" class="button primary full-width" ${methods.length ? '' : 'disabled'}>${t('placeOrder')}<span>↗</span></button><button type="button" class="nav-link" data-action="back-cart">${t('backCart')}</button></form>`);
  const form = byId('prototype-form');
  const syncEmail = () => { form.elements.email.required = form.elements.paymentMethod?.value === 'card'; };
  form.addEventListener('change', () => { syncEmail(); updateCheckoutSummary(form); });
  syncEmail(); updateCheckoutSummary(form);
  onSubmit(async (form, values) => {
    if (store.rules.minOrder > 0 && cartTotal() < store.rules.minOrder) throw Object.assign(new Error(), { code: 'below_minimum' });
    try {
      const result = await api('/api/orders', { method: 'POST', body: { ...values, language, items: cart.map(item => ({ productId: item.id, size: item.size, quantity: item.quantity })) } });
      rememberOrder(result.order);
      cart = []; renderCart(); myOrders = null;
      if (result.payUrl) { byId('form-content').innerHTML = formShell(t('checkoutEyebrow'), t('redirectingPayment'), '', ''); location.href = result.payUrl; return; }
      currentOrder = { ...result.order, justPlaced: true, paymentError: !!result.paymentError };
      formMode = 'order'; renderForm('order');
      byId('form-content').querySelector('h2').focus?.();
    } catch (error) {
      if (['product_unavailable', 'price_on_request', 'out_of_stock'].includes(error.code)) { await refreshCatalog(); updateCheckoutSummary(form); }
      throw error;
    }
  });
}

function renderQuote() {
  const user = store.user || {};
  byId('form-dialog').setAttribute('aria-label', t('wholesaleFormTitle'));
  if (quoteResult) {
    byId('form-content').innerHTML = `<div class="form-wrapper"><div class="success-state"><div class="success-icon">✓</div><h2>${t('quoteSent')}</h2><p>${t('quoteSentText').replace('{ref}', `<strong>${escapeHTML(quoteResult)}</strong>`)}</p><button class="button primary" data-close="form-dialog">${t('close')}</button></div></div>`;
    quoteResult = null;
    return;
  }
  byId('form-content').innerHTML = formShell(t('professionalsShort'), t('wholesaleFormTitle'), t('wholesaleFormDescription'), `<form class="prototype-form" id="prototype-form"><div class="form-row">${field('name', { autocomplete: 'name', value: user.name })}${field('company', { autocomplete: 'organization', value: user.company, max: 120 })}</div>${field('email', { type: 'email', autocomplete: 'email', value: user.email, max: 160 })}<label>${t('businessType')}<select name="businessType">${['cafe', 'shop', 'distributor', 'other'].map(key => `<option value="${key}">${t(key)}</option>`).join('')}</select></label>${field('phone', { type: 'tel', autocomplete: 'tel', value: user.phone, max: 30 })}<label>${t('message')}<textarea name="message" required maxlength="2000" placeholder="${t('messagePlaceholder')}"></textarea></label>${errorBox}<p class="form-note">${t('privacyNote')}</p><button type="submit" class="button primary full-width">${t('sendInquiry')}<span>↗</span></button></form>`);
  onSubmit(async (form, values) => {
    const { ref } = await api('/api/quotes', { method: 'POST', body: values });
    quoteResult = ref; renderForm('wholesale');
    byId('form-content').querySelector('button').focus();
  });
}

function orderLine(order) {
  return `<li class="account-order"><div><strong>${escapeHTML(order.ref)}</strong><span>${formatDate(order.createdAt)}${order.total !== undefined ? ` · ${plainMoney(order.total)}` : ''}</span></div>${order.status ? `<span class="status-badge status-${order.status}">${t(`status_${order.status}`)}</span>` : ''}<div class="account-order-actions"><button class="link-button" data-store-action="track" data-ref="${escapeHTML(order.ref)}" data-token="${escapeHTML(order.token)}">${t('track')}</button>${order.items ? `<button class="link-button" data-store-action="reorder" data-ref="${escapeHTML(order.ref)}">${t('reorder')}</button>` : ''}<a class="link-button" href="${invoiceUrl(order)}" target="_blank" rel="noopener">${t('invoice')}</a></div></li>`;
}

function renderAccount() {
  const user = store.user;
  byId('form-dialog').setAttribute('aria-label', t('account'));
  if (!user) {
    const registering = accountView === 'register';
    const saved = deviceOrders();
    byId('form-content').innerHTML = formShell(t('account'), t(registering ? 'register' : 'login'), '', `<form class="prototype-form" id="prototype-form">${registering ? `<fieldset class="payment-options account-type"><legend>${t('accountType')}</legend>${['individual', 'business'].map((type, index) => `<label class="payment-option"><input type="radio" name="type" value="${type}" ${index === 0 ? 'checked' : ''}><span><strong>${t(type)}</strong></span></label>`).join('')}</fieldset><div class="form-row">${field('name', { autocomplete: 'name' })}${field('phone', { type: 'tel', autocomplete: 'tel', max: 30 })}</div><div class="business-fields" hidden><div class="form-row">${field('company', { autocomplete: 'organization', max: 120, required: false })}${field('taxId', { max: 40, required: false })}</div></div>` : ''}${field('email', { type: 'email', autocomplete: 'email', max: 160 })}${field('password', { type: 'password', autocomplete: registering ? 'new-password' : 'current-password', max: 200, min: registering ? 8 : 0, label: `${t('password')}${registering ? ` <small>· ${t('passwordHint')}</small>` : ''}` })}${errorBox}<button type="submit" class="button primary full-width">${t(registering ? 'register' : 'login')}<span>↗</span></button><button type="button" class="nav-link" data-store-action="${registering ? 'show-login' : 'show-register'}">${t(registering ? 'haveAccount' : 'noAccount')}</button></form>${saved.length ? `<h3 class="account-heading">${t('deviceOrders')}</h3><ul class="account-orders">${saved.map(orderLine).join('')}</ul>` : ''}`);
    const form = byId('prototype-form');
    if (registering) form.addEventListener('change', () => {
      const business = form.elements.type.value === 'business';
      form.querySelector('.business-fields').hidden = !business;
      form.elements.company.required = business;
    });
    onSubmit(async (form, values) => {
      const { user } = await api(registering ? '/api/auth/register' : '/api/auth/login', { method: 'POST', body: values });
      store.user = user; myOrders = null;
      await refreshCatalog();
      toast(t('welcome').replace('{name}', user.name.split(' ')[0]));
      renderForm('account');
    });
    return;
  }
  const businessNote = user.type === 'business' ? `<p class="account-notice business-${user.businessStatus}">${t({ pending: 'businessPending', approved: 'businessApproved', rejected: 'businessRejected' }[user.businessStatus] || 'businessPending')}</p>` : '';
  const orders = myOrders === null ? `<p class="form-note">${t('loading')}</p>` : myOrders.length ? `<ul class="account-orders">${myOrders.map(orderLine).join('')}</ul>` : `<p class="form-note">${t('noOrders')}</p>`;
  byId('form-content').innerHTML = formShell(t('account'), t('welcome').replace('{name}', escapeHTML(user.name.split(' ')[0])), `${escapeHTML(user.email)}${user.company ? ` · ${escapeHTML(user.company)}` : ''}`, `${businessNote}${cart.length ? `<button class="button primary full-width" data-action="checkout">${t('continueCheckout')}<span>↗</span></button>` : ''}<h3 class="account-heading">${t('myOrders')}</h3>${orders}<button class="nav-link" data-store-action="logout">${t('logout')}</button>`);
  if (myOrders === null) api('/api/me/orders').then(data => { myOrders = data.orders; if (formMode === 'account') renderForm('account'); }).catch(() => { myOrders = []; });
}

function renderOrder() {
  const order = currentOrder;
  byId('form-dialog').setAttribute('aria-label', t('orderTracking'));
  if (!order || order.error) { byId('form-content').innerHTML = formShell(t('orderTracking'), order ? t('orderNotFound') : t('loading'), '', ''); return; }
  const steps = ['new', 'confirmed', 'preparing', 'shipped', 'delivered'];
  const reached = steps.indexOf(order.status);
  const payable = order.paymentMethod === 'card' && order.paymentStatus !== 'paid' && order.status !== 'cancelled';
  byId('form-content').innerHTML = formShell(t('orderTracking'), order.justPlaced ? t('orderPlaced') : `${t('orderRef')} ${escapeHTML(order.ref)}`, order.justPlaced ? `${t('orderRef')} <strong>${escapeHTML(order.ref)}</strong>` : formatDate(order.createdAt), `
    ${order.justPlaced ? `<p class="form-note">${t('trackingSaved')}<br><a class="tracking-link" href="${trackingUrl(order)}">${trackingUrl(order)}</a></p>` : ''}
    ${order.paymentError ? `<p class="form-error">${t('paymentInitError')}</p>` : order.paymentStatus === 'failed' && payable ? `<p class="form-error">${t('paymentFailed')}</p>` : ''}
    ${order.status === 'cancelled' ? `<p class="status-badge status-cancelled">${t('status_cancelled')}</p>` : `<ol class="order-steps">${steps.map((step, index) => `<li class="${index <= reached ? 'done' : ''} ${index === reached ? 'current' : ''}" ${index === reached ? 'aria-current="step"' : ''}>${t(`status_${step}`)}</li>`).join('')}</ol>`}
    <div class="order-box"><div class="summary-row"><span>${t('paymentStatus')}</span><span>${t(`pay_${order.paymentMethod}`)} · <b>${t(`payment_${order.paymentStatus}`)}</b></span></div><div class="summary-row"><span>${t('deliveryAddress')}</span><span>${escapeHTML(order.address)}, ${escapeHTML(order.city)}${order.zone ? `, ${escapeHTML(pick(order.zone))}` : ''}</span></div></div>
    <ul class="order-items">${order.items.map(item => `<li><span>${escapeHTML(pick(productById(item.productId)?.name || item.name))} · ${formatSize(item.size)} × ${formatNumber(item.quantity)}</span><span>${money(item.lineTotal)}</span></li>`).join('')}</ul>
    <div class="cart-summary"><div class="summary-row"><span>${t('subtotal')}</span><span>${money(order.subtotal)}</span></div><div class="summary-row"><span>${t('delivery')}</span><span>${order.deliveryFee === 0 ? t('freeDelivery') : money(order.deliveryFee)}</span></div><div class="summary-row summary-total"><span>${t('total')}</span><span>${money(order.total)}</span></div></div>
    ${errorBox.replace('form-error"', 'form-error" data-order-error')}
    ${payable ? `<button class="button primary full-width" data-store-action="pay-order">${t('payNow')}<span>↗</span></button>` : ''}
    <a class="button light full-width" href="${invoiceUrl(order)}" target="_blank" rel="noopener">${t('invoice')}</a>`);
}

const prototypeRenderForm = renderForm;
let lastRenderedMode = null;
renderForm = function (mode) {
  if (!live) return prototypeRenderForm(mode);
  const previousForm = byId('prototype-form');
  const previous = previousForm && lastRenderedMode === mode ? [...new FormData(previousForm)] : null;
  ({ checkout: renderCheckout, wholesale: renderQuote, account: renderAccount, order: renderOrder }[mode] || prototypeRenderForm)(mode);
  lastRenderedMode = mode;
  const form = byId('prototype-form');
  if (previous && form) {
    for (const [name, value] of previous) { const input = form.elements[name]; if (input && input.type !== 'password') input.value = value; }
    form.dispatchEvent(new Event('change'));
  }
};

async function openOrder(ref, token) {
  currentOrder = null;
  showForm('order');
  try { currentOrder = (await api(`/api/orders/${encodeURIComponent(ref)}?token=${encodeURIComponent(token)}`)).order; }
  catch { currentOrder = { error: true }; }
  if (formMode === 'order') renderForm('order');
}
function routeFromHash() {
  const match = location.hash.match(/^#\/commande\/([\w-]+)\/([\w-]+)/);
  if (match && live) openOrder(match[1], match[2]);
}

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-store-action]');
  if (!button) return;
  const action = button.dataset.storeAction;
  if (action === 'account') { accountView = 'login'; showForm('account'); }
  if (action === 'show-register' || action === 'show-login') { accountView = action === 'show-register' ? 'register' : 'login'; renderForm('account'); byId('prototype-form').querySelector('input:not([type="radio"])').focus(); }
  if (action === 'logout') { await api('/api/auth/logout', { method: 'POST', body: {} }).catch(() => {}); store.user = null; myOrders = null; await refreshCatalog(); renderForm('account'); }
  if (action === 'track') openOrder(button.dataset.ref, button.dataset.token);
  if (action === 'reorder') {
    const order = (myOrders || []).find(entry => entry.ref === button.dataset.ref);
    if (!order) return;
    let skipped = 0;
    for (const item of order.items) {
      const product = productById(item.productId);
      const variant = product && variantFor(product, item.size);
      if (!variant || variant.price === null || variant.inStock === false) { skipped++; continue; }
      const existing = cart.find(entry => entry.id === item.productId && entry.size === item.size);
      if (existing) existing.quantity = Math.min(maxQty(variant), existing.quantity + item.quantity);
      else cart.push({ id: item.productId, size: item.size, quantity: Math.min(maxQty(variant), item.quantity) });
    }
    renderCart(); closeDialog('form-dialog'); openDialog('cart-dialog');
    if (skipped) toast(t('unavailableRemoved'));
  }
  if (action === 'pay-order' && currentOrder) {
    button.disabled = true;
    try { location.href = (await api(`/api/orders/${encodeURIComponent(currentOrder.ref)}/pay?token=${encodeURIComponent(currentOrder.token)}`, { method: 'POST', body: {} })).payUrl; }
    catch (error) { const box = byId('form-content').querySelector('[data-order-error]'); box.textContent = errorText(error); box.hidden = false; button.disabled = false; }
  }
});
byId('form-dialog').addEventListener('close', () => {
  lastRenderedMode = null;
  if (location.hash.startsWith('#/commande/')) history.replaceState(null, '', location.pathname + location.search);
});
window.addEventListener('hashchange', routeFromHash);

try {
  const saved = JSON.parse(localStorage.getItem('jawhara-cart') || '[]');
  if (Array.isArray(saved)) cart = saved.filter(item => item && typeof item.id === 'string' && typeof item.size === 'string').map(item => ({ id: item.id, size: item.size, quantity: Number(item.quantity) }));
} catch {}
sanitizeCart(true);
renderCart();

(async () => {
  let data;
  try { data = await api('/api/catalog'); } catch { return; }
  live = true;
  document.documentElement.classList.add('live-store');
  for (const lang of ['fr', 'ar']) Object.assign(translations[lang], liveText[lang]);
  Object.assign(translations.en, englishText);
  byId('account-button').hidden = false;
  applyCatalog(data);
  routeFromHash();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
})();
