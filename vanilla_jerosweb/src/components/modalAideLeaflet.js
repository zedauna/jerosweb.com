class ModalAideLeaflet extends HTMLElement {
    connectedCallback(){
        this.innerHTML=`<!-- Modal -->

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"

    aria-labelledby="staticBackdropLabel" aria-hidden="true">

    <div class="modal-dialog modal-dialog-scrollable">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title" id="staticBackdropLabel">Fonctionnalités</h5>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            </div>

            <div class="modal-body">

                <ol>

                    <li style="font-weight: bold;">Afficher Coordonnées : </li>

                    <p> Cette fonctionnalité affiche les coordonnées (latitude et longitude) des points choisis par

                        <span style="color:tomato;">Clique souris!</span></p>



                    <li style="font-weight: bold;"> Reset : </li>

                    <p> Cette fonctionnalité permet de recharger la page et de vider toutes les valeurs des champs

                    saisis.</p>



                    <li style="font-weight: bold;">Chargement des données : </li>

                    <p>Cette fonctionnalité permet de charger le panel des données JSON produits par Postgis / PHP</p> 



                    <li style="font-weight: bold;">Distance : </li>

                    <p>Cette fonctionnalité permet de calculer la distance entre deux points <span style="color:tomato;">strictement</span> choisis par

                    <span style="color:tomato;">Clique souris!</span>, plus de deux points, elle prend les deux derniers points</p>

                    </p>



                    <li style="font-weight: bold;">Centre : </li>

                    <p>Cette fonctionnalité permet de calculer le centre entre deux points <span style="color:tomato;">strictement</span> choisis par

                        <span style="color:tomato;">Clique souris!</span>,plus de deux points, elle prend les deux derniers points </p>

                    </p>



                    <li style="font-weight: bold;">Buffer : </li>

                    <p>Cette fonctionnalité permet de dessiner un cercle de rayon donné, par defaut 10 autour du point

                        <span style="color:tomato;">Cliqué par souris!</span></p>



                        <li style="font-weight: bold;">Routing : </li>

                        <p><span style="color:tomato;">Routing OSM : </span> Cette fonctionnalité permet de tracer les 

                    routes uniquement selon vos positions choisies par <span style="color:tomato;">Clique </span> sur la carte

                en utilisant la source de données de OSM</p>



                <p><span style="color:tomato;">Routing Géoportail : </span> Cette fonctionnalité permet de tracer les 

                    routes uniquement selon vos positions choisies par <span style="color:tomato;">Clique </span> sur la carte

                en utilisant la source de données de Géoportail</p>


                <li style="font-weight: bold;">Géocodage / Géodécodage : </li>
            <p>
                Cette fonctionnalité permet de décoder à partir d'une adresse postale les coordonnées géographiques et réciproquement.
            </p>

                <li style="font-weight: bold;">Réog (Réorganisation) :</li>
                    <p>Cette fonctionnalité permet d'activer et de desactiver le <span style="color:tomato;">glisser / deposer</span>
                    des boites de fonctionnalités : Distance, Centre, Buffer...</p>

                </ol>

                <p>Pour toutes questions ou suggestions, Merci de nous conctacter au

                    <span style="color:tomato;">jeros@jerosweb.com / jerosvigan@gmail.com</span></p>

            </div>

            <div class="modal-footer">

                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>

                <button type="button" class="btn btn-primary">Merci</button>

            </div>

        </div>

    </div>

</div>`
    }
}

customElements.define('app-modal-aide-leaflet',ModalAideLeaflet);