import { Footer } from '../components/Footer.js';

export function Terms(): HTMLElement {
  document.title = 'Terms of Service | Swiftly';
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
  iconWrap.style.cssText = 'font-size: 2.5rem; color: var(--color-accent-red); margin-bottom: 1rem;';
  iconWrap.innerHTML = '<i class="fa-solid fa-file-contract"></i>';
  const heading = document.createElement('h1');
  heading.style.cssText = 'font-family: var(--font-display); font-size: 2.25rem; font-weight: 800; text-transform: uppercase; color: var(--color-text-primary); margin-bottom: 0.5rem;';
  heading.textContent = 'Terms of Service';
  const updated = document.createElement('p');
  updated.style.cssText = 'font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-muted); letter-spacing: 0.1em;';
  updated.textContent = 'Posledni aktualizace: 3. března 2026 ';
  const divider = document.createElement('div');
  divider.style.cssText = 'width: 48px; height: 2px; background: var(--color-accent-red); margin-top: 1.5rem;';
  hero.appendChild(iconWrap);
  hero.appendChild(heading);
  hero.appendChild(updated);
  hero.appendChild(divider);
  type Row = { icon: string; title: string; body: string };
  const rows: Row[] = [
  {
    icon: 'fa-solid fa-circle-check',
    title: 'Přijetí podmínek',
    body:
      'Používáním platformy Swiftly vyjadřujete souhlas s těmito Podmínkami služby. Pokud s nimi nesouhlasíte, nejste oprávněni službu používat.'
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Popis služby',
    body:
      'Swiftly je nezávislá, neoficiální fanouškovská platforma zaměřená na zobrazování statistik hry VALORANT. Platforma není nijak spojena, podporována ani sponzorována společností Riot Games, Inc. Data jsou získávána prostřednictvím veřejně dostupných nebo oficiálních API rozhraní.'
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Přesnost dat',
    body:
      'Veškeré statistiky a informace jsou poskytovány pouze pro informační účely. Negarantujeme jejich úplnost, přesnost ani aktuálnost.'
  },
  {
    icon: 'fa-solid fa-triangle-exclamation',
    title: 'Omezení odpovědnosti',
    body:
      'Provozovatel platformy nenese odpovědnost za jakékoli přímé či nepřímé škody vzniklé v souvislosti s používáním nebo nemožností používat tuto službu.'
  },
  {
    icon: 'fa-solid fa-ban',
    title: 'Zakázané jednání',
    body:
      'Je zakázáno službu zneužívat, pokoušet se o neoprávněný přístup, provádět automatizované scrapování dat, reverzní inženýrství nebo narušovat bezpečnost či běžný provoz platformy.'
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Soulad s pravidly Riot Games',
    body:
      'Platforma funguje v souladu s podmínkami Riot Games Developer Policy. V případě změny podmínek ze strany Riot Games může dojít k omezení nebo ukončení některých funkcí.'
  },
  {
    icon: 'fa-solid fa-trademark',
    title: 'Duševní vlastnictví',
    body:
      'VALORANT, Riot Games a související prvky jsou ochranné známky společnosti Riot Games, Inc. Swiftly si nenárokuje žádná práva k duševnímu vlastnictví společnosti Riot Games.'
  },
  {
    icon: 'fa-solid fa-power-off',
    title: 'Ukončení přístupu',
    body:
      'Provozovatel si vyhrazuje právo kdykoli bez předchozího upozornění omezit nebo ukončit přístup ke službě v případě porušení těchto podmínek.'
  },
  {
    icon: 'fa-solid fa-pen-to-square',
    title: 'Změny podmínek',
    body:
      'Tyto podmínky mohou být kdykoli upraveny. Pokračování v používání služby po jejich změně znamená souhlas s aktualizovaným zněním.'
  }
];

  const list = document.createElement('div');

  list.style.cssText = 'display: flex; flex-direction: column; gap: 1.5rem;';

  rows.forEach(({ icon, title, body }) => {

    const card = document.createElement('div');

    card.style.cssText = 'display: flex; gap: 1.25rem; padding: 1.5rem; background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); transition: border-color 150ms ease;';
    
    card.addEventListener('mouseenter', () => { card.style.borderColor = 'var(--color-border-accent)'; });
    
    card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--color-border)'; });
    
    const iconEl = document.createElement('div');
    
    iconEl.style.cssText = 'flex-shrink: 0; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: var(--color-accent-red-dim); border-radius: var(--radius-sm); color: var(--color-accent-red); font-size: 1rem; margin-top: 2px;';
    
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