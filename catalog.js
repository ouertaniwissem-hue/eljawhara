// One entry per family + flavor/color. See CATALOG.md for source selection.
// Retailer references enrich matched products; unverified prices/volumes stay unknown.
const categoryLabels = {
  juice: { fr: 'Jus concentrés', ar: 'عصائر مركّزة' },
  aroma: { fr: 'Arômes alimentaires', ar: 'منكّهات غذائية' },
  colorant: { fr: 'Colorants alimentaires', ar: 'ملوّنات غذائية' },
  syrup: { fr: 'Sirops gourmands', ar: 'شراب للحلويات' },
  water: { fr: 'Eaux florales', ar: 'مياه زهرية' },
  vinegar: { fr: 'Vinaigres', ar: 'خلّ' }
};
const catalogRows = [
  ['juice', 'orange', 'Orange', 'برتقال', 'MAR-1087', 'Boisson concentrée à la pulpe d’orange', 'مشروب مركّز بعصير ولب البرتقال'],
  ['juice', 'citron', 'Citron', 'ليمون', 'MAR-1082', 'Boisson concentrée à la pulpe de citron', 'مشروب مركّز بلب الليمون'],
  ['juice', 'fraise', 'Fraise', 'فراولة', 'MAR-1079', 'Boisson concentrée au goût fraise', 'مشروب مركّز بنكهة الفراولة'],
  ['juice', 'cocktail', 'Cocktail de fruits', 'كوكتيل فواكه', 'MAR-1080', 'Boisson concentrée aux pulpes de fruits', 'مشروب مركّز بعصير ولب الفواكه'],
  ['juice', 'citron-amande', 'Citron & amande', 'ليمون ولوز', 'MAR-1096', 'Boisson concentrée à la pulpe de citron et goût d’amande', 'مشروب مركّز بلب الليمون ونكهة اللوز'],
  ['juice', 'menthe', 'Menthe', 'نعناع', 'MAR-1083', 'Boisson concentrée au goût menthe', 'مشروب مركّز بنكهة النعناع'],
  ['juice', 'mangue', 'Mangue', 'مانجو', 'MAR-1084', 'Boisson concentrée à la pulpe de mangue', 'مشروب مركّز بلب المانجو'],
  ['juice', 'grenadine', 'Grenadine', 'رمان', 'MAR-1085', 'Boisson concentrée grenadine', 'مشروب مركّز بنكهة الرمان'],
  ['juice', 'kiwi', 'Kiwi', 'كيوي', 'MAR-1086', 'Boisson concentrée à la pulpe de kiwi', 'مشروب مركّز بلب الكيوي'],
  ['juice', 'poire', 'Poire', 'إجاص', 'MAR-1088', 'Boisson concentrée à la pulpe de poire', 'مشروب مركّز بلب الإجاص'],
  ['juice', 'orgeat', 'Orgeat', 'لوز', 'MAR-1089', 'Boisson concentrée orgeat', 'مشروب مركّز بنكهة اللوز'],
  ['juice', 'pistache', 'Pistache', 'فستق', 'MAR-1090', 'Boisson concentrée au goût pistache', 'مشروب مركّز بنكهة الفستق'],
  ['juice', 'ananas-orange', 'Ananas & orange', 'أناناس وبرتقال', 'MAR-1091', 'Boisson concentrée à la pulpe d’ananas et d’orange', 'مشروب مركّز بلب الأناناس والبرتقال'],
  ['aroma', 'fraise', 'Fraise', 'فراولة', 'IMG_1336'],
  ['aroma', 'orange', 'Orange', 'برتقال', 'IMG_1339'],
  ['aroma', 'ananas', 'Ananas', 'أناناس', 'IMG_1340'],
  ['aroma', 'raisin', 'Raisin', 'عنب', 'IMG_1342'],
  ['aroma', 'noisette', 'Noisette', 'بندق', 'IMG_1343'],
  ['aroma', 'framboise', 'Framboise', 'توت العليق', 'IMG_1344'],
  ['aroma', 'miel', 'Miel', 'عسل', 'IMG_1345'],
  ['aroma', 'banane', 'Banane', 'موز', 'IMG_1346'],
  ['aroma', 'cerise', 'Cerise', 'كرز', 'IMG_1347'],
  ['aroma', 'pistache', 'Pistache', 'فستق', 'IMG_1348'],
  ['aroma', 'grenade', 'Grenade', 'رمان', 'IMG_1349'],
  ['aroma', 'caramel', 'Caramel', 'كراميل', 'IMG_1351'],
  ['aroma', 'chocolat', 'Chocolat', 'شوكولاتة', 'IMG_1352'],
  ['aroma', 'vanille', 'Vanille', 'فانيليا', 'IMG_1353'],
  ['aroma', 'amande', 'Amande', 'لوز', 'IMG_1358'],
  ['aroma', 'fleur-oranger', 'Fleur d’oranger', 'زهر البرتقال', 'IMG_1359'],
  ['aroma', 'rose', 'Rose', 'ورد', 'IMG_1360'],
  ['aroma', 'citron', 'Citron', 'ليمون', 'IMG_1361'],
  ['aroma', 'geranium', 'Géranium', 'عطرشية', 'IMG_1362'],
  ['aroma', 'menthe', 'Menthe', 'نعناع', 'IMG_1363'],
  ['colorant', 'vert', 'Vert', 'أخضر', 'IMG_1350'],
  ['colorant', 'rouge', 'Rouge', 'أحمر', 'IMG_1354'],
  ['colorant', 'bleu', 'Bleu', 'أزرق', 'IMG_1355'],
  ['colorant', 'orange', 'Orange', 'برتقالي', 'IMG_1356'],
  ['colorant', 'jaune', 'Jaune', 'أصفر', 'IMG_1357']
];
catalogRows.push(
  ['juice', 'ananas', 'Ananas', 'أناناس', 'geant-117153', 'Boisson concentrée ananas', 'مشروب أناناس مركّز'],
  ['syrup', 'chocolat', 'Chocolat', 'شوكولاتة', 'geant-30923', 'Sirop Perla au goût chocolat', 'شراب بيرلا بنكهة الشوكولاتة'],
  ['syrup', 'caramel', 'Caramel', 'كراميل', 'geant-30924', 'Sirop Perla au goût caramel', 'شراب بيرلا بنكهة الكراميل'],
  ['syrup', 'vanille', 'Vanille', 'فانيليا', 'geant-30925', 'Sirop Perla au goût vanille', 'شراب بيرلا بنكهة الفانيليا'],
  ['syrup', 'cerise', 'Cerise', 'كرز', 'geant-30926', 'Sirop Perla au goût cerise', 'شراب بيرلا بنكهة الكرز'],
  ['syrup', 'framboise', 'Framboise', 'توت العليق', 'geant-30927', 'Sirop Perla au goût framboise', 'شراب بيرلا بنكهة توت العليق'],
  ['water', 'fleur-oranger', 'Eau de fleur d’oranger', 'ماء زهر البرتقال', 'geant-71184', 'Eau de fleur d’oranger', 'ماء زهر البرتقال'],
  ['water', 'rose', 'Eau de rose', 'ماء الورد', 'geant-71186', 'Eau de rose', 'ماء الورد'],
  ['water', 'geranium', 'Eau de géranium', 'ماء العطرشية', 'geant-71185', 'Eau de géranium', 'ماء العطرشية'],
  // Added from manufacturer photos only; no retailer listing, so prices stay null.
  ['juice', 'banane', 'Banane', 'موز', 'owned', 'Boisson concentrée au goût banane', 'مشروب مركّز بنكهة الموز'],
  ['vinegar', 'colore', 'Vinaigre coloré', 'حامض خلي مخفف وملون', 'owned', 'Acide acétique dilué et coloré (vinaigre marron)', 'حامض خلي مخفف وملون (خل بني)'],
  ['vinegar', 'clair', 'Vinaigre dilué clair', 'حامض خلي مخفف شفاف', 'owned', 'Acide acétique dilué — version claire', 'حامض خلي مخفف — نسخة شفافة'],
  ['vinegar', 'pomme', 'Vinaigre goût pomme', 'خل بنكهة التفاح', 'owned', 'Acide acétique dilué au goût pomme', 'حامض خلي مخفف بنكهة التفاح'],
  ['vinegar', 'ail', 'Vinaigre goût ail', 'خل بنكهة الثوم', 'owned', 'Acide acétique dilué au goût ail', 'حامض خلي مخفف بنكهة الثوم'],
  ['vinegar', 'citron', 'Vinaigre goût citron', 'خل بنكهة الليمون', 'owned', 'Acide acétique dilué au goût citron', 'حامض خلي مخفف بنكهة الليمون'],
  ['vinegar', 'cristal', 'Vinaigre cristal', 'خل كريستال', 'owned', 'Acide acétique dilué cristal', 'حامض خلي مخفف كريستال']
);
// Products from the manufacturer's article list that have no photo yet (price on request).
const extraProductRows = [
  ['colorant', 'blanc', 'Perla', 'Blanc', 'أبيض', 'Colorant alimentaire Perla — blanc.', 'ملوّن غذائي بيرلا — أبيض.'],
  ['juice', 'peche', 'El Jawhara', 'Pêche', 'خوخ', 'Boisson concentrée à la pulpe de pêche', 'مشروب مركّز بلب الخوخ'],
  ['syrup', 'anis', 'El Jawhara', 'Anis', 'يانسون', 'Sirop El Jawhara au goût anis', 'شراب الجوهرة بنكهة اليانسون'],
  ['syrup', 'rose', 'El Jawhara', 'Rose', 'ورد', 'Sirop El Jawhara au goût rose', 'شراب الجوهرة بنكهة الورد'],
  ['syrup', 'citron-jawhara', 'El Jawhara', 'Citron El Jawhara', 'ليمون الجوهرة', 'Sirop El Jawhara au goût citron', 'شراب الجوهرة بنكهة الليمون'],
  ['syrup', 'orange-jawhara', 'El Jawhara', 'Orange El Jawhara', 'برتقال الجوهرة', 'Sirop El Jawhara au goût orange', 'شراب الجوهرة بنكهة البرتقال'],
  ['syrup', 'fraise', 'Perla', 'Fraise', 'فراولة', 'Sirop Perla au goût fraise', 'شراب بيرلا بنكهة الفراولة'],
  ['syrup', 'noisette', 'Perla', 'Noisette', 'بندق', 'Sirop Perla au goût noisette', 'شراب بيرلا بنكهة البندق'],
  ['syrup', 'raisin', 'Perla', 'Raisin', 'عنب', 'Sirop Perla au goût raisin', 'شراب بيرلا بنكهة العنب'],
  ['syrup', 'grenadine', 'Perla', 'Grenadine', 'رمان', 'Sirop Perla grenadine', 'شراب بيرلا بنكهة الرمان'],
  ['syrup', 'orgeat', 'Perla', 'Orgeat', 'لوز', 'Sirop Perla orgeat', 'شراب بيرلا بنكهة اللوز'],
  ['syrup', 'menthe', 'Perla', 'Menthe', 'نعناع', 'Sirop Perla au goût menthe', 'شراب بيرلا بنكهة النعناع'],
  ['syrup', 'citron', 'Perla', 'Citron', 'ليمون', 'Sirop Perla au goût citron', 'شراب بيرلا بنكهة الليمون'],
  ['syrup', 'ananas', 'Perla', 'Ananas', 'أناناس', 'Sirop Perla au goût ananas', 'شراب بيرلا بنكهة الأناناس'],
  ['syrup', 'pistache', 'Perla', 'Pistache', 'فستق', 'Sirop Perla au goût pistache', 'شراب بيرلا بنكهة الفستق'],
  ['syrup', 'orange', 'Perla', 'Orange', 'برتقال', 'Sirop Perla au goût orange', 'شراب بيرلا بنكهة البرتقال'],
  ['vinegar', 'verre', 'El Jawhara', 'Vinaigre en bouteille verre', 'خل في قارورة زجاجية', 'Type de vinaigre à confirmer avec El Jawhara.', 'نوع الخل بانتظار التأكيد.']
];
// Manufacturer article list (Excel « DOC-20260915 »): [productId, size, article codes].
// Codes are written without « PF_ »; a trailing « ? » marks a match El Jawhara still has to confirm.
// A plain size is the photographed bottle; « verre », « plastique », « droite » and « ronde » name the other packaging.
const articleRows = [
  ['aroma-amande', '30 ml', 'AR01'], ['aroma-framboise', '30 ml', 'AR015'], ['aroma-raisin', '30 ml', 'AR016'], ['aroma-vanille', '30 ml', 'AR02'],
  ['aroma-ananas', '30 ml', 'AR03'], ['aroma-noisette', '30 ml', 'AR04'], ['aroma-citron', '30 ml', 'AR05'], ['aroma-fraise', '30 ml', 'AR06'],
  ['aroma-grenade', '30 ml', 'AR07?'], ['aroma-pistache', '30 ml', 'AR08'], ['aroma-chocolat', '30 ml', 'AR09'], ['aroma-caramel', '30 ml', 'AR10'],
  ['aroma-fleur-oranger', '30 ml', 'AR11'], ['aroma-geranium', '30 ml', 'AR12'], ['aroma-rose', '30 ml', 'AR13'], ['aroma-orange', '30 ml', 'AR14'],
  ['colorant-jaune', '30 ml', 'CL01'], ['colorant-rouge', '30 ml', 'CL02'], ['colorant-vert', '30 ml', 'CL03'], ['colorant-bleu', '30 ml', 'CL04'],
  ['colorant-blanc', '30 ml', 'CL05'], ['colorant-orange', '30 ml', 'CL06'],
  ['juice-citron', '1 L', 'J001'], ['juice-citron', '3 L', 'J009'], ['juice-citron', '5 L', 'J017'],
  ['juice-fraise', '1 L', 'J002'], ['juice-fraise', '3 L', 'J010'], ['juice-fraise', '5 L', 'J018'],
  ['juice-citron-amande', '1 L', 'J003'], ['juice-citron-amande', '3 L', 'J011'], ['juice-citron-amande', '5 L', 'J019'], ['juice-citron-amande', '750 ml', 'SP077'],
  ['juice-cocktail', '1 L', 'J004'], ['juice-cocktail', '3 L', 'J012'], ['juice-cocktail', '5 L', 'J020'],
  ['juice-orange', '1 L', 'J005'], ['juice-orange', '3 L', 'J013'], ['juice-orange', '5 L', 'J021'],
  ['juice-ananas-orange', '1 L', 'J006'], ['juice-ananas-orange', '3 L', 'J014'], ['juice-ananas-orange', '5 L', 'J022'],
  ['juice-mangue', '1 L', 'J007'], ['juice-mangue', '3 L', 'J015'], ['juice-mangue', '5 L', 'J023'],
  ['juice-peche', '1 L', 'J008'], ['juice-peche', '3 L', 'J016'], ['juice-peche', '5 L', 'J024'],
  ['juice-kiwi', '1 L', 'J030'], ['juice-kiwi', '3 L', 'J025'], ['juice-kiwi', '5 L', 'J026'],
  ['juice-poire', '1 L', 'J029'], ['juice-poire', '3 L', 'J027'], ['juice-poire', '5 L', 'J028'],
  // Listed as « SIROP » in the Excel; kept under their current product pages.
  ['juice-grenadine', '1 L', 'S008'], ['juice-grenadine', '1 L verre', 'S001'], ['juice-grenadine', '750 ml', 'S029'], ['juice-grenadine', '3 L', 'S015'], ['juice-grenadine', '5 L', 'S022'],
  ['juice-orgeat', '1 L', 'S002'], ['juice-orgeat', '1 L plastique', 'S009'], ['juice-orgeat', '750 ml', 'S030'], ['juice-orgeat', '3 L', 'S016'], ['juice-orgeat', '5 L', 'S023'],
  ['juice-menthe', '1 L', 'S003'], ['juice-menthe', '1 L plastique', 'S010'], ['juice-menthe', '750 ml', 'S031'], ['juice-menthe', '3 L', 'S017'], ['juice-menthe', '5 L', 'S024'],
  ['juice-pistache', '1 L', 'S004'], ['juice-pistache', '1 L plastique', 'S011'], ['juice-pistache', '750 ml', 'S032'], ['juice-pistache', '3 L', 'S018'], ['juice-pistache', '5 L', 'S025'],
  ['juice-banane', '1 L', 'S005'], ['juice-banane', '750 ml', 'S037'],
  ['juice-ananas', '1 L', 'S007'], ['juice-ananas', '1 L plastique', 'S014'], ['juice-ananas', '3 L', 'S03'], ['juice-ananas', '5 L', 'S028'],
  ['syrup-anis', '750 ml', 'S075'], ['syrup-anis', '1 L', 'S006'], ['syrup-rose', '1 L', 'S035'],
  ['syrup-citron-jawhara', '750 ml', 'S033'], ['syrup-orange-jawhara', '750 ml', 'S75'],
  ['syrup-framboise', '750 ml', 'SP001'], ['syrup-chocolat', '750 ml', 'SP004'], ['syrup-cerise', '750 ml', 'SP005'], ['syrup-caramel', '750 ml', 'SP006'], ['syrup-vanille', '750 ml', 'SP008'],
  ['syrup-fraise', '750 ml', 'SP002 SP022'], ['syrup-fraise', '900 ml', 'SP019'], ['syrup-noisette', '750 ml', 'SP003'],
  ['syrup-raisin', '750 ml', 'SP007'], ['syrup-raisin', '900 ml', 'SP013'], ['syrup-grenadine', '900 ml', 'SP009'],
  ['syrup-orgeat', '750 ml', 'SP016'], ['syrup-orgeat', '900 ml', 'SP010'], ['syrup-menthe', '750 ml', 'SP015'], ['syrup-menthe', '900 ml', 'SP011'],
  ['syrup-citron', '900 ml', 'SP012'], ['syrup-ananas', '750 ml', 'SP017'], ['syrup-pistache', '900 ml', 'SP018'],
  ['syrup-orange', '750 ml', 'S050'], ['syrup-orange', '900 ml', 'SP021'],
  ['water-fleur-oranger', '220 ml', 'E013'], ['water-fleur-oranger', '220 ml droite', 'E019'], ['water-fleur-oranger', '370 ml', 'E010?'], ['water-fleur-oranger', '750 ml', 'E004'], ['water-fleur-oranger', '1 L', 'E001'],
  ['water-rose', '220 ml', 'E014'], ['water-rose', '220 ml droite', 'E017'], ['water-rose', '370 ml', 'E011? E016?'], ['water-rose', '370 ml verre', 'E008?'], ['water-rose', '750 ml', 'E005'], ['water-rose', '1 L', 'E002'],
  ['water-geranium', '220 ml', 'E015'], ['water-geranium', '220 ml droite', 'E018'], ['water-geranium', '370 ml', 'E012?'], ['water-geranium', '370 ml verre', 'E009?'], ['water-geranium', '750 ml', 'E006'], ['water-geranium', '1 L', 'E003'],
  // « Vinaigre marron » in the Excel is the coloured vinegar (dark label « حامض خلي مخفف و ملون »).
  ['vinegar-colore', '220 ml', 'V016?'], ['vinegar-colore', '220 ml ronde', 'V020'], ['vinegar-colore', '370 ml', 'V015'], ['vinegar-colore', '370 ml verre', 'V009'],
  ['vinegar-colore', '750 ml', 'V004'], ['vinegar-colore', '1 L', 'V001'],
  ['vinegar-clair', '220 ml', ''], ['vinegar-clair', '220 ml ronde', 'V0120?'],
  ['vinegar-pomme', '370 ml', 'V011?'], ['vinegar-pomme', '370 ml verre', 'V006?'], ['vinegar-citron', '370 ml', 'V012?'], ['vinegar-citron', '370 ml verre', 'V007?'],
  ['vinegar-ail', '370 ml', 'V013?'], ['vinegar-ail', '370 ml verre', 'V008?'],
  ['vinegar-cristal', '370 ml', 'V014?'], ['vinegar-cristal', '370 ml verre', 'V010?'], ['vinegar-cristal', '220 ml', 'V017'], ['vinegar-cristal', '220 ml ronde', 'V019'],
  ['vinegar-cristal', '750 ml', 'V005'], ['vinegar-cristal', '1 L', 'V002'], ['vinegar-cristal', '5 L', 'V021 V018'],
  ['vinegar-verre', '900 ml', 'V003?']
];
const tintFor = category => category === 'juice' ? '#eaf1df' : category === 'aroma' ? '#f7efdb' : category === 'vinegar' ? '#f3f1dc' : '#e5f0ed';
const products = catalogRows.map(([category, slug, fr, ar, source, labelFr, labelAr]) => ({
  id: `${category}-${slug}`,
  name: { fr, ar },
  category,
  brand: ['juice', 'water', 'vinegar'].includes(category) ? 'El Jawhara' : 'Perla',
  source: source.startsWith('geant-') || source.startsWith('MAR-') ? `assets/products/${source}.jpg` : studioPhotoFiles[source] ? `Img/Products/${studioPhotoFiles[source]}` : `Img/Products/${source}.JPG`,
  image: `assets/products/${source}.png`,
  sizes: source === 'owned' ? [...new Set(ownedPhotos.filter(photo => photo.role === 'primary' && photo.productId === `${category}-${slug}`).map(photo => photo.size))] : category === 'juice' ? ['1 L'] : ['bottle'],
  price: null,
  tint: tintFor(category),
  description: {
    fr: labelFr || `${category === 'aroma' ? 'Arôme alimentaire' : 'Colorant alimentaire'} Perla — ${fr.toLocaleLowerCase()}.`,
    ar: labelAr || `${category === 'aroma' ? 'منكّه غذائي' : 'ملوّن غذائي'} بيرلا — ${ar}.`
  }
}));
for (const [category, slug, brand, fr, ar, descFr, descAr] of extraProductRows) {
  products.push({ id: `${category}-${slug}`, name: { fr, ar }, category, brand, source: null, image: null, sizes: [], price: null, tint: tintFor(category), description: { fr: descFr, ar: descAr } });
}
for (const product of products) {
  product.retailerReferences = retailerRecords.filter(record => record.productId === product.id);
  if (product.retailerReferences.length) {
    product.variants = [...new Set(product.retailerReferences.map(record => record.size))].map(size => {
      const references = product.retailerReferences.filter(record => record.size === size);
      return { size, price: references[0].price, image: references[0].image, references };
    });
    product.sizes = product.variants.map(variant => variant.size);
    product.price = product.variants[0].price;
    product.image = product.variants[0].image;
  } else {
    product.variants = product.sizes.map(size => ({ size, price: null, image: product.image, references: [] }));
  }
}
// Excel article codes. Missing formats are added on request; the format already shown keeps first place.
const sizeVolume = size => size === 'bottle' ? 0 : parseFloat(size) * (/\bL\b/.test(size) ? 1000 : 1);
const packagingOrder = ['', 'droite', 'ronde', 'verre', 'plastique'];
const sizePackaging = size => size.split(' ')[2] || '';
const pinnedFirst = new Set(products.filter(product => product.variants.length).map(product => product.id));
for (const [productId, size, codes] of articleRows) {
  const product = products.find(item => item.id === productId);
  if (!product) throw new Error(`Article does not match a catalog product: ${productId}`);
  if (product.variants.length === 1 && product.variants[0].size === 'bottle' && size !== 'bottle') product.variants[0].size = size;
  let variant = product.variants.find(item => item.size === size);
  if (!variant) product.variants.push(variant = { size, price: null, image: null, references: [] });
  const list = codes.split(' ').filter(Boolean);
  variant.codes = list.map(code => `PF_${code.replace('?', '')}`);
  variant.codesToConfirm = list.some(code => code.endsWith('?'));
}
for (const product of products) {
  const bySize = (a, b) => sizeVolume(a.size) - sizeVolume(b.size) || packagingOrder.indexOf(sizePackaging(a.size)) - packagingOrder.indexOf(sizePackaging(b.size));
  if (pinnedFirst.has(product.id)) product.variants = [product.variants[0], ...product.variants.slice(1).sort(bySize)];
  else product.variants.sort(bySize);
  const first = product.variants[0];
  for (const variant of product.variants) variant.codes = variant.codes || [];
  product.sizes = product.variants.map(variant => variant.size);
  product.price = first ? first.price : null;
}
// Bottle material from El Jawhara's format list and the Excel article names. Sizes stay the keys
// (orders, stock, photos); « material » is only shown next to the size.
const glassSyrupCodes = new Set(['PF_S001', 'PF_S002', 'PF_S003', 'PF_S004', 'PF_S005', 'PF_S006', 'PF_S007']);
const materialFor = (product, size) => {
  const [amount, unit, packaging] = size.split(' ');
  if (packaging === 'verre' || packaging === 'plastique') return packaging;
  if (size === 'bottle' || ['aroma', 'colorant'].includes(product.category)) return null;
  const ml = parseFloat(amount) * (unit === 'L' ? 1000 : 1);
  if (product.category === 'juice') return ml < 1000 || (product.variants.find(variant => variant.size === size).codes || []).some(code => glassSyrupCodes.has(code)) ? 'verre' : 'plastique';
  if (product.category === 'syrup') return product.brand === 'Perla' && ml === 900 ? 'plastique' : 'verre';
  return ml === 750 || ml === 900 ? 'verre' : 'plastique';
};
// Photo ownership and retailer pricing are separate concerns. Never overwrite source prices.
for (const replacement of ownedPhotos.filter(photo => photo.role === 'primary')) {
  const product = products.find(product => product.id === replacement.productId);
  let variant = product?.variants.find(variant => variant.size === replacement.size);
  if (product && !variant && replacement.size === '5 L') {
    variant = { size: '5 L', price: null, image: replacement.image, references: [] };
    product.variants.push(variant);
    product.sizes = product.variants.map(item => item.size);
  }
  if (!variant) throw new Error(`Replacement does not match a catalog variant: ${replacement.productId} ${replacement.size}`);
  variant.image = replacement.image;
  variant.imageSource = replacement.source;
  variant.imageOwnership = 'manufacturer';
  product.source = replacement.source;
  if (variant.size === product.sizes[0]) product.image = replacement.image;
}
// Display only photography whose original is in Img (user-supplied). Retailer/legacy
// images stay on disk but are not shown; unmatched formats render a placeholder.
for (const product of products) {
  const studioKey = Object.keys(studioPhotoFiles).find(key => product.source === `Img/Products/${studioPhotoFiles[key]}`);
  const ownStudioPhoto = studioKey ? `assets/products/${studioKey}.png` : null;
  for (const variant of product.variants) {
    if (variant.imageOwnership === 'manufacturer') continue;
    variant.image = ownStudioPhoto;
    variant.imageSource = ownStudioPhoto ? product.source : null;
    variant.imageOwnership = ownStudioPhoto ? 'manufacturer' : null;
  }
  product.image = (product.variants.find(variant => variant.image) || {}).image || null;
}
// Additional angles of the same bottle: browsable in the detail view, not separate listings.
// No prices for now (on request) until El Jawhara confirms its own price list; retailer prices are hidden too.
for (const product of products) {
  product.price = null;
  for (const variant of product.variants) { variant.price = null; variant.references = []; }
}
for (const product of products) for (const variant of product.variants) {
  variant.gallery = variant.image ? [variant.image] : [];
  variant.codes = variant.codes || [];
  variant.material = materialFor(product, variant.size);
}
for (const extra of ownedPhotos.filter(photo => photo.role === 'gallery')) {
  const variant = products.find(product => product.id === extra.productId)?.variants.find(variant => variant.size === extra.size);
  if (!variant) throw new Error(`Gallery photo does not match a catalog variant: ${extra.productId} ${extra.size}`);
  variant.gallery.push(extra.image);
}
