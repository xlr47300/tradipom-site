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
    { ordre: "1", nom: "Pommes", image_zone: "prod_1", actif: "oui" },
    { ordre: "2", nom: "Poires", image_zone: "prod_2", actif: "oui" },
    { ordre: "3", nom: "Fraises", image_zone: "prod_3", actif: "oui" },
    { ordre: "4", nom: "Tomates", image_zone: "prod_4", actif: "oui" },
    { ordre: "5", nom: "Courgettes", image_zone: "prod_5", actif: "oui" },
    { ordre: "6", nom: "Carottes", image_zone: "prod_6", actif: "oui" },
    { ordre: "7", nom: "Poireaux", image_zone: "prod_7", actif: "oui" },
    { ordre: "8", nom: "Prunes", image_zone: "prod_8", actif: "oui" },
    { ordre: "9", nom: "Melons", image_zone: "prod_9", actif: "oui" },
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
  const textes = byZone(data.textes);

  applyParams(parametres);
  applyTextes(textes, parametres);
  renderArdoise(data.ardoise);
  renderProducts(data.produits);
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
  setText("[data-hero-title]", mobile ? params.slogan_mobile : params.slogan);
  setText("[data-hero-text]", mobile
    ? params.description_hero_mobile || params.sous_titre
    : params.description_hero || params.sous_titre);

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
  const activeItems = sortActive(items);

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

  container.innerHTML = sortActive(items).map((item, index) => {
    const id = item.image_zone || `prod_${index + 1}`;
    return `
      <article class="product-item">
        <image-slot id="${escapeHtml(id)}" placeholder="${escapeHtml(item.nom)}" shape="circle"></image-slot>
        <span>${escapeHtml(item.nom)}</span>
      </article>
    `;
  }).join("");
}

function renderAdvantages(items = []) {
  const container = document.querySelector("[data-advantages-list]");
  if (!container) return;

  container.innerHTML = sortActive(items).map((item) => `
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
  sortActive(images).forEach((image) => {
    const slot = document.getElementById(image.zone);
    if (!slot || !image.lien_drive) return;
    slot.setAttribute("src", resolveImageUrl(image.lien_drive));
    if (image.alt) slot.setAttribute("placeholder", image.alt);
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

function sortActive(items = []) {
  return items
    .filter((item) => normalizeKey(item.actif || "oui") !== "non")
    .sort((a, b) => Number(a.ordre || 0) - Number(b.ordre || 0));
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
