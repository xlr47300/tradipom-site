const SHEET_CONFIG = {
  spreadsheetId: "1RRjI69tse58sk4fQuLh7LjsPN9hYbMzFrRHfXLW17LI",
  gids: {
    parametres: "0",
    textes: "1181850786",
    ardoise: "2046797031",
    produits: "1306997068",
    avantages: "1655170260",
    images: "686804659",
  },
};

const DEFAULT_DATA = {
  parametres: [
    ["titre_site", "Tradipom"],
    ["slogan", "Fruits et légumes de saison, frais et en vente directe"],
    ["slogan_mobile", "Fruits et légumes frais, de saison chez Tradipom"],
    ["description_hero", "Chez Tradipom à Bias, produits locaux récoltés près de chez vous, vendus frais, sans intermédiaire."],
    ["description_hero_mobile", "Vente directe · Produits locaux · Bias (47)"],
    ["adresse", "1270 Route de Lalandette"],
    ["ville", "47300 Bias"],
    ["email", "tradipom@gmail.com"],
    ["telephone", "05 53 40 28 42"],
    ["horaires_semaine", "Lun - Ven : 9h - 19h"],
    ["horaires_samedi", "Sam : 9h - 18h"],
    ["horaires_dimanche", "Dim : 9h - 12h"],
    ["badge_statut", "Ouvert aujourd'hui"],
    ["badge_arrivage", "Nouveaux arrivages"],
  ],
  ardoise: [
    { ordre: "1", nom: "Fraises Gariguette", origine: "Bias (47)", prix: "2,50", unite: "EUR/kg", actif: "oui" },
    { ordre: "2", nom: "Courgettes rondes", origine: "Agen (47)", prix: "1,20", unite: "EUR/pièce", actif: "oui" },
    { ordre: "3", nom: "Tomates coeur de boeuf", origine: "Villeneuve (47)", prix: "3,00", unite: "EUR/kg", actif: "oui" },
  ],
  produits: [
    { ordre: "1", nom: "Pommes", categorie: "Fruits", image_zone: "produit_pommes", prix: "2,20", unite: "€/kg", origine: "Vergers de Guillamou", detail: "Croquantes et parfumees.", statut: "arrivage", actif: "oui" },
    { ordre: "2", nom: "Poires", categorie: "Fruits", image_zone: "produit_poires", prix: "2,90", unite: "€/kg", origine: "Lot-et-Garonne", detail: "A laisser murir selon votre gout.", statut: "", actif: "oui" },
    { ordre: "3", nom: "Fraises", categorie: "Fruits", image_zone: "produit_fraises", prix: "4,00", unite: "€/barquette", origine: "Bias (47)", detail: "Selon disponibilite du jour.", statut: "nouveaute", actif: "oui" },
    { ordre: "4", nom: "Tomates", categorie: "Légumes", image_zone: "produit_tomates", prix: "3,00", unite: "€/kg", origine: "Villeneuve-sur-Lot", detail: "Ideales en salade.", statut: "", actif: "oui" },
    { ordre: "5", nom: "Courgettes", categorie: "Légumes", image_zone: "produit_courgettes", prix: "1,20", unite: "€/piece", origine: "Agen (47)", detail: "Rondes ou longues selon arrivage.", statut: "promo", actif: "oui" },
    { ordre: "6", nom: "Carottes", categorie: "Légumes", image_zone: "produit_carottes", prix: "1,80", unite: "€/kg", origine: "Lot-et-Garonne", detail: "Pour soupes, crudites et plats mijotes.", statut: "", actif: "oui" },
    { ordre: "7", nom: "Jus de pomme", categorie: "Jus & boissons", image_zone: "verger_jus_pomme", prix: "3,50", unite: "la bouteille", origine: "Tradipom", detail: "Pur jus du verger.", statut: "arrivage", actif: "oui" },
    { ordre: "8", nom: "Compote", categorie: "Produits du verger", image_zone: "verger_compote", prix: "2,90", unite: "le pot", origine: "Tradipom", detail: "Simple, fruitée, sans chichi.", statut: "", actif: "oui" },
    { ordre: "9", nom: "Pommes en sac", categorie: "Promotions / lots", image_zone: "verger_pommes_sac", prix: "5,00", unite: "le sac", origine: "Tradipom", detail: "Format pratique pour la semaine.", statut: "promo", actif: "oui" },
  ],
  textes: [
    { zone: "ardoise", titre: "L'ardoise du jour", texte: "" },
    { zone: "produits", titre: "Nos produits de saison", texte: "Chaque semaine, selon arrivages et saison." },
    { zone: "magasin", titre: "Notre magasin", texte: "Un endroit simple, chaleureux, à taille humaine." },
    { zone: "pourquoi", titre: "Pourquoi venir chez nous ?", texte: "" },
    { zone: "infos", titre: "Venez nous rendre visite !", texte: "" },
  ],
  avantages: [
    { ordre: "1", titre: "Produits locaux", texte: "Cultivés à quelques kilomètres d'ici, par des producteurs que nous connaissons personnellement.", icone: "L", actif: "oui" },
    { ordre: "2", titre: "Respecte la saison", texte: "On vend uniquement ce qui est mûr aujourd'hui, pour le goût, la fraîcheur et des achats plus responsables.", icone: "S", actif: "oui" },
    { ordre: "3", titre: "Conseils et recettes", texte: "On vous explique comment préparer, conserver et sublimer ce que vous achetez.", icone: "R", actif: "oui" },
    { ordre: "4", titre: "Vente directe", texte: "Petite structure familiale, aucun intermédiaire, des prix justes pour tous.", icone: "D", actif: "oui" },
  ],
  images: [
    { zone: "hero", lien_drive: "uploads/test.jpg", alt: "Fruits et légumes de saison", actif: "oui" },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  bindMenu();
  bindHeaderOffset();
  bindAccordions();
  loadSiteData().then(applyData).catch(() => applyData(DEFAULT_DATA));
});

