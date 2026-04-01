
async function loadJson(path) {
  const res = await fetch(path);
  return await res.json();
}
function makeCard(title, text) {
  return `<article class="card"><h3>${title}</h3><p>${text}</p></article>`;
}
function makeGallery(item) {
  return `<article class="gallery-card"><img src="${item.src}" alt="${item.title} by BC Fabrication"><div class="gallery-copy"><h3>${item.title}</h3><p>${item.description}</p></div></article>`;
}
(async function init() {
  const site = await loadJson('content/site.json');
  const galleryRaw = await loadJson('content/gallery.json');
  const gallery = Array.isArray(galleryRaw) ? galleryRaw : (galleryRaw.items || []);

  document.title = site.seo.title;
  document.querySelector('meta[name="description"]').setAttribute('content', site.seo.description);
  document.querySelector('meta[name="keywords"]').setAttribute('content', site.seo.keywords);



  servicesEyebrow.textContent = site.services_intro.eyebrow;
  servicesTitle.textContent = site.services_intro.title;
  servicesText.textContent = site.services_intro.text;
  servicesGrid.innerHTML = site.services.map(s => makeCard(s.title, s.text)).join('');

  galleryEyebrow.textContent = site.gallery_intro.eyebrow;
  galleryTitle.textContent = site.gallery_intro.title;
  galleryText.textContent = site.gallery_intro.text;
  galleryGrid.innerHTML = gallery.map(makeGallery).join('');

  aboutEyebrow.textContent = site.about.eyebrow;
  aboutTitle.textContent = site.about.title;
  aboutGrid.innerHTML = site.about.items.map(s => makeCard(s.title, s.text)).join('');

  seoEyebrow.textContent = site.seo_section.eyebrow;
  seoTitle.textContent = site.seo_section.title;
  seoGrid.innerHTML = site.seo_section.items.map(s => makeCard(s.title, s.text)).join('');

  enquiryEyebrow.textContent = site.enquiry.eyebrow;
  enquiryTitle.textContent = site.enquiry.title;
  enquiryText.textContent = site.enquiry.text;
  enquiryButton.textContent = site.enquiry.button;
  enquiryNotes.textContent = site.enquiry.notes;
})();
