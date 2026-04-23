/* =============================================
   GAMESTOCK — app.js
   ============================================= */

// ── DATA ──────────────────────────────────────
const STOCKS = [
  { id:'ntdoy', name:'Nintendo',        ticker:'NTDOY', emoji:'🎮', color:'#e60012', cat:'console',   price:14.20, pe:28,  cap:'$18.4B', desc:'Créateur de Mario, Zelda & Switch' },
  { id:'sony', name:'Sony Group',       ticker:'SONY',  emoji:'🎯', color:'#0070cc', cat:'console',   price:21.50, pe:15,  cap:'$136B',  desc:'PlayStation, Spider-Man & plus' },
  { id:'msft', name:'Microsoft Xbox',   ticker:'MSFT',  emoji:'🟢', color:'#00a651', cat:'console',   price:415.0, pe:36,  cap:'$3.1T',  desc:'Xbox, Game Pass & Activision' },
  { id:'atvi', name:'Activision Bliz.', ticker:'ATVI',  emoji:'💥', color:'#b8860b', cat:'publisher', price:95.40, pe:22,  cap:'$73.5B', desc:'Call of Duty, Warcraft, Diablo' },
  { id:'ea',   name:'Electronic Arts',  ticker:'EA',    emoji:'⚽', color:'#ff4500', cat:'publisher', price:138.0, pe:30,  cap:'$37.8B', desc:'FIFA, Battlefield, The Sims' },
  { id:'ttwo', name:'Take-Two',         ticker:'TTWO',  emoji:'🌆', color:'#ffd700', cat:'publisher', price:155.0, pe:null,cap:'$28.1B', desc:'GTA, Red Dead, NBA 2K' },
  { id:'ubisoft',name:'Ubisoft',        ticker:'UBI',   emoji:'🦅', color:'#00aeef', cat:'publisher', price:5.5,  pe:null,cap:'~1.4B€', desc:'Assassin\'s Creed, Far Cry' },
  { id:'rblx', name:'Roblox',           ticker:'RBLX',  emoji:'🧱', color:'#e2231a', cat:'mobile',    price:38.20, pe:null,cap:'$21.7B', desc:'Plateforme sociale & UGC gaming' },
  { id:'unity',name:'Unity Tech.',      ticker:'U',     emoji:'🔷', color:'#222c37', cat:'publisher', price:22.50, pe:null,cap:'$8.1B',  desc:'Moteur de jeu #1 mobile' },
  { id:'ntes', name:'NetEase',          ticker:'NTES',  emoji:'🐉', color:'#cc0000', cat:'mobile',    price:98.30, pe:17,  cap:'$61.2B', desc:'Jeux mobiles & PC, Chine' },
  { id:'se',   name:'Sea Limited',      ticker:'SE',    emoji:'🌊', color:'#f5a623', cat:'mobile',    price:51.80, pe:null,cap:'$29.6B', desc:'Garena Free Fire, Asie du Sud-Est' },
  { id:'glxyz',name:'Galaxy Esports',   ticker:'GLXY',  emoji:'⚡', color:'#9b59b6', cat:'esports',   price:4.75,  pe:null,cap:'$320M',  desc:'Organisation esports mondiale' },
];

const NEWS = [
  { emoji:'🕹️', tag:'Résultats', title:'Nintendo dépasse les 12M Switch vendues ce trimestre', date:'Il y a 2h', impact:'pos', tickers:['NTDOY'] },
  { emoji:'🎮', tag:'Acquisition', title:'Microsoft finalise l\'intégration d\'Activision dans Game Pass', date:'Il y a 5h', impact:'pos', tickers:['MSFT','ATVI'] },
  { emoji:'📉', tag:'Avertissement', title:'Ubisoft révise à la baisse ses prévisions annuelles', date:'Il y a 8h', impact:'neg', tickers:['UBI'] },
  { emoji:'🚀', tag:'Lancement', title:'GTA VI : Take-Two confirme la sortie automne 2025', date:'Hier', impact:'pos', tickers:['TTWO'] },
  { emoji:'🤝', tag:'Partenariat', title:'Sony & Lego s\'associent pour des expériences AR PlayStation', date:'Hier', impact:'neu', tickers:['SONY'] },
  { emoji:'📱', tag:'Croissance', title:'Roblox enregistre +34% d\'utilisateurs actifs journaliers', date:'Il y a 2j', impact:'pos', tickers:['RBLX'] },
];

// ── CALENDRIER GAMING ──────────────────────────
const EVENTS = [
  // Sorties de jeux
  { id:'gta6',        type:'release',  icon:'🌆', title:'GTA VI — Sortie mondiale',               date:'2026-05-26', stockIds:['ttwo'],        impact:'pos', desc:'Sortie très attendue, potentiel cours record pour TTWO' },
  { id:'cod26',       type:'release',  icon:'💥', title:'Call of Duty 2026 — Annonce officielle',  date:'2026-06-10', stockIds:['msft','atvi'], impact:'pos', desc:'Prochain opus COD, intégration Game Pass' },
  { id:'ubi-sw',      type:'release',  icon:'🦅', title:'Star Wars Outlaws — DLC majeur',          date:'2026-05-15', stockIds:['ubisoft'],     impact:'pos', desc:'Extension très attendue de la communauté' },
  { id:'nswitch2',    type:'release',  icon:'🎮', title:'Nintendo Switch 2 — Lancement Europe',    date:'2026-06-05', stockIds:['ntdoy'],       impact:'pos', desc:'Lancement UE avec Mario Kart World' },
  { id:'rblx-upd',    type:'release',  icon:'🧱', title:'Roblox — Mise à jour moteur graphique',   date:'2026-07-01', stockIds:['rblx'],        impact:'pos', desc:'Nouveau moteur physique next-gen' },
  { id:'ea-fc27',     type:'release',  icon:'⚽', title:'EA FC 27 — Annonce officielle',           date:'2026-07-15', stockIds:['ea'],          impact:'neu', desc:'Présentation de la prochaine édition football' },
  { id:'sea-ff2',     type:'release',  icon:'🌊', title:'Free Fire 2 — Bêta mondiale',             date:'2026-08-20', stockIds:['se'],          impact:'pos', desc:'Suite de Free Fire, très attendue en Asie' },
  // Earnings
  { id:'msft-earn',   type:'earnings', icon:'📊', title:'Microsoft — Résultats Q3 FY2026',         date:'2026-04-30', stockIds:['msft'],        impact:'pos', desc:'Gaming + Cloud Azure, résultats très suivis' },
  { id:'ea-earn',     type:'earnings', icon:'📊', title:'Electronic Arts — Résultats Q4 FY2026',   date:'2026-05-07', stockIds:['ea'],          impact:'neu', desc:'Fin d\'exercice fiscal, résultats annuels' },
  { id:'rblx-earn',   type:'earnings', icon:'📊', title:'Roblox — Résultats Q1 2026',              date:'2026-05-08', stockIds:['rblx'],        impact:'neu', desc:'Chiffres DAU et revenus monétisation' },
  { id:'ntdoy-earn',  type:'earnings', icon:'📊', title:'Nintendo — Résultats FY2026',             date:'2026-05-09', stockIds:['ntdoy'],       impact:'pos', desc:'Exercice annuel — succès Switch 2 inclus' },
  { id:'sony-earn',   type:'earnings', icon:'📊', title:'Sony Group — Résultats Q4 FY2026',        date:'2026-05-14', stockIds:['sony'],        impact:'neu', desc:'Division PlayStation, films et musique' },
  { id:'ubi-earn',    type:'earnings', icon:'📊', title:'Ubisoft — Résultats FY2026',              date:'2026-05-22', stockIds:['ubisoft'],     impact:'neg', desc:'Résultats annuels dans un contexte difficile' },
  { id:'ttwo-earn',   type:'earnings', icon:'📊', title:'Take-Two — Résultats Q4 FY2026',          date:'2026-05-19', stockIds:['ttwo'],        impact:'neu', desc:'Avant lancement GTA VI, anticipations élevées' },
  { id:'ntes-earn',   type:'earnings', icon:'📊', title:'NetEase — Résultats Q1 2026',             date:'2026-06-03', stockIds:['ntes'],        impact:'neu', desc:'Marché chinois, impact régulateur' },
  // Événements secteur
  { id:'sony-sop',    type:'event',    icon:'🎯', title:'PlayStation State of Play — Juin 2026',   date:'2026-06-03', stockIds:['sony'],        impact:'pos', desc:'Présentation des exclusivités PS5 Pro' },
  { id:'sgf26',       type:'event',    icon:'🎪', title:'Summer Game Fest 2026',                   date:'2026-06-06', stockIds:[],             impact:'pos', desc:'Grands reveals de l\'été gaming' },
  { id:'ndir-may',    type:'event',    icon:'🎮', title:'Nintendo Direct — Mai 2026',              date:'2026-05-28', stockIds:['ntdoy'],       impact:'pos', desc:'Présentation Switch 2 + line-up été' },
  { id:'gamescom26',  type:'event',    icon:'🎡', title:'Gamescom 2026 — Cologne',                 date:'2026-08-26', stockIds:[],             impact:'pos', desc:'Plus grand salon gaming mondial' },
  { id:'tga26',       type:'event',    icon:'🏆', title:'The Game Awards 2026',                    date:'2026-12-10', stockIds:[],             impact:'pos', desc:'Cérémonie annuelle + reveals exclusifs' },
];

