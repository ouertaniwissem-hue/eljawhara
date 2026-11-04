const icons = {
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/>',
  bag: '<path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/>',
  fruit: '<path d="M12 7c-5-5-12 3-7 11 2 4 5 2 7 2s5 2 7-2c5-8-2-16-7-11Z"/><path d="M12 7c0-4 2-5 5-5 0 3-2 5-5 5Z"/>',
  drop: '<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/><path d="M8 15c0 2 1 3 3 3"/>',
  heart: '<path d="M20.5 4.5a5 5 0 0 0-7 0L12 6l-1.5-1.5a5 5 0 0 0-7 7L12 20l8.5-8.5a5 5 0 0 0 0-7Z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  home: '<path d="m3 10 9-7 9 7v11h-6v-7H9v7H3V10Z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  business: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3"/>',
  truck: '<path d="M2 6h12v10H2zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  cash: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6v3.5h3V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  whatsapp: '<path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2z"/>'
};
function icon(name) { return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`; }
const translations = {
  en: {},
  fr: {
    announcement: 'Un peu de concentré. Beaucoup de bonheur.', prototype: 'Prototype · produits et prix illustratifs', brandSub: 'LE FRUIT, TOUT SIMPLEMENT.', home: 'Accueil', products: 'Nos produits', productsShort: 'Produits', story: 'Notre univers', professionals: 'Professionnels ↗', professionalsShort: 'Pro', heroEyebrow: 'DES FRUITS. DU GOÛT. DE LA JOIE.', heroTitle: 'Le bonheur,<br>ça se <span>partage.</span>', heroDescription: 'Vos saveurs préférées, en version concentrée. Une touche de fruit pour donner du goût à tous vos moments.', discover: 'Découvrir nos saveurs', heroNote: 'Une saveur pour chaque envie.', artCaption: 'À diluer.<br>À savourer.<br>À partager.', sticker: 'Petit format.<br>Grand plaisir.', illustration: 'Illustrations de produits · visuels provisoires', benefit1: 'Des saveurs pleines de vie', benefit2: 'À préparer à votre goût', benefit3: 'Pour les petits et grands moments', collectionEyebrow: 'TROUVEZ VOTRE BONHEUR', collectionTitle: 'Quelle est votre <em>saveur ?</em>', collectionDescription: 'Des classiques que l’on aime.<br>Des découvertes qui font sourire.', catalogNote: 'Catalogue de démonstration. Formats, disponibilité et prix seront confirmés par le fabricant.', ritualLabel: 'Votre pause<br>fruitée.', ritualEyebrow: 'SIMPLE COMME UN BON MOMENT', ritualTitle: 'Un petit geste.<br><em>Beaucoup de goût.</em>', ritualDescription: 'Une carafe à partager, une pause bien méritée ou une table pleine d’amis. Faites une place à votre saveur préférée.', step1: 'Versez', step1text: 'Votre concentré préféré.', step2: 'Diluez', step2text: 'Selon les indications du produit.', step3: 'Savourez', step3text: 'Bien frais, et bien entouré.', wholesaleEyebrow: 'LE GOÛT DE TRAVAILLER ENSEMBLE', wholesaleTitle: 'Un partenaire pour vos envies.', wholesaleDescription: 'Cafés, restaurants, commerces ou distributeurs : parlons de vos besoins en grandes quantités.', contact: 'Demander un devis', footer: 'Un peu de fruit dans votre quotidien.', footerNote: 'Prototype UX/UI · Aucune commande réelle', backTop: 'Retour en haut ↑', cart: 'Panier', yourCart: 'Votre panier', demoNotice: 'Mode démo · aucune commande ni paiement réel.', all: 'Toutes les saveurs', citrus: 'Les agrumes', red: 'Les fruits rouges', tropical: 'Les exotiques', search: 'Rechercher une saveur…', inStock: 'En stock · démo', concentrate: 'CONCENTRÉ DE FRUITS', add: 'Ajouter', best: 'Le favori', new: 'À découvrir', currency: 'UM', unit: '/ bouteille', priceNote: 'UM = unité monétaire provisoire. Devise à confirmer.', noResults: 'Aucune saveur trouvée. Essayez une autre recherche.', size: 'Choisissez votre format', quantity: 'Quantité', addToCart: 'Ajouter au panier', added: 'Ajouté au panier', detailNote: 'Produit illustratif. Composition, dilution et stock à confirmer. Prix en unités monétaires provisoires (UM).', emptyTitle: 'Votre panier attend du soleil.', emptyText: 'Et si vous commenciez par votre saveur préférée ?', continueShopping: 'Découvrir les produits', remove: 'Retirer', subtotal: 'Sous-total', delivery: 'Livraison', deliveryPending: 'À confirmer', total: 'Total des produits', checkout: 'Continuer vers la commande', checkoutTitle: 'Votre commande, tout simplement.', checkoutDescription: 'Explorez le parcours de commande. Vos informations restent dans cette page : rien ne sera envoyé.', name: 'Nom complet', email: 'Adresse e-mail', phone: 'Téléphone', address: 'Adresse de livraison', city: 'Ville', payment: 'Mode de paiement envisagé', cash: 'Paiement à la livraison · démo', paymentNote: 'Options de paiement et zones de livraison à valider avec le fabricant. Aucun paiement n’est proposé ici.', placeOrder: 'Simuler la commande', orderSuccess: 'Votre parcours est terminé !', orderSuccessText: 'Cette commande de démonstration n’a pas été transmise. Aucun paiement n’a été effectué. Votre panier a été vidé pour recommencer le test.', close: 'Fermer', wholesaleFormTitle: 'Grandes quantités, belles possibilités.', wholesaleFormDescription: 'Dites-nous ce dont vous avez besoin. Ce formulaire est une démonstration et n’envoie pas de demande.', company: 'Entreprise / établissement', businessType: 'Votre activité', cafe: 'Café ou restaurant', shop: 'Commerce', distributor: 'Distribution', other: 'Autre', message: 'Produits et quantités souhaités', messagePlaceholder: 'Ex. : 20 cartons de concentré orange, format 1 L…', sendInquiry: 'Simuler la demande de devis', privacyNote: 'Démo uniquement. Les informations ne sont ni envoyées ni enregistrées. Vous pourrez tester sans utiliser de données personnelles réelles.', inquirySuccess: 'Votre demande est prête.', inquirySuccessText: 'Le parcours de demande de devis a été testé. Aucune information n’a été transmise. Nous connecterons ce formulaire au fabricant après validation du design.', bottle: 'Bouteille', format: 'Format', searchLabel: 'Rechercher', languageLabel: 'Passer en arabe', catalogLabel: 'Catégories de produits', maxQuantity: 'La limite de démonstration est de 99 bouteilles par format.', orderSummary: 'Récapitulatif', backCart: 'Retour au panier', decrease: 'Diminuer la quantité', increase: 'Augmenter la quantité', viewProduct: 'Voir le produit', dismiss: 'Fermer la notification'
  },
  ar: {
    announcement: 'قليل من المركّز. كثير من السعادة.', prototype: 'نموذج تجريبي · منتجات وأسعار توضيحية', brandSub: 'الفاكهة، بكل بساطة.', home: 'الرئيسية', products: 'منتجاتنا', productsShort: 'المنتجات', story: 'عالمنا', professionals: 'للشركات ↖', professionalsShort: 'للشركات', heroEyebrow: 'فاكهة. مذاق. سعادة.', heroTitle: 'السعادة أحلى<br>حين <span>نتشاركها.</span>', heroDescription: 'نكهاتكم المفضّلة، في صورة مركّزة. لمسة من الفاكهة تمنح كل لحظاتكم مذاقاً مميزاً.', discover: 'اكتشف نكهاتنا', heroNote: 'نكهة لكل مزاج.', artCaption: 'خفّف بالماء.<br>استمتع بالمذاق.<br>شارك السعادة.', sticker: 'عبوة صغيرة.<br>متعة كبيرة.', illustration: 'رسوم توضيحية للمنتجات · صور مؤقتة', benefit1: 'نكهات مليئة بالحياة', benefit2: 'حضّرها على ذوقك', benefit3: 'للحظات الصغيرة والكبيرة', collectionEyebrow: 'اكتشف ما يسعدك', collectionTitle: 'ما هي <em>نكهتك المفضّلة؟</em>', collectionDescription: 'نكهات مألوفة نحبّها.<br>واكتشافات ترسم الابتسامة.', catalogNote: 'كتالوج تجريبي. الأحجام والتوفّر والأسعار بانتظار تأكيد المصنع.', ritualLabel: 'استراحتك<br>بنكهة الفاكهة.', ritualEyebrow: 'ببساطة لحظة جميلة', ritualTitle: 'خطوة صغيرة.<br><em>مذاق كبير.</em>', ritualDescription: 'إبريق للمشاركة، استراحة تستحقها، أو مائدة تجمع الأصدقاء. أفسح المجال لنكهتك المفضّلة.', step1: 'اسكب', step1text: 'المركّز المفضّل لديك.', step2: 'خفّف', step2text: 'حسب إرشادات المنتج.', step3: 'استمتع', step3text: 'بارداً، ومع من تحب.', wholesaleEyebrow: 'معاً، نصنع فرصاً أجمل', wholesaleTitle: 'شريك يلبي احتياجاتك.', wholesaleDescription: 'للمقاهي والمطاعم والمتاجر والموزّعين: لنتحدث عن احتياجاتكم من الكميات الكبيرة.', contact: 'اطلب عرض أسعار', footer: 'لمسة فاكهة في يومك.', footerNote: 'نموذج لتجربة المستخدم · لا توجد طلبات حقيقية', backTop: 'العودة للأعلى ↑', cart: 'السلة', yourCart: 'سلة مشترياتك', demoNotice: 'وضع تجريبي · لا توجد طلبات أو مدفوعات حقيقية.', all: 'كل النكهات', citrus: 'الحمضيات', red: 'الفواكه الحمراء', tropical: 'الاستوائية', search: 'ابحث عن نكهة…', inStock: 'متوفر · تجريبي', concentrate: 'مركّز فواكه', add: 'أضف', best: 'المفضّل', new: 'اكتشفه', currency: 'و.ن.', unit: '/ عبوة', priceNote: 'و.ن. = وحدة نقدية مؤقتة. العملة بانتظار التأكيد.', noResults: 'لم نجد هذه النكهة. جرّب البحث بكلمة أخرى.', size: 'اختر حجم العبوة', quantity: 'الكمية', addToCart: 'أضف إلى السلة', added: 'تمت الإضافة إلى السلة', detailNote: 'منتج توضيحي. المكونات ونسبة التخفيف والمخزون بانتظار التأكيد. الأسعار بوحدات نقدية مؤقتة.', emptyTitle: 'سلتك تنتظر نكهة السعادة.', emptyText: 'ما رأيك أن تبدأ بنكهتك المفضّلة؟', continueShopping: 'اكتشف المنتجات', remove: 'إزالة', subtotal: 'المجموع الفرعي', delivery: 'التوصيل', deliveryPending: 'بانتظار التأكيد', total: 'إجمالي المنتجات', checkout: 'متابعة الطلب', checkoutTitle: 'طلبك، بكل بساطة.', checkoutDescription: 'جرّب خطوات الطلب. تبقى المعلومات في هذه الصفحة ولا يتم إرسالها.', name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الهاتف', address: 'عنوان التوصيل', city: 'المدينة', payment: 'طريقة الدفع المقترحة', cash: 'الدفع عند الاستلام · تجريبي', paymentNote: 'خيارات الدفع ومناطق التوصيل بانتظار تأكيد المصنع. لا يتوفر دفع حقيقي هنا.', placeOrder: 'محاكاة الطلب', orderSuccess: 'اكتملت التجربة!', orderSuccessText: 'لم يتم إرسال هذا الطلب التجريبي، ولم يتم إجراء أي دفع. تم إفراغ السلة لتتمكن من تجربة الطلب مجدداً.', close: 'إغلاق', wholesaleFormTitle: 'كميات كبيرة، فرص جميلة.', wholesaleFormDescription: 'أخبرنا بما تحتاجه. هذا النموذج تجريبي ولا يرسل أي طلب.', company: 'الشركة / المؤسسة', businessType: 'نوع النشاط', cafe: 'مقهى أو مطعم', shop: 'متجر', distributor: 'توزيع', other: 'غير ذلك', message: 'المنتجات والكميات المطلوبة', messagePlaceholder: 'مثال: ٢٠ صندوقاً من مركّز البرتقال، حجم ١ لتر…', sendInquiry: 'محاكاة طلب عرض الأسعار', privacyNote: 'للتجربة فقط. لا يتم إرسال المعلومات أو حفظها. يمكنك استخدام بيانات غير حقيقية للاختبار.', inquirySuccess: 'طلبك أصبح جاهزاً.', inquirySuccessText: 'تم اختبار مسار طلب عرض الأسعار. لم يتم إرسال أي معلومات. سنربط هذا النموذج بالمصنع بعد اعتماد التصميم.', bottle: 'عبوة', format: 'الحجم', searchLabel: 'بحث', languageLabel: 'Passer en français', catalogLabel: 'فئات المنتجات', maxQuantity: 'الحد التجريبي هو ٩٩ عبوة لكل حجم.', orderSummary: 'ملخّص الطلب', backCart: 'العودة إلى السلة', decrease: 'تقليل الكمية', increase: 'زيادة الكمية', viewProduct: 'عرض المنتج', dismiss: 'إغلاق التنبيه'
  }
};
Object.assign(translations.fr, {
  languageLabel: 'Langue', announcement: 'El Jawhara & Perla — le goût de toutes vos créations.',
  prototype: 'Prototype · prix de démonstration',
  heroEyebrow: 'EL JAWHARA & PERLA',
  heroTitle: 'Le meilleur goût <br>de <span>la nature.</span>',
  heroDescription: 'Des jus concentrés à partager. Des arômes et des couleurs pour créer. Découvrez les saveurs de notre univers.',
  discover: 'Explorer le catalogue', heroNote: 'Deux marques. Tout un monde de saveurs.',
  sticker: 'Le goût de<br>vos envies.', illustration: 'Photographies des produits du fabricant',
  benefit1: 'Jus concentrés El Jawhara', benefit2: 'Arômes alimentaires Perla', benefit3: 'Colorants pour vos créations',
  collectionEyebrow: 'LE CATALOGUE EL JAWHARA & PERLA', collectionTitle: 'À chaque envie, <em>sa saveur.</em>',
  collectionDescription: 'Jus concentrés, arômes et colorants.<br>Tout un univers à explorer.',
  all: 'Tous les produits', juice: 'Jus concentrés', aroma: 'Arômes alimentaires', colorant: 'Colorants alimentaires',
  search: 'Rechercher un produit…', noResults: 'Aucun produit trouvé. Essayez un autre nom ou une autre catégorie.',
  productCount: 'produits', loadMore: 'Voir plus de produits', demoPrices: 'Prix de démonstration · UM', demoPrice: 'Prix démo',
  inStock: 'Stock à confirmer', catalogNote: 'Photos réelles. Prix et stocks à confirmer. Les volumes Perla ne sont pas lisibles sur les photos.',
  size: 'Format du produit', unknownVolume: 'Bouteille · volume à confirmer',
  detailNote: 'Photo réelle du produit. Prix de démonstration uniquement ; stock, ingrédients et tarifs à confirmer avec le fabricant.',
  labelCaption: 'Désignation visible sur l’étiquette', labelPhoto: 'Voir l’étiquette en grand',
  juiceUsage: 'Pour vos boissons, selon les indications du produit.', aromaUsage: 'Des saveurs pour vos créations gourmandes.', colorantUsage: 'Une palette de couleurs pour vos préparations.',
  usage: 'Utilisation', usageNote: 'Dosage et consignes à confirmer sur l’étiquette complète avant utilisation.',
  ritualEyebrow: 'L’UNIVERS DE LA MARQUE', ritualTitle: 'Des saveurs à boire.<br><em>Des idées à créer.</em>',
  ritualDescription: 'Des boissons aux créations gourmandes, retrouvez les gammes El Jawhara et Perla.',
  footer: 'Le meilleur goût de la nature.',
  messagePlaceholder: 'Ex. : 20 bouteilles de jus concentré citron, 10 arômes vanille…',
  priceNote: 'Prix de démonstration, pas les tarifs du fabricant. UM = unité monétaire provisoire.'
});
Object.assign(translations.ar, {
  languageLabel: 'اللغة', announcement: 'الجوهرة وبيرلا — مذاق لكل إبداعاتكم.', prototype: 'نموذج تجريبي · أسعار توضيحية',
  heroEyebrow: 'الجوهرة وبيرلا', heroTitle: 'أطيب مذاق <br>من <span>الطبيعة.</span>',
  heroDescription: 'عصائر مركّزة للمشاركة. ونكهات وألوان للإبداع. اكتشف مذاقات عالمنا.',
  discover: 'استكشف المنتجات', heroNote: 'علامتان. عالم من النكهات.', sticker: 'المذاق الذي<br>يلهمك.', illustration: 'صور منتجات المصنع',
  benefit1: 'عصائر الجوهرة المركّزة', benefit2: 'منكّهات بيرلا الغذائية', benefit3: 'ملوّنات لإبداعاتك',
  collectionEyebrow: 'منتجات الجوهرة وبيرلا', collectionTitle: 'لكل رغبة، <em>نكهتها.</em>',
  collectionDescription: 'عصائر مركّزة ومنكّهات وملوّنات.<br>عالم يستحق الاكتشاف.',
  all: 'كل المنتجات', juice: 'عصائر مركّزة', aroma: 'منكّهات غذائية', colorant: 'ملوّنات غذائية',
  search: 'ابحث عن منتج…', noResults: 'لم نجد منتجات. جرّب اسماً آخر أو فئة أخرى.',
  productCount: 'منتج', loadMore: 'عرض المزيد من المنتجات', demoPrices: 'أسعار توضيحية · و.ن.', demoPrice: 'سعر تجريبي',
  inStock: 'المخزون غير مؤكّد', catalogNote: 'صور حقيقية. الأسعار والمخزون بانتظار التأكيد. أحجام عبوات بيرلا غير مقروءة في الصور.',
  size: 'حجم العبوة', unknownVolume: 'عبوة · الحجم غير مؤكّد',
  detailNote: 'صورة حقيقية للمنتج. السعر للتجربة فقط؛ المخزون والمكونات والأسعار بانتظار تأكيد المصنع.',
  labelCaption: 'التسمية الظاهرة على الملصق', labelPhoto: 'عرض الملصق بحجم أكبر',
  juiceUsage: 'لتحضير المشروبات وفق إرشادات المنتج.', aromaUsage: 'نكهات لإبداعاتك اللذيذة.', colorantUsage: 'مجموعة ألوان لتحضيراتك.',
  usage: 'الاستخدام', usageNote: 'يجب التأكد من المقادير والإرشادات على الملصق الكامل قبل الاستخدام.',
  ritualEyebrow: 'عالم العلامة', ritualTitle: 'نكهات للشرب.<br><em>وأفكار للإبداع.</em>',
  ritualDescription: 'من المشروبات إلى الحلويات، اكتشف مجموعتي الجوهرة وبيرلا.', footer: 'أطيب مذاق من الطبيعة.',
  messagePlaceholder: 'مثال: ٢٠ عبوة عصير ليمون مركّز، ١٠ عبوات منكّه فانيليا…',
  priceNote: 'أسعار تجريبية وليست أسعار المصنع. و.ن. = وحدة نقدية مؤقتة.'
});
Object.assign(translations.fr, {
  currency: 'DT', prototype: 'Prototype · références Géant Drive',
  syrup: 'Sirops gourmands', water: 'Eaux florales', details: 'Détails', pendingPrice: 'Prix à confirmer',
  demoPrices: 'Références Géant Drive · DT', demoPrice: 'Réf. Géant Drive',
  retailerSource: 'Prix de référence Géant Drive', checkedOn: 'Relevé le 02/11/2026', retailerLink: 'Voir la fiche source',
  retailDisclaimer: 'Prix public du revendeur, non garanti par le fabricant. Le tarif de vente et la disponibilité restent à valider.',
  alternatePrices: 'Plusieurs fiches Géant indiquent des tarifs différents pour ce format :',
  detailNote: 'Les prix Géant sont des références de revendeur, pas les tarifs de vente du fabricant.',
  priceNote: 'Total indicatif basé sur les références Géant Drive, en dinars tunisiens (DT). Aucun achat réel.',
  total: 'Total indicatif', catalogNote: 'Prix et volumes issus des fiches Géant Drive quand disponibles. Stocks et tarifs fabricant à confirmer.',
  labelCaption: 'Description du produit', collectionDescription: 'Concentrés, arômes, colorants, sirops, eaux florales et vinaigres.<br> Tout un univers à explorer.',
  unknownPriceNotice: 'Le prix de ce produit reste à confirmer. Vous pouvez demander un devis.',
  photoPending: 'Photo à venir', productCode: 'Réf.', vinegar: 'Vinaigres', morePhotos: 'Autres vues', photoOfSize: 'Photo : format {size}',
  heroAromas: 'Arômes & colorants', heroFamilies: 'Nos familles de produits', brandEJ: 'El Jawhara', brandPerla: 'Perla',
  reassure1: 'Livraison dans les 24 gouvernorats', reassure1Text: 'Partout en Tunisie, à domicile.',
  reassure2: 'Paiement à la livraison', reassure2Text: 'Réglez en espèces à la réception.',
  reassure3: 'Paiement sécurisé', reassure3Text: 'Carte bancaire ou e-DINAR.',
  reassure4: 'Tarifs professionnels', reassure4Text: 'Cafés, commerces, distributeurs.',
  footerContact: 'Contact', footerInfo: 'Informations', footerPayment: 'Moyens de paiement', footerFollow: 'Suivez-nous',
  footerPhone: 'Téléphone / WhatsApp', footerAddress: 'Adresse à compléter', cgv: 'Conditions générales de vente', privacy: 'Politique de confidentialité',
  deliveryInfo: 'Livraison & retours', legalPending: 'Cette page sera bientôt disponible.',
  payCashShort: 'Espèces à la livraison', payCardShort: 'Carte · e-DINAR', payTransferShort: 'Virement (pros)'
});
Object.assign(translations.ar, {
  currency: 'د.ت.', prototype: 'نموذج تجريبي · مراجع جيان درايف',
  syrup: 'شراب للحلويات', water: 'مياه زهرية', details: 'التفاصيل', pendingPrice: 'السعر غير مؤكّد',
  demoPrices: 'مراجع جيان درايف · د.ت.', demoPrice: 'مرجع جيان درايف',
  retailerSource: 'سعر مرجعي من جيان درايف', checkedOn: 'تم الاطلاع في ٠٢/١١/٢٠٢٦', retailerLink: 'عرض المصدر',
  retailDisclaimer: 'سعر بيع لدى الموزّع وليس سعراً مضموناً من المصنع. سعر البيع والتوفّر بانتظار التأكيد.',
  alternatePrices: 'توجد أسعار مختلفة لهذا الحجم في عدة صفحات لدى جيان:',
  detailNote: 'أسعار جيان مرجع من الموزّع وليست أسعار بيع المصنع.',
  priceNote: 'إجمالي تقديري حسب أسعار جيان درايف بالدينار التونسي. لا يوجد شراء حقيقي.',
  total: 'الإجمالي التقديري', catalogNote: 'الأسعار والأحجام من صفحات جيان درايف عند توفّرها. المخزون وأسعار المصنع بانتظار التأكيد.',
  labelCaption: 'وصف المنتج', collectionDescription: 'مركّزات ومنكّهات وملوّنات وشراب ومياه زهرية وخلّ.<br> عالم يستحق الاكتشاف.',
  unknownPriceNotice: 'سعر هذا المنتج بانتظار التأكيد. يمكنك طلب عرض أسعار.',
  photoPending: 'الصورة قريباً', productCode: 'المرجع', vinegar: 'خلّ', morePhotos: 'صور أخرى', photoOfSize: 'الصورة: عبوة {size}',
  heroAromas: 'منكّهات وملوّنات', heroFamilies: 'عائلات منتجاتنا', brandEJ: 'الجوهرة', brandPerla: 'بيرلا',
  reassure1: 'التوصيل إلى ٢٤ ولاية', reassure1Text: 'إلى المنزل في كامل أنحاء تونس.',
  reassure2: 'الدفع عند الاستلام', reassure2Text: 'ادفع نقداً عند وصول طلبك.',
  reassure3: 'دفع آمن', reassure3Text: 'بطاقة بنكية أو e-DINAR.',
  reassure4: 'أسعار للمهنيين', reassure4Text: 'للمقاهي والمتاجر والموزّعين.',
  footerContact: 'اتصل بنا', footerInfo: 'معلومات', footerPayment: 'طرق الدفع', footerFollow: 'تابعونا',
  footerPhone: 'الهاتف / واتساب', footerAddress: 'العنوان (يُضاف لاحقاً)', cgv: 'الشروط العامة للبيع', privacy: 'سياسة الخصوصية',
  deliveryInfo: 'التوصيل والإرجاع', legalPending: 'ستتوفّر هذه الصفحة قريباً.',
  payCashShort: 'نقداً عند الاستلام', payCardShort: 'بطاقة · e-DINAR', payTransferShort: 'تحويل بنكي (للمهنيين)'
});
Object.assign(translations.en, englishText);
let storedLanguage;
try { storedLanguage = localStorage.getItem('jawhara-language'); } catch {}
const languages = ['fr', 'en', 'ar'];
let language = languages.includes(storedLanguage) ? storedLanguage : 'fr';
const locale = () => ({ fr: 'fr-TN', en: 'en-GB', ar: 'ar-TN' })[language];
const pick = labels => labels[language] || labels.fr;
let category = 'all';
let visibleLimit = 12;
let cart = [];
let selectedProduct = null;
let selectedSize = null;
let selectedQuantity = 1;
let selectedPhoto = 0;
let maxQuantity = 99;
const maxQty = variant => variant && variant.stockLeft ? Math.min(maxQuantity, variant.stockLeft) : maxQuantity;
const priceCaption = variant => variant.price === null ? '' : `<span class="demo-price-caption">${t(variant.businessPrice ? 'proPrice' : variant.priceConfirmed ? 'officialPrice' : 'demoPrice')}</span>`;
const stockText = variant => variant.inStock === false ? t('outOfStock') : variant.stockLeft ? t('stockLeft').replace('{n}', formatNumber(variant.stockLeft)) : t('inStock');
let formMode = null;
let toastTimer;
const t = key => translations[language][key] || translations.fr[key] || key;
const byId = id => document.getElementById(id);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const formatNumber = number => new Intl.NumberFormat(language === 'ar' ? 'ar' : language, { maximumFractionDigits: 2 }).format(number);
const money = number => number === null ? `<span class="price-pending">${t('pendingPrice')}</span>` : `${new Intl.NumberFormat(locale(), { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(number)} <small>${t('currency')}</small>`;
const packagingLabels = { verre: { fr: 'verre', en: 'glass', ar: 'زجاج' }, plastique: { fr: 'plastique', en: 'plastic', ar: 'بلاستيك' }, droite: { fr: 'droite', en: 'straight', ar: 'مستقيمة' }, ronde: { fr: 'ronde', en: 'round', ar: 'مستديرة' } };
const formatSize = (size, material) => {
  if (size === 'bottle') return t('unknownVolume');
  const [amount, unit, packaging] = size.split(' ');
  const volume = language === 'ar' ? `${formatNumber(parseFloat(amount))} ${unit === 'ml' ? 'مل' : 'لتر'}` : `${amount} ${unit}`;
  return [volume, ...new Set([packaging, material].filter(item => item && packagingLabels[item]))].map((item, index) => index ? pick(packagingLabels[item]) : item).join(' · ');
};
const formatVariant = (product, size) => formatSize(size, (product.variants.find(variant => variant.size === size) || {}).material);
const productCode = variant => variant.codes && variant.codes.length && !variant.codesToConfirm ? `<p class="product-code">${t('productCode')} <bdi>${variant.codes.join(' / ')}</bdi></p>` : '';
const variantFor = (product, size = product.sizes[0]) => product.variants.find(variant => variant.size === size);
const unitPrice = (product, size = product.sizes[0]) => variantFor(product, size).price;
const productById = id => products.find(product => product.id === id);
function productPhoto(product, image = product.image, decorative = false, eager = false) {
  if (!image) return `<span class="photo-pending"${decorative ? ' aria-hidden="true"' : ''}><strong>${product.brand}</strong>${t('photoPending')}</span>`;
  return `<img class="product-photo" src="${image}" alt="${decorative ? '' : escapeHTML(`${product.brand} — ${pick(product.name)}`)}" width="540" height="1000" loading="${eager ? 'eager' : 'lazy'}" decoding="async">`;
}
function renderFilters() {
  byId('filters').innerHTML = ['all', ...categoryOrder].map(key => `<button class="filter ${category === key ? 'active' : ''}" data-category="${key}" aria-pressed="${category === key}">${t(key)}<span class="filter-count">${formatNumber(catalogEntries().filter(entry => key === 'all' || entry.product.category === key).length)}</span></button>`).join('');
  byId('filters').setAttribute('aria-label', t('catalogLabel'));
}
// One card per product and size: categories in shop order, then plastic before glass, then catalog order and volume.
const categoryOrder = ['juice', 'syrup', 'aroma', 'colorant', 'water', 'vinegar'].filter(key => categoryLabels[key]).concat(Object.keys(categoryLabels).filter(key => !['juice', 'syrup', 'aroma', 'colorant', 'water', 'vinegar'].includes(key)));
const materialOrder = ['plastique', 'verre'];
const entryVolume = size => size === 'bottle' ? 0 : parseFloat(size) * (/\bL\b/.test(size) ? 1000 : 1);
function catalogEntries() {
  const rank = (list, value) => list.includes(value) ? list.indexOf(value) : list.length;
  return products.flatMap((product, index) => product.variants.map(variant => ({ product, variant, index })))
    .sort((a, b) => rank(categoryOrder, a.product.category) - rank(categoryOrder, b.product.category) || rank(materialOrder, a.variant.material) - rank(materialOrder, b.variant.material) || a.index - b.index || entryVolume(a.variant.size) - entryVolume(b.variant.size));
}
function renderProducts() {
  const query = byId('search').value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const filtered = catalogEntries().filter(({ product, variant }) => (category === 'all' || category === product.category) && `${product.name.fr} ${product.name.ar} ${product.brand} ${categoryLabels[product.category].fr} ${categoryLabels[product.category].ar} ${product.description.fr} ${product.description.ar} ${(variant.codes || []).join(' ')} ${formatVariant(product, variant.size)}`.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query));
  byId('results-count').textContent = `${formatNumber(filtered.length)} ${t('productCount')}`;
  byId('product-grid').innerHTML = filtered.length ? filtered.slice(0, visibleLimit).map(({ product, variant }) => {
    const key = escapeHTML(`${product.id}|${variant.size}`);
    const label = `${pick(categoryLabels[product.category])} — ${pick(product.name)} · ${variant.size === 'bottle' ? t('bottle') : formatVariant(product, variant.size)}`;
    return `<article class="product-card" style="--tint:${product.tint}">
    <button class="product-image-button" data-variant="${key}" aria-label="${t('viewProduct')} : ${label}"><span class="product-badge">${product.brand}</span>${productPhoto(product, variant.image, true)}<span class="product-view-indicator" aria-hidden="true">↗</span></button>
    <div class="product-info"><div class="product-meta"><span>${pick(categoryLabels[product.category])}</span></div><button class="product-name" data-variant="${key}">${pick(product.name)}</button><span class="product-size">${variant.size === 'bottle' ? t('bottle') : formatVariant(product, variant.size)}</span><div class="product-bottom"><span class="price">${money(variant.price)}${priceCaption(variant)}</span>${variant.inStock === false && variant.price !== null ? `<button class="add-button" disabled>${t('outOfStock')}</button>` : `<button class="add-button" ${variant.price === null ? 'data-variant' : 'data-add-variant'}="${key}" aria-label="${variant.price === null ? t('viewProduct') : t('addToCart')} : ${label}">${variant.price === null ? '' : icon('plus')}${t(variant.price === null ? 'details' : 'add')}</button>`}</div></div>
    </article>`;
  }).join('') : `<div class="empty-results">${t('noResults')}</div>`;
  let more = byId('catalog-more');
  if (!more) { more = document.createElement('div'); more.id = 'catalog-more'; byId('product-grid').after(more); }
  more.innerHTML = filtered.length > visibleLimit ? `<button class="button load-more" data-action="load-more">${t('loadMore')}<span>+ ${formatNumber(filtered.length - visibleLimit)}</span></button>` : '';
}
function setLanguage(next) {
  language = next;
  try { localStorage.setItem('jawhara-language', language); } catch {}
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  document.title = { fr: 'El Jawhara & Perla — Le meilleur goût de la nature', en: 'El Jawhara & Perla — Nature’s best taste', ar: 'الجوهرة وبيرلا — أطيب مذاق من الطبيعة' }[language];
  document.querySelectorAll('[data-i18n]').forEach(element => { element.innerHTML = t(element.dataset.i18n); });
  byId('language').setAttribute('aria-label', t('languageLabel'));
  byId('language').querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', button.dataset.lang === language));
  byId('search').placeholder = t('search');
  byId('search').setAttribute('aria-label', t('searchLabel'));
  byId('search-toggle').setAttribute('aria-label', t('searchLabel'));
  document.querySelectorAll('[data-action="cart"]').forEach(element => element.setAttribute('aria-label', t('yourCart')));
  document.querySelectorAll('[data-close]').forEach(element => element.setAttribute('aria-label', t('close')));
  document.querySelectorAll('[data-i18n-label]').forEach(element => element.setAttribute('aria-label', t(element.dataset.i18nLabel)));
  renderFilters();
  renderProducts();
  renderCart();
  if (selectedProduct && byId('product-dialog').open) renderDetail();
  if (formMode && byId('form-dialog').open) renderForm(formMode);
}
function openDialog(id) {
  const dialog = byId(id);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
}
function closeDialog(id) { byId(id).close(); }
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (dialog.id === 'form-dialog') formMode = null;
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
});
function toast(message) {
  clearTimeout(toastTimer);
  byId('toast').textContent = message;
  byId('toast').classList.add('visible');
  toastTimer = setTimeout(() => byId('toast').classList.remove('visible'), 3000);
}
function addToCart(id, size = productById(id).sizes[0], quantity = 1) {
  const variant = variantFor(productById(id), size);
  if (variant.price === null) { toast(t('unknownPriceNotice')); return; }
  if (variant.inStock === false) { toast(t('outOfStock')); return; }
  const existing = cart.find(item => item.id === id && item.size === size);
  const totalQuantity = (existing ? existing.quantity : 0) + quantity;
  if (totalQuantity > maxQty(variant)) { toast(t('maxQuantity')); return; }
  if (existing) existing.quantity = totalQuantity;
  else cart.push({ id, size, quantity });
  renderCart();
  toast(`${pick(categoryLabels[productById(id).category])} — ${pick(productById(id).name)} · ${t('added')}`);
}
function quantityControls(quantity, context, key = '', max = 99) {
  return `<div class="quantity-control"><button data-quantity="${context}" data-key="${key}" data-delta="-1" aria-label="${t('decrease')}" ${quantity <= 1 ? 'disabled' : ''}>−</button><span aria-live="polite">${formatNumber(quantity)}</span><button data-quantity="${context}" data-key="${key}" data-delta="1" aria-label="${t('increase')}" ${quantity >= max ? 'disabled' : ''}>+</button></div>`;
}
function showProduct(id, size) {
  selectedProduct = productById(id);
  selectedSize = size && selectedProduct.sizes.includes(size) ? size : selectedProduct.sizes[0]; selectedQuantity = 1; selectedPhoto = 0;
  renderDetail(); openDialog('product-dialog');
}
function renderDetail() {
  const product = selectedProduct;
  const variant = variantFor(product, selectedSize);
  byId('product-dialog').setAttribute('aria-label', `${product.brand} — ${pick(categoryLabels[product.category])} — ${pick(product.name)}`);
  byId('product-detail').innerHTML = `<div class="product-detail-layout"><div class="detail-art" style="--tint:${product.tint}">${productPhoto(product, variant.gallery[selectedPhoto] || variant.image, false, true)}${variant.gallery.length > 1 ? `<div class="detail-gallery" role="group" aria-label="${t('morePhotos')}">${variant.gallery.map((image, index) => `<button class="gallery-thumb ${index === selectedPhoto ? 'active' : ''}" data-photo="${index}" aria-pressed="${index === selectedPhoto}" aria-label="${t('morePhotos')} ${formatNumber(index + 1)}"><img src="${image}" alt="" width="540" height="1000"></button>`).join('')}</div>` : ''}</div><div class="detail-copy"><div class="eyebrow">${product.brand} · ${pick(categoryLabels[product.category])}</div><h2>${pick(product.name)}</h2><span class="label-caption">${t('labelCaption')}</span><p>${pick(product.description)}</p><span class="field-label">${t('size')}</span><p class="detail-size">${selectedSize === 'bottle' ? t('bottle') : formatVariant(product, selectedSize)}</p><p class="stock-pending">${stockText(variant)}</p>${productCode(variant)}<div class="detail-purchase"><span class="price">${money(variant.price)}${priceCaption(variant)}</span>${variant.price !== null && variant.inStock !== false ? quantityControls(selectedQuantity, 'detail', '', maxQty(variant)) : ''}</div>${variant.price !== null && variant.inStock === false ? `<button class="button primary full-width" disabled>${t('outOfStock')}</button>` : `<button class="button primary full-width" data-action="${variant.price === null ? 'product-quote' : 'detail-add'}">${t(variant.price === null ? 'contact' : 'addToCart')}${icon('plus')}</button>`}${variant.references.length ? `<div class="retailer-reference"><strong>${t('retailerSource')}</strong><span>${t('checkedOn')}</span>${new Set(variant.references.map(reference => reference.price)).size > 1 ? `<p>${t('alternatePrices')}</p>` : ''}${variant.references.map(reference => `<a href="${reference.url}" target="_blank" rel="noopener">${t('retailerLink')} · ${money(reference.price)} ↗</a>`).join('')}<p>${t('retailDisclaimer')}</p></div>` : ''}<p class="detail-note">${t('detailNote')}</p><p class="detail-note">${t('usageNote')}</p></div></div>`;
}
function cartTotal() { return cart.reduce((total, item) => total + Math.round(unitPrice(productById(item.id), item.size) * 1000) * item.quantity, 0) / 1000; }
function renderCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  try { localStorage.setItem('jawhara-cart', JSON.stringify(cart)); } catch {}
  byId('cart-count').textContent = formatNumber(count);
  byId('mobile-count').textContent = formatNumber(count);
  if (!cart.length) {
    byId('cart-content').innerHTML = `<div class="cart-empty">${icon('bag')}<h3>${t('emptyTitle')}</h3><p>${t('emptyText')}</p><button class="button primary" data-action="continue-shopping">${t('continueShopping')}<span>↗</span></button></div>`;
    return;
  }
  byId('cart-content').innerHTML = cart.map((item, index) => {
    const product = productById(item.id);
    return `<div class="cart-item"><div class="cart-thumb" style="--tint:${product.tint}">${productPhoto(product, variantFor(product, item.size).image, true, true)}</div><div class="cart-item-content"><h3>${pick(product.name)}</h3><p>${pick(categoryLabels[product.category])} · ${formatVariant(product, item.size)}</p>${quantityControls(item.quantity, 'cart', index, maxQty(variantFor(product, item.size)))}</div><div class="cart-item-side"><strong>${money(unitPrice(product, item.size) * item.quantity)}</strong><button class="remove-item" data-remove="${index}" aria-label="${t('remove')} : ${pick(categoryLabels[product.category])} — ${pick(product.name)}">${t('remove')}</button></div></div>`;
  }).join('') + `<div class="cart-summary"><div class="summary-row"><span>${t('subtotal')}</span><strong>${money(cartTotal())}</strong></div><div class="summary-row"><span>${t('delivery')}</span><span>${t('deliveryPending')}</span></div><div class="summary-row summary-total"><span>${t('total')}</span><span>${money(cartTotal())}</span></div><p>${t('priceNote')}</p><button class="button primary full-width" data-action="checkout">${t('checkout')}<span>↗</span></button></div>`;
}
function showForm(mode) { formMode = mode; renderForm(mode); openDialog('form-dialog'); }
function inputField(key, type = 'text', autocomplete = '') {
  return `<label>${t(key)}<input name="${key}" type="${type}" required maxlength="${key === 'address' ? 250 : 100}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${type === 'tel' ? 'inputmode="tel"' : ''}></label>`;
}
function renderForm(mode) {
  const isWholesale = mode === 'wholesale';
  byId('form-dialog').setAttribute('aria-label', t(isWholesale ? 'wholesaleFormTitle' : 'checkoutTitle'));
  byId('form-content').innerHTML = `<div class="form-wrapper"><div class="eyebrow">${t(isWholesale ? 'professionalsShort' : 'checkout')}</div><h2>${t(isWholesale ? 'wholesaleFormTitle' : 'checkoutTitle')}</h2><p>${t(isWholesale ? 'wholesaleFormDescription' : 'checkoutDescription')}</p><form class="prototype-form" id="prototype-form"><div class="form-row">${inputField('name', 'text', 'name')}${isWholesale ? inputField('company', 'text', 'organization') : inputField('phone', 'tel', 'tel')}</div>${inputField('email', 'email', 'email')}${isWholesale ? `<label>${t('businessType')}<select name="businessType">${['cafe', 'shop', 'distributor', 'other'].map(key => `<option value="${key}">${t(key)}</option>`).join('')}</select></label>${inputField('phone', 'tel', 'tel')}<label>${t('message')}<textarea name="message" required maxlength="2000" placeholder="${t('messagePlaceholder')}"></textarea></label>` : `${inputField('address', 'text', 'street-address')}${inputField('city', 'text', 'address-level2')}<label>${t('payment')}<select name="payment"><option>${t('cash')}</option></select></label><p class="form-note">${t('paymentNote')}</p><div class="summary-row summary-total"><span>${t('total')}</span><span>${money(cartTotal())}</span></div>`}<p class="form-note">${t('privacyNote')}</p><button type="submit" class="button primary full-width">${t(isWholesale ? 'sendInquiry' : 'placeOrder')}<span>↗</span></button>${!isWholesale ? `<button type="button" class="nav-link" data-action="back-cart">${t('backCart')}</button>` : ''}</form></div>`;
  byId('prototype-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (!isWholesale) { cart = []; renderCart(); }
    byId('form-content').innerHTML = `<div class="form-wrapper"><div class="success-state"><div class="success-icon">✓</div><h2>${t(isWholesale ? 'inquirySuccess' : 'orderSuccess')}</h2><p>${t(isWholesale ? 'inquirySuccessText' : 'orderSuccessText')}</p><button class="button primary" data-close="form-dialog">${t('close')}</button></div></div>`;
    byId('form-content').querySelector('button').focus();
  });
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  const data = button.dataset;
  if (data.close) { closeDialog(data.close); return; }
  if (data.category) {
    category = data.category; visibleLimit = 12; renderFilters(); renderProducts();
    const filter = byId('filters').querySelector(`[data-category="${category}"]`);
    if (button.classList.contains('family-tile')) { byId('collection').scrollIntoView({ behavior: 'smooth' }); filter?.focus({ preventScroll: true }); }
    else filter?.focus();
    return;
  }
  if (data.variant) { const [id, size] = data.variant.split('|'); showProduct(id, size); return; }
  if (data.addVariant) { const [id, size] = data.addVariant.split('|'); addToCart(id, size); return; }
  if (data.product) { showProduct(data.product); return; }
  if (data.add) { addToCart(data.add); return; }
  if (data.size) { selectedSize = data.size; selectedPhoto = 0; renderDetail(); byId('product-detail').querySelector(`[data-size="${selectedSize}"]`).focus(); return; }
  if (data.photo) { selectedPhoto = Number(data.photo); renderDetail(); byId('product-detail').querySelector(`[data-photo="${selectedPhoto}"]`).focus(); return; }
  if (data.quantity) {
    const delta = Number(data.delta);
    if (data.quantity === 'detail') { selectedQuantity = Math.min(maxQty(variantFor(selectedProduct, selectedSize)), Math.max(1, selectedQuantity + delta)); renderDetail(); }
    else { const item = cart[Number(data.key)]; item.quantity = Math.min(maxQty(variantFor(productById(item.id), item.size)), Math.max(1, item.quantity + delta)); renderCart(); }
    const container = data.quantity === 'detail' ? byId('product-detail') : byId('cart-content');
    const replacement = container.querySelector(`[data-quantity="${data.quantity}"][data-key="${data.key}"][data-delta="${data.delta}"]`);
    if (replacement && !replacement.disabled) replacement.focus();
    else container.querySelector(`[data-quantity="${data.quantity}"][data-key="${data.key}"]:not(:disabled)`)?.focus();
    return;
  }
  if (data.remove !== undefined) { cart.splice(Number(data.remove), 1); renderCart(); byId('cart-content').querySelector('button')?.focus(); return; }
  switch (data.action) {
    case 'load-more': { const previousCount = byId('product-grid').children.length; visibleLimit += 12; renderProducts(); byId('product-grid').children[previousCount]?.querySelector('button')?.focus({ preventScroll: true }); break; }
    case 'cart': renderCart(); openDialog('cart-dialog'); break;
    case 'wholesale': showForm('wholesale'); break;
    case 'detail-add': addToCart(selectedProduct.id, selectedSize, selectedQuantity); closeDialog('product-dialog'); break;
    case 'product-quote': closeDialog('product-dialog'); showForm('wholesale'); byId('prototype-form').querySelector('textarea').value = `${pick(categoryLabels[selectedProduct.category])} — ${pick(selectedProduct.name)} · ${formatVariant(selectedProduct, selectedSize)}${(variantFor(selectedProduct, selectedSize).codes || []).length ? ` (${variantFor(selectedProduct, selectedSize).codes.join(' / ')})` : ''}`; break;
    case 'continue-shopping': closeDialog('cart-dialog'); byId('collection').scrollIntoView({ behavior: 'smooth' }); break;
    case 'checkout': if (cart.length) { closeDialog('cart-dialog'); showForm('checkout'); } break;
    case 'back-cart': closeDialog('form-dialog'); openDialog('cart-dialog'); break;
    case 'legal': toast(t('legalPending')); break;
  }
});
byId('language').addEventListener('click', event => { const button = event.target.closest('[data-lang]'); if (button && button.dataset.lang !== language) setLanguage(button.dataset.lang); });
byId('search').addEventListener('input', () => { visibleLimit = 12; renderProducts(); });
byId('search-toggle').addEventListener('click', () => { byId('collection').scrollIntoView({ behavior: 'smooth' }); byId('search').focus({ preventScroll: true }); });
[
  ['search-toggle', 'search'], ['search-icon', 'search'], ['cart-icon', 'bag'], ['mobile-home', 'home'], ['mobile-products', 'grid'], ['mobile-business', 'business'], ['mobile-cart', 'bag'], ['account-button', 'user']
].forEach(([id, name]) => { if (icons[name]) byId(id).innerHTML = icon(name); });
document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); });
setLanguage(language);
