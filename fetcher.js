/**
 * fetcher.js — Agrégateur multi-sources boursières
 * Finnhub · Alpha Vantage · Polygon.io
 */

// ── TAUX DE CHANGE EUR/USD ────────────────────
// Valeur par défaut (mise à jour automatiquement via open.er-api.com, sans clé)
let eurRate = 0.91;

async function fetchEurUsdRate() {
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD');
    const d = await r.json();
    if (d.rates?.EUR) {
      eurRate = +d.rates.EUR.toFixed(4);
      console.log('[GameStock] Taux EUR/USD récupéré :', eurRate);
    }
  } catch {
    console.warn('[GameStock] Impossible de récupérer le taux EUR/USD, fallback :', eurRate);
  }
}

// Mapping ticker réel pour chaque action
// eurNative: true → le prix est déjà en EUR (Euronext Paris), pas de conversion USD→EUR
const REAL_TICKERS = {
  ntdoy:   { us: 'NTDOY',  eu: null,     eurNative: false }, // OTC US
  sony:    { us: 'SONY',   eu: null,     eurNative: false }, // NYSE USD
  msft:    { us: 'MSFT',   eu: null,     eurNative: false }, // NASDAQ USD
  atvi:    { us: 'ATVI',   eu: null,     eurNative: false }, // NASDAQ USD
  ea:      { us: 'EA',     eu: null,     eurNative: false }, // NASDAQ USD
  ttwo:    { us: 'TTWO',   eu: null,     eurNative: false }, // NASDAQ USD
  ubisoft: { us: 'UBSFY',  eu: 'UBI.PA', eurNative: true  }, // Euronext Paris EUR
  rblx:    { us: 'RBLX',   eu: null,     eurNative: false }, // NYSE USD
  unity:   { us: 'U',      eu: null,     eurNative: false }, // NYSE USD
  ntes:    { us: 'NTES',   eu: null,     eurNative: false }, // NASDAQ USD
  se:      { us: 'SE',     eu: null,     eurNative: false }, // NYSE USD
  glxyz:   { us: null,     eu: null,     eurNative: false }, // simulé
};

// Retourne le bon ticker selon l'API
function getTicker(stockId, api) {
  const t = REAL_TICKERS[stockId];
  if (!t) return null;
  // Finnhub et Alpha Vantage supportent les tickers européens (ex: UBI.PA)
  if (api !== 'polygon' && t.eu) return t.eu;
  return t.us;
}

// Retourne true si le prix de l'action est déjà en EUR
function isEurNative(stockId) {
  return REAL_TICKERS[stockId]?.eurNative ?? false;
}

// ── SOURCE STATUS ─────────────────────────────
const sourceStatus = {
  finnhub:      'off',  // off | ok | error | loading
  alphavantage: 'off',
  polygon:      'off',
  simulation:   'ok',
};

// ── FINNHUB ───────────────────────────────────
async function fetchFinnhub(symbol, key) {
  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Finnhub ' + r.status);
  const d = await r.json();
  if (!d.c || d.c === 0) throw new Error('Finnhub: no data');
  return {
    price:  d.c,
    open:   d.o,
    high:   d.h,
    low:    d.l,
    change: d.dp,   // % change
    prev:   d.pc,
    source: 'finnhub',
  };
}

// ── ALPHA VANTAGE ─────────────────────────────
async function fetchAlphaVantage(symbol, key) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('AV ' + r.status);
  const d = await r.json();
  const q = d['Global Quote'];
  if (!q || !q['05. price']) throw new Error('AV: no data');
  const price = parseFloat(q['05. price']);
  const prev  = parseFloat(q['08. previous close']);
  return {
    price,
    open:   parseFloat(q['02. open']),
    high:   parseFloat(q['03. high']),
    low:    parseFloat(q['04. low']),
    change: parseFloat(q['10. change percent']),
    prev,
    source: 'alphavantage',
  };
}