function getDaysUntil(dateStr) {
  const now = new Date(); now.setHours(0,0,0,0);
  const d   = new Date(dateStr); d.setHours(0,0,0,0);
  return Math.round((d - now) / 86400000);
}
function getUpcomingEvents(stockId, maxDays = 30) {
  return EVENTS.filter(e => e.stockIds.includes(stockId) && getDaysUntil(e.date) >= 0 && getDaysUntil(e.date) <= maxDays);
}

// ── FONDAMENTAUX (donn\u00e9es r\u00e9elles 2025) ─────────────
const FUNDAMENTALS = {
  ntdoy:   { revenue:'$16.5B', divYield:'2.8%', beta:0.62, employees:'6 700'   },
  sony:    { revenue:'$88B',   divYield:'0.6%', beta:0.81, employees:'109 000' },
  msft:    { revenue:'$227B',  divYield:'0.7%', beta:0.90, employees:'221 000' },
  atvi:    { revenue:'$9.5B',  divYield:'0.6%', beta:0.73, employees:'13 000'  },
  ea:      { revenue:'$7.5B',  divYield:'0.5%', beta:0.81, employees:'9 900'   },
  ttwo:    { revenue:'$5.3B',  divYield:'\u2014',    beta:1.34, employees:'11 000'  },
  ubisoft: { revenue:'\u20ac1.7B',  divYield:'\u2014',    beta:1.52, employees:'17 000'  },
  rblx:    { revenue:'$3.6B',  divYield:'\u2014',    beta:1.78, employees:'2 400'   },
  unity:   { revenue:'$2.2B',  divYield:'\u2014',    beta:1.69, employees:'5 400'   },
  ntes:    { revenue:'$13.4B', divYield:'1.8%', beta:1.02, employees:'36 000'  },
  se:      { revenue:'$16.8B', divYield:'\u2014',    beta:1.63, employees:'67 300'  },
  glxyz:   { revenue:'$320M',  divYield:'\u2014',    beta:2.10, employees:'~500'    },
};

function getRiskScore(stockId) {
  const b = FUNDAMENTALS[stockId]?.beta ?? 1.0;
  if (b < 0.7) return { level:1, label:'Faible',     color:'#22c55e', stars:'\u25cf\u25cb\u25cb\u25cb\u25cb' };
  if (b < 1.0) return { level:2, label:'Mod\u00e9r\u00e9',    color:'#84cc16', stars:'\u25cf\u25cf\u25cb\u25cb\u25cb' };
  if (b < 1.3) return { level:3, label:'\u00c9lev\u00e9',      color:'#f59e0b', stars:'\u25cf\u25cf\u25cf\u25cb\u25cb' };
  if (b < 1.7) return { level:4, label:'Tr\u00e8s \u00e9lev\u00e9', color:'#ef4444', stars:'\u25cf\u25cf\u25cf\u25cf\u25cb' };
  return               { level:5, label:'Extr\u00eame',    color:'#dc2626', stars:'\u25cf\u25cf\u25cf\u25cf\u25cf' };
}

// ── STATE ──────────────────────────────────────
let cash = 10000;
let holdings = {};
let transactions = [];
let portfolioHistory = [10000];
let alerts = [];
let currentStock = null;
let tradeMode = 'buy';
let modalChartInst = null;
let portfolioChartInst = null;
let activeFilter = 'all';

// Simulate live prices (small random walk)
function simulatePrices() {
  STOCKS.forEach(s => {
    const change = (Math.random() - 0.497) * s.price * 0.008;
    s.price = Math.max(0.5, +(s.price + change).toFixed(2));
    s.change = s.change !== undefined
      ? +(s.change + (Math.random() - 0.497) * 0.05).toFixed(2)
      : +(((Math.random() - 0.45) * 4)).toFixed(2);
  });
}

// Generate sparkline history for a stock
function genHistory(base, n = 30) {
  const arr = [base];
  for (let i = 1; i < n; i++) {
    arr.push(Math.max(0.1, +(arr[i-1] + (Math.random()-0.48)*arr[i-1]*0.015).toFixed(2)));
  }
  return arr;
}

// Init history once
STOCKS.forEach(s => { s.history = genHistory(s.price * (0.85 + Math.random()*0.3)); s.change = +((Math.random()-0.45)*5).toFixed(2); });

// ── HELPERS ───────────────────────────────────
const fmt  = n => (+(+n * eurRate)).toLocaleString('fr-BE', {style:'currency', currency:'EUR', minimumFractionDigits:2, maximumFractionDigits:2});
const fmtN = n => (+n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
const pct  = n => (n >= 0 ? '+' : '') + fmtN(n) + '%';

function getPortfolioValue() {
  let inv = 0;
  for (const [id, h] of Object.entries(holdings)) {
    const s = STOCKS.find(x => x.id === id);
    if (s) inv += s.price * eurRate * h.qty;
  }
  return inv;
}

function getPortfolioPnl() {
  let cost = 0, val = 0;
  for (const [id, h] of Object.entries(holdings)) {
    const s = STOCKS.find(x => x.id === id);
    if (s) { val += s.price * eurRate * h.qty; cost += h.avgCost * eurRate * h.qty; }
  }
  return { pnl: val - cost, val };
}

// ── PAGES ──────────────────────────────────────
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelector(`[data-page="${name}"]`).classList.add('active');
  if (name === 'portfolio')   renderPortfolio();
  if (name === 'history')     renderHistory();
  if (name === 'news')        renderNews();
  if (name === 'market')      renderMarket();
  if (name === 'alertes')     renderAlerts();
  if (name === 'calendrier')  renderCalendar();
  if (name === 'analyse')     renderAnalyse();
  // Ferme la nav mobile après sélection
  if (typeof closeNav === 'function') closeNav();
}

// ── ANALYSE ────────────────────────────────────
const COMPARE_COLORS = ['#8b5cf6','#22c55e','#f59e0b','#06b6d4','#f43f5e','#a78bfa'];
let analyseTab       = 'compare';
let compareSelected  = new Set(['msft','sony']);
let comparePeriod    = 90;
let compareChartInst = null;

function showAnalyseTab(tab) {
  analyseTab = tab;
  document.querySelectorAll('.atab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.atab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('atab-' + tab).classList.add('active');
  if (tab === 'compare') renderComparateur();
  if (tab === 'whatif')  renderWhatIf();
  if (tab === 'risk')    renderRiskTable();
}

function renderAnalyse() {
  // Stock selector buttons for compare
  const sel = document.getElementById('compareSelector');
  if (sel && !sel.hasChildNodes()) {
    STOCKS.forEach((s, i) => {
      const col = COMPARE_COLORS[i % COMPARE_COLORS.length];
      const btn = document.createElement('button');
      btn.className = 'cmp-btn' + (compareSelected.has(s.id) ? ' active' : '');
      btn.textContent = s.emoji + ' ' + s.ticker;
      btn.style.borderColor = compareSelected.has(s.id) ? col : '';
      btn.style.background  = compareSelected.has(s.id) ? col + '22' : '';
      btn.dataset.id = s.id;
      btn.onclick = () => toggleCompare(s.id, btn, col);
      sel.appendChild(btn);
    });
  }
  // Stock dropdown for what-if
  const ws = document.getElementById('wiStock');
  if (ws && !ws.hasChildNodes()) {
    STOCKS.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id; opt.textContent = s.emoji + ' ' + s.name;
      ws.appendChild(opt);
    });
  }
  renderComparateur();
}

function toggleCompare(id, btn, col) {
  if (compareSelected.has(id)) {
    if (compareSelected.size <= 1) return; // minimum 1
    compareSelected.delete(id);
    btn.classList.remove('active');
    btn.style.borderColor = ''; btn.style.background = '';
  } else {
    if (compareSelected.size >= 4) return; // max 4
    compareSelected.add(id);
    btn.classList.add('active');
    btn.style.borderColor = col; btn.style.background = col + '22';
  }
  renderComparateur();
}

function setComparePeriod(days) {
  comparePeriod = days;
  document.querySelectorAll('#comparePeriodBar .range-btn').forEach(b =>
    b.classList.toggle('active', +b.dataset.days === days));
  renderComparateur();
}

