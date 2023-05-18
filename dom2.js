const template = document.createElement('template')
template.innerHTML = `
        <div style="border: 3px solid black;">                                                           
            name:<input type="text"><br><br>
            email:<input type="text"><br><br>
            address:<input type="text"><br> 
            <button>submit</button>
        </div>`
class CustomerDetails extends HTMLElement {
    constructor() {
        super()
        const shadowRoot = this.attachShadow({ mode: "open" })
        const clone = template.content.cloneNode(true)
        shadowRoot.append(clone)
    }
   colorDetails(col) {
        document.getElementById(col.id).style.color = col.getAttribute("data-color-type")
    }
    buttonfunc(bt) {
        // var output = document.getElementById("btn");
        // output.innerHTML="successfully submitted"
        // console.log(bt)
        // console.log(bt.id)
        document.getElementById(bt.id).innerHTML ="successfully submitted"
        //console.log(document.documentElement)
    }
} 
customElements.define('custom-mini-details', CustomerDetails)