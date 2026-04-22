/**
 * ============================================================
 *  GameStock — Configuration des APIs
 *  INSTRUCTIONS :
 *  1. Copie ce fichier en "config.js"
 *  2. Remplis tes clés API ci-dessous
 *  3. Ne commite JAMAIS config.js (il est dans .gitignore)
 * ============================================================
 */
const CONFIG = {

  apis: {

    finnhub: {
      label:   'Finnhub',
      color:   '#f59e0b',
      key:     '',          // ← Colle ta clé ici ex: 'cq123abc456xyz'
      enabled: false,       // ← Passe à true quand la clé est remplie
    },

    alphavantage: {
      label:   'Alpha Vantage',
      color:   '#8b5cf6',
      key:     '',          // ← Colle ta clé ici ex: 'ABCDEFGHIJKLMNO'
      enabled: false,
    },

    polygon: {
      label:   'Polygon.io',
      color:   '#06b6d4',
      key:     '',          // ← Colle ta clé ici ex: 'abcDEF1234567890'
      enabled: false,
    },

  },

  // Intervalle de rafraîchissement en millisecondes (min 15000 pour respecter les limites gratuites)
  refreshInterval: 30000,

  // Si toutes les APIs sont désactivées, utilise la simulation locale
  fallbackToSimulation: true,

};
