import { Footer } from '../components/Footer';

type RouteParams = Record<string, string>;

interface AgentAsset {
  displayName: string;
  displayIcon: string;
}

interface MapAsset {
  displayName: string;
  splash: string;
}

interface MatchStat {
  map: string;
  agent: string;
  kills: number;
  deaths: number;
  assists: number;
  hs: number;
  score: string;
  result: 'WIN' | 'LOSS';
  rr: number;
}

const DEMO_MATCHES: MatchStat[] = [
  { map: 'Ascent',   agent: 'Jett',    kills: 24, deaths: 9,  assists: 4, hs: 41, score: '13-7',  result: 'WIN',  rr: 22  },
  { map: 'Bind',     agent: 'Reyna',   kills: 18, deaths: 14, assists: 2, hs: 28, score: '9-13',  result: 'LOSS', rr: -14 },
  { map: 'Haven',    agent: 'Omen',    kills: 20, deaths: 11, assists: 7, hs: 35, score: '13-10', result: 'WIN',  rr: 18  },
  { map: 'Fracture', agent: 'Chamber', kills: 27, deaths: 8,  assists: 3, hs: 44, score: '13-5',  result: 'WIN',  rr: 25  },
  { map: 'Pearl',    agent: 'Sage',    kills: 11, deaths: 13, assists: 9, hs: 22, score: '10-13', result: 'LOSS', rr: -12 },
];

