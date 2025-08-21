export const MenuCallFunctionLeaflet = () => {
  return (
   <div className="col-12">
    <nav className="navbar navbar-light blue lighten-5 gest_responsive">
        <form className="form-inline">
            <button className="btn btn-outline-success" type="button" id="btn_lateral_hz">Localisation</button>
            <button className="btn btn-success" type="button" id="btn_distance">Distance</button>
            <button className="btn btn-outline-success" type="button" id="btn_centre">Centre</button>
            <button className="btn btn-outline-success" type="button" id="btn_buffer">Buffer</button>
            <button className="btn btn-outline-success" type="button" id="btn_routing">Routing</button>
            <button className="btn btn-outline-success" type="button" id="btn_geo">Géocodage /
                Géodécodage</button>
        </form>
    </nav>
</div>
  )
}