// ── POLYGON ───────────────────────────────────
async function fetchPolygon(symbol, key) {
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Polygon ' + r.status);
  const d = await r.json();
  if (!d.results || d.results.length === 0) throw new Error('Polygon: no data');
  const res = d.results[0];
  const change = res.c && res.o ? ((res.c - res.o) / res.o) * 100 : 0;
  return {
    price:  res.c,
    open:   res.o,
    high:   res.h,
    low:    res.l,
    change,
    prev:   res.o,
    source: 'polygon',
  };
}

// ── AGGREGATOR ────────────────────────────────
/**
 * Fetch a stock from all enabled APIs in parallel.
 * Returns a merged quote (average of successful results).
 */
async function fetchAggregated(stockId) {
  const apis = CONFIG.apis;
  const promises = [];
  const native = isEurNative(stockId);

  if (apis.finnhub.enabled && apis.finnhub.key) {
    const sym = getTicker(stockId, 'finnhub');
    if (sym) {
      sourceStatus.finnhub = 'loading';
      promises.push(fetchFinnhub(sym, apis.finnhub.key)
        .then(d => { sourceStatus.finnhub = 'ok'; return d; })
        .catch(() => { sourceStatus.finnhub = 'error'; return null; })
      );
    }
  }
  if (apis.alphavantage.enabled && apis.alphavantage.key) {
    const sym = getTicker(stockId, 'alphavantage');
    if (sym) {
      sourceStatus.alphavantage = 'loading';
      promises.push(fetchAlphaVantage(sym, apis.alphavantage.key)
        .then(d => { sourceStatus.alphavantage = 'ok'; return d; })
        .catch(() => { sourceStatus.alphavantage = 'error'; return null; })
      );
    }
  }
  if (apis.polygon.enabled && apis.polygon.key) {
    const sym = getTicker(stockId, 'polygon');
    if (sym) {
      sourceStatus.polygon = 'loading';
      promises.push(fetchPolygon(sym, apis.polygon.key)
        .then(d => { sourceStatus.polygon = 'ok'; return d; })
        .catch(() => { sourceStatus.polygon = 'error'; return null; })
      );
    }
  }

  if (promises.length === 0) return null;

  const results = (await Promise.all(promises)).filter(Boolean);
  if (results.length === 0) return null;

  // Moyenne de toutes les sources valides
  const avg = field => results.reduce((s, r) => s + (r[field] || 0), 0) / results.length;
  return {
    price:     +avg('price').toFixed(2),
    open:      +avg('open').toFixed(2),
    high:      +avg('high').toFixed(2),
    low:       +avg('low').toFixed(2),
    change:    +avg('change').toFixed(2),
    eurNative: native,   // ← flag transmis à app.js
    sources:   results.map(r => r.source),
    count:     results.length,
  };
}

/**
 * Refresh all stocks from APIs (or simulation fallback).
 * Returns a map { stockId → quote }
 */
async function refreshAllPrices(stocks) {
  const anyEnabled = Object.values(CONFIG.apis).some(a => a.enabled && a.key);

  if (!anyEnabled) {
    sourceStatus.simulation = 'ok';
    return null; // let app.js handle simulation
  }

  sourceStatus.simulation = 'off';
  const entries = await Promise.all(
    stocks.map(async s => {
      const q = await fetchAggregated(s.id);
      return [s.id, q];
    })
  );

  const map = {};
  entries.forEach(([id, q]) => { if (q) map[id] = q; });
  return map;
}

// ── HISTORICAL DATA ───────────────────────────
// Cache en mémoire : { "stockId_days": { data, fetchedAt } }
const historyCache = {};

async function fetchHistoricalFinnhub(symbol, fromTs, toTs, key) {
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${fromTs}&to=${toTs}&token=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('Finnhub hist ' + r.status);
  const d = await r.json();
  if (d.s !== 'ok' || !d.c || d.c.length === 0) throw new Error('Finnhub hist: no data');
  return d.t.map((t, i) => ({ t, c: d.c[i], o: d.o[i], h: d.h[i], l: d.l[i], v: d.v[i] }));
}