function renderComparateur() {
  const canvas = document.getElementById('compareChart');
  if (!canvas) return;
  if (compareChartInst) { compareChartInst.destroy(); compareChartInst = null; }
  const selected = STOCKS.filter(s => compareSelected.has(s.id));
  // Normaliser l'historique : base 100 au point de depart
  const datasets = selected.map((s, i) => {
    const raw  = s.history.slice(-comparePeriod);
    const base = raw[0] || 1;
    const data = raw.map(v => +((v / base * 100).toFixed(2)));
    const col  = COMPARE_COLORS[i % COMPARE_COLORS.length];
    return { label: s.ticker, data, borderColor: col, backgroundColor: col + '18',
      borderWidth: 2, pointRadius: 0, fill: true, tension: 0.3 };
  });
  const ctx = canvas.getContext('2d');
  compareChartInst = new Chart(ctx, {
    type: 'line',
    data: { labels: datasets[0]?.data.map((_, i) => i) || [], datasets },
    options: {
      animation: { duration: 500 },
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false },
        tooltip: { callbacks: { label: c => ` ${c.dataset.label} ${c.parsed.y.toFixed(1)} (base 100)` } } },
      scales: {
        x: { display: false },
        y: { ticks: { color:'#64748b', callback: v => v + '' }, grid: { color:'rgba(255,255,255,0.04)' } }
      }
    }
  });
  // Legende
  const leg = document.getElementById('compareLegend');
  if (leg) {
    leg.innerHTML = selected.map((s, i) => {
      const raw  = s.history.slice(-comparePeriod);
      const perf = raw.length > 1 ? ((raw[raw.length-1] / raw[0] - 1) * 100).toFixed(2) : '0.00';
      const col  = COMPARE_COLORS[i % COMPARE_COLORS.length];
      const cls  = +perf >= 0 ? 'up' : 'dn';
      return `<div class="legend-item">
        <span class="legend-dot" style="background:${col}"></span>
        <span>${s.emoji} ${s.name}</span>
        <span class="legend-perf" style="color:${+perf>=0?'var(--green)':'var(--red)'}">
          ${+perf>=0?'+':''}${perf}%</span>
      </div>`;
    }).join('');
  }
  document.getElementById('compareNote').textContent = 'Valeurs normalis\u00e9es base 100 · Historique simulation';
}

function renderWhatIf() {
  // Already rendered via HTML + runWhatIf()
}

function runWhatIf() {
  const stockId = document.getElementById('wiStock')?.value;
  const amount  = parseFloat(document.getElementById('wiAmount')?.value) || 1000;
  const period  = parseInt(document.getElementById('wiPeriod')?.value) || 90;
  const stock   = STOCKS.find(s => s.id === stockId);
  if (!stock) return;

  const hist    = stock.history.slice(-period);
  const start   = hist[0] || stock.price;
  const end     = hist[hist.length-1] || stock.price;
  const pct     = (end - start) / start;
  const final   = amount * (1 + pct);
  const gain    = final - amount;
  const isUp    = gain >= 0;
  const gainCls = isUp ? 'up' : 'dn';

  // Classement de toutes les actions sur la meme periode
  const ranking = STOCKS.map(s => {
    const h = s.history.slice(-period);
    const p = (h[h.length-1] / h[0] - 1) * 100 || 0;
    const f = amount * (1 + p/100);
    return { s, pct:p, final:f };
  }).sort((a,b) => b.pct - a.pct);

  document.getElementById('wiResult').innerHTML = `
    <div class="wi-result-card">
      <div class="wi-metric">
        <div class="wi-metric-label">Valeur actuelle</div>
        <div class="wi-metric-val ${gainCls}">${final.toFixed(0)} \u20ac</div>
      </div>
      <div class="wi-metric">
        <div class="wi-metric-label">Gain / Perte</div>
        <div class="wi-metric-val ${gainCls}">${isUp?'+':''}${gain.toFixed(0)} \u20ac</div>
      </div>
      <div class="wi-metric">
        <div class="wi-metric-label">Performance</div>
        <div class="wi-metric-val ${gainCls}">${isUp?'+':''}${(pct*100).toFixed(2)} %</div>
      </div>
    </div>
    <p style="font-size:.8rem;color:var(--muted);margin-bottom:12px">
      Comparaison de toutes les actions sur la m\u00eame p\u00e9riode (${period}j) avec ${amount} \u20ac :
    </p>
    <table class="wi-table">
      <thead><tr><th>Action</th><th>Valeur finale</th><th>Performance</th></tr></thead>
      <tbody>
        ${ranking.map((r, idx) => {
          const up2 = r.pct >= 0;
          const medal = idx === 0 ? '\ud83e\udd47' : idx === 1 ? '\ud83e\udd48' : idx === 2 ? '\ud83e\udd49' : '';
          const isCur = r.s.id === stockId;
          return `<tr style="${isCur ? 'background:rgba(139,92,246,0.08)' : ''}">
            <td>${medal} ${r.s.emoji} ${r.s.name}${isCur ? ' <small style="color:var(--accent)">\u2190 s\u00e9lectionn\u00e9e</small>' : ''}</td>
            <td style="font-family:var(--font-head);font-weight:600">${r.final.toFixed(0)} \u20ac</td>
            <td style="color:${up2?'var(--green)':'var(--red)'};font-weight:600">${up2?'+':''}${r.pct.toFixed(2)} %</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

function renderRiskTable() {
  const container = document.getElementById('riskTable');
  if (!container) return;
  const sorted = [...STOCKS].sort((a,b) => (FUNDAMENTALS[a.id]?.beta??1) - (FUNDAMENTALS[b.id]?.beta??1));
  container.innerHTML = `<div class="risk-table-grid">` +
    sorted.map(s => {
      const f = FUNDAMENTALS[s.id] || {};
      const r = getRiskScore(s.id);
      return `<div class="risk-row">
        <div class="risk-row-logo" style="background:${s.color}22;color:${s.color}">${s.emoji}</div>
        <div><div class="risk-row-name">${s.name}</div><div style="font-size:.75rem;color:var(--muted)">${s.ticker}</div></div>
        <span class="risk-row-beta">β ${f.beta ?? '—'}</span>
        <span class="risk-badge" style="color:${r.color}">${r.stars} ${r.label}</span>
        <span class="risk-row-div">${f.divYield ?? '—'} div.</span>
        <span class="risk-row-rev">${f.revenue ?? '—'}</span>
      </div>`;
    }).join('') + `</div>`;
}

// ── CALENDRIER ──────────────────────────────────────
let calFilter = 'all';

function filterCalendar(type) {
  calFilter = type;
  document.querySelectorAll('.cal-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === type);
  });
  renderCalendar();
}

function renderCalendar() {
  const timeline = document.getElementById('calTimeline');
  if (!timeline) return;

  // Filtrer et trier par date
  const today = new Date(); today.setHours(0,0,0,0);
  let events = EVENTS
    .filter(e => calFilter === 'all' || e.type === calFilter)
    .filter(e => getDaysUntil(e.date) >= -1)  // garder aussi hier
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (events.length === 0) {
    timeline.innerHTML = `<div class="empty-state"><span class="empty-icon">📅</span><p>Aucun événement pour ce filtre.</p></div>`;
    return;
  }

  // Grouper par mois
  const months = {};
  events.forEach(e => {
    const d = new Date(e.date);
    const key = d.toLocaleDateString('fr-BE', { month: 'long', year: 'numeric' });
    if (!months[key]) months[key] = [];
    months[key].push(e);
  });

  const typeLabels = { release: '🎮 Sortie jeu', earnings: '📊 Earnings', event: '🎪 Événement' };
  const impactLabels = { pos: '↗ Impact positif', neg: '↘ Impact négatif', neu: '→ Impact neutre' };

  let html = '';
  Object.entries(months).forEach(([month, evs], mi) => {
    html += `<div class="cal-month-label">${month}</div>`;
    evs.forEach((e, i) => {
      const d      = new Date(e.date);
      const days   = getDaysUntil(e.date);
      const cdClass = days <= 3 ? 'urgent' : days <= 14 ? 'soon' : 'ok';
      const cdLabel = days === 0 ? 'Aujourd\'hui !' : days === 1 ? 'Demain' : days < 0 ? 'Passé' : `Dans ${days}j`;
      const isLast  = i === evs.length - 1;
      const stocks  = e.stockIds.map(id => {
        const s = STOCKS.find(x => x.id === id);
        return s ? `<span class="cal-stock-tag" onclick="openModal('${s.id}')">${s.emoji} ${s.ticker}</span>` : '';
      }).join('');

      html += `
        <div class="cal-item ${e.type}" onclick="">
          <div class="cal-date-col">
            <div class="cal-date-num">${d.getDate()}</div>
            <div class="cal-date-mon">${d.toLocaleDateString('fr-BE',{month:'short'})}</div>
          </div>
          <div class="cal-line-col">
            <div class="cal-dot"></div>
            ${isLast && mi === Object.keys(months).length-1 ? '' : '<div class="cal-line"></div>'}
          </div>
          <div class="cal-card">
            <div class="cal-card-top">
              <span class="cal-card-icon">${e.icon}</span>
              <div class="cal-card-info">
                <div class="cal-card-title">${e.title}</div>
                <div class="cal-card-desc">${e.desc}</div>
              </div>
            </div>
            <div class="cal-card-meta">
              <span class="cal-type-badge ${e.type}">${typeLabels[e.type]}</span>
              <span class="cal-countdown ${cdClass}">🕒 ${cdLabel}</span>
              <span class="cal-impact ${e.impact}">${impactLabels[e.impact]}</span>
              <div class="cal-stock-tags">${stocks}</div>
            </div>
          </div>
        </div>`;
    });
  });

  timeline.innerHTML = html;
}

