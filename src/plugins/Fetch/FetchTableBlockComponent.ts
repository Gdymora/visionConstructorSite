export const FetchTableBlockComponent = (editor, commonTraits) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  editor.DomComponents.addType('fetch-table-block', {
    model: {
      defaults: {
        copyable: false,
        tagName: ['table', 'thead', 'tbody', 'tr', 'td'],
        components: [],
        attributes: { tagName: 'fetch-table', type: 'fetch-table-block', url: '1' },
        traits: [
          { type: 'text', label: 'Url', name: 'attributes:url', changeProp: true }
        ],
      },
      async init() {
        editor.on('component:styleUpdate', this.handlePropChange);
        this.listenTo(this, "active", this.openModal);
        this.listenTo(this, "change:attributes:url", this.changeUrl);
      },

      async changeUrl(el, value, context) {
        try {
          if (!value) return;
          const response = await fetch(`${apiUrl}/data-tables/view/${value}`);

          const data = await response.json();
          const products = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
          const table_structure = typeof data.table_structure === 'string' ? JSON.parse(data.table_structure) : data.table_structure;
          let allProducts = '';
          let formattedStructure = '';
          const isThead = this.get('attributes').isThead;
          if (products && Object.keys(products).length > 0) {
            // data-gjs-type="thead"
            formattedStructure = `
              <table class="table-fetch">
                ${isThead ? `
                  <thead data-gjs-removable="false" data-gjs-copyable="false" stylable="true" data-gjs-draggable="false">
                    <tr data-gjs-removable="false" data-gjs-copyable="false" data-gjs-draggable="false" stylable="true">
                      ${table_structure.map((column) => (`<th data-gjs-draggable="false" stylable="true" type="row-th" key=${column.name}>${column.name}</th>`
            )).join('')}
                    </tr>
                  </thead>` : ''}
                <tbody data-gjs-removable="false" data-gjs-copyable="false" stylable="true" data-gjs-draggable="false">
                  ${products.map((row, rowIndex) => (
              `<tr data-gjs-draggable="false" data-gjs-removable="false" data-gjs-copyable="false" stylable="true" typeid="row_tr_${el.cid}" type="row-tr" key=${rowIndex} >
                      ${table_structure.map((column, colIndex) => (
                `<td data-gjs-draggable="false" data-gjs-removable="false" data-gjs-copyable="false" data-gjs-stylable="true" typeid="${column.name}_${el.cid}" type=${column.name}>${row[column.name]}</td>`
              )).join('')}
                    </tr>`
            )).join('')}
                </tbody>
              </table>`;
          }

          allProducts += formattedStructure;
          const components = this.get('components');
          if (!components.length) {
            components.add([allProducts + '<style type="text/css">.table-fetch{overflow-x: auto; overflow-y: auto;}</style>']);
          } else {
            this.components(allProducts);
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/login";
            return;
          }
          console.error('Error fetching data:', error);
        }
      },
      handlePropChange(component, propChanged) {
        const componentThis = editor.getSelected();
        if (componentThis?.cid !== component?.cid) {
          return;
        }
        const componentChange = component.getAttributes()['typeid'];
        const elements = editor.getWrapper().find('[typeid]');

        elements.forEach(element => {
          if (element?.ccid === component?.ccid) {
            return;
          }
          const dataType = element.getAttributes()['typeid'];
          if (dataType && dataType === componentChange) {
            const currentStyle = element.getStyle();
            if (currentStyle) {
              element.setStyle(propChanged.style);
            } else {
              element.setStyle(propChanged.style);
            }
          }
        });
      },
    },
    isComponent: (el) => el.tagName === 'FETCHTABLECELL',
    view: {
      events: {
        dblclick: 'onActive',
      },
      onActive() {
        this.openModal();
      },
      init() {
        this.listenTo(this.model, "active", this.openModal);
      },

      async openModal() {
        let tableAll = [];
        try {
          const response = await fetch(`${apiUrl}/user-tables-all`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const data = await response.json();
          tableAll = data;
          console.log(tableAll);
        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/login";
            return;
          }
          console.error('Error fetching data:', error);
        }
        const divContainer = document.createElement("div");
        // 
        const containerCheckBox = document.createElement("div");
        containerCheckBox.className = "modal-table-column";
        const labelCheckBox = document.createElement("label");
        labelCheckBox.innerHTML = "Is Thead";
        containerCheckBox.appendChild(labelCheckBox);
        const inputColumns = document.createElement("input");
        inputColumns.setAttribute("type", "checkbox");
        inputColumns.checked = this.model.get('attributes').isThead || false;

        inputColumns.addEventListener('change', () => {
          //console.log(inputColumns.checked);
        });

        containerCheckBox.appendChild(inputColumns);
        divContainer.appendChild(containerCheckBox);
        // 
        const containerRows = document.createElement("div");
        containerRows.className = "modal-table-column";
        const labelRows = document.createElement("label");
        labelRows.innerHTML = "Item";
        containerRows.appendChild(labelRows);
        // 
        const url = this.model.get('attributes').url;
        const selectRows = document.createElement("select");
        selectRows.setAttribute("type", "number");
        tableAll.forEach(data => {
          const option = document.createElement("option");
          option.value = data.id;
          option.text = data.table_name;
          if (Number(url) === data.id) {
            console.log(url === data.id)
            option.setAttribute('selected', 'selected');
          }
          selectRows.appendChild(option);
        });

        selectRows.onchange = () => {
          //console.log(selectRows.value);
        };
        containerRows.appendChild(selectRows);
        divContainer.appendChild(containerRows);

        const containerBtn = document.createElement("div");
        containerBtn.className = "modal-create-btn";
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerHTML = "Set item";

        btn.onclick = () => {
          if (selectRows.value === url && inputColumns.checked != this.model.get('attributes').isThead) {
            this.model.addAttributes({ url: null });
          }
          const urlDefault = selectRows.value
          this.model.addAttributes({ url: urlDefault });
          this.model.addAttributes({ isThead: inputColumns.checked });
          //this.model.set("isThead", inputColumns.value);
          editor.Modal.close();
        };

        containerBtn.appendChild(btn);
        divContainer.appendChild(containerBtn);
        const style = document.createElement("style");

        style.innerHTML = `
        .gjs-mdl-dialog {
          width: 35%;
        }
        .modal-table-column {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .modal-table-column label {
          font-size: 14px;
          flex: 1;
        }
        .modal-table-column select {
          flex: 1;
          height: 35px;
          border-radius: 10px;
          border: 1px solid #f5f5f5;
          padding: 2px 16px;
          color: #333333;
        }
        .modal-table-column select:focus {
          outline: none
        }
        .modal-create-btn {
          text-align: right;
        }
        .modal-create-btn button {
          height: 35px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          padding: 0 10px;
          color: #333333;
        }
        .modal-create-btn button:focus {
          outline: none
        }
        `;
        divContainer.appendChild(style);
        editor.Modal.open({
          title: 'My title',
          content: divContainer,
          attributes: {
            class: 'my-small-modal',
          },
        });
      }
    }
  });

  editor.BlockManager.add('fetch-table-block', {
    id: 'table',
    label: 'Fetch Table',
    attributes: { class: 'fa fa-table' },
    content: '<fetchtablecell></fetchtablecell>',
    activate: true,
    category: 'Fetch',
    media: `<svg viewBox="0 0 23 24">
                <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
              </svg>`,
  });
};
/* 
https://github.com/GrapesJS/grapesjs/issues/1632
*/