
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDescription = document.getElementById('lightboxDescription');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-button').forEach(button => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.dataset.title;
    lightboxTitle.textContent = button.dataset.title;
    lightboxDescription.textContent = button.dataset.description;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
