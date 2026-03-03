import { Footer } from '../components/Footer.js';
type RouteParams = Record<string, string>;

interface MatchStat {
  map: string;
  mapImg: string;
  agent: string;
  agentImg: string;
  kills: number;
  deaths: number;
  assists: number;
  hs: number;
  score: string;
  result: 'WIN' | 'LOSS';
  rr: number;
}

const MAP_IMGS: Record<string, string> = {
  Ascent:   'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/splash.png',
  Bind:     'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/splash.png',
  Haven:    'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7825ad97bd2d/splash.png',
  Fracture: 'https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/splash.png',
  Pearl:    'https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/splash.png',
};

const AGENT_IMGS: Record<string, string> = {
  Jett:    'https://media.valorant-api.com/agents/add6443a-41bd-e414-f6ad-e58d267f4e95/displayiconsmall.png',
  Reyna:   'https://media.valorant-api.com/agents/a3bfb853-43b2-7238-a4f1-ad90e9e46bcc/displayiconsmall.png',
  Omen:    'https://media.valorant-api.com/agents/8e253930-4c05-31dd-1b6c-968525494517/displayiconsmall.png',
  Chamber: 'https://media.valorant-api.com/agents/22697054-9a09-be1e-c9a4-11a7b8179513/displayiconsmall.png',
  Sage:    'https://media.valorant-api.com/agents/569fdd95-4d10-43ab-ca70-79becc718b46/displayiconsmall.png',
};

const DEMO_MATCHES: MatchStat[] = [
  { map: 'Ascent',   mapImg: MAP_IMGS.Ascent,   agent: 'Jett',    agentImg: AGENT_IMGS.Jett,    kills: 24, deaths: 9,  assists: 4, hs: 41, score: '13-7',  result: 'WIN',  rr: 22  },
  { map: 'Bind',     mapImg: MAP_IMGS.Bind,     agent: 'Reyna',   agentImg: AGENT_IMGS.Reyna,   kills: 18, deaths: 14, assists: 2, hs: 28, score: '9-13',  result: 'LOSS', rr: -14 },
  { map: 'Haven',    mapImg: MAP_IMGS.Haven,    agent: 'Omen',    agentImg: AGENT_IMGS.Omen,    kills: 20, deaths: 11, assists: 7, hs: 35, score: '13-10', result: 'WIN',  rr: 18  },
  { map: 'Fracture', mapImg: MAP_IMGS.Fracture, agent: 'Chamber', agentImg: AGENT_IMGS.Chamber, kills: 27, deaths: 8,  assists: 3, hs: 44, score: '13-5',  result: 'WIN',  rr: 25  },
  { map: 'Pearl',    mapImg: MAP_IMGS.Pearl,    agent: 'Sage',    agentImg: AGENT_IMGS.Sage,    kills: 11, deaths: 13, assists: 9, hs: 22, score: '10-13', result: 'LOSS', rr: -12 },
];

function createNav(): HTMLElement {
  const nav = document.createElement('nav');
  nav.classList.add('nav');
  const logo = document.createElement('a');
  logo.classList.add('nav__logo');
  logo.setAttribute('href', '/');
  logo.innerHTML = 'SWIFT<span>LY</span>';
  const links = document.createElement('div');
  links.classList.add('nav__links');
  const home = document.createElement('a');
  home.classList.add('nav__link');
  home.setAttribute('href', '/');
  home.innerHTML = '<i class="fa-solid fa-house" style="margin-right:0.35rem;font-size:0.8rem;"></i>Dom\u016f';
  links.appendChild(home);
  nav.appendChild(logo);
  nav.appendChild(links);
  return nav;
}

function createStatCard(label: string, value: string, color?: string): HTMLElement {
  const card = document.createElement('div');
  card.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.3rem;padding:1.25rem 0.75rem;background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-md);flex:1;min-width:90px;transition:border-color 150ms ease;';
  card.addEventListener('mouseenter', () => { card.style.borderColor = 'var(--color-border-accent)'; });
  card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--color-border)'; });
  const val = document.createElement('span');
  val.style.cssText = 'font-family:var(--font-display);font-size:1.55rem;font-weight:800;line-height:1;color:' + (color ?? 'var(--color-text-primary)') + ';';
  val.textContent = value;
  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-family:var(--font-mono);font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--color-text-muted);';
  lbl.textContent = label;
  card.appendChild(val);
  card.appendChild(lbl);
  return card;
}

