const template = document.createElement('template');
template.innerHTML = `
  <style>
    .checkbox {
      display: flex;
      flex-direction: column;
    }
    .textofcheckbox {
      color: red;
    }
    .checkbox label.selected {
      color: blue;
    }
  </style>
  <div class="checkbox"></div>
`;

class CustomCheckbox extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const clone = template.content.cloneNode(true);
    shadowRoot.appendChild(clone);

    const inputData = JSON.parse(this.getAttribute('data'));
    const defaultData = JSON.parse(this.getAttribute('default'));
    
    const checkboxList = inputData;
    const listofcheckboxes = checkboxList;

    const defaultValues = defaultData;
    const defaultCheckboxes = defaultValues;

    let output = '<label><input type="checkbox" class="select-all">Select All</label>';
    for (let i = 0; i < listofcheckboxes.length; i++) {
      const checkbox = listofcheckboxes[i];
      const checked = defaultCheckboxes.some(item => item.id === checkbox.id) ? 'checked' : '';
      output += '<label class="textofcheckbox"><input type="checkbox" id="' + checkbox.id + '" value="' + checkbox.label + '" ' + checked + '>' + checkbox.label + '</label>';
    }

    const checkboxContainer = shadowRoot.querySelector('.checkbox');
    checkboxContainer.innerHTML = output;

    const checkboxes = checkboxContainer.querySelectorAll('input[type="checkbox"]');
    const selectAllCheckbox = checkboxContainer.querySelector('.select-all');

    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        updateSelections();
        this.uservalues = checkboxes.filter(item => item.checked).map(item => ({ id: item.id, label: item.value }));
      });
    });

    selectAllCheckbox.addEventListener('click', () => {
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
      });
      updateSelections();
      this.uservalues = checkboxes.filter(item => item.checked).map(item => ({ id: item.id, label: item.value }));
    });

    function updateSelections() {
      checkboxes.forEach(checkbox => {
        const label = checkbox.parentNode;
        if (checkbox.checked) {
          label.classList.add('selected');
        } else {
          label.classList.remove('selected');
        }
      });
    }
  }
}

window.customElements.define('custom-search-and-select', CustomCheckbox);
