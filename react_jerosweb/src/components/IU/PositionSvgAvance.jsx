export const PositionSvgAvance = () => {
  return (<div className="col-12 sidebar p-1 form-group gest_responsive">
    <h4>Positions</h4>
    <button id="afficher_positions" className="btn btn-primary mb-3 mt-3 ">Afficher Positions</button>
    <button id="afficher_locate" className="btn btn-primary mb-3 mt-3 ">Me Localiser</button>
    <button id="reog" className="btn btn-primary mb-3 mt-3">Réog</button>
    <button id="info_reset" className="btn btn-primary mb-3 mt-3 ">Reset</button>
    <ul id="points" className="list-group p-3"></ul>
</div>
  )
}