function bindMenu() {
  const button = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!button || !links) return;

  button.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  links.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      links.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });
}

function bindHeaderOffset() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => {
    document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
  };
  update();
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
}

function bindAccordions() {
  const sectionSelectors = [
    "#ardoise",
    ".weekly-arrivals",
    "#produits",
    ".orchard-products",
    "#magasin",
    ".why",
    "#infos",
  ];
  const sections = sectionSelectors
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  sections.forEach((section, index) => {
    const inner = section.querySelector(".section-inner");
    const heading = inner?.querySelector(".chalk-title, .section-heading");
    if (!inner || !heading || heading.querySelector(".accordion-toggle")) return;

    section.classList.add("accordion-section");
    heading.classList.add("accordion-heading");

    const content = document.createElement("div");
    content.className = "accordion-content";
    content.id = `accordion-content-${index + 1}`;
    while (heading.nextSibling) content.appendChild(heading.nextSibling);
    inner.appendChild(content);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "accordion-toggle";
    button.setAttribute("aria-label", "Ouvrir la section");
    button.setAttribute("aria-controls", content.id);
    button.setAttribute("aria-expanded", "false");
    button.textContent = "+";
    heading.appendChild(button);

    button.addEventListener("click", () => {
      const shouldOpen = !section.classList.contains("is-open");
      if (shouldOpen) openAccordionSection(section, sections);
    });
  });

  const initialSection = findAccordionSectionFromHash(sections) || sections[0];
  if (initialSection) openAccordionSection(initialSection, sections);

  window.addEventListener("hashchange", () => {
    const section = findAccordionSectionFromHash(sections);
    if (section) openAccordionSection(section, sections);
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      window.setTimeout(() => {
        const section = findAccordionSectionFromHash(sections);
        if (section) openAccordionSection(section, sections);
      }, 0);
    });
  });
}

