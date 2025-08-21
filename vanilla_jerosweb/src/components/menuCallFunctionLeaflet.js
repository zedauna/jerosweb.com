class MenuCallFunctionLeaflet extends HTMLElement{
    menuCallFunctionLeafletCallacback(){
        this.innerHTML=`<div class="col-12">
    <nav class="navbar navbar-light blue lighten-5 gest_responsive">
        <form class="form-inline">
            <button class="btn btn-outline-success" type="button" id="btn_lateral_hz">Localisation</button>
            <button class="btn btn-success" type="button" id="btn_distance">Distance</button>
            <button class="btn btn-outline-success" type="button" id="btn_centre">Centre</button>
            <button class="btn btn-outline-success" type="button" id="btn_buffer">Buffer</button>
            <button class="btn btn-outline-success" type="button" id="btn_routing">Routing</button>
            <button class="btn btn-outline-success" type="button" id="btn_geo">Géocodage /
                Géodécodage</button>
        </form>
    </nav>
</div>`
    }
}
customElements('app-menu-call-function-leaflet',MenuCallFunctionLeaflet);