class Footer extends HTMLElement {
    connectedCallback(){
        this.innerHTML=`<div class="row align-items-center justify-content-around">
    <div class="col-12 perso_header_footer" style="color:white">
        <p style="color:white">©Jeros VIGAN <span class="year"></span></p>
        <!-- <p>Site : www.jerosweb.com</p> -->
        <p>Contact : jeros@jerosweb.com</p>
    </div>
</div>`
    }
}
customElements.define('app-footer',Footer);