function openAccordionSection(sectionToOpen, sections) {
  sections.forEach((section) => {
    const isOpen = section === sectionToOpen;
    const button = section.querySelector(".accordion-toggle");
    const content = section.querySelector(".accordion-content");
    section.classList.toggle("is-open", isOpen);
    if (content) content.hidden = !isOpen;
    if (button) {
      button.textContent = isOpen ? "−" : "+";
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Fermer la section" : "Ouvrir la section");
    }
  });
}

function findAccordionSectionFromHash(sections) {
  if (!window.location.hash) return null;
  const target = document.querySelector(window.location.hash);
  if (!target) return null;
  return sections.find((section) => section === target || section.contains(target)) || null;
}

async function loadSiteData() {
  if (!SHEET_CONFIG.spreadsheetId) return DEFAULT_DATA;

  const sheets = await Promise.all(
    Object.entries(SHEET_CONFIG.gids).map(async ([key, gid]) => {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.spreadsheetId}/export?format=csv&gid=${gid}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Impossible de charger ${key}`);
      return [key, parseCSV(await response.text())];
    })
  );

  return { ...DEFAULT_DATA, ...Object.fromEntries(sheets) };
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map(normalizeKey);
  return rows.slice(1).map((values) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = values[index] || "";
    });
    return item;
  });
}

function applyData(data) {
  const parametres = {
    ...normalizeParams(DEFAULT_DATA.parametres),
    ...normalizeParams(data.parametres),
  };
  const textes = withTextAliases(byZone(data.textes));

  applyParams(parametres);
  applyTextes(textes, parametres);
  renderArdoise(data.ardoise);
  renderArrivals(data.ardoise, data.produits);
  renderProducts(data.produits);
  renderOrchard(data.produits);
  renderAdvantages(data.avantages);
  applyImages(data.images);
}

function applyParams(params) {
  const city = formatCity(params);

  if (params.meta_title) document.title = params.meta_title;
  setMetaDescription(params.meta_description);
  setText("[data-param='titre_site']", (params.titre_site || "Tradipom").toUpperCase());
  setText("[data-param='badge_statut']", params.badge_statut);
  setText("[data-param='badge_arrivage']", params.badge_arrivage);
  setText("[data-hero-button]", params.bouton_hero);
  setText(".nav-cta", params.bouton_contact);
  setText("[data-info-address]", `${params.adresse} - ${city}`);
  setText("[data-info-hours]", compactHours(params));
  setText("[data-address-block]", `${params.adresse}\n${city}${params.departement ? ` (${params.departement})` : ""}`);
  setText("[data-hours-block]", `${params.horaires_semaine}\n${params.horaires_samedi} · ${params.horaires_dimanche}`);
  setText("[data-email-text]", params.email);
  setText("[data-phone-text]", params.telephone);
  setText("[data-footer-copy]", `© 2026 ${params.titre_site || "Tradipom"} SAS - ${city || "47300 Bias"}`);

  document.querySelectorAll("[data-email-link], [data-email-text]").forEach((node) => {
    if (params.email) node.setAttribute("href", `mailto:${params.email}`);
  });

  document.querySelectorAll("[data-phone-text]").forEach((node) => {
    if (params.telephone) node.setAttribute("href", `tel:${params.telephone.replace(/\D/g, "")}`);
  });
}

function applyTextes(textes, params) {
  const mobile = window.matchMedia("(max-width: 820px)").matches;
  const heroText = textes.hero || {};
  setText("[data-hero-title]", heroText.titre || (mobile ? params.slogan_mobile : params.slogan));
  setText("[data-hero-text]", mobile
    ? heroText.texte || params.description_hero_mobile || params.sous_titre
    : heroText.texte || params.description_hero || params.sous_titre);

  document.querySelectorAll("[data-text-title]").forEach((node) => {
    const zone = node.dataset.textTitle;
    if (textes[zone]?.titre) node.textContent = textes[zone].titre;
  });

  document.querySelectorAll("[data-text-copy]").forEach((node) => {
    const zone = node.dataset.textCopy;
    node.textContent = textes[zone]?.texte || "";
  });
}

function renderArdoise(items = []) {
  const container = document.querySelector("[data-ardoise-list]");
  if (!container) return;
  const activeItems = sortActive(items).filter((item) => hasText(item.nom));

  container.innerHTML = activeItems.map((item) => `
    <article class="ardoise-card">
      <div>
        <h3>${escapeHtml(item.nom)}</h3>
        <p>Origine · ${escapeHtml(item.origine)}</p>
      </div>
      <strong>${escapeHtml(formatPrice(item.prix, item.unite))}</strong>
    </article>
  `).join("");
}

function renderProducts(items = []) {
  const container = document.querySelector("[data-products-list]");
  if (!container) return;
  const products = sortActive(items).filter((item) => hasText(item.nom));
  renderCategories(products, container);

  container.innerHTML = products.map((item, index) => productCard(item, index)).join("");
}

function renderCategories(items = [], productContainer) {
  const container = document.querySelector("[data-category-list]");
  if (!container) return;
  const orderedCategories = [
    "Fruits",
    "Légumes",
    "Produits du verger",
    "Jus & boissons",
    "Produits locaux",
    "Promotions / lots",
  ];
  const available = new Set(items.map((item) => productCategory(item)));
  const categories = orderedCategories.filter((category) => available.has(category));
  orderedCategories.forEach((category) => {
    if (!available.has(category)) categories.push(category);
  });

  container.innerHTML = categories.map((category) => `
    <button type="button" data-category-filter="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join("");

  const filterProducts = (button) => {
    const activeCategory = button.classList.contains("is-active") ? "" : button.dataset.categoryFilter;
    container.querySelectorAll("[data-category-filter]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.categoryFilter === activeCategory);
    });
    productContainer.querySelectorAll(".product-card").forEach((card) => {
      const shouldShow = !activeCategory || card.dataset.category === activeCategory;
      card.hidden = !shouldShow;
    });
  };

  container.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", () => filterProducts(button));
    button.addEventListener("touchend", (event) => {
      event.preventDefault();
      filterProducts(button);
    }, { passive: false });
  });
}