async function fetchHistoricalAlphaVantage(symbol, key) {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${key}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('AV hist ' + r.status);
  const d = await r.json();
  const ts = d['Time Series (Daily)'];
  if (!ts) throw new Error('AV hist: no data');
  return Object.entries(ts)
    .map(([date, v]) => ({
      t: new Date(date).getTime() / 1000,
      c: parseFloat(v['4. close']),
      o: parseFloat(v['1. open']),
      h: parseFloat(v['2. high']),
      l: parseFloat(v['3. low']),
      v: parseFloat(v['5. volume']),
    }))
    .sort((a, b) => a.t - b.t);
}

/**
 * Fetch historical closes for a stock over `days` days.
 * Tries Finnhub first, then Alpha Vantage. Caches 1h.
 * Returns array of { t (unix), c (close USD) } or null.
 */
async function fetchStockHistory(stockId, days = 90) {
  const cacheKey = `${stockId}_${days}`;
  const cached = historyCache[cacheKey];
  if (cached && Date.now() - cached.fetchedAt < 3_600_000) return cached.data;

  const apis = CONFIG.apis;
  const now  = Math.floor(Date.now() / 1000);
  const from = now - days * 86400;

  // Finnhub
  if (apis.finnhub.enabled && apis.finnhub.key) {
    const sym = getTicker(stockId, 'finnhub');
    if (sym) {
      try {
        const data = await fetchHistoricalFinnhub(sym, from, now, apis.finnhub.key);
        if (data.length > 0) {
          historyCache[cacheKey] = { data, fetchedAt: Date.now() };
          return data;
        }
      } catch(e) { console.warn('[Hist Finnhub]', e.message); }
    }
  }

  // Alpha Vantage (compact = last 100 trading days)
  if (apis.alphavantage.enabled && apis.alphavantage.key) {
    const sym = getTicker(stockId, 'alphavantage');
    if (sym) {
      try {
        let data = await fetchHistoricalAlphaVantage(sym, apis.alphavantage.key);
        data = data.filter(d => d.t >= from);
        if (data.length > 0) {
          historyCache[cacheKey] = { data, fetchedAt: Date.now() };
          return data;
        }
      } catch(e) { console.warn('[Hist AV]', e.message); }
    }
  }

  return null; // pas de données réelles → app.js utilisera l'historique simulé
}

// ── NEWS GAMING (RSS via rss2json.com) ───────────
const RSS_FEEDS = [
  { name: 'IGN',           url: 'https://feeds.feedburner.com/ign/games-all' },
  { name: 'GamesIndustry', url: 'https://www.gamesindustry.biz/feed' },
  { name: 'GameSpot',      url: 'https://www.gamespot.com/feeds/mashup/' },
  { name: 'VGC',           url: 'https://www.videogameschronicle.com/feed/' },
];
const NEWS_CACHE = { data: null, ts: 0 };
const NEWS_TTL   = 15 * 60 * 1000; // 15 min

async function fetchGamingNews(perFeed = 10) {
  if (NEWS_CACHE.data && Date.now() - NEWS_CACHE.ts < NEWS_TTL) {
    return NEWS_CACHE.data;
  }
  const API = 'https://api.rss2json.com/v1/api.json?count=' + perFeed + '&rss_url=';
  const all = [];

  await Promise.all(RSS_FEEDS.map(async src => {
    try {
      const r = await fetch(API + encodeURIComponent(src.url), {
        signal: AbortSignal.timeout(6000)
      });
      if (!r.ok) return;
      const d = await r.json();
      if (d.status !== 'ok' || !Array.isArray(d.items)) return;
      d.items.forEach(item => {
        const desc = item.description
          ? item.description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 240)
          : '';
        const thumb = item.thumbnail
          || (item.enclosure?.type?.startsWith('image') ? item.enclosure.link : null)
          || d.feed?.image || null;
        all.push({
          source:  src.name,
          title:   (item.title || '').trim(),
          link:    item.link || '#',
          pubDate: item.pubDate || new Date().toISOString(),
          desc,
          thumb,
        });
      });
    } catch (e) {
      console.warn('[GameStock News]', src.name, e.message);
    }
  }));

  const sorted = all
    .filter(a => a.title)
    .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  NEWS_CACHE.data = sorted;
  NEWS_CACHE.ts   = Date.now();
  return sorted;
}

