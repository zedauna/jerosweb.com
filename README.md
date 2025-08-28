# 🌐 Refactorisation de `MonSite` (PHP → Web Components)

## 📖 Contexte
Ce projet est la **refonte d’un ancien site web réalisé en PHP** lors de ma formation académique.  
À l’époque, l’architecture reposait sur :
- `include` et `require` pour réutiliser les éléments communs (header, footer, navigation…)
- un mélange de logique PHP et HTML
- une approche monolithique difficile à maintenir
- une nécessité d'avoir un serveur apatche 

Aujourd’hui, le projet est **modernisé** en utilisant :
- **JavaScript/TypeScript Vanilla**
- **Web Components** pour encapsuler et réutiliser les éléments communs
- Une structure modulaire et maintenable, sans dépendance à un serveur PHP

---

## 🆕 Objectifs de la refonte
- 🚫 Supprimer la dépendance à **PHP**  
- 🧩 Remplacer les `include`/`require` par des **Web Components**  
- 🎨 Séparer clairement la logique, le style et la structure  
- 📱 Préparer une base facilement extensible (compatibilité avec frameworks ou SPA)  
- ⚡ Améliorer les performances et simplifier le déploiement (site statique)  

---
## 🔄 Avant / Après

### 🔴 Ancienne version (PHP avec `include`/`require`)

 - **Dépendance au serveur PHP**
 - **Duplication de code entre pages**
 - **Difficulté de maintenance**

```php
<?php include('header.php'); ?>

<main>
  <h1>Accueil</h1>
  <p>Bienvenue sur mon site en PHP</p>
</main>

<?php include('footer.php'); ?>
```

---
### 🟢 Nouvelle version (Web Components)

 - **100% statique (déployable partout : GitHub Pages, Netlify…)**
 - **Réutilisation via Web Components**
 - **Architecture modulaire et maintenable**

```js
 <app-header></app-header>

<main>
  <h1>Accueil</h1>
  <p>Bienvenue sur mon site modernisé 🚀</p>
</main>

<app-footer></app-footer>
```
---
## 🔧 Stack Technique
- **HTML5 / CSS3**
- **JavaScript ES2023+ (ou TypeScript)**
- **Web Components (Custom Elements + Shadow DOM)**
- (Optionnel) **Vite / Rollup / Parcel** pour le bundling
- Hébergement possible sur **GitHub Pages / Netlify / Vercel**

---

## 📂 Structure du projet
```bash
jerosweb
├── 01_page_svg
│   ├── app
│   │   └── main.js
│   └── css
│       └── style.css
├── 02_page_leaflet
│   ├── css
│   │   └── style.css
│   ├── img
│   │   ├── globe.gif
│   │   ├── icon
│   │   │   ├── Marker_carcassonne.svg
│   │   │   ├── Marker_metropole.svg
│   │   │   ├── marker-blue.svg
│   │   │   ├── marker-green.svg
│   │   │   ├── marker-inter.svg
│   │   │   ├── marker-orange.svg
│   │   │   ├── marker-purple.svg
│   │   │   ├── marker-red.svg
│   │   │   └── marker-yellow.svg
│   │   ├── locate.jpg
│   │   ├── locate.png
│   │   ├── location.jpg
│   │   └── routing
│   │       ├── REMOVE
│   │       ├── bike.png
│   │       ├── car.png
│   │       ├── foot.png
│   │       ├── hike.png
│   │       ├── mtb.png
│   │       ├── racingbike.png
│   │       ├── reverse.png
│   │       ├── scooter.png
│   │       ├── small_truck.png
│   │       └── truck.png
│   ├── index.html
│   ├── js
│   │   ├── app.js
│   │   ├── interaction_fetch.js
│   │   ├── layer.js
│   │   ├── main.js
│   │   └── map.js
│   └── json
│       ├── departement.json
│       ├── departement_centroid.json
│       └── region.json
├── 02_page_svg_v2
│   ├── app
│   │   └── main.js
│   ├── css
│   │   └── style.css
│   └── index.html
├── README
├── commun
│   ├── css
│   │   └── grid.css
│   └── js
│       ├── color.js
│       ├── color.min.js
│       └── libs
│           ├── autocomplete
│           ├── drag
│           ├── geolib
│           ├── google
│           ├── gsap
│           ├── jquery
│           ├── leaflet
│           ├── notify
│           ├── plugin_leaflet
│           ├── snowflakes
│           ├── terraformer
│           ├── turf
│           └── velocity
├── components   #Web Components
│   ├── footer.js
│   ├── home.js
│   ├── index.js
│   ├── legende.js
│   ├── menuAccessibilite.js
│   ├── menuAccessibiliteLeaflet.js
│   ├── menuCallFunctionLeaflet.js
│   ├── menuCallFunctionSvg.js
│   ├── menuCallFunctionSvgAvance.js
│   ├── menuNavBar.js
│   ├── menuNavBarAvance.js
│   ├── menuNavBarLeaflet.js
│   ├── modalAideLeaflet.js
│   ├── modalAideSvg.js
│   ├── position.js
│   ├── positionAvance.js
│   ├── positionLeaflet.js
│   ├── sidebarFunction.js
│   ├── sidebarFunctionLeaflet.js
│   ├── svgController.js
│   └── svgControllerAvance.js
├── data
│   ├── map_france.svg
│   ├── region_11.svg
│   ├── region_24.svg
│   ├── region_27.svg
│   ├── region_28.svg
│   ├── region_32.svg
│   ├── region_44.svg
│   ├── region_52.svg
│   ├── region_53.svg
│   ├── region_75.svg
│   ├── region_76.svg
│   ├── region_84.svg
│   ├── region_93.svg
│   └── region_94.svg
├── data_analyst
│   ├── Projet-DataScience-Machine Learning.html
│   └── analyse_modelisation.html
├── db
│   └── db.json
├── gitignore
├── index.html
├── node_modules
│   └── tree-node-cli
├── package.json
├── pnpm-lock.yaml
├── svg
│   ├── Spinner-2.gif
│   ├── controller.svg
│   ├── home.svg
│   ├── home_V.svg
│   └── loader.svg
└── tree.md

```
### 📦 Installation & Lancement
```bash
git clone https://github.com/zedauna/jerosweb.com.git
cd <jerosweb.com>
```

### ✨ Exemple de Web Component
```js
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <header>
        <h1>Bienvenue sur mon site modernisé 🚀</h1>
        <nav>
          <a href="index.html">Accueil</a>
          <a href="about.html">À propos</a>
          <a href="contact.html">Contact</a>
        </nav>
      </header>
    `;
  }
}
customElements.define("app-header", AppHeader);
```

---

### 🚀 Améliorations futures
- **Ajout d’un système de routing côté client**
- **Passage à TypeScript pour plus de robustesse**
- **Mise en place de tests unitaires pour les Web Components**
- **Conversion possible vers Angular / React**

### Contact
[**voir Zedauna**](https://zedauna.github.io/portfolio/)