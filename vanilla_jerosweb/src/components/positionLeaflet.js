export default class PositionLeaflet extends HTMLElement {
    connectedCallback() {
        this.innerHTML=`<div class="row justify-content-end"> 
    <div class="col-12 sidebar p-1 form-group gest_responsive">
        <h4>Positions</h4>
        <button type="button" id="explication_leaflet" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Mode d'emploi 🧐!
        </button>
        <button id="afficher_positions" class="btn btn-primary mb-3 mt-3 ">Afficher
            Coordonnées</button>
        <button id="ChargerData" class="btn btn-primary mb-3 mt-3 ">Charger Données</button>
        <button id="reog" class="btn btn-primary mb-3 mt-3">Réog</button>
        <button id="info_reset" class="btn btn-primary mb-3 mt-3 ">Reset</button>
        <ul id="points" class="list-group p-3"></ul>
        <app-modal-aide-leaflet></app-modal-aide-leaflet>
    </div>
</div>`
    }
};