function createMatchRow(m: MatchStat): HTMLElement {
  const win = m.result === 'WIN';
  const row = document.createElement('div');
  row.style.cssText = 'display:grid;grid-template-columns:4px 76px 52px auto 1fr 86px 62px 68px;align-items:stretch;background:var(--color-bg-card);border-bottom:1px solid var(--color-border);transition:background 120ms ease;overflow:hidden;';
  row.addEventListener('mouseenter', () => { row.style.background = 'var(--color-bg-elevated)'; });
  row.addEventListener('mouseleave', () => { row.style.background = 'var(--color-bg-card)'; });

  const stripe = document.createElement('div');
  stripe.style.cssText = 'background:' + (win ? '#4ade80' : 'var(--color-accent-red)') + ';';

  const mapCell = document.createElement('div');
  mapCell.style.cssText = 'position:relative;overflow:hidden;height:58px;';
  const mapImg = document.createElement('img');
  mapImg.src = m.mapImg;
  mapImg.alt = m.map;
  mapImg.style.cssText = 'width:100%;height:100%;object-fit:cover;opacity:0.65;display:block;';
  const mapLbl = document.createElement('span');
  mapLbl.style.cssText = 'position:absolute;bottom:3px;left:4px;font-family:var(--font-mono);font-size:0.5rem;letter-spacing:0.1em;text-transform:uppercase;color:#fff;text-shadow:0 1px 4px #000;white-space:nowrap;';
  mapLbl.textContent = m.map;
  mapCell.appendChild(mapImg);
  mapCell.appendChild(mapLbl);

  const agentCell = document.createElement('div');
  agentCell.style.cssText = 'display:flex;align-items:center;justify-content:center;background:var(--color-bg-elevated);border-left:1px solid var(--color-border);';
  const agentImg = document.createElement('img');
  agentImg.src = m.agentImg;
  agentImg.alt = m.agent;
  agentImg.style.cssText = 'width:38px;height:38px;object-fit:contain;object-position:top;';
  agentCell.appendChild(agentImg);

  const resultCell = document.createElement('div');
  resultCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 0.875rem;gap:0.2rem;border-left:1px solid var(--color-border);';
  const badge = document.createElement('span');
  badge.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;font-weight:700;letter-spacing:0.1em;padding:0.15rem 0.45rem;border-radius:2px;color:' + (win ? '#4ade80' : 'var(--color-accent-red)') + ';background:' + (win ? 'rgba(74,222,128,0.1)' : 'var(--color-accent-red-dim)') + ';';
  badge.textContent = m.result;
  const scoreEl = document.createElement('span');
  scoreEl.style.cssText = 'font-family:var(--font-display);font-size:0.775rem;font-weight:700;color:var(--color-text-secondary);';
  scoreEl.textContent = m.score;
  resultCell.appendChild(badge);
  resultCell.appendChild(scoreEl);

  const spacer = document.createElement('div');

  const kdaCell = document.createElement('div');
  kdaCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.15rem;border-left:1px solid var(--color-border);';
  const kdaVal = document.createElement('span');
  kdaVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;color:var(--color-text-primary);letter-spacing:0.04em;';
  kdaVal.textContent = m.kills + ' / ' + m.deaths + ' / ' + m.assists;
  const kdaLbl = document.createElement('span');
  kdaLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-text-muted);';
  kdaLbl.textContent = 'K / D / A';
  kdaCell.appendChild(kdaVal);
  kdaCell.appendChild(kdaLbl);

  const hsCell = document.createElement('div');
  hsCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.15rem;border-left:1px solid var(--color-border);';
  const hsVal = document.createElement('span');
  hsVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;color:var(--color-accent-cyan);';
  hsVal.textContent = m.hs + '%';
  const hsLbl = document.createElement('span');
  hsLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.55rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-text-muted);';
  hsLbl.textContent = 'HS';
  hsCell.appendChild(hsVal);
  hsCell.appendChild(hsLbl);

  const rrCell = document.createElement('div');
  rrCell.style.cssText = 'display:flex;align-items:center;justify-content:center;border-left:1px solid var(--color-border);';
  const rrVal = document.createElement('span');
  rrVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;font-weight:700;color:' + (m.rr > 0 ? '#4ade80' : 'var(--color-accent-red)') + ';';
  rrVal.textContent = (m.rr > 0 ? '+' : '') + m.rr + ' RR';
  rrCell.appendChild(rrVal);

  row.appendChild(stripe);
  row.appendChild(mapCell);
  row.appendChild(agentCell);
  row.appendChild(resultCell);
  row.appendChild(spacer);
  row.appendChild(kdaCell);
  row.appendChild(hsCell);
  row.appendChild(rrCell);
  return row;
}

