export const SidebarFunction = () => {
  return (
    <div className="row justify-content-end gest_responsive">
      {/* <!-- rechercher --> */}
      <div className=" form-group perso_div w-70 item_off" id="active_rech">
        <h3>Recherche</h3>
        <label for="label_rech" className="form-label">
          Région / Département
        </label>
        <div className="autocomplete" style="width:100%;">
          <input
            type="text"
            name="label_rech"
            id="label_rech"
            className="form-control"
          />
        </div>
        <label for="insee_rech" className="form-label">
          Insee
        </label>
        <div className="autocomplete" style="width:100%;">
          <input
            type="text"
            name="insee_rech"
            id="insee_rech"
            className="form-control"
          />
          <br />
        </div>
        <button id="submit_rech" className="btn btn-primary mb-3">
          Soumettre
        </button>
        <button id="remove_rech" className="btn btn-primary mb-3">
          {" "}
          Effacer
        </button>
        <label className="form-check-label p-1">
          <input
            type="checkbox"
            className="form-check-input p-1"
            value=""
            id="choice_param_1"
          />
        </label>
        Région
        <label className="form-check-label p-1">
          <input
            type="checkbox"
            className="form-check-input p-1"
            value=""
            id="choice_param_2"
          />
        </label>
        Département
        <br />
      </div>
      {/* <!-- distance --> */}
      <div
        className=" form-group perso_div w-70 item_off on_btn"
        id="active_distance"
      >
        <h3>Distance</h3>
        <button id="calcul_distance" className="btn btn-primary mb-3">
          Calculer l'itinéraire
        </button>
        <button id="remove_distance" className="btn btn-primary mb-3">
          {" "}
          Effacer
        </button>
        <br />
        <label for="geolib" className="form-label">
          Geolib
        </label>
        <input
          type="text"
          name="geolib"
          id="geolib"
          disabled="disabled"
          className="form-control"
        />
        <label for="turf" className="form-label">
          Turf
        </label>
        <input
          type="text"
          name="turf"
          id="turf"
          disabled="disabled"
          className="form-control"
        />
      </div>
      {/* <!-- centre --> */}
      <div
        className="form-group perso_div w-70 item_off on_btn"
        id="active_centre"
      >
        <h3>Centre</h3>
        <button id="calcul_centre" className="btn btn-primary mb-3">
          Calculer le centre
        </button>
        <button id="remove_centre" className="btn btn-primary mb-3">
          {" "}
          Effacer
        </button>
        <br />
        {/* <!-- <label for="center_geolib">Centre</label><input type="text" name="geolib" id="center_geolib"> --> */}
        <label for="lat_centre_geolib" className="form-label">
          Latitude
        </label>
        <input
          type="text"
          name="lat_geolib"
          id="lat_centre_geolib"
          disabled="disabled"
          className="form-control"
        />
        <label for="lng_centre_geolib" className="form-label">
          Longitude
        </label>
        <input
          type="text"
          name="lng_geolib"
          id="lng_centre_geolib"
          disabled="disabled"
          className="form-control"
        />
      </div>
      {/* <!-- Proximité --> */}
      <div
        className="form-group perso_div w-70 item_off on_btn"
        id="active_proximite"
      >
        <h3>Proximité</h3>
        <label for="lat_geolib" className="form-label">
          Latitude
        </label>
        <input
          type="text"
          name="lat_geolib"
          id="lat_geolib"
          className="form-control"
        />
        <label for="lng_geolib" className="form-label">
          Longitude
        </label>
        <input
          type="text"
          name="lng_geolib"
          id="lng_geolib"
          className="form-control"
        />
        <button id="calcul_proximite" className="btn btn-primary mb-3 mt-3 ">
          {" "}
          Calculer la proximité
        </button>
        <button id="remove_proximite" className="btn btn-primary mb-3 mt-3">
          {" "}
          Effacer
        </button>
        <h3>Resultat</h3>
        <label for="lat_result" className="form-label">
          Latitude
        </label>
        <input
          type="text"
          name="lat_result"
          id="lat_result"
          disabled="disabled"
          className="form-control"
        />
        <label for="lng_result" className="form-label">
          Longitude
        </label>
        <input
          type="text"
          name="lng_result"
          id="lng_result"
          disabled="disabled"
          className="form-control"
        />
      </div>
      {/* <!-- buffer --> */}
      <div
        className="form-group perso_div w-70 item_off on_btn"
        id="active_buffer"
      >
        <h3>Buffer</h3>
        <label for="r_buffer" className="form-label">
          Rayon
        </label>
        <input
          type="text"
          name="r_buffer"
          id="r_buffer"
          className="form-control"
          placeholder="1.2%"
        />
        <button id="calcul_buffer" className="btn btn-primary mb-3 mt-3 ">
          {" "}
          Calculer
        </button>
        <button id="remove_buffer" className="btn btn-primary mb-3 mt-3 ">
          {" "}
          Effacer
        </button>
      </div>
    </div>
  );
};
