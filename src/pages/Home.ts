import { Footer } from '../components/Footer.js';
import { Router } from '../router/Router';

export function Home(): HTMLElement {
  const page = document.createElement('div');
  page.classList.add('page');

  const nav = document.createElement('nav');
  nav.classList.add('nav');

  const logo = document.createElement('a');
  logo.classList.add('nav__logo');
  logo.setAttribute('href', '/');
  logo.innerHTML = 'SWIFT<span>LY</span>';

  const links = document.createElement('div');
  links.classList.add('nav__links');

  const linkHome = document.createElement('a');
  linkHome.classList.add('nav__link', 'nav__link--active');
  linkHome.setAttribute('href', '/');
  linkHome.textContent = 'Domů';

  links.appendChild(linkHome);
  nav.appendChild(logo);
  nav.appendChild(links);

  const hero = document.createElement('section');
  hero.classList.add('hero');

  const eyebrow = document.createElement('p');
  eyebrow.classList.add('hero__eyebrow');
  eyebrow.textContent = '// Sleduj své statistiky';

  document.title = 'Swiftly';

  const title = document.createElement('h1');
  title.classList.add('hero__title');
  title.innerHTML = 'Dominuj <span>žebříčku</span>';

  const subtitle = document.createElement('p');
  subtitle.classList.add('hero__subtitle');
  subtitle.textContent = 'Analyzuj výkon hráčů, sleduj KDA, win rate a další statistiky v reálném čase.';

  const form = document.createElement('div');
  form.classList.add('search-form');

  const input = document.createElement('input');
  input.classList.add('search-form__input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'HráčskéJméno#EUW');
  input.setAttribute('spellcheck', 'false');
  input.setAttribute('autocomplete', 'off');

  const btn = document.createElement('button');
  btn.classList.add('search-form__btn');
  btn.textContent = 'Hledat';

  btn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) return;

    const encoded = encodeURIComponent(value);
    const router = (window as any).__router as Router;
    if (router) {
      router.navigate('/profile/' + encoded);
    }
  });

  input.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return;
    btn.click();
  });

  form.appendChild(input);
  form.appendChild(btn);
  hero.appendChild(eyebrow);
  hero.appendChild(title);
  hero.appendChild(subtitle);
  hero.appendChild(form);

  const section = document.createElement('section');
  section.classList.add('section');

  const container = document.createElement('div');
  container.classList.add('container');

  const grid = document.createElement('div');
  grid.classList.add('stats-grid');

  const stats = [
    { label: 'Aktivních hráčů', value: '14.2M', sub: 'celosvětově' },
    { label: 'Odehraných zápasů', value: '980K', sub: 'za posledních 24h' },
    { label: 'Průměrné KDA', value: '1.24', sub: 'všechny ranky' },
    { label: 'Sledovaných profilů', value: '3.8M', sub: 'na této platformě' },
  ];

  stats.forEach(({ label, value, sub }) => {
    const card = document.createElement('div');
    card.classList.add('stat-card');

    const cardLabel = document.createElement('span');
    cardLabel.classList.add('stat-card__label');
    cardLabel.textContent = label;

    const cardValue = document.createElement('span');
    cardValue.classList.add('stat-card__value');
    cardValue.textContent = value;

    const cardSub = document.createElement('span');
    cardSub.classList.add('stat-card__sub');
    cardSub.textContent = sub;

    card.appendChild(cardLabel);
    card.appendChild(cardValue);
    card.appendChild(cardSub);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  page.appendChild(nav);
  page.appendChild(hero);
  page.appendChild(section);
  page.appendChild(Footer());

  return page;
}