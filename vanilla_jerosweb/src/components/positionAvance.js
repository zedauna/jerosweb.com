export default class PositionAvance extends HTMLElement {
   connectedCallback() {
        this.innerHTML=`<div class="col-12 sidebar p-1 form-group gest_responsive">
    <h4>Positions</h4>
    <button id="afficher_positions" class="btn btn-primary mb-3 mt-3 ">Afficher Positions</button>
    <button id="afficher_locate" class="btn btn-primary mb-3 mt-3 ">Me Localiser</button>
    <button id="reog" class="btn btn-primary mb-3 mt-3">Réog</button>
    <button id="info_reset" class="btn btn-primary mb-3 mt-3 ">Reset</button>
    <ul id="points" class="list-group p-3"></ul>
</div>`
    }
};