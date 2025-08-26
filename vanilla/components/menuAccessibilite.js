export default  class MenuAccessiblite extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <!-- Menu d'accessibilité -->
    <ul class="a11y-nav">
        <li>
            <a href="#explication_svg">Mode d'emploi</a>
        </li>
        <li>
            <a href="#afficher_positions">Informations sur les positions</a>
        </li>
        <li>
            <a href="#afficher_locate">Localisation de votre emplacement actuel</a>
        </li>
        <li>
            <a href="#reog">Fonctionnalité de réoganisation</a>
        </li>
        <li>
            <a href="#info_reset">Actualiser la page entière</a>
        </li>
        <li>
            <a href="#active_rech">Aller à la recherche</a>
        </li>
        <li>
            <a href="#active_distance">Aller à la fonctionnalité distance</a>
        </li>
        <li>
            <a href="#active_centre">Aller à la fonctionnalité centre</a>
        </li>
        <li>
            <a href="#active_proximite">Aller à la fonctionnalité proximité</a>
        </li>
        <li>
            <a href="#active_buffer">Aller à la fonctionnalité buffer</a>
        </li>
        <li>
            <a href="#navigation_button">Aller à la fonctionnalité navigation de la carte</a>
        </li>
        <li>
            <a href="#chargeCarte">Aller à la carte svg</a>
        </li>
        <li>
            <a href="#reg_label">cocher ou décocher carte région</a>
        </li>
        <li>
            <a href="#dep_label">cocher ou décocher carte département</a>
        </li>
        <li>
            <a href="#dep_centroid_result">cocher ou décocher centroïds des départements</a>
        </li>
    </ul>
    
    <!-- message de pasage -->
    <div id="paysage">
        ⚠️ Attention, Votre écran est trop petit pour l'affichage, paysage possible où sur ordinateur. Merci !
    </div>`;
  }
};
