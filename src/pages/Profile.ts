import { Footer } from '../components/Footer.js';
type RouteParams = Record<string, string>;

interface MatchStat {
  map: string;
  agent: string;
  kills: number;
  deaths: number;
  assists: number;
  result: 'WIN' | 'LOSS';
  rr: number;
}

function createNav(): HTMLElement {
  const nav = document.createElement('nav');
  nav.classList.add('nav');

  const logo = document.createElement('a');
  logo.classList.add('nav__logo');
  logo.setAttribute('href', '/');
  logo.innerHTML = 'SWIFT<span>LY</span>';

  const links = document.createElement('div');
  links.classList.add('nav__links');

  const linkHome = document.createElement('a');
  linkHome.classList.add('nav__link');
  linkHome.setAttribute('href', '/');
  linkHome.textContent = 'Domů';

  links.appendChild(linkHome);
  nav.appendChild(logo);
  nav.appendChild(links);

  return nav;
}

function createProfileHeader(playerName: string, tag: string): HTMLElement {
  const header = document.createElement('div');
  header.classList.add('profile-header');

  const avatar = document.createElement('div');
  avatar.classList.add('profile-header__avatar');
  avatar.textContent = playerName.charAt(0).toUpperCase();

  const info = document.createElement('div');

  const name = document.createElement('div');
  name.classList.add('profile-header__name');
  name.textContent = playerName;

  const tagEl = document.createElement('div');
  tagEl.classList.add('profile-header__tag');
  tagEl.textContent = '#' + tag;

  info.appendChild(name);
  info.appendChild(tagEl);

  const rank = document.createElement('div');
  rank.classList.add('profile-header__rank');

  const rankLabel = document.createElement('div');
  rankLabel.classList.add('profile-header__rank-label');
  rankLabel.textContent = 'Aktuální rank';

  const rankValue = document.createElement('div');
  rankValue.classList.add('profile-header__rank-value');
  rankValue.textContent = 'Diamond 2';

  rank.appendChild(rankLabel);
  rank.appendChild(rankValue);

  header.appendChild(avatar);
  header.appendChild(info);
  header.appendChild(rank);

  return header;
}

function createStatsGrid(): HTMLElement {
  const grid = document.createElement('div');
  grid.classList.add('stats-grid');

  const stats = [
    { label: 'KDA Ratio', value: '2.31', accent: true },
    { label: 'Win Rate', value: '58%', sub: 'posledních 20 zápasů' },
    { label: 'Průměrné zabití', value: '18.4', sub: 'na zápas' },
    { label: 'Headshot %', value: '34%', sub: 'celková přesnost' },
  ];

  stats.forEach(({ label, value, sub, accent }) => {
    const card = document.createElement('div');
    card.classList.add('stat-card');

    const cardLabel = document.createElement('span');
    cardLabel.classList.add('stat-card__label');
    cardLabel.textContent = label;

    const cardValue = document.createElement('span');
    cardValue.classList.add('stat-card__value');
    if (accent) cardValue.classList.add('stat-card__value--accent');
    cardValue.textContent = value;

    card.appendChild(cardLabel);
    card.appendChild(cardValue);

    if (sub) {
      const cardSub = document.createElement('span');
      cardSub.classList.add('stat-card__sub');
      cardSub.textContent = sub;
      card.appendChild(cardSub);
    }

    grid.appendChild(card);
  });

  return grid;
}