function renderArrivals(ardoiseItems = [], productItems = []) {
  const container = document.querySelector("[data-arrivals-list]");
  if (!container) return;
  const products = sortActive(productItems)
    .filter((item) => hasText(item.nom))
    .filter((item) => ["arrivage", "nouveaute", "nouveauté"].includes(normalizeKey(item.statut || "")));
  const arrivals = products.length ? products : sortActive(ardoiseItems).filter((item) => hasText(item.nom)).slice(0, 4);

  container.innerHTML = arrivals.map((item) => `
    <article class="arrival-card">
      <span>${escapeHtml(statusLabel(productStatus(item) || "arrivage"))}</span>
      <h3>${escapeHtml(item.nom)}</h3>
      <p>${escapeHtml(item.origine || "Selon arrivage")}</p>
      ${hasText(productPrice(item)) ? `<strong>${escapeHtml(formatPrice(productPrice(item), productUnit(item)))}</strong>` : ""}
    </article>
  `).join("");
}

function renderOrchard(items = []) {
  const container = document.querySelector("[data-orchard-list]");
  if (!container) return;
  const orchardProducts = sortActive(items)
    .filter((item) => hasText(item.nom))
    .filter((item) => isOrchardProduct(item));
  const products = orchardProducts.length ? orchardProducts : fallbackOrchardProducts();

  container.innerHTML = products.map((item, index) => productCard(item, index, "orchard")).join("");
}

