const template = document.createElement("template");
template.innerHTML = `
  <style>
    .checkbox label input[type=checkbox] {
    color: blue;
    }
    .checkbox {
      display: flex;
      flex-direction: column;
    }
    .textofcheckbox {
      color: #DC143C;
    }
    .checkbox label.selected {
      color: #3F00FF;
    }
    .selectAll input[type=checkbox] {
      position: relative;
      bottom: -4px;
      left: 0px;
      border-radius: 3px;
      cursor: pointer;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      outline: 0;
      //background: #3469ce;
      height: 13px;
      width: 13px;
      margin: 3px 3px 3px 4px;
      border: 1px solid grey;
    }
    // .select-all input[type=checkbox]:after {
    //   content: '\\2713';
    //   display: none;
    //   font-size: 12px;
    //   font-weight: bold;
    //   color: black;
    //   position: absolute;
    //   top: -2px;
    //   left: 0px;
    // }
    
    // .select-all input[type=checkbox]:checked:after {
    //   display: inline-block;
    // }

  </style>
  <div class="checkbox">
    <div class="selectAll"></div>
    <div class="lists"></div>
  </div>
`;
class CustomSearchAndSelectCheckbox extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");


    const div = document.createElement("div");
    div.setAttribute("class", "checkbox");

    const searchInput = document.createElement("input");
    searchInput.setAttribute("class", "search");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search...");

    div.appendChild(searchInput);

    shadow.appendChild(style);
    shadow.appendChild(div);

    const result = this.addElements();
    div.innerHTML += result;
  }

  addElements() {
    var finalresult= '';
    const inputData = this.getAttribute("data-inputdata").split(",");

    const checkboxList = eval(inputData[0]);
    const defaultData = this.getAttribute("data-default").split(",");
    const defaultValues = eval(defaultData[0]);

    // Add select all checkbox
    finalresult += '<label class="selectAll"><input type="checkbox" onclick="this.getRootNode().host.checkAll(this)">Select All</label>';

    // Add list of checkboxes
    finalresult += '<div class="lists">';
    for (let i = 0; i < checkboxList.length; i++) {
      const checkbox = checkboxList[i];
      const checked = defaultValues.some(item => item.id === checkbox[inputData[1]]) ? 'checked' : '';
      finalresult += '<label class="textofcheckbox"><input type="checkbox" id="' + checkbox[inputData[1]] + '" value="' + checkbox[inputData[2]] + '" ' + checked + ' onclick="this.getRootNode().host.updateSearch(this)">' + checkbox[inputData[2]] + '</label>';
    }
    finalresult += '</div>';

    return finalresult;
  }

  updateSearch(element) {
    const searchValue = this.shadowRoot.querySelector(".search").value.toLowerCase();
    const lists = this.shadowRoot.querySelectorAll(".lists label");
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      if (item.textContent.toLowerCase().indexOf(searchValue) > -1) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    }
    this.updateSelectAll();
  }

  checkAll(element) {
    const lists = this.shadowRoot.querySelectorAll(".lists input[type='checkbox']");
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      item.checked = element.checked;
    }
  }

  updateSelectAll() {
    const lists = this.shadowRoot.querySelectorAll(".lists input[type='checkbox']");
    const selectAll = this.shadowRoot.querySelector(".selectAll input[type='checkbox']");
    let allChecked = true;
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      if (!item.checked) {
        allChecked = false;
        break;
      }
    }
    selectAll.checked = allChecked;
  }

  connectedCallback() {
    const searchInput = this.shadowRoot.querySelector(".search");
    searchInput.addEventListener("keyup", () => {
      this.updateSearch(searchInput);
    });

    const lists = this.shadowRoot.querySelectorAll(".lists input[type='checkbox']");
    for (let i = 0; i < lists.length; i++) {
      const item = lists[i];
      item.addEventListener("click", () => {
        this.updateSelectAll();
      });
    }
  }
}

customElements.define("custom-search-and-select-checkbox", CustomSearchAndSelectCheckbox);
