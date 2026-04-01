
async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return await res.json();
}

function makeCard(title, text) {
  return `<article class="card"><h3>${title}</h3><p>${text}</p></article>`;
}

function makeGallery(item) {
  return `
    <article class="gallery-card">
      <img src="${item.src}" alt="${item.title} by BC Fabrication">
      <div class="gallery-copy">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
    </article>
  `;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "";
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.href = value || "#";
}

function setImage(id, value, altText = "") {
  const el = document.getElementById(id);
  if (el && value) {
    el.src = value;
    if (altText) el.alt = altText;
  }
}

(async function init() {
  try {
    const site = await loadJson("content/site.json");
    const galleryRaw = await loadJson("content/gallery.json");
    const gallery = Array.isArray(galleryRaw) ? galleryRaw : (galleryRaw.items || []);

    document.title = site?.seo?.title || document.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && site?.seo?.description) metaDesc.setAttribute("content", site.seo.description);

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && site?.seo?.keywords) metaKeywords.setAttribute("content", site.seo.keywords);

    setText("brandName", site?.brand?.name);
    setText("brandTagline", site?.brand?.tagline);
    setText("footerBrand", site?.brand?.name);
    setText("footerLocation", site?.brand?.location);

    setText("footerPhone", site?.brand?.phone_display);
    setHref("footerPhone", site?.brand?.phone_link ? `tel:${site.brand.phone_link}` : "#");

    setText("footerEmail", site?.brand?.email);
    setHref("footerEmail", site?.brand?.email ? `mailto:${site.brand.email}` : "#");

    setText("heroEyebrow", site?.hero?.eyebrow || "METAL & COMPOSITE GATES");
    setText("heroTitle", site?.hero?.title);
    setText("heroText", site?.hero?.text);

    setText("heroPrimary", site?.hero?.primary_button || "View Gallery");
    setHref("heroPrimary", "#gallery");

    setText("heroSecondary", site?.hero?.secondary_button || "Send Enquiry");
    setHref("heroSecondary", "#enquiry");

    setImage("heroImage", site?.hero?.image || "assets/gallery-01.jpg", "BC Fabrication featured gate");

    setText("servicesEyebrow", site?.services_intro?.eyebrow);
    setText("servicesTitle", site?.services_intro?.title);
    setText("servicesText", site?.services_intro?.text);

    const servicesGrid = document.getElementById("servicesGrid");
    if (servicesGrid && Array.isArray(site?.services)) {
      servicesGrid.innerHTML = site.services.map(s => makeCard(s.title, s.text)).join("");
    }

    setText("galleryEyebrow", site?.gallery_intro?.eyebrow || "PROJECT GALLERY");
    setText("galleryTitle", site?.gallery_intro?.title || "Real BC Fabrication work");
    setText("galleryText", site?.gallery_intro?.text || "A selection of recent installations.");

    const galleryGrid = document.getElementById("galleryGrid");
    if (galleryGrid) {
      galleryGrid.innerHTML = gallery.map(makeGallery).join("");
    }

    setText("enquiryEyebrow", site?.enquiry_intro?.eyebrow || "ENQUIRY");
    setText("enquiryTitle", site?.enquiry_intro?.title || "Send an enquiry");
    setText("enquiryText", site?.enquiry_intro?.text || "Tell us what you need and we will get back to you.");

  } catch (err) {
    console.error(err);
  }
})();