// ── MARKET ────────────────────────────────────
function renderMarket() {
  const visible = activeFilter === 'all' ? STOCKS : STOCKS.filter(s => s.cat === activeFilter);
  const grid = document.getElementById('stocksGrid');
  grid.innerHTML = '';
  visible.forEach(s => {
    const up = s.change >= 0;
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.innerHTML = `
      <div class="card-top">
        <div class="company-info">
          <div class="company-logo" style="background:${s.color}22;color:${s.color}">${s.emoji}</div>
          <div>
            <div class="company-name">${s.name}</div>
            <div class="company-ticker">${s.ticker}</div>
          </div>
        </div>
        <div class="price-block">
          <div class="current-price">${fmt(s.price)}</div>
          <div class="price-change ${up?'up':'dn'}">${up?'▲':'▼'} ${Math.abs(s.change).toFixed(2)}%</div>
        </div>
      </div>
      <canvas class="mini-chart" id="mini-${s.id}" height="50"></canvas>
      <div class="card-footer">
        <div>
          <span class="card-tag">${catLabel(s.cat)}</span>
          ${(() => {
            const ev = getUpcomingEvents(s.id, 14)[0];
            if (!ev) return '';
            const d = getDaysUntil(ev.date);
            const label = d === 0 ? 'Aujourd\'hui' : d === 1 ? 'Demain' : `Dans ${d}j`;
            return `<span class="event-badge ${ev.type}">${ev.icon} ${label}</span>`;
          })()}
        </div>
        <button class="btn-trade" onclick="openModal('${s.id}')">Investir</button>
      </div>
      <div class="card-risk-bar">
        ${(() => {
          const r = getRiskScore(s.id);
          const f = FUNDAMENTALS[s.id];
          return `<span class="risk-mini" style="color:${r.color}">${r.stars} ${r.label}</span>
                  <span class="card-beta">β ${f?.beta ?? '—'}</span>`;
        })()}
      </div>`;
    grid.appendChild(card);
    // Draw sparkline
    setTimeout(() => drawSparkline('mini-'+s.id, s.history, up), 0);
  });
  // Ticker
  renderTicker();
  // Indice Gaming (pondéré par capitalisation)
  const IDX_WEIGHTS = { msft:0.22,sony:0.18,ntdoy:0.15,rblx:0.08,atvi:0.08,ea:0.08,ttwo:0.06,ntes:0.05,se:0.04,unity:0.04,ubisoft:0.01,glxyz:0.01 };
  const idxChg = STOCKS.reduce((s, x) => s + x.change * (IDX_WEIGHTS[x.id] ?? 0.01), 0);
  // Valeur de l'indice : base fictive de 2000 pts modulée par l'historique
  const idxBase = 2000;
  const idxPriceW = STOCKS.reduce((s, x) => s + (x.history[0] || x.price) * (IDX_WEIGHTS[x.id] ?? 0.01), 0);
  const idxNow    = STOCKS.reduce((s, x) => s + x.price * (IDX_WEIGHTS[x.id] ?? 0.01), 0);
  const idxVal    = idxBase * (idxNow / (idxPriceW || idxNow));
  document.getElementById('indexValue').textContent = idxVal.toFixed(0) + ' pts';
  const ic = document.getElementById('indexChange');
  ic.textContent = pct(idxChg);
  ic.style.color = idxChg >= 0 ? 'var(--green)' : 'var(--red)';
}

function catLabel(c) {
  return {console:'Console',publisher:'Éditeur',mobile:'Mobile',esports:'Esports'}[c] || c;
}

function renderTicker() {
  const t = document.getElementById('ticker');
  const items = [...STOCKS, ...STOCKS].map(s => {
    const up = s.change >= 0;
    return `<span class="ticker-item">
      <span class="ticker-sym">${s.ticker}</span>
      <span class="ticker-price">${fmt(s.price)}</span>
      <span class="ticker-chg ${up?'up':'dn'}">${up?'▲':'▼'}${Math.abs(s.change).toFixed(2)}%</span>
    </span>`;
  }).join('');
  t.innerHTML = items;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderMarket();
  });
});

// ── SPARKLINE ─────────────────────────────────
function drawSparkline(canvasId, data, up) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const color = up ? '#22c55e' : '#ef4444';
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, color + '33');
  grad.addColorStop(1, color + '00');
  new Chart(ctx, {
    type: 'line',
    data: { labels: data.map((_,i)=>i), datasets:[{ data, borderColor: color, backgroundColor: grad, borderWidth: 1.5, pointRadius: 0, fill: true, tension: 0.4 }] },
    options: { animation: false, plugins:{legend:{display:false},tooltip:{enabled:false}}, scales:{ x:{display:false}, y:{display:false} }, responsive:false }
  });
}

// ── MODAL ─────────────────────────────────────
let modalDays = 30; // période sélectionnée

function openModal(id) {
  currentStock = STOCKS.find(s => s.id === id);
  if (!currentStock) return;
  const s = currentStock;

  document.getElementById('modalLogo').textContent = s.emoji;
  document.getElementById('modalLogo').style.cssText = `background:${s.color}22;color:${s.color}`;
  document.getElementById('modalName').textContent = s.name;
  document.getElementById('modalTicker').textContent = s.ticker;
  document.getElementById('modalPrice').textContent = fmt(s.price);

  const up = s.change >= 0;
  document.getElementById('mChange').textContent = pct(s.change);
  document.getElementById('mChange').style.color = up ? 'var(--green)' : 'var(--red)';
  const hi = Math.max(...s.history); const lo = Math.min(...s.history);
  document.getElementById('mOpen').textContent = fmt(s.history[0]);
  document.getElementById('mHigh').textContent = fmt(hi);
  document.getElementById('mLow').textContent  = fmt(lo);
  document.getElementById('mCap').textContent  = s.cap;
  document.getElementById('mPe').textContent   = s.pe ? s.pe + 'x' : 'N/A';

  // Fondamentaux
  const f = FUNDAMENTALS[s.id] || {};
  const r = getRiskScore(s.id);
  const funBox = document.getElementById('modalFundamentals');
  if (funBox) {
    funBox.innerHTML = `
      <div class="fund-item"><span>CA annuel</span><strong>${f.revenue ?? '—'}</strong></div>
      <div class="fund-item"><span>Dividende</span><strong>${f.divYield ?? '—'}</strong></div>
      <div class="fund-item"><span>B\u00eata</span><strong>${f.beta ?? '—'}</strong></div>
      <div class="fund-item"><span>Employ\u00e9s</span><strong>${f.employees ?? '—'}</strong></div>
      <div class="fund-item fund-risk">
        <span>Risque</span>
        <strong style="color:${r.color}">${r.stars} ${r.label}</strong>
      </div>`;
  }

  document.getElementById('tradeQty').value = 1;
  setTradeMode('buy');
  updateTradeTotal();

  // Brancher les boutons de période
  document.querySelectorAll('.range-btn').forEach(btn => {
    btn.classList.toggle('active', +btn.dataset.days === modalDays);
    btn.onclick = () => {
      modalDays = +btn.dataset.days;
      document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadModalChart(s.id, up);
    };
  });

  document.getElementById('modalOverlay').classList.add('open');
  loadModalChart(s.id, up);
  renderModalAlerts(s.id);
}

