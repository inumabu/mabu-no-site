const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');

const setMenuState = (open) => {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  mobileMenu.hidden = !open;
  const icon = menuButton.querySelector('span');
  if (icon) icon.textContent = open ? '×' : '＋';
};

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuState(!open);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    setMenuState(false);
    menuButton.focus();
  }
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => {
    item.classList.remove('is-active');
    item.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('is-active');
  button.setAttribute('aria-pressed', 'true');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach((card) => {
    card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

const year = document.querySelector('#current-year');
if (year) year.textContent = String(new Date().getFullYear());