export function Profile(params: RouteParams): HTMLElement {
  const raw = decodeURIComponent(params['player'] ?? 'Unknown');
  const [playerName, tag] = raw.includes('#') ? raw.split('#') : [raw, 'EUW'];
  const isDemo = playerName.toLowerCase() === 'test' && tag.toLowerCase() === 'test';

  document.title = playerName + '#' + tag + ' | Swiftly';

  const page = document.createElement('div');
  page.classList.add('page');
  page.appendChild(createNav());

  const section = document.createElement('section');
  section.classList.add('section');
  const container = document.createElement('div');
  container.classList.add('container');

  if (isDemo) {
    const banner = document.createElement('div');
    banner.style.cssText = 'display:flex;align-items:center;gap:0.75rem;padding:0.65rem 1rem;background:rgba(255,196,0,0.07);border:1px solid rgba(255,196,0,0.2);border-radius:var(--radius-sm);margin-bottom:1.5rem;';
    banner.innerHTML = '<i class="fa-solid fa-flask" style="color:#ffc400;font-size:0.85rem;flex-shrink:0;"></i>'
      + '<span style="font-family:var(--font-mono);font-size:0.7rem;letter-spacing:0.08em;color:#ffc400;">'
      + 'DEMO \u00da\u010cET \u2014 zobrazen\u00e1 data jsou fiktivn\u00ed a slou\u017e\u00ed pouze pro uk\u00e1zku platformy'
      + '</span>';
    container.appendChild(banner);
  }

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;gap:1.5rem;padding:1.5rem;background:var(--color-bg-card);border:1px solid var(--color-border);border-radius:var(--radius-lg);margin-bottom:1rem;flex-wrap:wrap;';

  const avatarWrap = document.createElement('div');
  avatarWrap.style.cssText = 'position:relative;flex-shrink:0;';
  const avatar = document.createElement('div');
  avatar.style.cssText = 'width:68px;height:68px;border-radius:50%;background:var(--color-bg-elevated);border:2px solid var(--color-border-accent);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.75rem;font-weight:800;color:var(--color-accent-red);';
  avatar.textContent = playerName.charAt(0).toUpperCase();
  const dot = document.createElement('div');
  dot.style.cssText = 'position:absolute;bottom:2px;right:2px;width:12px;height:12px;background:#4ade80;border-radius:50%;border:2px solid var(--color-bg-card);box-shadow:0 0 6px rgba(74,222,128,0.5);';
  avatarWrap.appendChild(avatar);
  avatarWrap.appendChild(dot);

  const nameBlock = document.createElement('div');
  nameBlock.style.cssText = 'flex:1;min-width:0;';
  const nameEl = document.createElement('div');
  nameEl.style.cssText = 'font-family:var(--font-display);font-size:1.55rem;font-weight:800;color:var(--color-text-primary);line-height:1;';
  nameEl.textContent = playerName;
  const tagEl = document.createElement('div');
  tagEl.style.cssText = 'font-family:var(--font-mono);font-size:0.75rem;color:var(--color-text-muted);margin-top:0.3rem;margin-bottom:0.65rem;';
  tagEl.textContent = '#' + tag;
  const chips = document.createElement('div');
  chips.style.cssText = 'display:flex;gap:0.5rem;flex-wrap:wrap;';
  const chipDefs: [string, string, string][] = [
    ['EU West', 'var(--color-text-muted)', 'var(--color-bg-elevated)'],
    ['Competitive', 'var(--color-accent-cyan)', 'rgba(0,229,255,0.08)'],
  ];
  chipDefs.forEach(([txt, color, bg]) => {
    const chip = document.createElement('span');
    chip.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.2rem 0.55rem;border-radius:3px;color:' + color + ';background:' + bg + ';';
    chip.textContent = txt;
    chips.appendChild(chip);
  });
  nameBlock.appendChild(nameEl);
  nameBlock.appendChild(tagEl);
  nameBlock.appendChild(chips);

  const rankBlock = document.createElement('div');
  rankBlock.style.cssText = 'display:flex;flex-direction:column;align-items:flex-end;gap:0.3rem;';
  const rankLbl = document.createElement('span');
  rankLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.6rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--color-text-muted);';
  rankLbl.textContent = 'Aktu\u00e1ln\u00ed rank';
  const rankVal = document.createElement('span');
  rankVal.style.cssText = 'font-family:var(--font-display);font-size:1.4rem;font-weight:800;color:var(--color-accent-cyan);line-height:1;';
  rankVal.textContent = 'Diamond 2';
  const rrDisplay = document.createElement('span');
  rrDisplay.style.cssText = 'font-family:var(--font-mono);font-size:0.7rem;color:var(--color-text-secondary);';
  rrDisplay.textContent = '62 RR';
  rankBlock.appendChild(rankLbl);
  rankBlock.appendChild(rankVal);
  rankBlock.appendChild(rrDisplay);

  header.appendChild(avatarWrap);
  header.appendChild(nameBlock);
  header.appendChild(rankBlock);

  const statsRow = document.createElement('div');
  statsRow.style.cssText = 'display:flex;gap:0.625rem;margin-bottom:1.5rem;flex-wrap:wrap;';
  statsRow.appendChild(createStatCard('KDA', '2.31', 'var(--color-accent-red)'));
  statsRow.appendChild(createStatCard('Win Rate', '58%'));
  statsRow.appendChild(createStatCard('HS %', '34%', 'var(--color-accent-cyan)'));
  statsRow.appendChild(createStatCard('Z\u00e1pasy', '312'));
  statsRow.appendChild(createStatCard('ACS', '241'));
  statsRow.appendChild(createStatCard('Kills / Z', '18.4'));

  const matchHeading = document.createElement('div');
  matchHeading.style.cssText = 'display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;';
  const matchTitle = document.createElement('h2');
  matchTitle.style.cssText = 'font-family:var(--font-display);font-size:0.8rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--color-text-muted);white-space:nowrap;';
  matchTitle.textContent = 'Posledn\u00ed z\u00e1pasy';
  const matchLine = document.createElement('div');
  matchLine.style.cssText = 'flex:1;height:1px;background:var(--color-border);';
  matchHeading.appendChild(matchTitle);
  matchHeading.appendChild(matchLine);

  const matchTable = document.createElement('div');
  matchTable.style.cssText = 'border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden;';

  const colHead = document.createElement('div');
  colHead.style.cssText = 'display:grid;grid-template-columns:4px 76px 52px auto 1fr 86px 62px 68px;background:var(--color-bg-elevated);border-bottom:1px solid var(--color-border);';
  ['', 'Mapa', 'Agent', 'V\u00fdsledek', '', 'K / D / A', 'HS %', 'RR'].forEach((label) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'padding:0.5rem 0;text-align:center;font-family:var(--font-mono);font-size:0.57rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-text-muted);';
    cell.textContent = label;
    colHead.appendChild(cell);
  });
  matchTable.appendChild(colHead);
  DEMO_MATCHES.forEach((m) => matchTable.appendChild(createMatchRow(m)));

  container.appendChild(header);
  container.appendChild(statsRow);
  container.appendChild(matchHeading);
  container.appendChild(matchTable);
  section.appendChild(container);
  page.appendChild(section);
  page.appendChild(Footer());

  return page;
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