async function loadModalChart(stockId, up) {
  const loading = document.getElementById('chartLoading');
  const canvas  = document.getElementById('modalChart');
  loading.classList.add('visible');
  canvas.style.display = 'none';
  if (modalChartInst) { modalChartInst.destroy(); modalChartInst = null; }

  // Tenter de récupérer les données historiques réelles
  const anyReal = Object.values(CONFIG.apis).some(a => a.enabled && a.key);
  let labels = [], closes = [], sourceLabel = 'Simulation';

  if (anyReal) {
    try {
      const hist = await fetchStockHistory(stockId, modalDays);
      if (hist && hist.length > 0) {
        // Convertir en EUR si nécessaire
        const native = isEurNative(stockId);
        closes = hist.map(d => native ? d.c : d.c * eurRate);
        labels = hist.map(d => {
          const date = new Date(d.t * 1000);
          return date.toLocaleDateString('fr-BE', { day:'2-digit', month:'short' });
        });
        sourceLabel = hist.length + ' jours · données réelles';
      }
    } catch(e) { console.warn('[Modal chart]', e); }
  }

  // Fallback sur l'historique simulé
  if (closes.length === 0) {
    const s = STOCKS.find(x => x.id === stockId);
    closes = (s?.history || []).map(p => p * eurRate);
    labels = closes.map((_, i) => i);
    sourceLabel = 'Simulation';
  }

  document.getElementById('rangeSource').textContent = sourceLabel;
  loading.classList.remove('visible');
  canvas.style.display = 'block';

  const isUp = closes.length > 1 ? closes[closes.length-1] >= closes[0] : up;
  const color = isUp ? '#22c55e' : '#ef4444';
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 100);
  grad.addColorStop(0, color + '44'); grad.addColorStop(1, color + '00');

  modalChartInst = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{ data: closes, borderColor: color, backgroundColor: grad, borderWidth: 2, pointRadius: 0, fill: true, tension: 0.3 }]
    },
    options: {
      animation: { duration: 400 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: c => '  ' + c.parsed.y.toLocaleString('fr-BE', { style:'currency', currency:'EUR', minimumFractionDigits:2 }),
          }
        }
      },
      scales: {
        x: { ticks: { color: '#64748b', maxTicksLimit: 6, maxRotation: 0 }, grid: { display: false } },
        y: { ticks: { color: '#64748b', callback: v => v.toLocaleString('fr-BE', { style:'currency', currency:'EUR', maximumFractionDigits:0 }) }, grid: { color: 'rgba(255,255,255,0.04)' } }
      }
    }
  });
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function setTradeMode(mode) {
  tradeMode = mode;
  document.getElementById('tabBuy').classList.toggle('active', mode==='buy');
  document.getElementById('tabSell').classList.toggle('active', mode==='sell');
  const btn = document.getElementById('tradeBtn');
  btn.textContent = mode==='buy' ? 'Confirmer l\'achat' : 'Confirmer la vente';
  btn.className = 'trade-btn' + (mode==='sell' ? ' sell-mode' : '');
  updateTradeTotal();
}

function adjustQty(delta) {
  const inp = document.getElementById('tradeQty');
  inp.value = Math.max(1, (+inp.value || 1) + delta);
  updateTradeTotal();
}

function updateTradeTotal() {
  const qty = Math.max(1, +document.getElementById('tradeQty').value || 1);
  if (!currentStock) return;
  const totalEur = currentStock.price * eurRate * qty;
  document.getElementById('tradeTotal').textContent = fmt(currentStock.price * qty);
  const info = document.getElementById('tradeInfo');
  const btn = document.getElementById('tradeBtn');
  if (tradeMode === 'buy') {
    info.textContent = `Liquidités disponibles : ${fmt(cash / eurRate)}`;
    btn.disabled = totalEur > cash;
  } else {
    const h = holdings[currentStock.id];
    const owned = h ? h.qty : 0;
    info.textContent = `Actions en portefeuille : ${owned}`;
    btn.disabled = qty > owned;
  }
}

function executeTrade() {
  const qty = +document.getElementById('tradeQty').value || 1;
  const s = currentStock;
  const totalEur = s.price * eurRate * qty;
  if (tradeMode === 'buy') {
    if (totalEur > cash) { showToast('Fonds insuffisants', 'error'); return; }
    cash -= totalEur;
    if (!holdings[s.id]) holdings[s.id] = { qty:0, avgCost:0 };
    const h = holdings[s.id];
    h.avgCost = (h.avgCost * h.qty + s.price * qty) / (h.qty + qty); // stocké en USD
    h.qty += qty;
    transactions.unshift({ type:'buy', stock:s, qty, price:s.price, total:totalEur, date:new Date() });
    showToast(`✅ Achat de ${qty} action(s) ${s.ticker}`, 'success');
  } else {
    const h = holdings[s.id];
    if (!h || h.qty < qty) { showToast('Pas assez d\'actions', 'error'); return; }
    cash += totalEur;
    h.qty -= qty;
    if (h.qty === 0) delete holdings[s.id];
    transactions.unshift({ type:'sell', stock:s, qty, price:s.price, total:totalEur, date:new Date() });
    showToast(`💰 Vente de ${qty} action(s) ${s.ticker}`, 'success');
  }
  updateCashDisplay();
  trackPortfolioHistory();
  saveState();
  closeModal();
}

// ── PORTFOLIO ─────────────────────────────────
function renderPortfolio() {
  const { pnl, val } = getPortfolioPnl();
  const total = cash + val;
  const initCash = 10000;
  const gainPct = ((total - initCash) / initCash) * 100;
  document.getElementById('portfolioTotal').textContent = fmt(total);
  document.getElementById('portfolioCash').textContent = fmt(cash);
  document.getElementById('portfolioInvested').textContent = fmt(val);
  document.getElementById('portfolioPnl').textContent = fmt(pnl);
  document.getElementById('portfolioPnl').style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';
  const gl = document.getElementById('portfolioGainLoss');
  gl.textContent = `${pnl>=0?'+':''}${fmt(pnl)} (${pct(gainPct)})`;
  gl.style.color = pnl >= 0 ? 'var(--green)' : 'var(--red)';

  // Holdings list
  const list = document.getElementById('holdingsList');
  const entries = Object.entries(holdings);
  const hasSect = document.getElementById('sectorSection');
  const hasPerf = document.getElementById('perfSummary');

  if (entries.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">📊</span><p>Vous n'avez aucune position ouverte.<br>Achetez des actions depuis le marché !</p></div>`;
    if (hasSect) hasSect.style.display = 'none';
    if (hasPerf) hasPerf.style.display = 'none';
  } else {
    list.innerHTML = entries.map(([id, h]) => {
      const s = STOCKS.find(x => x.id === id);
      if (!s) return '';
      const curEur  = s.price * eurRate;
      const curVal  = curEur * h.qty;
      const costVal = h.avgCost * h.qty;
      const rowPnl  = curVal - costVal;
      const rowPct  = ((curVal - costVal) / costVal) * 100;
      // Target / stop badges
      const tgt = h.target   ? `<span class="target-badge target">🎯 Objectif ${h.target.toFixed(2)}€</span>` : '';
      const stp = h.stopLoss ? `<span class="target-badge stop">️⚠ Stop ${h.stopLoss.toFixed(2)}€</span>` : '';
      return `<div class="holding-row">
        <div class="holding-logo" style="background:${s.color}22;color:${s.color}">${s.emoji}</div>
        <div>
          <div class="holding-name">${s.name}</div>
          <div class="holding-qty">${h.qty} action(s) · moy. ${fmt(h.avgCost / eurRate)}</div>
          <div style="display:flex;gap:6px;margin-top:4px">${tgt}${stp}</div>
        </div>
        <div class="holding-value">${fmt(curVal / eurRate)}</div>
        <div class="holding-pnl ${rowPnl>=0?'up':'dn'}">${rowPnl>=0?'+':''}${fmt(rowPnl / eurRate)}<br><small>${pct(rowPct)}</small></div>
        <button class="btn-sell" onclick="quickSell('${id}')">Vendre</button>
        <div class="holding-targets" style="grid-column:1/-1">
          <div class="target-input-wrap">
            <span class="target-label">🎯 Objectif :</span>
            <input class="target-inp" id="tgt-${id}" type="number" step="0.01" placeholder="—" value="${h.target || ''}" />
          </div>
          <div class="target-input-wrap">
            <span class="target-label">⚠️ Stop-loss :</span>
            <input class="target-inp" id="stp-${id}" type="number" step="0.01" placeholder="—" value="${h.stopLoss || ''}" />
          </div>
          <button class="btn-target-save" onclick="saveTargets('${id}')">Enregistrer</button>
          <small style="color:var(--muted);font-size:.7rem">Cours actuel : ${curEur.toFixed(2)}€</small>
        </div>
      </div>`;
    }).join('');

    // Performance summary
    if (hasPerf) {
      hasPerf.style.display = 'grid';
      let best = null, worst = null, totalCost = 0, totalVal = 0, wins = 0;
      entries.forEach(([id, h]) => {
        const s = STOCKS.find(x => x.id === id);
        if (!s) return;
        const curVal  = s.price * eurRate * h.qty;
        const costVal = h.avgCost * h.qty;
        const p = ((curVal - costVal) / costVal) * 100;
        totalCost += costVal; totalVal += curVal;
        if (p >= 0) wins++;
        if (!best  || p > best.p)  best  = { s, p };
        if (!worst || p < worst.p) worst = { s, p };
      });
      const totalPnl = totalVal - totalCost;
      const winRate  = Math.round(wins / entries.length * 100);
      hasPerf.innerHTML = `
        <div class="perf-card">
          <div class="perf-card-label">Meilleure position</div>
          <div class="perf-card-val" style="color:var(--green)">${best?.s.emoji} ${best?.s.ticker}</div>
          <div class="perf-card-sub">${best ? (best.p>0?'+':'') + best.p.toFixed(2) + '%' : '—'}</div>
        </div>
        <div class="perf-card">
          <div class="perf-card-label">Pire position</div>
          <div class="perf-card-val" style="color:var(--red)">${worst?.s.emoji} ${worst?.s.ticker}</div>
          <div class="perf-card-sub">${worst ? (worst.p>0?'+':'') + worst.p.toFixed(2) + '%' : '—'}</div>
        </div>
        <div class="perf-card">
          <div class="perf-card-label">P&amp;L total</div>
          <div class="perf-card-val" style="color:${totalPnl>=0?'var(--green)':'var(--red)'}">${totalPnl>=0?'+':''}${fmt(totalPnl / eurRate)}</div>
          <div class="perf-card-sub">${entries.length} position(s)</div>
        </div>
        <div class="perf-card">
          <div class="perf-card-label">Win rate</div>
          <div class="perf-card-val">${winRate}%</div>
          <div class="perf-card-sub">${wins}/${entries.length} en positif</div>
        </div>`;
    }

    // Sector donut
    if (hasSect) {
      hasSect.style.display = 'grid';
      renderSectorDonut(entries);
    }
  }

  // Portfolio chart
  if (portfolioChartInst) portfolioChartInst.destroy();
  const ctx = document.getElementById('portfolioChart').getContext('2d');
  const isUp = portfolioHistory[portfolioHistory.length-1] >= portfolioHistory[0];
  const col = isUp ? '#22c55e' : '#ef4444';
  const gr = ctx.createLinearGradient(0,0,0,120);
  gr.addColorStop(0, col+'44'); gr.addColorStop(1, col+'00');
  portfolioChartInst = new Chart(ctx, {
    type:'line',
    data:{ labels:portfolioHistory.map((_,i)=>i), datasets:[{ data:portfolioHistory, borderColor:col, backgroundColor:gr, borderWidth:2, pointRadius:0, fill:true, tension:0.4 }] },
    options:{ responsive:true, plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>fmt(c.parsed.y)}}}, scales:{x:{display:false},y:{ticks:{color:'#64748b',callback:v=>fmt(v)},grid:{color:'rgba(255,255,255,0.04)'}}} }
  });
}

