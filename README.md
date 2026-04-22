# 🎮 GameStock — Investissez dans le Jeu Vidéo

Application de simulation boursière dédiée au secteur du **jeu vidéo**, avec données en temps réel et affichage en euros.

## ✨ Fonctionnalités

- 📊 **Marché** — 12 actions gaming (Nintendo, Sony, Microsoft, Ubisoft, EA, Roblox…)
- 💼 **Portfolio** — Achats/ventes simulés avec calcul des gains/pertes
- 📈 **Graphiques historiques** — Données réelles sur 1M / 3M / 6M / 1A
- 🔔 **Alertes de prix** — Notifications navigateur quand un cours atteint votre cible
- 📅 **Calendrier Gaming** — Sorties, Earnings, événements qui font bouger les cours
- 💾 **Sauvegarde automatique** — Portfolio persistant via localStorage
- 🇪🇺 **Prix en euros** — Conversion EUR/USD en temps réel
- 🔌 **Multi-sources** — Agrégation Finnhub + Alpha Vantage + Polygon.io

## 🚀 Installation

```bash
# 1. Clone le repo
git clone https://github.com/TON_USERNAME/gamestock.git
cd gamestock

# 2. Copie et configure tes clés API
cp config.example.js config.js
# Édite config.js avec tes clés

# 3. Lance le serveur local
npx serve . --listen 3000

# 4. Ouvre http://localhost:3000
```

## 🔑 Clés API (gratuites)

| API | Lien inscription | Utilisation |
|-----|-----------------|-------------|
| **Finnhub** | https://finnhub.io | Prix temps réel + historique |
| **Alpha Vantage** | https://www.alphavantage.co | Données fondamentales |
| **Polygon.io** | https://polygon.io | Données US |

> L'app fonctionne **sans clés API** avec simulation locale.

## 📁 Structure

```
gaming-invest/
├── index.html          # Interface principale
├── style.css           # Design premium dark
├── app.js              # Logique applicative
├── fetcher.js          # Agrégateur multi-sources
├── config.example.js   # Template de configuration
└── config.js           # ⚠️ Tes clés (non commité)
```

## ⚠️ Avertissement

Cette application est un **outil de simulation**. Les prix affichés peuvent avoir un délai de 15-20 minutes (limites des APIs gratuites). Ne pas utiliser pour de vraies décisions d'investissement sans vérification.

---

Fait avec ❤️ et JavaScript vanilla.
