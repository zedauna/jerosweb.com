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
├── src/
│   ├── components/         # Web Components (header, footer, nav, card…)
│   │   ├── app-header.js
│   │   ├── app-footer.js
│   │   └── app-nav.js
│   ├── pages/              # Pages HTML (home, about, contact…)
│   │   ├── index.html
│   │   ├── about.html
│   │   └── contact.html
│   ├── assets/             # Images, CSS, fonts…
│   ├── main.js             # Point d’entrée
│   └── styles.css
├── README.md
└── package.json
```
### 📦 Installation & Lancement

git clone https://github.com/zedauna/jerosweb.com.git
cd <jerosweb.com>

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