function quickSell(id) {
  const s = STOCKS.find(x => x.id === id);
  if (!s) return;
  openModal(id);
  setTimeout(() => setTradeMode('sell'), 100);
}

// ── PHASE 4 HELPERS ────────────────────────────
const SECTOR_COLORS = ['#8b5cf6','#22c55e','#f59e0b','#06b6d4','#f43f5e','#a78bfa','#34d399'];
const SECTOR_NAMES  = { console:'Console', publisher:'\u00c9diteur', mobile:'Mobile', esports:'Esports', cloud:'Cloud', platform:'Plateforme' };
let sectorDonutInst = null;

function saveTargets(id) {
  const tgt = parseFloat(document.getElementById('tgt-'+id)?.value);
  const stp = parseFloat(document.getElementById('stp-'+id)?.value);
  if (!holdings[id]) return;
  holdings[id].target   = isNaN(tgt) ? null : tgt;
  holdings[id].stopLoss = isNaN(stp) ? null : stp;
  saveState();
  showToast('\ud83c\udfaf Objectifs enregistr\u00e9s', 'success');
  renderPortfolio();
}

function checkTargetsStopLoss() {
  Object.entries(holdings).forEach(([id, h]) => {
    const s = STOCKS.find(x => x.id === id);
    if (!s) return;
    const cur = s.price * eurRate;
    if (h.target   && cur >= h.target)   { notifyTargetHit(s, cur, 'target');   h.target   = null; saveState(); }
    if (h.stopLoss && cur <= h.stopLoss)  { notifyTargetHit(s, cur, 'stopLoss'); h.stopLoss = null; saveState(); }
  });
}

function notifyTargetHit(s, curEur, type) {
  const msg = type === 'target'
    ? `\ud83c\udfaf ${s.ticker} a atteint votre objectif ! Cours : ${curEur.toFixed(2)}\u20ac`
    : `\u26a0\ufe0f ${s.ticker} a touch\u00e9 votre stop-loss ! Cours : ${curEur.toFixed(2)}\u20ac`;
  showToast(msg, type === 'target' ? 'success' : 'error');
  if (Notification.permission === 'granted') {
    new Notification(`GameStock \u2014 ${s.emoji} ${s.ticker}`, { body: msg });
  }
}

function renderSectorDonut(entries) {
  const sectorMap = {};
  entries.forEach(([id, h]) => {
    const s = STOCKS.find(x => x.id === id);
    if (!s) return;
    const cat = s.cat || 'other';
    const val = s.price * eurRate * h.qty;
    sectorMap[cat] = (sectorMap[cat] || 0) + val;
  });
  const labels = Object.keys(sectorMap).map(k => SECTOR_NAMES[k] || k);
  const data   = Object.values(sectorMap);
  const total  = data.reduce((a,b) => a+b, 0);
  const colors = SECTOR_COLORS.slice(0, data.length);

  if (sectorDonutInst) { sectorDonutInst.destroy(); sectorDonutInst = null; }
  const ctx = document.getElementById('sectorDonut').getContext('2d');
  sectorDonutInst = new Chart(ctx, {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderColor: 'var(--bg-base)', borderWidth: 3 }] },
    options: {
      cutout: '65%', animation: { duration: 600 },
      plugins: { legend: { display: false }, tooltip: {
        callbacks: { label: c => ` ${c.label} : ${fmt(c.parsed / eurRate)} (${(c.parsed/total*100).toFixed(1)}%)` }
      }}
    }
  });

  const leg = document.getElementById('sectorLegend');
  if (leg) {
    leg.innerHTML = Object.entries(sectorMap).map(([cat, val], i) => `
      <div class="sector-legend-item">
        <div class="sector-legend-left">
          <span class="sector-dot" style="background:${SECTOR_COLORS[i]}"></span>
          <span>${SECTOR_NAMES[cat] || cat}</span>
        </div>
        <span class="sector-pct">${(val/total*100).toFixed(1)}%</span>
      </div>`).join('');
  }
}

function exportCSV() {
  if (transactions.length === 0) { showToast('Aucune transaction \u00e0 exporter', 'error'); return; }
  const header = 'Date,Type,Action,Ticker,Quantit\u00e9,Prix unitaire (\u20ac),Total (\u20ac)';
  const rows = transactions.map(tx => {
    const d = new Date(tx.date).toLocaleDateString('fr-BE');
    const price = tx.price * eurRate;
    const total = price * tx.qty;
    return `${d},${tx.type.toUpperCase()},${tx.stock.name},${tx.stock.ticker},${tx.qty},${price.toFixed(2)},${total.toFixed(2)}`;
  });
  const csv  = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `gamestock_transactions_${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  showToast('\ud83d\udce5 Export CSV t\u00e9l\u00e9charg\u00e9 !', 'success');
}


function renderHistory() {
  const list = document.getElementById('transactionsList');
  if (transactions.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">📋</span><p>Aucune transaction pour le moment.</p></div>`;
    return;
  }
  list.innerHTML = transactions.map(tx => {
    const d = new Date(tx.date);
    const dateStr = d.toLocaleDateString('fr-BE') + ' ' + d.toLocaleTimeString('fr-BE', {hour:'2-digit',minute:'2-digit'});
    return `<div class="tx-row">
      <span class="tx-badge ${tx.type}">${tx.type==='buy'?'Achat':'Vente'}</span>
      <div class="tx-company">${tx.stock.emoji} ${tx.stock.name}</div>
      <div class="tx-qty">${tx.qty} action(s)</div>
      <div class="tx-date">${dateStr}</div>
      <div class="tx-amount" style="color:${tx.type==='buy'?'var(--red)':'var(--green)'}">${tx.type==='buy'?'-':'+'} ${fmt(tx.total)}</div>
    </div>`;
  }).join('');
}

// ── PHASE 5 — ACTUALITÉS & IA ─────────────────
const STOCK_KEYWORDS = {
  ntdoy:   ['nintendo','switch 2','mario','zelda','pokemon','kirby','donkey kong'],
  sony:    ['sony','playstation','ps5','ps4','state of play','insomniac','naughty dog'],
  msft:    ['microsoft','xbox','game pass','gamepass','activision','bethesda'],
  atvi:    ['activision','blizzard','call of duty','warcraft','overwatch','diablo'],
  ea:      ['electronic arts',' ea ','ea sports','ea fc','fifa','madden','the sims','apex legends'],
  ttwo:    ['take-two','rockstar','gta','grand theft auto','2k games','nba 2k','borderlands'],
  ubisoft: ['ubisoft',"assassin's creed",'far cry','rainbow six','star wars outlaws','skull and bones'],
  rblx:    ['roblox'],
  unity:   ['unity engine','unity technologies'],
  ntes:    ['netease','fantasy westward'],
  se:      ['sea limited','garena','free fire','shopee'],
  glxyz:   ['esports championship','esports tournament'],
};
const POS_WORDS = ['record','profit','growth','surge','beats','launch','success','revenue',
  'billion','million','milestone','partnership','acquisition','strong','rises','gain','hit','best'];
const NEG_WORDS = ['delay','layoff','layoffs','loss','lawsuit','cancel','disappointing',
  'disappoints','miss','decline','fall','drop','concern','warning','slump','cuts','closure','struggling'];

