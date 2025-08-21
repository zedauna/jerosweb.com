export const PositionLeaflet = () => {
  return (
    <div className="row justify-content-end"> 
    <div className="col-12 sidebar p-1 form-group gest_responsive">
        <h4>Positions</h4>
        <button type="button" id="explication_leaflet" className="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Mode d'emploi 🧐!
        </button>
        <button id="afficher_positions" className="btn btn-primary mb-3 mt-3 ">Afficher
            Coordonnées</button>
        <button id="ChargerData" className="btn btn-primary mb-3 mt-3 ">Charger Données</button>
        <button id="reog" className="btn btn-primary mb-3 mt-3">Réog</button>
        <button id="info_reset" className="btn btn-primary mb-3 mt-3 ">Reset</button>
        <ul id="points" className="list-group p-3"></ul>
        {/* <?php require './02_page_leaflet/php/modal_aide.php'?> */}
    </div>
</div>
  )
}