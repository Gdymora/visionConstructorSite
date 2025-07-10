import type { Editor } from "grapesjs";
import ThreeJsScene from "./ThreeJsScene";

const apiUrl = process.env.REACT_APP_API_URL;
export const ThreeJsComponent = (editor: Editor, commonTraits) => {
  editor.Components.addType('three-js', {
    extend: 'react-component',
    model: {
      defaults: {
        component: ThreeJsScene,
        stylable: true,
        resizable: true,
        editable: true,
        draggable: true,
        droppable: true,
        attributes: {
          mlsid: 'Default MLSID',
          editable: true 
        },
        traits: [
          ...commonTraits,
          {
            type: 'number',
            label: 'MLS ID',
            name: 'mlsid'
          },
          {
            type: 'string',
            label: 'modelUrl',
            name: 'modelUrl'
          },
          {
            type: 'string',
            label: 'textureUrl',
            name: 'attributes:textureUrl'
          },
          { type: 'text', label: 'Url', name: 'attributes:url', changeProp: true }
        ]
      },
      async init() {
        this.listenTo(this, "active", this.openModal);
        this.listenTo(this, "change:attributes:url", this.changeUrl);
      },

      async changeUrl(el, value, context) {
        try {
          if (!value) return;
          const response = await fetch(`${apiUrl}/data-tables/view/${value}`);

          const data = await response.json();
          const products = JSON.parse(data.data);
          const table_structure = JSON.parse(data.user_table.table_structure);
          const nameScene = this.get('attributes').nameScene;
          const modelPropsUrl = this.get('attributes').modelPropsUrl;
          const modelPropsIndexScene = this.get('attributes').modelPropsIndexScene;

          if (products && Object.keys(products).length > 0) {
            const urlScene = products.filter((column) => column[nameScene] === modelPropsIndexScene)[0];
            this.addAttributes({ modelUrl: urlScene[modelPropsUrl] })
           // console.log(products, table_structure, nameScene, modelPropsUrl, products[modelPropsIndexScene], products[modelPropsIndexScene][modelPropsUrl]);
          }

        } catch (error) {
          if (error.response && error.response.status === 401) {
            window.location.href = "/login";
            return;
          }
          console.error('Error fetching data:', error);
        }
      },
    },
    isComponent: (el) => el.tagName === 'THREE-JS',
    
    view: {
      events: {
        // @ts-ignore
        dblclick: 'onActive',
      },
      onActive() {
        this.openModal();
      },
      async openModal() {
        const createOption = (value, text, selected) => {
          const option = document.createElement("option");
          option.value = value;
          option.text = text;
          if (selected) {
            option.setAttribute('selected', 'selected');
          }
          return option;
        };
        
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

        const divContainer = document.createElement("div");
        const containerRows = document.createElement("div");
        containerRows.className = "modal-table-column";
        const labelRows = document.createElement("label");
        labelRows.innerHTML = "Item";
        containerRows.appendChild(labelRows);
        const url = this.model.get('attributes').url;
        const modelUrl = this.model.get('attributes').selectRowsModelUrl;
        const nameScene = this.model.get('attributes').selectRowsNameScene;
        const nameSceneForUrl = this.model.get('attributes').selectRowsNameSceneForUrl;

        const selectRows = document.createElement("select");
        selectRows.setAttribute("type", "number");

        tableAll.forEach(data => {
          const option = createOption(data.id, data.table_name, Number(url) === data.id);
          selectRows.appendChild(option);
        });
        //

        const divContainerRowOptionsNameUrl = document.createElement("div");
        let products = [];
        let table_structure = [];
        selectRows.onclick = async () => {
          console.log(selectRows.value);
          try {
            if (!selectRows.value) return;
            const response = await fetch(`${apiUrl}/data-tables/view/${selectRows.value}`);
            const data = await response.json();
            products = JSON.parse(data.data);
            table_structure = JSON.parse(data.user_table.table_structure);
            console.log(products, table_structure);
            selectRowsNameScene.innerHTML = "";
            selectRowsModelUrl.innerHTML = "";
            // Додати нові елементи вибору
            table_structure.forEach(data => {
              const option = document.createElement("option");
              option.value = data.name;
              option.text = data.name;
              if (nameScene === data.name) {
                option.setAttribute('selected', 'selected');
              }
              selectRowsNameScene.appendChild(option);
            });

            table_structure.forEach(data => {
              const option = document.createElement("option");
              option.value = data.name;
              option.text = data.name;
              if (modelUrl === data.name) {
                option.setAttribute('selected', 'selected');
              }
              selectRowsModelUrl.appendChild(option);
            });

            // Додати вибори до відповідних контейнерів
            containerRowsNameScene.appendChild(selectRowsNameScene);
            containerRowsModelUrl.appendChild(selectRowsModelUrl);

            // Додати контейнери до головного контейнера
            divContainerRowOptionsNameUrl.appendChild(containerRowsNameScene);
            divContainerRowOptionsNameUrl.appendChild(containerRowsModelUrl);
          }
          catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        //
        const containerRowsNameScene = document.createElement("div");
        containerRowsNameScene.className = "modal-table-column";
        const labelRowsNameScene = document.createElement("label");
        labelRowsNameScene.innerHTML = "Name";
        containerRowsNameScene.appendChild(labelRowsNameScene);
        const selectRowsNameScene = document.createElement("select");
        selectRowsNameScene.setAttribute("type", "text");

        selectRowsNameScene.onclick = () => {
          if (!selectRowsNameScene.value) return;
          selectRowsNameSceneForUrl.innerHTML = "";
          products.forEach(data => {
            const option = document.createElement("option");
            option.value = data[selectRowsNameScene.value];
            option.text = data[selectRowsNameScene.value];
            if (nameSceneForUrl === data[selectRowsNameScene.value]) {
              option.setAttribute('selected', 'selected');
            }
            selectRowsNameSceneForUrl.appendChild(option);
          });

          // Додати вибори до відповідних контейнерів
          containerNameSceneForUrl.appendChild(selectRowsNameSceneForUrl);
          // Додати контейнери до головного контейнера
          divContainerRowOptionsNameUrl.appendChild(containerNameSceneForUrl);
        }
        //
        const containerRowsModelUrl = document.createElement("div");
        containerRowsModelUrl.className = "modal-table-column";
        const labelRowsModelUrl = document.createElement("label");
        labelRowsModelUrl.innerHTML = "Url";
        containerRowsModelUrl.appendChild(labelRowsModelUrl);
        const selectRowsModelUrl = document.createElement("select");
        selectRowsModelUrl.setAttribute("type", "text");
        selectRowsModelUrl.onchange = () => { }
        //
        const containerNameSceneForUrl = document.createElement("div");
        containerNameSceneForUrl.className = "modal-table-column";
        const labelNameSceneForUrl = document.createElement("label");
        labelNameSceneForUrl.innerHTML = "Url";
        containerNameSceneForUrl.appendChild(labelNameSceneForUrl);
        const selectRowsNameSceneForUrl = document.createElement("select");
        selectRowsNameSceneForUrl.setAttribute("type", "text");
        selectRowsNameSceneForUrl.onchange = () => { }
        //

        containerRows.appendChild(selectRows);
        divContainer.appendChild(containerRows);
        divContainer.appendChild(divContainerRowOptionsNameUrl);
        const containerBtn = document.createElement("div");
        containerBtn.className = "modal-create-btn";
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerHTML = "Set item";

        btn.onclick = () => {
          if (selectRows.value === url) {
            this.model.addAttributes({ url: null });
          }
          this.model.addAttributes({ url: selectRows.value });
          this.model.addAttributes({ nameScene: selectRowsNameScene.value });
          this.model.addAttributes({ modelPropsUrl: selectRowsModelUrl.value });
          this.model.addAttributes({ modelPropsIndexScene: selectRowsNameSceneForUrl.value });
          console.log(this.model.get('attributes'));
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

  editor.BlockManager.add('three-js', {
    label: "Three.js Scene",
    category: 'React Components',
    content: '<three-js></three-js>'
  });
/* window.scenes['Default MLSID'].background = new THREE.Color('#ffca6f');
// Створюємо подію виклику перерендеру
const scenesChangeEvent = new Event('scenesChange');
window.dispatchEvent(scenesChangeEvent); */

};