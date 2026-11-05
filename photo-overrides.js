// Manufacturer-supplied replacement photography. IDs and sizes stay unchanged.
// Paths for difficult clear bottles are reviewed silhouettes in the 963 × 1280 source frame.
const ownedPhotoRows = [
  ['juice-citron-amande','3 L','El Jawhara - Jus Citron et amande - 3 L.png'],
  ['juice-cocktail','3 L','El Jawhara - Jus Cocktail de fruits - 3 L.png'],
  // Earlier filed as « Cocktail de fruits »; its label reads pulpe d'ananas et d'orange (بلب الأناناس والبرتقال).
  ['juice-ananas-orange','3 L','El Jawhara - Jus Ananas et orange - 3 L.jpeg'],
  ['juice-mangue','1 L','El Jawhara - Jus Mangue - 1 L.jpeg'],
  ['juice-grenadine','1 L','El Jawhara - Jus Grenadine - 1 L.jpeg'],
  ['juice-ananas-orange','1 L','El Jawhara - Jus Ananas et orange - 1 L.jpeg'],
  ['juice-citron','1 L','El Jawhara - Jus Citron - 1 L.jpeg'],
  ['juice-citron','3 L','El Jawhara - Jus Citron - 3 L.jpeg'],
  ['juice-fraise','1 L','El Jawhara - Jus Fraise - 1 L.jpeg'],
  ['juice-fraise','3 L','El Jawhara - Jus Fraise - 3 L.jpeg'],
  // 5 L formats are read from the labels; no retailer price exists, so they open the quote flow.
  ['juice-fraise','5 L','El Jawhara - Jus Fraise - 5 L.png'],
  ['juice-menthe','5 L','El Jawhara - Jus Menthe - 5 L.jpeg'],
  ['juice-orgeat','5 L','El Jawhara - Jus Orgeat - 5 L.jpeg'],
  ['juice-orange','5 L','El Jawhara - Jus Orange - 5 L.jpeg'],
  ['juice-citron-amande','5 L','El Jawhara - Jus Citron et amande - 5 L.jpeg'],
  ['juice-citron-amande','1 L','El Jawhara - Jus Citron et amande - 1 L.jpeg'],
  ['syrup-cerise','750 ml','Perla - Sirop Cerise - 750 ml.jpeg'],
  ['syrup-chocolat','750 ml','Perla - Sirop Chocolat - 750 ml.jpeg'],
  ['syrup-framboise','750 ml','Perla - Sirop Framboise - 750 ml.jpeg'],
  ['syrup-caramel','750 ml','Perla - Sirop Caramel - 750 ml.jpeg'],
  ['juice-ananas','1 L','El Jawhara - Jus Ananas - 1 L.jpeg'],
  ['juice-menthe','1 L','El Jawhara - Jus Menthe - 1 L.jpeg'],
  ['syrup-vanille','750 ml','Perla - Sirop Vanille - 750 ml.jpeg'],
  ['juice-orgeat','1 L','El Jawhara - Jus Orgeat - 1 L.jpeg'],
  ['juice-pistache','1 L','El Jawhara - Jus Pistache - 1 L.jpeg'],
  ['water-rose','220 ml','El Jawhara - Eau de rose - 220 ml.jpeg',
    'M402 432 Q477 425 550 435 L552 510 Q558 516 548 527 L545 552 C602 578 606 625 592 685 L570 755 Q571 780 593 824 L594 998 Q612 1026 603 1042 C566 1071 387 1074 354 1043 Q342 1028 350 1010 L351 830 Q368 783 368 755 C336 660 341 594 390 555 L404 542 L403 526 Q391 523 397 515 Z', [553,824], [998,1053]],
  ['water-fleur-oranger','220 ml',"El Jawhara - Eau de fleur d'oranger - 220 ml.jpeg",
    'M386 288 Q480 279 567 289 L568 375 L567 384 L575 389 Q575 395 567 399 L560 420 C613 447 629 505 602 565 L578 612 Q574 636 592 670 L605 710 L601 983 Q602 1020 571 1030 C492 1050 355 1042 329 1017 Q312 1000 315 973 L319 706 Q321 666 349 626 C318 560 310 520 327 471 Q341 442 386 425 L391 412 L391 400 Q378 397 379 389 L383 383 Z', [421,700], [945,1038]],
  ['water-geranium','220 ml','El Jawhara - Eau de géranium - 220 ml.jpeg',
    'M368 217 Q465 202 557 221 L558 309 Q567 328 560 332 L547 341 L547 362 C601 384 624 425 624 481 Q624 535 601 595 L584 634 Q586 662 612 708 L612 960 Q629 991 620 1007 C580 1047 340 1046 303 1010 Q293 992 306 970 L308 712 Q329 661 332 635 C303 561 296 501 309 449 Q323 401 363 375 L374 354 L373 337 Q358 334 366 321 Z', [361,725], [961,1025]],
  ['water-geranium','370 ml','El Jawhara - Eau de géranium - 370 ml.jpeg',
    'M440 166 Q510 154 590 172 L591 242 Q597 256 589 262 L576 275 C566 316 568 383 569 432 L578 479 C605 519 626 554 626 608 L613 1020 Q612 1090 595 1127 L585 1158 Q559 1200 478 1198 C400 1204 349 1178 341 1138 L343 1074 L360 702 L367 617 C374 554 405 510 429 485 Q447 464 447 438 L452 275 Q436 268 439 256 Z', [276,623], [1110,1198]],
  ['water-fleur-oranger','370 ml',"El Jawhara - Eau de fleur d'oranger - 370 ml.jpeg",
    'M431 35 Q482 20 538 35 L546 53 L546 89 Q554 107 550 133 L547 267 L548 292 C552 329 579 365 589 400 Q599 436 599 485 L595 1090 Q593 1129 567 1145 C510 1165 389 1167 347 1144 Q326 1133 322 1102 L327 481 Q331 436 350 402 C366 369 394 337 400 307 L408 276 L410 110 Q407 67 425 44 Z', [275,606], [1080,1160]],
  ['water-rose','370 ml','El Jawhara - Eau de rose - 370 ml.jpeg',
    'M406 121 Q478 110 546 123 L548 190 L546 203 Q557 209 548 215 L547 433 C548 463 585 477 598 515 Q611 551 610 588 L606 1044 Q606 1077 588 1089 C553 1119 405 1120 373 1104 Q352 1094 351 1060 L353 564 C353 513 371 483 400 454 Q408 440 409 422 L410 216 Q399 212 399 207 L405 201 Z', [216,593], [1068,1118]],
  ['water-fleur-oranger','1 L',"El Jawhara - Eau de fleur d'oranger - 1 L.jpeg",
    'M447 235 Q511 227 572 242 L573 283 Q583 296 574 303 L565 317 C581 365 605 415 616 468 Q624 511 624 563 L616 1121 Q608 1162 568 1179 C504 1205 401 1196 362 1178 Q344 1165 340 1130 L340 560 C343 489 364 451 389 413 L423 354 Q440 328 441 311 L441 303 Q428 298 438 289 Z', [318,647], [1070,1190]],
  ['water-rose','1 L','El Jawhara - Eau de rose - 1 L.jpeg',
    'M435 285 Q490 277 537 292 L538 337 Q548 351 540 356 L535 368 C551 407 583 448 597 491 Q613 539 612 590 L612 1134 Q607 1161 577 1176 C524 1201 405 1198 367 1179 Q349 1162 344 1140 L342 594 Q343 540 363 498 C382 454 416 405 429 372 L429 359 Q417 353 430 342 Z', [371,678], [1060,1185]],
  ['water-geranium','1 L','El Jawhara - Eau de géranium - 1 L.jpeg',
    'M415 236 Q472 228 529 244 L530 300 Q546 315 532 322 L530 337 C545 386 578 441 596 486 Q608 528 608 580 L608 1124 Q603 1157 571 1170 C515 1190 403 1187 365 1169 Q344 1156 341 1128 L341 573 Q342 526 360 483 C380 433 410 374 415 338 L416 325 Q405 319 413 305 Z', [337,607], [1059,1180]],
  // New products and formats read from the labels (prices to confirm).
  ['juice-banane','1 L','El Jawhara - Jus Banane - 1 L.jpeg'],
  ['vinegar-colore','220 ml','El Jawhara - Vinaigre coloré - 220 ml.jpeg'],
  // Same "Acide acétique dilué" label, but a clear liquid: listed separately until confirmed.
  ['vinegar-clair','220 ml','El Jawhara - Vinaigre dilué clair - 220 ml.jpeg'],
  ['vinegar-pomme','370 ml','El Jawhara - Vinaigre goût pomme - 370 ml.jpeg'],
  ['vinegar-ail','370 ml','El Jawhara - Vinaigre goût ail - 370 ml.jpeg'],
  ['vinegar-citron','370 ml','El Jawhara - Vinaigre goût citron - 370 ml.jpeg'],
  ['vinegar-cristal','370 ml','El Jawhara - Vinaigre cristal - 370 ml.jpeg'],
  // Other packaging of the same product (Excel article list): glass grenadine, straight 220 ml waters, round 220 ml vinegars.
  ['juice-grenadine','1 L verre','El Jawhara - Jus Grenadine - 1 L verre.jpeg'],
  ['water-rose','220 ml droite','El Jawhara - Eau de rose - 220 ml droite.jpeg'],
  ['water-fleur-oranger','220 ml droite',"El Jawhara - Eau de fleur d'oranger - 220 ml droite.jpeg"],
  ['water-geranium','220 ml droite','El Jawhara - Eau de géranium - 220 ml droite.jpeg'],
  ['vinegar-colore','220 ml ronde','El Jawhara - Vinaigre coloré - 220 ml ronde.jpeg'],
  ['vinegar-clair','220 ml ronde','El Jawhara - Vinaigre dilué clair - 220 ml ronde.jpeg'],
  ['juice-citron','5 L','El Jawhara - Jus Citron - 5 L.jpeg'],
  ['vinegar-colore','1 L','El Jawhara - Vinaigre coloré - 1 L.jpeg'],
  ['vinegar-cristal','1 L','El Jawhara - Vinaigre cristal - 1 L.jpeg'],
  // Plastic 1 L bottles and Grenadine 5 L (photos of 5 Nov 2026).
  ['juice-grenadine','5 L','El Jawhara - Jus Grenadine - 5 L.jpeg'],
  ['juice-orgeat','1 L plastique','El Jawhara - Jus Orgeat - 1 L plastique.jpeg'],
  ['juice-poire','1 L','El Jawhara - Jus Poire - 1 L.jpeg'],
  ['juice-orange','1 L','El Jawhara - Jus Orange - 1 L.jpeg'],
  ['juice-pistache','1 L plastique','El Jawhara - Jus Pistache - 1 L plastique.jpeg'],
  ['juice-cocktail','1 L','El Jawhara - Jus Cocktail de fruits - 1 L.jpeg'],
  ['juice-menthe','1 L plastique','El Jawhara - Jus Menthe - 1 L plastique.jpeg']
];
// Extra views of the same product and size: shown as a gallery, never as extra listings.
const galleryPhotoRows = [
  ['juice-citron','1 L','El Jawhara - Jus Citron - 1 L - vue 2.jpeg'],
  ['juice-ananas','1 L','El Jawhara - Jus Ananas - 1 L - vue 2.jpeg'],
  ['juice-ananas-orange','1 L','El Jawhara - Jus Ananas et orange - 1 L - vue 2.jpeg'],
  ['water-rose','220 ml droite','El Jawhara - Eau de rose - 220 ml droite - vue 2.jpeg'],
  ['water-fleur-oranger','220 ml',"El Jawhara - Eau de fleur d'oranger - 220 ml - vue 2.jpeg"]
];
// Perla studio photos (one per product): cut-out name in assets/products → original file in Img/Products.
const studioPhotoFiles = {
  IMG_1336: "Perla - Arôme Fraise - 30 ml.jpg",
  IMG_1339: "Perla - Arôme Orange - 30 ml.jpg",
  IMG_1340: "Perla - Arôme Ananas - 30 ml.jpg",
  IMG_1342: "Perla - Arôme Raisin - 30 ml.jpg",
  IMG_1343: "Perla - Arôme Noisette - 30 ml.jpg",
  IMG_1344: "Perla - Arôme Framboise - 30 ml.jpg",
  IMG_1345: "Perla - Arôme Miel - flacon.jpg",
  IMG_1346: "Perla - Arôme Banane - flacon.jpg",
  IMG_1347: "Perla - Arôme Cerise - flacon.jpg",
  IMG_1348: "Perla - Arôme Pistache - 30 ml.jpg",
  IMG_1349: "Perla - Arôme Grenade - 30 ml.jpg",
  IMG_1350: "Perla - Colorant Vert - 30 ml.jpg",
  IMG_1351: "Perla - Arôme Caramel - 30 ml.jpg",
  IMG_1352: "Perla - Arôme Chocolat - 30 ml.jpg",
  IMG_1353: "Perla - Arôme Vanille - 30 ml.jpg",
  IMG_1354: "Perla - Colorant Rouge - 30 ml.jpg",
  IMG_1355: "Perla - Colorant Bleu - 30 ml.jpg",
  IMG_1356: "Perla - Colorant Orange - 30 ml.jpg",
  IMG_1357: "Perla - Colorant Jaune - 30 ml.jpg",
  IMG_1358: "Perla - Arôme Amande - 30 ml.jpg",
  IMG_1359: "Perla - Arôme Fleur d'oranger - 30 ml.jpg",
  IMG_1360: "Perla - Arôme Rose - 30 ml.jpg",
  IMG_1361: "Perla - Arôme Citron - 30 ml.jpg",
  IMG_1362: "Perla - Arôme Géranium - 30 ml.jpg",
  IMG_1363: "Perla - Arôme Menthe - flacon.jpg"
};
const photoStem = (productId, size) => `owned-${productId}-${size.replace(/\s/g,'').toLowerCase()}`;
const galleryCount = {};
const ownedPhotos = [
  ...ownedPhotoRows.map(([productId,size,filename,outline,glassTop,glassBase]) => {
    const stem = photoStem(productId, size);
    return { productId, size, role: 'primary', source: `Img/Products/${filename}`, image: `assets/products/${stem}.png`, workingFile: `${stem}.jpg`, outline, glassTop, glassBase };
  }),
  ...galleryPhotoRows.map(([productId,size,filename,outline,glassTop,glassBase]) => {
    const key = `${productId}:${size}`;
    galleryCount[key] = (galleryCount[key] || 0) + 1;
    const stem = `${photoStem(productId, size)}-alt${galleryCount[key]}`;
    return { productId, size, role: 'gallery', source: `Img/Products/${filename}`, image: `assets/products/${stem}.png`, workingFile: `${stem}.jpg`, outline, glassTop, glassBase };
  })
];
if (typeof module !== 'undefined') module.exports = ownedPhotos;
