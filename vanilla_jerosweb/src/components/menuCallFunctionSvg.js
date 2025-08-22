class MenuCallFunctionSvg extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="row">
    <div class="col-6">
        <nav class="navbar navbar-light blue lighten-5 justify-content-start gest_responsive">
            <form class="form-inline">
                <button type=" button" 
                id="explication_svg" 
                class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Mode d'emploi 🧐!
                </button>
                <button class="btn btn-outline-success" type="button" id="btn_lateral_hz">Localisation</button>
                <button class="btn btn-outline-success" type="button" id="btn_lateral_vz">Légende</button>
            </form>
        </nav>
    </div>
    <div class="col-6">
        <nav class="navbar navbar-light blue lighten-5 justify-content-end gest_responsive">
            <form class="form-inline">
                <button class="btn btn-success" type="button" id="btn_rech">Recherche</button>
                <button class="btn btn-outline-success" type="button" id="btn_distance">Distance</button>
                <button class="btn btn-outline-success" type="button" id="btn_centre">Centre</button>
                <button class="btn btn-outline-success" type="button" id="btn_proximite">Proximité</button>
                <button class="btn btn-outline-success" type="button" id="btn_buffer">Buffer</button>
            </form>
        </nav>
    </div>
</div>
<div>
    <?php require './01_page_svg/php/modal_aide.php'?>
</div>`;
  }
}

customElements.define("app-menu-call-function-svg", MenuCallFunctionSvg);
