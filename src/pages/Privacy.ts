import { Footer } from '../components/Footer.js';

export function Privacy(): HTMLElement {
  document.title = 'Privacy Policy | Swiftly';
  const page = document.createElement('div');
  page.classList.add('page');
  const nav = document.createElement('nav');
  nav.classList.add('nav');
  const logo = document.createElement('a');
  logo.classList.add('nav__logo');
  logo.setAttribute('href', '/');
  logo.innerHTML = 'SWIFT<span>LY</span>';
  nav.appendChild(logo);
  const section = document.createElement('section');
  section.classList.add('section');
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.maxWidth = '780px';
  const hero = document.createElement('div');
  hero.style.cssText = 'margin-bottom: 3rem;';
  const iconWrap = document.createElement('div');
  iconWrap.style.cssText = 'font-size: 2.5rem; color: var(--color-accent-cyan); margin-bottom: 1rem;';
  iconWrap.innerHTML = '<i class="fa-solid fa-shield-halved"></i>';
  const heading = document.createElement('h1');
  heading.textContent = 'Privacy Policy';
  const updated = document.createElement('p');
  updated.textContent = 'Posledni aktualizace: 3. března 2026';
  const divider = document.createElement('div');
  divider.style.cssText = 'width: 48px; height: 2px; background: var(--color-accent-cyan); margin-top: 1.5rem;';
  hero.appendChild(iconWrap);
  hero.appendChild(heading);
  hero.appendChild(updated);
  hero.appendChild(divider);

  interface Row { icon: string; title: string; body: string; }
  const rows: Row[] = [
  {
    icon: 'fa-solid fa-user-shield',
    title: 'Správce údajů',
    body:
      'Provozovatelem platformy Swiftly je její vlastník (dále jen „provozovatel“). V případě dotazů ohledně ochrany osobních údajů nás můžete kontaktovat prostřednictvím kontaktního e-mailu uvedeného na této platformě.'
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Jaké údaje zpracováváme',
    body:
      'Swiftly nevyžaduje registraci ani nevytváří uživatelské účty. Při vyhledávání je zpracováváno pouze herní jméno a tag, které uživatel zadává dobrovolně za účelem zobrazení statistik. Tyto údaje nejsou ukládány do databáze platformy.'
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Technické údaje',
    body:
      'Při přístupu na platformu může docházet ke zpracování technických údajů, jako je IP adresa, typ zařízení nebo informace o prohlížeči. Tyto údaje jsou zpracovávány poskytovatelem hostingu za účelem zajištění bezpečnosti a provozu služby.'
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Právní základ zpracování',
    body:
      'Technické údaje jsou zpracovávány na základě oprávněného zájmu provozovatele, kterým je zajištění bezpečnosti, stability a ochrany platformy před zneužitím.'
  },
  {
    icon: 'fa-solid fa-clock',
    title: 'Doba uchování',
    body:
      'Swiftly osobní údaje aktivně neuchovává. Technické logy mohou být uchovávány poskytovatelem hostingu po dobu nezbytně nutnou k zajištění bezpečnosti a provozu služby.'
  },
  {
    icon: 'fa-solid fa-share-nodes',
    title: 'Předávání údajů třetím stranám',
    body:
      'Platforma může využívat služeb poskytovatelů hostingu nebo CDN. V takovém případě může docházet ke zpracování technických údajů těmito subjekty výhradně za účelem provozu služby. Údaje nejsou prodávány ani poskytovány pro marketingové účely.'
  },
  {
    icon: 'fa-solid fa-link',
    title: 'Napojení na Riot Games',
    body:
      'Swiftly využívá oficiální nebo veřejné API společnosti Riot Games pro získávání herních statistik. Nedochází k přístupu k přihlašovacím údajům uživatelů ani k propojení s jejich Riot účtem.'
  },
  {
    icon: 'fa-solid fa-cookie-bite',
    title: 'Cookies',
    body:
      'Platforma nepoužívá sledovací ani marketingové cookies. Mohou být používány pouze technické cookies nezbytné pro správné fungování webu.'
  },
  {
    icon: 'fa-solid fa-user-check',
    title: 'Práva uživatelů',
    body:
      'V souladu s platnými právními předpisy máte právo požadovat informace o zpracování osobních údajů, jejich opravu nebo omezení zpracování. Vzhledem k tomu, že platforma osobní údaje aktivně neuchovává, je rozsah těchto práv omezen na technické údaje zpracovávané poskytovatelem hostingu.'
  },
  {
    icon: 'fa-solid fa-pen-to-square',
    title: 'Změny zásad',
    body:
      'Tyto zásady ochrany osobních údajů mohou být kdykoli aktualizovány. Aktuální verze je vždy zveřejněna na této stránce.'
  }
];
  const list = document.createElement('div');
  list.style.cssText = 'display: flex; flex-direction: column; gap: 1.5rem;';
  rows.forEach(({ icon, title, body }) => {
    const card = document.createElement('div');
    card.style.cssText = 'display: flex; gap: 1.25rem; padding: 1.5rem; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); transition: border-color 150ms ease;';
    card.addEventListener('mouseenter', () => { card.style.borderColor = 'rgba(0,229,255,0.3)'; });
    card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--color-border)'; });
    const iconEl = document.createElement('div');
    iconEl.style.cssText = 'flex-shrink: 0; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--color-accent-cyan-dim); border-radius: var(--radius-sm); color: var(--color-accent-cyan); font-size: 1rem; margin-top: 2px;';
    iconEl.innerHTML = '<i class="' + icon + '"></i>';
    const contentEl = document.createElement('div');
    const cardTitle = document.createElement('h2');
    cardTitle.style.cssText = 'font-family: var(--font-display); font-size: 1rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--color-text-primary); margin-bottom: 0.5rem;';
    cardTitle.textContent = title;
    const cardBody = document.createElement('p');
    cardBody.style.cssText = 'font-size: 0.9375rem; line-height: 1.7; color: var(--color-text-secondary);';
    cardBody.textContent = body;
    contentEl.appendChild(cardTitle);
    contentEl.appendChild(cardBody);
    card.appendChild(iconEl);
    card.appendChild(contentEl);
    list.appendChild(card);
  });

  container.appendChild(hero);
  container.appendChild(list);
  section.appendChild(container);
  page.appendChild(nav);
  page.appendChild(section);
  page.appendChild(Footer());
  return page;
}