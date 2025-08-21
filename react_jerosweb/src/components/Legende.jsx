export const Legende = () => {
  return (
    <div className="col-12 sidebar">
      <div className="row align-items-end justify-content-between p-1 m-1 gest_responsive">
        <div className="col-4 w-50 p-2">
          <div className="form-inline">
            <label for="reg_result" className="form-label" id="reg_label">
              Région
            </label>
            <input
              type="text"
              name="reg_result"
              id="reg_result"
              disabled="disabled"
              className="form-control"
            />
            <label for="dep_result" className="form-label" id="dep_label">
              Département
            </label>
            <input
              type="text"
              name="dep_result"
              id="dep_result"
              disabled="disabled"
              className="form-control"
            />
            <label
              for="dep_centroid_result"
              className="form-label"
              id="dep_centroid_label"
            >
              Centroïds
            </label>
            <input
              type="text"
              name="dep_centroid_result"
              id="dep_centroid_result"
              disabled="disabled"
              className="form-control"
            />
          </div>
        </div>
        <div className="col-4  w-25">
          <ul className="list-group">
            <li className="list-group-item">
              <div style="background-color: yellow;padding:2px">Départ</div>
            </li>
            <li className="list-group-item">
              <div style="background-color:RebeccaPurple;padding:2px">
                Arrivée
              </div>
            </li>
            <li className="list-group-item">
              <div style="background-color:violet;padding:2px">Proximité</div>
            </li>
          </ul>
        </div>
        <div className="col-4 w-25">
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value=""
                id="reg_check"
                checked="checked"
                onclick="gest_couche_reg('#region','#reg_check','#reg_label','#reg_result')"
              />
              <span style="background-color:orange;color:#eee;padding:2px">
                Région
              </span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value=""
                id="dep_check"
                checked="checked"
                onclick="gest_couche_dep('#dep','#dep_check','#dep_label','#dep_result')"
              />
              <span style="background-color:blue;color:#eee;padding:2px;">
                Département
              </span>
            </label>
          </div>
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                value=""
                id="map_check"
                checked="checked"
                onclick="gest_couche2('.map','#map_check','#dep_centroid_label','#dep_centroid_result')"
              />
              <span style="background-color:green;color:#eee;padding:2px;">
                Centroïds
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
