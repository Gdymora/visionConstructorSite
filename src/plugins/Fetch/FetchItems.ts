export const FetchItemsComponent = (editor) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  editor.DomComponents.addType('fetchItemsRow', {
    model: {
      defaults: { 
        type: '',
        attributes: { tagName: 'fetch-items-row', type: 'fetchItemsRow', url: '1' },
        components: [], // Initial content (optional) 
        classes: ["row"],
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

          const data = await response.json();/* 
          const products = JSON.parse(data.data);
          const table_structure = JSON.parse(data.user_table.table_structure); */
          const products = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;
          const table_structure = typeof data.table_structure === 'string' ? JSON.parse(data.table_structure) : data.table_structure;
         
          let allProducts = '';
          let formattedStructure = '';
          const isFetchItems = this.get('attributes').isFetchItems;

          const isTypeFetch = isFetchItems ? 'fetchItems' : 'item';

          if (products && Object.keys(products).length > 0) {
            formattedStructure = `
              <div  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">               
                ${products.map((row, rowIndex) => (
              `<div type=${isTypeFetch} typeid="${rowIndex}_${el.cid}" isfetchitems=${isFetchItems} url="34" data-display-only="${rowIndex > 0 ? 'true' : 'false'}" key=${rowIndex} class="max-w-sm rounded relative overflow-hidden shadow-lg">
                    ${table_structure.map((column, colIndex) => {
                if (column.tag === 'img') {
                  return `<${column.tag} src="${row[column.name]}" typeid="${column.name}_${el.cid}" isfetchitems=${isFetchItems} alt="Image" class="w-full">`;
                } else if (column.tag === 'a') {
                  return `<${column.tag} typeid="${column.name}_${el.cid}" href="${row[column.link]}">${row[column.name]}</${column.tag}>`;
                } else {
                  if (column.filter) {
                    return `<div typeid="div_${column.name}_${el.cid}" isfetchitems=${isFetchItems} class="absolute bottom-0 left-0 right-0 px-6 py-4">  
                                <span typeid="${column.name}_${el.cid}" type="${column.name}" isfetchitems=${isFetchItems} class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${row[column.name]}</span>                     
                            </div>`
                  } else {
                    return `<${column.tag || 'div'} typeid="${column.name}_${el.cid}" type="${column.name}" isfetchitems=${isFetchItems} class="font-bold text-xl mb-2">${row[column.name]}</${column.tag || 'div'}>`;
                  }
                }
              }).join('')
              }
              </div>`

            )).join('')}
              </div>`;
          }
          allProducts += formattedStructure;
          const components = this.get('components');
          if (!components.length) {
            components.add([allProducts + '<style type="text/css">.table-fetch{overflow-x: auto; overflow-y: auto;}</style>' + '<script>console.log(45)</script>']);
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
        const isFetchItems = component.get('attributes').isfetchitems;
        if (isFetchItems != 'true') return;
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
        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/login";
            return;
          }
          console.error('Error fetching data:', error);
        }
        // 
        const divContainer = document.createElement("div");
        const containerCheckBox = document.createElement("div");
        containerCheckBox.className = "modal-table-column";
        const labelCheckBox = document.createElement("label");
        labelCheckBox.innerHTML = "Is Fetch Items";
        containerCheckBox.appendChild(labelCheckBox);
        const inputColumns = document.createElement("input");
        inputColumns.setAttribute("type", "checkbox");
        inputColumns.checked = this.model.get('attributes').isFetchItems || false;
        inputColumns.addEventListener('change', () => {
          //console.log(inputColumns.checked);
        });
        containerCheckBox.appendChild(inputColumns);
        divContainer.appendChild(containerCheckBox);
        // 
       // const divContainer = document.createElement("div");
        const containerRows = document.createElement("div");
        containerRows.className = "modal-table-column";
        const labelRows = document.createElement("label");
        labelRows.innerHTML = "Item";
        containerRows.appendChild(labelRows);
        const url = this.model.get('attributes').url;
        const selectRows = document.createElement("select");
        selectRows.setAttribute("type", "number");
        tableAll.forEach(data => {
          const option = document.createElement("option");
          option.value = data.id;
          option.text = data.table_name;
          if (Number(url) === data.id) {
            option.setAttribute('selected', 'selected');
          }
          selectRows.appendChild(option);
        });
        selectRows.onchange = () => {
          console.log(selectRows.value);
        };
        containerRows.appendChild(selectRows);
        divContainer.appendChild(containerRows);

        const containerBtn = document.createElement("div");
        containerBtn.className = "modal-create-btn";
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerHTML = "Set item";

        btn.onclick = () => {
          if (selectRows.value === url && inputColumns.checked != this.model.get('attributes').isFetchItems) {
            this.model.addAttributes({ url: null });
          }
          this.model.addAttributes({ url: selectRows.value });

          this.model.addAttributes({ isFetchItems: inputColumns.checked });
          //this.model.set("url", selectRows.value);
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
    },
  });

  editor.BlockManager.add('fetchItemsRow', {
    label: 'Fetch Items',
    category: 'Fetch',
    activate: true,
    content: {
      type: 'fetchItemsRow'
    },
  });
};