function productCard(item, index, prefix = "produit") {
  const imageZone = item.image_zone || `${prefix}_${slugify(item.nom || index + 1)}`;
  const id = prefix === "produit" ? imageZone : `${prefix}_${slugify(imageZone)}`;
  const status = statusLabel(productStatus(item));
  return `
    <article class="product-card" data-category="${escapeHtml(productCategory(item))}">
      <div class="product-photo-wrap">
        <image-slot id="${escapeHtml(id)}" data-image-zone="${escapeHtml(imageZone)}" placeholder="${escapeHtml(item.nom || "Photo produit")}" shape="rounded" radius="8"></image-slot>
        ${status ? `<span class="product-status">${escapeHtml(status)}</span>` : ""}
      </div>
      <div class="product-card-body">
        <div class="product-card-top">
          <span class="product-category">${escapeHtml(productCategory(item))}</span>
          ${hasText(productPrice(item)) ? `<strong class="product-price">${escapeHtml(formatPrice(productPrice(item), productUnit(item)))}</strong>` : `<strong class="product-price product-price-muted">Prix en magasin</strong>`}
        </div>
        <h3>${escapeHtml(item.nom)}</h3>
        <p class="product-origin">${escapeHtml(productOrigin(item) || "Origine selon arrivage")}</p>
        <p class="product-detail">${escapeHtml(productDetail(item) || "Disponible selon les récoltes et les arrivages.")}</p>
      </div>
    </article>
  `;
}

function renderAdvantages(items = []) {
  const container = document.querySelector("[data-advantages-list]");
  if (!container) return;

  container.innerHTML = sortActive(items).filter((item) => hasText(item.titre)).map((item) => `
    <article class="advantage-card">
      <span class="advantage-icon" aria-hidden="true">${escapeHtml(iconText(item.icone || item.titre))}</span>
      <div>
        <h3>${escapeHtml(item.titre)}</h3>
        <p>${escapeHtml(item.texte)}</p>
      </div>
    </article>
  `).join("");
}

function applyImages(images = []) {
  sortActive(images).filter((image) => hasText(image.zone)).forEach((image) => {
    const zone = resolveImageZone(image.zone);
    const slots = [
      ...document.querySelectorAll(`[data-image-zone="${cssEscape(zone)}"]`),
      document.getElementById(zone),
    ].filter(Boolean);
    if (!slots.length || !image.lien_drive) return;
    slots.forEach((slot) => {
      slot.setAttribute("src", resolveImageUrl(image.lien_drive));
      if (image.alt) slot.setAttribute("placeholder", image.alt);
    });
  });
}

function normalizeParams(rows = []) {
  if (Array.isArray(rows[0])) {
    return Object.fromEntries(rows.map(([key, value]) => [normalizeKey(key), value]));
  }
  return Object.fromEntries(rows.map((row) => [normalizeKey(row.cle), row.valeur]));
}

function byZone(rows = []) {
  return Object.fromEntries(rows.map((row) => [normalizeKey(row.zone), row]));
}

function withTextAliases(textes) {
  return {
    ...textes,
    infos: textes.infos || textes.contact,
    produits: textes.produits || textes.produits_titre,
    ardoise: textes.ardoise || textes.ardoise_titre,
  };
}

function sortActive(items = []) {
  return items
    .filter((item) => normalizeKey(item.actif || "oui") !== "non")
    .sort((a, b) => Number(a.ordre || 0) - Number(b.ordre || 0));
}

function productCategory(item = {}) {
  const raw = item.categorie || item.catégorie || item.category || "";
  const normalized = normalizeKey(raw);
  const aliases = {
    fruit: "Fruits",
    fruits: "Fruits",
    legume: "Légumes",
    legumes: "Légumes",
    légume: "Légumes",
    légumes: "Légumes",
    verger: "Produits du verger",
    "produits du verger": "Produits du verger",
    jus: "Jus & boissons",
    boissons: "Jus & boissons",
    "jus & boissons": "Jus & boissons",
    local: "Produits locaux",
    locaux: "Produits locaux",
    "produits locaux": "Produits locaux",
    promo: "Promotions / lots",
    promotions: "Promotions / lots",
    lots: "Promotions / lots",
    "promotions / lots": "Promotions / lots",
  };
  return aliases[normalized] || raw || "Produits locaux";
}

function productPrice(item = {}) {
  return item.prix || item.price || "";
}

function productUnit(item = {}) {
  return item.unite || item.unité || item.unit || "";
}

