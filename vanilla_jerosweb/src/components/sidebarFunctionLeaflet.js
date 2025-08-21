class SidebarFunctionLeaflet extends HTMLElement {
    sidebarFunctionLeaflet () {
        this.innerHTML=`<div class="row justify-content-start gest_responsive">
        <div class="form-group perso_div w-70 item_off" id='active_distance'>
            <!-- distance -->
            <h3>Distance</h3>
            <button id="calcul_distance" class="btn btn-primary mb-3">Calculer
                l'itinéraire</button>
            <button id="remove_distance" class="btn btn-primary mb-3"> Effacer</button><br />
            <label for="geolib" class="form-label">Geolib</label>
            <input type="text" name="geolib" id="geolib" disabled="disabled" class="form-control ">
            <label for="turf" class="form-label">Turf</label>
            <input type="text" name="turf" id="turf" disabled="disabled" class="form-control">
        </div>
        <!-- centre -->
        <div class="form-group perso_div w-70 item_off on_btn" id='active_centre'>
            <h3>Centre</h3>
            <button id="calcul_centre" class="btn btn-primary mb-3">Calculer le centre</button>
            <button id="remove_centre" class="btn btn-primary mb-3"> Effacer</button><br />
            <!-- <label for="center_geolib">Centre</label><input type="text" name="geolib" id="center_geolib"> -->
            <label for="lat_centre_geolib" class="form-label">Latitude</label>
            <input type="text" name="lat_geolib" id="lat_centre_geolib" disabled="disabled"
                class="form-control">
            <label for="lng_centre_geolib" class="form-label">Longitude</label>
            <input type="text" name="lng_geolib" id="lng_centre_geolib" disabled="disabled"
                class="form-control">
        </div>
        <!-- buffer -->
        <div class="form-group perso_div w-70 item_off on_btn" id='active_buffer'>
            <h3>Buffer</h3>
            <label for="r_buffer" class="form-label">Rayon</label><input type="text" name="r_buffer"
                id="r_buffer" class="form-control" placeholder="10">
            <button id="calcul_buffer" class="btn btn-primary mb-3 mt-3 "> Calculer</button>
            <button id="remove_buffer" class="btn btn-primary mb-3 mt-3 "> Effacer</button>
        </div>
        <!-- routing -->
        <div class="form-group perso_div w-70 item_off on_btn" id='active_routing'>
            <h3>Routing</h3>
            <button id="routing_osm" class="btn btn-primary mb-3 mt-3 ">Routing OSM</button>
            <h3>Routing Geoportail</h3>
            <button id="routing_geoportail" class="btn btn-primary mb-3 mt-3 ">Routing
                Geoportail</button>
            <button id="remove_geoportail" class="btn btn-primary mb-3 mt-3"> Effacer</button>
            <label class="form-check-label p-1">
                <input type="checkbox" class="form-check-input p-1" value="" id="itineraire_cache"
                    checked="checked">
            </label>Masquer <br />

            <label for="distance_geoportail" class="form-label">Distance</label><input type="text"
                name="distance_geoportail" id="distance_geoportail" disabled="disabled"
                class="form-control">

            <label for="duration_geoportail" class="form-label">Duration</label><input type="text"
                name="duration_geoportail" id="duration_geoportail" disabled="disabled"
                class="form-control">
        </div>
        <!-- geocodage -->
        <div class="form-group perso_div w-70 item_off on_btn" id='active_geo'>
            <h3>Géocodage</h3>
            <label for="geocodage_adresse" class="form-label">Adresse</label>
            <input type="text" name="geocodage_adresse" id="geocodage_adresse" class="form-control">

            <button id="calcul_geocodage_adresse" class="btn btn-primary mb-3 mt-3">Trouver
                Coordonnées</button>
            <button id="effacer_geocodage_adresse" class="btn btn-primary mb-3 mt-3">Effacer</button>
            <label class="form-check-label p-1">
                <input type="checkbox" class="form-check-input p-1" value="" id="choice_param_1">
            </label>data.gouv.fr

            <label class="form-check-label p-1">
                <input type="checkbox" class="form-check-input p-1" value="" id="position_map_1">
            </label>Carte<br />

            <label for="lat_geocodage" class="form-label">Latitude</label>
            <input type="text" name="lat_geocodage" id="lat_geocodage" disabled="disabled"
                class="form-control">
            <label for="lng_geocodage" class="form-label">Longitude</label>
            <input type="text" name="lng_geocodage" id="lng_geocodage" disabled="disabled"
                class="form-control"><br />
            <!-- <label for="center_geolib">Centre</label><input type="text" name="geolib" id="center_geolib"> -->

            <h3>Géodécodage</h3>
            <label for="lat_geodecodage" class="form-label">Latitude</label>
            <input type="text" name="lat_geodecodage" id="lat_geodecodage" class="form-control">

            <label for="lng_geodecodage" class="form-label">Longitude</label>
            <input type="text" name="lng_geodecodage" id="lng_geodecodage" class="form-control">

            <button id="calcul_geodecodage" class="btn btn-primary mb-3 mt-3">Trouver Adresse</button>
            <button id="effacer_geodecodage" class="btn btn-primary mb-3 mt-3">Effacer</button>
            <label class="form-check-label p-1">
                <input type="checkbox" class="form-check-input p-1" value="" id="choice_param_2">
            </label>data.gouv.fr

            <label class="form-check-label p-1">
                <input type="checkbox" class="form-check-input p-1" value="" id="position_map_2">
            </label>Carte <br />

            <!-- <label for="geodecodage_adresse" class="form-label">Adresse</label>
            <input style="font-size:1em;height:auto" type="text" name="geodecodage_adresse" id="geodecodage_adresse" disabled="disabled" class="form-control">
            -->
            <textarea class="form-control" id="geodecodage_adresse" rows="4"
                disabled="disabled">Adresse</textarea>
            <!-- <label class="form-label" for="geodecodage_adresse">Adresse</label> -->
        </div>
    </div>`
    }
}

customElements.define('app-sidebar-function-leaflet',SidebarFunctionLeaflet);