async function fetchAgents(): Promise<Record<string, AgentAsset>> {
  const res = await fetch('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
  const json = await res.json();
  const result: Record<string, AgentAsset> = {};
  for (const a of json.data) {
    result[a.displayName] = { displayName: a.displayName, displayIcon: a.displayIcon };
  }
  return result;
}

async function fetchMaps(): Promise<Record<string, MapAsset>> {
  const res = await fetch('https://valorant-api.com/v1/maps');
  const json = await res.json();
  const result: Record<string, MapAsset> = {};
  for (const m of json.data) {
    if (m.displayName && m.splash) {
      result[m.displayName] = { displayName: m.displayName, splash: m.splash };
    }
  }
  return result;
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

  const home = document.createElement('a');
  home.classList.add('nav__link');
  home.setAttribute('href', '/');
  home.innerHTML = '<i class="fa-solid fa-house" style="margin-right:0.35rem;font-size:0.8rem;"></i>Domů';

  links.appendChild(home);
  nav.appendChild(logo);
  nav.appendChild(links);

  return nav;
}

function createStatCard(label: string, value: string, color?: string): HTMLElement {
  const card = document.createElement('div');
  card.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    + 'gap:0.3rem;padding:1.25rem 0.75rem;background:var(--color-bg-card);'
    + 'border:1px solid var(--color-border);border-radius:var(--radius-md);'
    + 'flex:1;min-width:90px;transition:border-color 150ms ease;';

  card.addEventListener('mouseenter', () => { card.style.borderColor = 'var(--color-border-accent)'; });
  card.addEventListener('mouseleave', () => { card.style.borderColor = 'var(--color-border)'; });

  const val = document.createElement('span');
  val.style.cssText = 'font-family:var(--font-display);font-size:1.55rem;font-weight:800;line-height:1;'
    + 'color:' + (color ?? 'var(--color-text-primary)') + ';';
  val.textContent = value;

  const lbl = document.createElement('span');
  lbl.style.cssText = 'font-family:var(--font-mono);font-size:0.6rem;letter-spacing:0.18em;'
    + 'text-transform:uppercase;color:var(--color-text-muted);';
  lbl.textContent = label;

  card.appendChild(val);
  card.appendChild(lbl);

  return card;
}

function createMatchRow(
  m: MatchStat,
  agents: Record<string, AgentAsset>,
  maps: Record<string, MapAsset>,
): HTMLElement {
  const win = m.result === 'WIN';

  const row = document.createElement('div');
  row.style.cssText = 'display:grid;grid-template-columns:4px 80px 56px auto 1fr 86px 62px 68px;'
    + 'align-items:stretch;background:var(--color-bg-card);'
    + 'border-bottom:1px solid var(--color-border);'
    + 'transition:background 120ms ease;overflow:hidden;';

  row.addEventListener('mouseenter', () => { row.style.background = 'var(--color-bg-elevated)'; });
  row.addEventListener('mouseleave', () => { row.style.background = 'var(--color-bg-card)'; });

  const stripe = document.createElement('div');
  stripe.style.cssText = 'background:' + (win ? '#4ade80' : 'var(--color-accent-red)') + ';';

  const mapCell = document.createElement('div');
  mapCell.style.cssText = 'position:relative;overflow:hidden;height:60px;';

  const mapImg = document.createElement('img');
  mapImg.src = maps[m.map]?.splash ?? '';
  mapImg.alt = m.map;
  mapImg.style.cssText = 'width:100%;height:100%;object-fit:cover;opacity:0.65;display:block;';

  const mapLabel = document.createElement('span');
  mapLabel.style.cssText = 'position:absolute;bottom:3px;left:5px;font-family:var(--font-mono);'
    + 'font-size:0.5rem;letter-spacing:0.1em;text-transform:uppercase;'
    + 'color:#fff;text-shadow:0 1px 4px #000;white-space:nowrap;';
  mapLabel.textContent = m.map;

  mapCell.appendChild(mapImg);
  mapCell.appendChild(mapLabel);

  const agentCell = document.createElement('div');
  agentCell.style.cssText = 'display:flex;align-items:center;justify-content:center;'
    + 'background:var(--color-bg-elevated);border-left:1px solid var(--color-border);';

  const agentImg = document.createElement('img');
  agentImg.src = agents[m.agent]?.displayIcon ?? '';
  agentImg.alt = m.agent;
  agentImg.style.cssText = 'width:44px;height:44px;object-fit:contain;';

  agentCell.appendChild(agentImg);

  const resultCell = document.createElement('div');
  resultCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    + 'padding:0 0.875rem;gap:0.2rem;border-left:1px solid var(--color-border);';

  const badge = document.createElement('span');
  badge.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;font-weight:700;'
    + 'letter-spacing:0.1em;padding:0.15rem 0.45rem;border-radius:2px;'
    + 'color:' + (win ? '#4ade80' : 'var(--color-accent-red)') + ';'
    + 'background:' + (win ? 'rgba(74,222,128,0.1)' : 'var(--color-accent-red-dim)') + ';';
  badge.textContent = m.result;

  const scoreEl = document.createElement('span');
  scoreEl.style.cssText = 'font-family:var(--font-display);font-size:0.775rem;font-weight:700;'
    + 'color:var(--color-text-secondary);';
  scoreEl.textContent = m.score;

  resultCell.appendChild(badge);
  resultCell.appendChild(scoreEl);

  const spacer = document.createElement('div');

  const kdaCell = document.createElement('div');
  kdaCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    + 'gap:0.15rem;border-left:1px solid var(--color-border);';

  const kdaVal = document.createElement('span');
  kdaVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;'
    + 'color:var(--color-text-primary);letter-spacing:0.04em;';
  kdaVal.textContent = m.kills + ' / ' + m.deaths + ' / ' + m.assists;

  const kdaLbl = document.createElement('span');
  kdaLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.55rem;letter-spacing:0.15em;'
    + 'text-transform:uppercase;color:var(--color-text-muted);';
  kdaLbl.textContent = 'K / D / A';

  kdaCell.appendChild(kdaVal);
  kdaCell.appendChild(kdaLbl);

  const hsCell = document.createElement('div');
  hsCell.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    + 'gap:0.15rem;border-left:1px solid var(--color-border);';

  const hsVal = document.createElement('span');
  hsVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;color:var(--color-accent-cyan);';
  hsVal.textContent = m.hs + '%';

  const hsLbl = document.createElement('span');
  hsLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.55rem;letter-spacing:0.15em;'
    + 'text-transform:uppercase;color:var(--color-text-muted);';
  hsLbl.textContent = 'HS';

  hsCell.appendChild(hsVal);
  hsCell.appendChild(hsLbl);

  const rrCell = document.createElement('div');
  rrCell.style.cssText = 'display:flex;align-items:center;justify-content:center;'
    + 'border-left:1px solid var(--color-border);';

  const rrVal = document.createElement('span');
  rrVal.style.cssText = 'font-family:var(--font-mono);font-size:0.8rem;font-weight:700;'
    + 'color:' + (m.rr > 0 ? '#4ade80' : 'var(--color-accent-red)') + ';';
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

function createSkeletonRow(): HTMLElement {
  const row = document.createElement('div');
  row.style.cssText = 'height:60px;background:var(--color-bg-elevated);'
    + 'border-bottom:1px solid var(--color-border);opacity:0.5;';
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
    banner.style.cssText = 'display:flex;align-items:center;gap:0.75rem;padding:0.65rem 1rem;'
      + 'background:rgba(255,196,0,0.07);border:1px solid rgba(255,196,0,0.2);'
      + 'border-radius:var(--radius-sm);margin-bottom:1.5rem;';

    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-flask';
    icon.style.cssText = 'color:#ffc400;font-size:0.85rem;flex-shrink:0;';

    const text = document.createElement('span');
    text.style.cssText = 'font-family:var(--font-mono);font-size:0.7rem;letter-spacing:0.08em;color:#ffc400;';
    text.textContent = 'DEMO ÚČET — zobrazená data jsou fiktivní a slouží pouze pro ukázku platformy';

    banner.appendChild(icon);
    banner.appendChild(text);
    container.appendChild(banner);
  }

  const header = document.createElement('div');
  header.style.cssText = 'display:flex;align-items:center;gap:1.5rem;padding:1.5rem;'
    + 'background:var(--color-bg-card);border:1px solid var(--color-border);'
    + 'border-radius:var(--radius-lg);margin-bottom:1rem;flex-wrap:wrap;';

  const avatarWrap = document.createElement('div');
  avatarWrap.style.cssText = 'position:relative;flex-shrink:0;';

  const avatar = document.createElement('div');
  avatar.style.cssText = 'width:68px;height:68px;border-radius:50%;'
    + 'background:var(--color-bg-elevated);border:2px solid var(--color-border-accent);'
    + 'display:flex;align-items:center;justify-content:center;'
    + 'font-family:var(--font-display);font-size:1.75rem;font-weight:800;color:var(--color-accent-red);';
  avatar.textContent = playerName.charAt(0).toUpperCase();

  const onlineDot = document.createElement('div');
  onlineDot.style.cssText = 'position:absolute;bottom:2px;right:2px;width:12px;height:12px;'
    + 'background:#4ade80;border-radius:50%;border:2px solid var(--color-bg-card);'
    + 'box-shadow:0 0 6px rgba(74,222,128,0.5);';

  avatarWrap.appendChild(avatar);
  avatarWrap.appendChild(onlineDot);

  const nameBlock = document.createElement('div');
  nameBlock.style.cssText = 'flex:1;min-width:0;';

  const nameEl = document.createElement('div');
  nameEl.style.cssText = 'font-family:var(--font-display);font-size:1.55rem;font-weight:800;'
    + 'color:var(--color-text-primary);line-height:1;';
  nameEl.textContent = playerName;

  const tagEl = document.createElement('div');
  tagEl.style.cssText = 'font-family:var(--font-mono);font-size:0.75rem;color:var(--color-text-muted);'
    + 'margin-top:0.3rem;margin-bottom:0.65rem;';
  tagEl.textContent = '#' + tag;

  const chips = document.createElement('div');
  chips.style.cssText = 'display:flex;gap:0.5rem;flex-wrap:wrap;';

  const chipRegion = document.createElement('span');
  chipRegion.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;letter-spacing:0.1em;'
    + 'text-transform:uppercase;padding:0.2rem 0.55rem;border-radius:3px;'
    + 'color:var(--color-text-muted);background:var(--color-bg-elevated);';
  chipRegion.textContent = 'EU West';

  const chipMode = document.createElement('span');
  chipMode.style.cssText = 'font-family:var(--font-mono);font-size:0.65rem;letter-spacing:0.1em;'
    + 'text-transform:uppercase;padding:0.2rem 0.55rem;border-radius:3px;'
    + 'color:var(--color-accent-cyan);background:rgba(0,229,255,0.08);';
  chipMode.textContent = 'Competitive';

  chips.appendChild(chipRegion);
  chips.appendChild(chipMode);
  nameBlock.appendChild(nameEl);
  nameBlock.appendChild(tagEl);
  nameBlock.appendChild(chips);

  const rankBlock = document.createElement('div');
  rankBlock.style.cssText = 'display:flex;flex-direction:column;align-items:flex-end;gap:0.3rem;';

  const rankLbl = document.createElement('span');
  rankLbl.style.cssText = 'font-family:var(--font-mono);font-size:0.6rem;letter-spacing:0.18em;'
    + 'text-transform:uppercase;color:var(--color-text-muted);';
  rankLbl.textContent = 'Aktuální rank';

  const rankVal = document.createElement('span');
  rankVal.style.cssText = 'font-family:var(--font-display);font-size:1.4rem;font-weight:800;'
    + 'color:var(--color-accent-cyan);line-height:1;';
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
  statsRow.appendChild(createStatCard('Zápasy', '312'));
  statsRow.appendChild(createStatCard('ACS', '241'));
  statsRow.appendChild(createStatCard('Kills / Z', '18.4'));

  const matchHeading = document.createElement('div');
  matchHeading.style.cssText = 'display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem;';

  const matchTitle = document.createElement('h2');
  matchTitle.style.cssText = 'font-family:var(--font-display);font-size:0.8rem;font-weight:700;'
    + 'letter-spacing:0.14em;text-transform:uppercase;color:var(--color-text-muted);white-space:nowrap;';
  matchTitle.textContent = 'Poslední zápasy';

  const matchLine = document.createElement('div');
  matchLine.style.cssText = 'flex:1;height:1px;background:var(--color-border);';

  matchHeading.appendChild(matchTitle);
  matchHeading.appendChild(matchLine);

  const matchTable = document.createElement('div');
  matchTable.style.cssText = 'border:1px solid var(--color-border);border-radius:var(--radius-md);overflow:hidden;';

  const colHead = document.createElement('div');
  colHead.style.cssText = 'display:grid;grid-template-columns:4px 80px 56px auto 1fr 86px 62px 68px;'
    + 'background:var(--color-bg-elevated);border-bottom:1px solid var(--color-border);';

  const colLabels = ['', 'Mapa', 'Agent', 'Výsledek', '', 'K / D / A', 'HS %', 'RR'];
  colLabels.forEach((label) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'padding:0.5rem 0;text-align:center;font-family:var(--font-mono);'
      + 'font-size:0.57rem;letter-spacing:0.15em;text-transform:uppercase;color:var(--color-text-muted);';
    cell.textContent = label;
    colHead.appendChild(cell);
  });

  matchTable.appendChild(colHead);

  // skeleton rows while assets load
  const skeletons: HTMLElement[] = [];
  for (let i = 0; i < DEMO_MATCHES.length; i++) {
    const s = createSkeletonRow();
    skeletons.push(s);
    matchTable.appendChild(s);
  }

  // fetch both in parallel then replace skeletons with real rows
  Promise.all([fetchAgents(), fetchMaps()]).then(([agents, maps]) => {
    skeletons.forEach((s) => s.remove());
    DEMO_MATCHES.forEach((m) => {
      matchTable.appendChild(createMatchRow(m, agents, maps));
    });
  }).catch(() => {
    skeletons.forEach((s) => {
      s.style.cssText = 'padding:1rem 1.5rem;font-family:var(--font-mono);font-size:0.75rem;'
        + 'color:var(--color-text-muted);border-bottom:1px solid var(--color-border);';
      s.textContent = 'Nepodařilo se načíst data z valorant-api.com';
    });
  });

  container.appendChild(header);
  container.appendChild(statsRow);
  container.appendChild(matchHeading);
  container.appendChild(matchTable);
  section.appendChild(container);
  page.appendChild(section);
  page.appendChild(Footer());

  return page;
}