function productOrigin(item = {}) {
  return item.origine || item.origin || "";
}

function productDetail(item = {}) {
  return item.detail
    || item.détail
    || item.detail_court
    || item["detail court"]
    || item["détail court"]
    || item.description
    || "";
}

function productStatus(item = {}) {
  return item.statut
    || item.status
    || item.badge
    || item["statut optionnel"]
    || "";
}

function statusLabel(value = "") {
  const labels = {
    nouveaute: "Nouveauté",
    nouveauté: "Nouveauté",
    promo: "Promo",
    promotion: "Promo",
    arrivage: "Arrivage",
    "bientot disponible": "Bientôt disponible",
    "bientôt disponible": "Bientôt disponible",
  };
  return labels[normalizeKey(value)] || "";
}

function isOrchardProduct(item = {}) {
  const haystack = normalizeKey(`${item.nom || ""} ${item.categorie || ""}`);
  return haystack.includes("verger")
    || haystack.includes("jus")
    || haystack.includes("compote")
    || haystack.includes("pomme");
}

function fallbackOrchardProducts() {
  return [
    { ordre: "1", nom: "Jus de pomme", categorie: "Jus & boissons", image_zone: "verger_jus_pomme", origine: "Tradipom", detail: "Pur jus du verger.", actif: "oui" },
    { ordre: "2", nom: "Jus pétillant", categorie: "Jus & boissons", image_zone: "verger_jus_petillant", origine: "Tradipom", detail: "Une boisson fruitée et festive.", actif: "oui" },
    { ordre: "3", nom: "Compote", categorie: "Produits du verger", image_zone: "verger_compote", origine: "Tradipom", detail: "Préparée avec les pommes du verger.", actif: "oui" },
    { ordre: "4", nom: "Pommes en sac", categorie: "Promotions / lots", image_zone: "verger_pommes_sac", origine: "Tradipom", detail: "Format familial pour la semaine.", statut: "promo", actif: "oui" },
  ];
}

function slugify(value = "") {
  return normalizeKey(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function cssEscape(value = "") {
  if (window.CSS && CSS.escape) return CSS.escape(value);
  return String(value).replace(/["\\]/g, "\\$&");
}

function resolveImageZone(zone = "") {
  const key = normalizeKey(zone);
  const aliases = {
    mg_0: "magasin_1",
    mg_1: "magasin_2",
    mg_2: "magasin_3",
    mg_3: "galerie_1",
    mg_4: "galerie_2",
  };
  return aliases[key] || key;
}

function hasText(value) {
  return String(value || "").trim().length > 0;
}

function compactHours(params) {
  return [params.horaires_semaine, params.horaires_samedi, params.horaires_dimanche]
    .filter(Boolean)
    .join(" · ")
    .replaceAll(" : ", " ")
    .replaceAll(" - ", "-");
}

function formatCity(params) {
  const ville = params.ville || "";
  const code = params.code_postal || "";
  if (!code || ville.startsWith(code)) return ville;
  return `${code} ${ville}`.trim();
}

function setMetaDescription(value) {
  if (!value) return;
  const meta = document.querySelector("meta[name='description']");
  if (meta) meta.setAttribute("content", value);
}

function formatPrice(price = "", unit = "") {
  const cleanUnit = unit
    .replace("EUR", "€")
    .replace("piece", "piece")
    .replace("pièce", "piece");
  return `${price} ${cleanUnit}`.trim();
}

function iconText(value = "") {
  const text = String(value).trim();
  return text.length > 2 ? text.slice(0, 1).toUpperCase() : text;
}

function resolveImageUrl(value) {
  if (!value) return "";
  if (!value.includes("drive.google.com")) return value;

  const match = value.match(/\/file\/d\/([^/]+)\//) || value.match(/[?&]id=([^&]+)/);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600` : value;
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    if (value !== undefined && value !== null) node.textContent = value;
  });
}

function normalizeKey(value = "") {
  return String(value).trim().toLowerCase();
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}
