// Lightbox code, see https://basiclightbox.electerious.com/ for more
// information

document.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if (!img) return;

  const src = img.dataset.full || img.src;
  const alt = img.getAttribute('alt') || '';

  let onEsc;
  const instance = basicLightbox.create(`<img src="${src}" alt="${alt}">`, {
    onShow: () => {
      document.body.classList.add('bl-open');
      onEsc = (ev) => {
        if (ev.key === 'Escape' || ev.key === 'Esc') instance.close();
      };
      document.addEventListener('keydown', onEsc);
    },
    onClose: () => {
      document.body.classList.remove('bl-open');
      document.removeEventListener('keydown', onEsc);
    }
  });
  instance.show();
});
