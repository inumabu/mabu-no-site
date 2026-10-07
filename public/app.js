const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileMenu.hidden = open;
  menuButton.querySelector('span').textContent = open ? '＋' : '×';
});
mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '＋';
}));
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach((card) => {
    card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

const apiStatus = document.querySelector('#api-status');
fetch('/api/health').then((response) => {
  if (!response.ok) throw new Error('health check failed');
  return response.json();
}).then(() => {
  if (apiStatus) { apiStatus.textContent = 'HONO / ONLINE'; apiStatus.dataset.ready = 'true'; }
}).catch(() => {
  if (apiStatus) apiStatus.textContent = 'STATIC / READY';
});
