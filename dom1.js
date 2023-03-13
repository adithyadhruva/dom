'use strict';
class CustomElement extends HTMLElement {
    constructor(){
        super();
       const shadowRoot=this.attachShadow({mode:'closed'});
       let div=document.createElement('div')
       div.textContent="hello world"
       shadowRoot.append(div)
    }

}
window.customElements.define('cus-ele',CustomElement)