import { Footer } from '../components/Footer';
export function NotFound(): HTMLElement {
  const page = document.createElement('div');
  page.classList.add('page');

  const nav = document.createElement('nav');
  nav.classList.add('nav');

  const logo = document.createElement('a');
  logo.classList.add('nav__logo');
  logo.setAttribute('href', '/');
  logo.innerHTML = 'SWIFT<span>LY</span>';

  nav.appendChild(logo);

  const wrapper = document.createElement('div');
  wrapper.classList.add('not-found');

  const code = document.createElement('div');
  code.classList.add('not-found__code');
  code.textContent = '404';

  document.title = '404 | Swiftly';

  const title = document.createElement('h1');
  title.classList.add('not-found__title');
  title.textContent = 'Stránka nenalezena';

  const sub = document.createElement('p');
  sub.classList.add('not-found__sub');
  sub.textContent = 'Tato stránka neexistuje nebo byla přesunuta. Zkontroluj URL nebo se vrať na hlavní stránku.';

  const btn = document.createElement('button');
  btn.classList.add('not-found__btn');
  btn.textContent = '← Zpět domů';

  btn.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });

  wrapper.appendChild(code);
  wrapper.appendChild(title);
  wrapper.appendChild(sub);
  wrapper.appendChild(btn);

  page.appendChild(nav);
  page.appendChild(wrapper);
  page.appendChild(Footer());

  return page;
}