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

// ── STATE ──────────────────────────────────────
let cash = 10000;
let holdings = {};       // { stockId: { qty, avgCost } }
let transactions = [];
let portfolioHistory = [10000];
let alerts = [];         // [{ id, stockId, stockName, stockEmoji, stockTicker, type, targetEur, triggered, createdAt }]
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
      </div>`;
    grid.appendChild(card);
    // Draw sparkline
    setTimeout(() => drawSparkline('mini-'+s.id, s.history, up), 0);
  });
  // Ticker
  renderTicker();
  // Index
  const avg = STOCKS.reduce((a,b) => a+b.change, 0) / STOCKS.length;
  document.getElementById('indexValue').textContent = '2 847.32';
  const ic = document.getElementById('indexChange');
  ic.textContent = pct(avg);
  ic.style.color = avg >= 0 ? 'var(--green)' : 'var(--red)';
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
  document.getElementById('mLow').textContent = fmt(lo);
  document.getElementById('mCap').textContent = s.cap;
  document.getElementById('mPe').textContent = s.pe ? s.pe + 'x' : 'N/A';
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
  if (entries.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="empty-icon">📊</span><p>Vous n'avez aucune position ouverte.<br>Achetez des actions depuis le marché !</p></div>`;
  } else {
    list.innerHTML = entries.map(([id, h]) => {
      const s = STOCKS.find(x => x.id === id);
      if (!s) return '';
      const curVal = s.price * h.qty;
      const costVal = h.avgCost * h.qty;
      const rowPnl = curVal - costVal;
      const rowPct = ((curVal - costVal) / costVal) * 100;
      return `<div class="holding-row">
        <div class="holding-logo" style="background:${s.color}22;color:${s.color}">${s.emoji}</div>
        <div><div class="holding-name">${s.name}</div><div class="holding-qty">${h.qty} action(s) · moy. ${fmt(h.avgCost)}</div></div>
        <div class="holding-value">${fmt(curVal)}</div>
        <div class="holding-pnl ${rowPnl>=0?'up':'dn'}">${rowPnl>=0?'+':''}${fmt(rowPnl)}<br><small>${pct(rowPct)}</small></div>
        <button class="btn-sell" onclick="quickSell('${id}')">Vendre</button>
      </div>`;
    }).join('');
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

function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = NEWS.map(n => `
    <div class="news-card">
      <div class="news-img">${n.emoji}</div>
      <div class="news-body">
        <span class="news-tag">${n.tag}</span>
        <div class="news-title">${n.title}</div>
        <div class="news-meta">${n.date} · ${n.tickers.join(', ')}</div>
        <span class="news-impact ${n.impact}">${n.impact==='pos'?'↑ Impact positif':n.impact==='neg'?'↓ Impact négatif':'→ Neutre'}</span>
      </div>
    </div>`).join('');
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
  if (activePage?.id === 'page-market') renderMarket();
  if (activePage?.id === 'page-alertes') renderAlerts();
  updateCashDisplay();
  if (Object.keys(holdings).length > 0) trackPortfolioHistory();
  checkAlerts();
}

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