function scoreSentiment(text) {
  const t = text.toLowerCase();
  let s = 0;
  POS_WORDS.forEach(w => { if (t.includes(w)) s++; });
  NEG_WORDS.forEach(w => { if (t.includes(w)) s--; });
  return Math.max(-3, Math.min(3, s));
}
function findRelatedStocks(text) {
  const t = text.toLowerCase();
  return Object.entries(STOCK_KEYWORDS)
    .filter(([, kws]) => kws.some(k => t.includes(k)))
    .map(([id]) => id);
}
function impactLabel(score) {
  if (score >= 2)  return { cls:'pos', text:'\u2197 Fort impact positif' };
  if (score === 1) return { cls:'pos', text:'\u2197 Impact positif' };
  if (score === -1)return { cls:'neg', text:'\u2198 Impact n\u00e9gatif' };
  if (score <= -2) return { cls:'neg', text:'\u2198 Fort impact n\u00e9gatif' };
  return               { cls:'neu', text:'\u2192 Neutre' };
}

let newsFilter = 'all';
const NEWS_EMOJIS = ['\ud83c\udfae','\ud83d\udcf1','\ud83d\udd79\ufe0f','\ud83c\udfc6','\ud83d\udcbb','\ud83c\udfc3','\ud83c\udf1f'];

