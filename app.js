const galleryItems = [
  {
    src: "assets/gallery-01.jpg",
    title: "Side Gate",
    description: "Bespoke metal side gate installed in Bolton."
  },
  {
    src: "assets/gallery-02.jpg",
    title: "Driveway Gate",
    description: "Custom driveway gate with powder-coated finish."
  },
  {
    src: "assets/gallery-03.jpg",
    title: "Composite Gate",
    description: "Modern composite gate with privacy design."
  },
  {
    src: "assets/gallery-04.jpg",
    title: "Metal Gate",
    description: "Strong fabricated metal gate built to last."
  },
  {
    src: "assets/gallery-05.jpg",
    title: "Bespoke Gate",
    description: "Made-to-measure gate with a durable finish."
  },
  {
    src: "assets/gallery-06.jpg",
    title: "Powder-Coated Gate",
    description: "High-quality fabricated gate for long-lasting performance."
  }
];

function makeGalleryCard(item) {
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

const galleryGrid = document.getElementById("galleryGrid");

if (galleryGrid) {
  galleryGrid.innerHTML = galleryItems.map(makeGalleryCard).join("");
}
