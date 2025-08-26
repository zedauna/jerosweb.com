export default class MenuNavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgb(92, 92, 194);">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">@Jerosweb.Com</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">SVG</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./02_page_leaflet/index.html">LEAFLET</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="./02_page_svg_v2/index.html">SVG AVANCÉ</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="https://github.com/zedauna" target="_bank_git">GITHUB</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        Data Analyst
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" target="_bank_r" href="./data_analyst/Projet-DataScience-Machine Learning.html">Python</a></li>
                        <li><a class="dropdown-item" target="_bank_py" href="./data_analyst/analyse_modelisation.html">R/Rstudio</a></li>
                        <!-- <li><a class="dropdown-item" href="#">Bof</a></li> -->
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>`;
  }
};
