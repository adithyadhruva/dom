class CustomSearchAndSelectCheckbox extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
    <style>
    .checkbox label {
            display: block;
        }

        .checkbox input[type=checkbox] {
            margin-right: 5px;

        }
        .checkbox label {
          color: red; /* Initial color */
        }
        
      
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
    .select-all input[type=checkbox]:after {
      content: '\\2713';
      display: none;
      font-size: 12px;
      font-weight: bold;
      color: black;
      position: absolute;
      top: -2px;
      left: 0px;
    }
    
    .select-all input[type=checkbox]:checked:after {
      display: inline-block;
    }

  </style>
  
    <div class="selectAll"></div>
    <div class="lists"></div>
  
`;
    const shadowRoot = this.attachShadow({ mode: "open" });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);

    // read the input element data using attribute and spliting the variables to array
    const inputData = this.getAttribute("data-inputdata").split(",");

    // getting the variable name from the array list
    const checkboxList = eval(inputData[0]);
    console.log(checkboxList.length);
    const defaultData = this.getAttribute("data-default").split(",");
    const defaultValues = eval(defaultData[0]);
    const selectedValues = defaultValues.map(cb => cb.id);
    const myJsonString = JSON.stringify(selectedValues);
    this.setAttribute("data-result", myJsonString);

    let output =`<label class="selectAll"><input type="checkbox" onclick="this.getRootNode().host.checkAll(this)">Select All</label>`; 
    // output += this.addElements();
   // output += this.addElements();
    //console.log(this.childNodes);
    console.log(this);
    console.log(this.shadowRoot.querySelector(".lists"));
    var newlist =this.shadowRoot.querySelector(".lists");
     newlist.innerHTML=  this.addElements();


    var  newSeletall = this.shadowRoot.querySelector(".selectAll");
    newSeletall.innerHTML =`<label class="selectAll"><input type="checkbox" onclick="this.getRootNode().host.checkAll(this)">Select All</label>`;

  //   const checkboxdiv = shadowRoot.querySelector(".checkbox");
  //   console.log("before adding new elemnt", checkboxdiv);
  //   checkboxdiv.innerHTML=template.innerHTML;

  //   const selectCB=checkboxdiv.querySelector('.checkbox').querySelector(".selectAll");
  //   selectCB.innerHTML=`<label class="selectAll"><input type="checkbox" onclick="this.getRootNode().host.checkAll(this)">Select All</label>`;
  //   console.log(selectCB);

  //   const listCB=checkboxdiv.querySelector('.checkbox').querySelector(".lists");
  //   listCB.innerHTML = this.addElements();
  //   console.log(listCB);
    
  //   //checkboxdiv.innerHTML = this.addElements();
  //   console.log("after adding new elemnt", checkboxdiv);
  //  checkboxdiv.innerHTML = output;

  }

  addElements() {
    var finalresult = '';
    const inputData = this.getAttribute("data-inputdata").split(",");

    const checkboxList = eval(inputData[0]);
    const defaultData = this.getAttribute("data-default").split(",");
    const defaultValues = eval(defaultData[0]);
    for (let i = 0; i < checkboxList.length; i++) {
      const checkbox = checkboxList[i];
      const checked = defaultValues.some(item => item.id === checkbox[inputData[1]]) ? 'checked' : '';
      finalresult += '<label class="textofcheckbox"><input type="checkbox" id="' + checkbox[inputData[1]] + '" value="' + checkbox[inputData[2]] + '" ' + checked + ' onclick="this.getRootNode().host.updateSearch(this)">' + checkbox[inputData[2]] + '</label>';
    }
    return finalresult;
  }

  updateSearch(_checkbox) {
    const shadowRoot = this.shadowRoot;
    const checkboxContainer = shadowRoot.querySelector('.checkbox');
    const selectedCheckboxes = checkboxContainer.querySelectorAll('input:checked');
    selectedCheckboxes.forEach(selectedCheckbox => {
      selectedCheckbox.parentNode.classList.add('selected');
    });

    const unselectedCheckboxes = checkboxContainer.querySelectorAll('input:not(:checked)');
    unselectedCheckboxes.forEach(unselectedCheckbox => {
      unselectedCheckbox.parentNode.classList.remove('selected');
    });

    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.id);
    const myJsonString = JSON.stringify(selectedIds);
    this.setAttribute('data-result', myJsonString);

    const inputData = this.getAttribute("data-inputdata").split(",");
    const checkboxList = eval(inputData[0]);
    const TotalNoOfRecords = checkboxList.length;


    const selectAllCheckbox = shadowRoot.querySelector('.selectAll input[type="checkbox"]');
    if (selectedCheckboxes.length > 0) {
      selectAllCheckbox.style.backgroundColor = '#3469ce';
    } else if (selectedCheckboxes.length === TotalNoOfRecords) {
      selectAllCheckbox.style.backgroundColor = '';
      selectAllCheckbox.checked = true;
      selectAllCheckbox.click();
    }

    // const selectAllCheckbox = shadowRoot.querySelector('.select-all input[type="checkbox"]');

    // const inputData = this.getAttribute("data-inputdata").split(",");
    // const checkboxList = eval(inputData[0]);
    // const TotalNoOfRecords=checkboxList.length;

    // //console.log(selectAllCheckbox);
    // // console.log("Total NUmber of Records : ", TotalNoOfRecords);
    // // console.log("Selected Check Box Count ", selectedCheckboxes.length);

    // if (selectedCheckboxes.length == TotalNoOfRecords)  {
    //   console.log("selected ALL");
    //   //select all checkbox should be ticked with default color to be set
    //   selectAllCheckbox.checked = true;
    //   selectAllCheckbox.style.backgroundColor = 'transparent';

    // } else if ((selectedCheckboxes.length > 0) && (selectedCheckboxes.length < TotalNoOfRecords)) {
    //   console.log("Selected Few");
    //   //select all checkbox to be filled with color
    //   selectAllCheckbox.style.backgroundColor = '#3469ce';
    //   selectAllCheckbox.checked = false;

    // } else if ((selectedCheckboxes.length == 0)) {
    //   console.log("Nothing Selected");
    //   //select all should not be ticked and set the default color(not to be filled with blue color )
    //   selectAllCheckbox.checked = false;
    //   selectAllCheckbox.style.backgroundColor = 'transparent';

    // } else {

    //   console.log("something else")
    // }
  }


  checkAll(checkbox) {
    //console.log(checkbox);
    const shadowRoot = this.shadowRoot;
    const checkboxContainer = shadowRoot.querySelector('.checkbox');
    const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.checked = checkbox.checked;
      this.updateSearch(cb);
    });
  }

}

window.customElements.define("custom-searchandselect-checkbox", CustomSearchAndSelectCheckbox);
