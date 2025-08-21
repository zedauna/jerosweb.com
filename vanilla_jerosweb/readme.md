# Branch DEV

/mon-projet/
├── public/
│   ├── libs/          # Copie de /commun/js/libs/
│   ├── assets/        # Images, fonts, etc.
│   └── css/           # CSS globaux (si besoin)
├── src/
│   ├── components/    # Web Components (sidebar, map, etc.)
│   │   ├── sidebar.js
│   │   ├── leaflet-map.js
│   │   └── ...
│   ├── pages/         # Pages (HTML + JS)
│   │   ├── home/
│   │   │   ├── index.html
│   │   │   └── index.js
│   │   ├── cv/
│   │   │   ├── index.html
│   │   │   └── index.js
│   │   └── ...
│   ├── router.js      # Gestion du routing
│   ├── main.js        # Point d'entrée
│   └── styles/        # CSS
├── index.html         # Fichier HTML principal
├── package.json
└── vite.config.js