function filterNews(f) {
  newsFilter = f;
  document.querySelectorAll('.news-filter-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.f === f));
  renderNews();
}

async function renderNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  // Loading state
  grid.innerHTML = `<div class="news-loading">
    <span class="loading-dot"></span><span class="loading-dot"></span><span class="loading-dot"></span>
    <span style="margin-left:8px;color:var(--muted);font-size:.85rem">Chargement des actualit\u00e9s...</span>
  </div>`;

  let articles = [];
  try {
    const raw = await fetchGamingNews(10);
    if (raw && raw.length > 0) {
      articles = raw.map(a => ({
        ...a,
        score:  scoreSentiment(a.title + ' ' + a.desc),
        stocks: findRelatedStocks(a.title + ' ' + a.desc),
      }));
    }
  } catch (e) { /* silently fall through to static */ }

  // Fallback to static NEWS array
  if (articles.length === 0) {
    articles = NEWS.map(n => ({
      title: n.title, desc: '', source: n.tag, link: '#',
      pubDate: new Date().toISOString(), thumb: null,
      score:  n.impact === 'pos' ? 1 : n.impact === 'neg' ? -1 : 0,
      stocks: n.tickers.map(t => STOCKS.find(s => s.ticker === t)?.id).filter(Boolean),
    }));
  }

  // Filter by portfolio if requested
  if (newsFilter === 'portfolio') {
    const held = Object.keys(holdings);
    articles = articles.filter(a => a.stocks.some(id => held.includes(id)));
    if (articles.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <span class="empty-icon">\ud83d\udcf0</span>
        <p>Aucune actualit\u00e9 trouv\u00e9e pour vos actions d\u00e9tenues.<br>
        <small>Essayez de rafra\u00eechir ou r\u00e9duisez le filtre.</small></p></div>`;
      return;
    }
  }

  const held = Object.keys(holdings);
  grid.innerHTML = articles.slice(0, 24).map((a, idx) => {
    const imp  = impactLabel(a.score);
    const tags = a.stocks.map(id => {
      const s = STOCKS.find(x => x.id === id);
      return s ? `<span class="news-stock-tag" onclick="event.preventDefault();openModal('${s.id}')">${s.emoji} ${s.ticker}</span>` : '';
    }).join('');
    const inPort = a.stocks.some(id => held.includes(id));
    const portBadge = inPort ? `<span class="news-portfolio-badge">\ud83d\udcca Mon portfolio</span>` : '';
    const dAgo = Math.max(0, Math.round((Date.now() - new Date(a.pubDate)) / 86400000));
    const dateStr = dAgo === 0 ? "Aujourd'hui" : dAgo === 1 ? 'Hier' : `Il y a ${dAgo}j`;
    const fallbackEmoji = NEWS_EMOJIS[idx % NEWS_EMOJIS.length];
    const imgHtml = a.thumb
      ? `<img src="${a.thumb}" alt="" class="news-img news-img-real" loading="lazy" onerror="this.outerHTML='<div class=\\"news-img\\">${fallbackEmoji}</div>'">`
      : `<div class="news-img">${fallbackEmoji}</div>`;

    return `<a class="news-card" href="${a.link}" target="_blank" rel="noopener noreferrer">
      ${imgHtml}
      <div class="news-body">
        <div class="news-card-top">
          <span class="news-source-badge">${a.source}</span>
          ${portBadge}
        </div>
        <div class="news-title">${a.title}</div>
        ${a.desc ? `<div class="news-desc">${a.desc}</div>` : ''}
        <div class="news-meta">${dateStr}</div>
        <div class="news-card-footer">
          <span class="news-impact ${imp.cls}">${imp.text}</span>
          <div class="news-stock-tags">${tags}</div>
        </div>
      </div>
    </a>`;
  }).join('');
}


// ── UTILS ─────────────────────────────────────
function updateCashDisplay() {
  // cash est en EUR, fmt attend du USD → on divise par eurRate
  document.getElementById('cashDisplay').textContent = fmt(cash / eurRate);
  document.getElementById('portfolioCash').textContent = fmt(cash / eurRate);
}

function trackPortfolioHistory() {
  portfolioHistory.push(+(cash + getPortfolioValue()).toFixed(2));
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  setTimeout(() => { t.className = 'toast ' + type; }, 3000);
}

// ── LOCALSTORAGE ─────────────────────────────────────
const STORAGE_KEY = 'gamestock_v1';

function saveState() {
  try {
    const state = {
      cash,
      holdings,
      alerts,
      portfolioHistory: portfolioHistory.slice(-200),
      transactions: transactions.slice(0, 200).map(tx => ({
        type:        tx.type,
        stockId:     tx.stock.id,
        stockName:   tx.stock.name,
        stockEmoji:  tx.stock.emoji,
        stockTicker: tx.stock.ticker,
        qty:         tx.qty,
        price:       tx.price,
        total:       tx.total,
        date:        tx.date,
      })),
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const el = document.getElementById('saveIndicator');
    if (el) { el.classList.add('saved'); setTimeout(() => el.classList.remove('saved'), 2000); }
  } catch(e) {
    console.warn('[GameStock] Sauvegarde échouée :', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const state = JSON.parse(raw);
    cash             = state.cash             ?? 10000;
    holdings         = state.holdings         ?? {};
    alerts           = state.alerts           ?? [];
    portfolioHistory = state.portfolioHistory  ?? [10000];
    transactions     = (state.transactions    ?? []).map(tx => ({
      ...tx,
      stock: { id: tx.stockId, name: tx.stockName, emoji: tx.stockEmoji, ticker: tx.stockTicker },
      date:  new Date(tx.date),
    }));
    console.log('[GameStock] Portfolio restauré — sauvegardé le', state.savedAt);
    return true;
  } catch(e) {
    console.warn('[GameStock] Restauration échouée :', e);
    return false;
  }
}

function resetPortfolio() {
  if (!confirm('Réinitialiser complètement le portfolio ? (Action irréversible)')) return;
  localStorage.removeItem(STORAGE_KEY);
  cash = 10000; holdings = {}; transactions = []; portfolioHistory = [10000]; alerts = [];
  updateCashDisplay(); renderPortfolio();
  showToast('🔄 Portfolio réinitialisé — €10 000 de départ', 'success');
}

// ── ALERTES ──────────────────────────────────────
function addAlert() {
  if (!currentStock) return;
  const targetEur = parseFloat(document.getElementById('alertTarget').value);
  if (!targetEur || targetEur <= 0) { showToast('Entrez un prix cible valide', 'error'); return; }
  const type = document.getElementById('alertType').value;
  const s = currentStock;
  alerts.push({
    id:          Date.now().toString(),
    stockId:     s.id,
    stockName:   s.name,
    stockEmoji:  s.emoji,
    stockTicker: s.ticker,
    type,
    targetEur,
    triggered:   false,
    createdAt:   new Date().toISOString(),
  });
  document.getElementById('alertTarget').value = '';
  saveState();
  updateAlertBadge();
  renderModalAlerts(s.id);
  showToast(`🔔 Alerte ${type === 'above' ? '↗ au-dessus de' : '↘ sous'} ${targetEur.toFixed(2)}€ sur ${s.ticker}`, 'success');
  // Demander la permission si pas encore fait
  if (Notification.permission === 'default') requestNotifPermission();
}

function deleteAlert(id) {
  alerts = alerts.filter(a => a.id !== id);
  saveState();
  updateAlertBadge();
  renderAlerts();
  if (currentStock) renderModalAlerts(currentStock.id);
}

function checkAlerts() {
  let anyTriggered = false;
  alerts.forEach(a => {
    if (a.triggered) return;
    const stock = STOCKS.find(s => s.id === a.stockId);
    if (!stock) return;
    const currentEur = stock.price * eurRate;
    const hit = a.type === 'above' ? currentEur >= a.targetEur : currentEur <= a.targetEur;
    if (hit) {
      a.triggered = true;
      anyTriggered = true;
      notifyAlert(a, currentEur);
    }
  });
  if (anyTriggered) { saveState(); updateAlertBadge(); renderAlerts(); }
}

function notifyAlert(alert, currentEur) {
  const dir = alert.type === 'above' ? '↗ dépasse' : '↘ tombe sous';
  showToast(`🔔 ${alert.stockEmoji} ${alert.stockTicker} ${dir} ${alert.targetEur.toFixed(2)}€ !`, 'success');
  if (Notification.permission === 'granted') {
    new Notification(`GameStock — Alerte ${alert.stockEmoji} ${alert.stockTicker}`, {
      body: `${alert.stockName} ${dir} ${alert.targetEur.toFixed(2)} €\nCours actuel : ${currentEur.toFixed(2)} €`,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text y="26" font-size="28">🎮</text></svg>'
    });
  }
}

function updateAlertBadge() {
  const active = alerts.filter(a => !a.triggered).length;
  const badge = document.getElementById('alertBadge');
  if (!badge) return;
  badge.textContent = active;
  badge.classList.toggle('visible', active > 0);
}

function renderAlerts() {
  const list = document.getElementById('alertsList');
  if (!list) return;
  // Barre de permission
  const bar = document.getElementById('notifBar');
  if (bar) bar.classList.toggle('visible', Notification.permission === 'default');
  if (alerts.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">🔔</span><p>Aucune alerte définie.<br>Ouvrez une action et créez votre première alerte de prix.</p></div>`;
    return;
  }
  list.innerHTML = [...alerts].reverse().map(a => {
    const stock = STOCKS.find(s => s.id === a.stockId);
    const curEur = stock ? (stock.price * eurRate).toFixed(2) : '?';
    const dir = a.type === 'above' ? '↗ au-dessus de' : '↘ en dessous de';
    return `<div class="alert-card ${a.triggered ? 'triggered' : ''}">
      <span class="alert-emoji">${a.stockEmoji}</span>
      <div>
        <div class="alert-stock-name">${a.stockName} <small style="color:var(--muted)">${a.stockTicker}</small></div>
        <div class="alert-detail">${dir} &bull; Cours actuel : ${curEur} €</div>
      </div>
      <div class="alert-target ${a.type}">${a.targetEur.toFixed(2)} €</div>
      <span class="alert-status ${a.triggered ? 'triggered' : 'active'}">${a.triggered ? '✓ Déclenchée' : 'Active'}</span>
      <button class="btn-del-alert" onclick="deleteAlert('${a.id}')" title="Supprimer">✕</button>
    </div>`;
  }).join('');
}

function renderModalAlerts(stockId) {
  const container = document.getElementById('modalAlertList');
  if (!container) return;
  const stockAlerts = alerts.filter(a => a.stockId === stockId);
  if (stockAlerts.length === 0) { container.innerHTML = ''; return; }
  container.innerHTML = stockAlerts.map(a => {
    const dir = a.type === 'above' ? '↗ si >' : '↘ si <';
    return `<div class="modal-alert-item">
      <span>${dir} <strong>${a.targetEur.toFixed(2)} €</strong> — ${a.triggered ? '<span style="color:var(--green)">✓ Déclenchée</span>' : '<span>Active</span>'}</span>
      <button class="btn-del-alert" onclick="deleteAlert('${a.id}')">✕</button>
    </div>`;
  }).join('');
}

function requestNotifPermission() {
  if (!('Notification' in window)) { showToast('Notifications non supportées', 'error'); return; }
  Notification.requestPermission().then(p => {
    if (p === 'granted') showToast('🔔 Notifications activées !', 'success');
    renderAlerts();
  });
}

// ── SOURCE STATUS UI ──────────────────────────
const SRC_COLORS = {
  finnhub:      '#f59e0b',
  alphavantage: '#8b5cf6',
  polygon:      '#06b6d4',
};

function updateSourceBar() {
  const apis = CONFIG.apis;
  ['finnhub', 'alphavantage', 'polygon'].forEach(key => {
    const chip = document.getElementById('src-' + key);
    if (!chip) return;
    const cfg = apis[key];
    if (!cfg.enabled || !cfg.key) {
      chip.className = 'source-chip off';
    } else {
      chip.className = 'source-chip ' + (sourceStatus[key] || 'off');
    }
  });
  // Simulation chip
  const simChip = document.getElementById('src-simulation');
  if (simChip) {
    const anyReal = Object.values(apis).some(a => a.enabled && a.key);
    simChip.className = 'source-chip ' + (anyReal ? 'off' : 'active');
  }
  // Last update
  const lu = document.getElementById('lastUpdate');
  if (lu) lu.textContent = `1 USD = ${eurRate.toFixed(4)} € · Mis à jour : ${new Date().toLocaleTimeString('fr-BE')}`;
}

// ── APPLY REAL QUOTES ─────────────────────────
function applyQuotes(quotesMap) {
  STOCKS.forEach(s => {
    const q = quotesMap[s.id];
    if (!q) return;
    // Si le prix est déjà en EUR (ex: UBI.PA), on le stocke en "USD fictif"
    // pour que fmt() le reconvertisse correctement en EUR via eurRate
    const priceUsd = q.eurNative ? q.price / eurRate : q.price;
    s.price  = priceUsd;
    s.change = q.change;
    if (q.open)  s.open  = q.eurNative ? q.open  / eurRate : q.open;
    if (q.high)  s._high = q.eurNative ? q.high  / eurRate : q.high;
    if (q.low)   s._low  = q.eurNative ? q.low   / eurRate : q.low;
    s.history.push(priceUsd);
    s._sources  = q.sources || [];
    s._count    = q.count   || 1;
    s._eurNative = q.eurNative;
  });
}

// ── UNIFIED REFRESH LOOP ──────────────────────
async function refreshLoop() {
  const anyReal = Object.values(CONFIG.apis).some(a => a.enabled && a.key);

  if (anyReal) {
    // Real API fetch + aggregation
    const quotes = await refreshAllPrices(STOCKS);
    if (quotes && Object.keys(quotes).length > 0) {
      applyQuotes(quotes);
    } else {
      // APIs enabled but returned nothing → fallback simulation
      simulatePrices();
      STOCKS.forEach(s => s.history.push(s.price));
    }
  } else {
    // Pure simulation
    simulatePrices();
    STOCKS.forEach(s => s.history.push(s.price));
  }

  updateSourceBar();
  const activePage = document.querySelector('.page.active');
  if (activePage?.id === 'page-market')    renderMarket();
  if (activePage?.id === 'page-alertes')   renderAlerts();
  if (activePage?.id === 'page-portfolio') renderPortfolio();
  updateCashDisplay();
  if (Object.keys(holdings).length > 0) trackPortfolioHistory();
  checkAlerts();
  checkTargetsStopLoss();
}

// ── PHASE 6 — UX & MOBILE ────────────────────

// Hamburger / Nav mobile
function toggleNav() {
  const nav = document.getElementById('nav');
  const hbg = document.getElementById('hamburger');
  const ovl = document.getElementById('navOverlay');
  nav.classList.toggle('open');
  hbg.classList.toggle('open');
  ovl.classList.toggle('open');
  document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
}
function closeNav() {
  document.getElementById('nav').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Dark / Light mode
function toggleTheme() {
  const isLight = document.body.classList.toggle('light-mode');
  document.getElementById('themeToggle').textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('gs_theme', isLight ? 'light' : 'dark');
}
function loadTheme() {
  if (localStorage.getItem('gs_theme') === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
}

// Onboarding (1ère visite)
function showOnboarding() {
  if (!localStorage.getItem('gs_welcomed')) {
    setTimeout(() => {
      document.getElementById('onboarding').classList.add('open');
    }, 800);
  }
}
function closeOnboarding() {
  localStorage.setItem('gs_welcomed', '1');
  document.getElementById('onboarding').classList.remove('open');
}

// Init Phase 6
loadTheme();
showOnboarding();


// ── INIT ──────────────────────────────────────
// Restaurer le portfolio sauvegardé
if (loadState()) {
  updateCashDisplay();
  updateAlertBadge();
}

// Mark disabled sources as off
['finnhub','alphavantage','polygon'].forEach(k => {
  if (!CONFIG.apis[k].enabled) sourceStatus[k] = 'off';
});

// Récupère le taux EUR/USD au démarrage puis toutes les 30 min
fetchEurUsdRate().then(async () => {
  // Appel immédiat des APIs pour avoir les vrais cours dès le démarrage
  await refreshLoop();
});
setInterval(fetchEurUsdRate, 30 * 60 * 1000);

// Adjust interval: slower if real APIs (rate limits), faster if simulation
const interval = Object.values(CONFIG.apis).some(a => a.enabled && a.key)
  ? CONFIG.refreshInterval
  : 4000;

setInterval(refreshLoop, interval);