function createMatchHistory(): HTMLElement {
  const wrapper = document.createElement('div');

  const heading = document.createElement('h2');
  heading.style.cssText = 'font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 1rem;';
  heading.textContent = 'Historie zápasů';

  const matches: MatchStat[] = [
    { map: 'Ascent',   agent: 'Jett',    kills: 24, deaths: 9,  assists: 4, result: 'WIN',  rr: +22 },
    { map: 'Bind',     agent: 'Reyna',   kills: 18, deaths: 14, assists: 2, result: 'LOSS', rr: -14 },
    { map: 'Haven',    agent: 'Omen',    kills: 20, deaths: 11, assists: 7, result: 'WIN',  rr: +18 },
    { map: 'Icebox',   agent: 'Sage',    kills: 11, deaths: 13, assists: 9, result: 'LOSS', rr: -12 },
    { map: 'Fracture', agent: 'Chamber', kills: 27, deaths: 8,  assists: 3, result: 'WIN',  rr: +25 },
  ];

  const table = document.createElement('div');
  table.style.cssText = 'display: flex; flex-direction: column; gap: 1px; background: var(--color-border); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden;';

  matches.forEach((match) => {
    const row = document.createElement('div');
    row.style.cssText = 'display: grid; grid-template-columns: 80px 100px 1fr 1fr auto; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: var(--color-bg-card); transition: background 150ms ease;';

    row.addEventListener('mouseenter', () => {
      row.style.background = 'var(--color-bg-elevated)';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = 'var(--color-bg-card)';
    });

    const resultBadge = document.createElement('span');
    resultBadge.style.cssText = [
      'font-family: var(--font-mono)',
      'font-size: 0.75rem',
      'font-weight: 700',
      'letter-spacing: 0.1em',
      'padding: 0.25rem 0.6rem',
      'border-radius: var(--radius-sm)',
      match.result === 'WIN'
        ? 'color: #4ade80; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.25);'
        : 'color: var(--color-accent-red); background: var(--color-accent-red-dim); border: 1px solid var(--color-border-accent);',
    ].join(';');
    resultBadge.textContent = match.result;

    const mapEl = document.createElement('span');
    mapEl.style.cssText = 'font-family: var(--font-ui); font-size: 0.9375rem; font-weight: 600; color: var(--color-text-primary);';
    mapEl.textContent = match.map;

    const agentEl = document.createElement('span');
    agentEl.style.cssText = 'font-family: var(--font-mono); font-size: 0.8125rem; color: var(--color-text-secondary);';
    agentEl.textContent = match.agent;

    const kdaEl = document.createElement('span');
    kdaEl.style.cssText = 'font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-text-primary);';
    kdaEl.textContent = match.kills + ' / ' + match.deaths + ' / ' + match.assists;

    const rrEl = document.createElement('span');
    const isPositive = match.rr > 0;
    rrEl.style.cssText = 'font-family: var(--font-mono); font-size: 0.875rem; font-weight: 700; text-align: right; color: ' + (isPositive ? '#4ade80' : 'var(--color-accent-red)') + ';';
    rrEl.textContent = (isPositive ? '+' : '') + match.rr + ' RR';

    row.appendChild(resultBadge);
    row.appendChild(mapEl);
    row.appendChild(agentEl);
    row.appendChild(kdaEl);
    row.appendChild(rrEl);
    table.appendChild(row);
  });

  wrapper.appendChild(heading);
  wrapper.appendChild(table);

  return wrapper;
}

export function ProfilePage(params: RouteParams): HTMLElement {
  const raw = decodeURIComponent(params['player'] ?? 'Unknown');
  const parts = raw.includes('#') ? raw.split('#') : [raw, 'EUW'];
  const playerName = parts[0];
  const tag = parts[1];

  const page = document.createElement('div');
  page.classList.add('page');

  const nav = createNav();

  const section = document.createElement('section');
  section.classList.add('section');

  const container = document.createElement('div');
  container.classList.add('container');

  document.title = playerName + '#' + tag + ' | Swiftly';

  const profileHeader = createProfileHeader(playerName, tag);
  const statsGrid = createStatsGrid();
  const matchHistory = createMatchHistory();

  container.appendChild(profileHeader);
  container.appendChild(statsGrid);
  container.appendChild(document.createElement('br'));
  container.appendChild(matchHistory);

  section.appendChild(container);
  page.appendChild(nav);
  page.appendChild(section);
  page.appendChild(Footer());

  return page;
}
