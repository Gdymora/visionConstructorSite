import { Fields } from '../../components/ControlPanel/TableStructureForm';

export const FetchProductListingsComponent = (editor, commonTraits) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    async function sendRequestCreate(method: string, body: any, options: RequestInit) {
        const response = await fetch(`${apiUrl}/user-tables`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async function openFetchComponent(el: HTMLElement, data: Fields) {
        if (el) {
            const token = localStorage.getItem('token');
            const struct = typeof data.table_structure === 'string' ? JSON.parse(data.table_structure) : data.table_structure;
            const newTableStructure = { ...data, table_structure: struct };

            try {
                const responseData = await sendRequestCreate('post', newTableStructure, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

               // const editor = (window as any).editor;
                const component = editor.getSelected();
                editor.Modal.close();
                component.setAttributes({ url: responseData.id });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        } else {
            console.error('Target element not found');
        }
    }

    editor.DomComponents.addType('productFetchListing', {
        model: {
            defaults: {
                type: '',
                attributes: { url: '/view/1' },
                components: [],
                content: `<div>It is necessary to select the type of data, if such data is remote, it must be created</div>`,
                structure: ``,
                traits: [{ type: 'text', label: 'Url', name: 'attributes:url', changeProp: true }],
            },
            async init() {
                editor.on('component:styleUpdate', this.handlePropChange);
                this.listenTo(this, 'active', this.openModal);
                this.listenTo(this, 'change:attributes:url', this.changeUrl);
            },

            async changeUrl(el, value, context) {
                try {
                    if (!value) return;
                    const response = await fetch(`${apiUrl}/data-tables/view/${value}`);
                    const data = await response.json();
                    const products = typeof data.data === 'string' ? JSON.parse(data.data) : data.data;;
                    let allProducts = '';

                    let formattedStructure = this.get('structure');
                    products.forEach((product, index) => {
                        this.set('content', formattedStructure);
                        for (const key in product) {
                            formattedStructure = formattedStructure.replace(new RegExp(`{${key}}`, 'g'), product[key]);
                        }

                        formattedStructure = formattedStructure.replace(/{display}/g, () => {
                            return index > 0 ? '"true"' : '"false"';
                        });

                        allProducts += formattedStructure;
                    });

                    const start = this.get('start');
                    const end = this.get('end');
                    this.components(start + allProducts + end);

                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        window.location.href = '/login';
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

                elements.forEach((element) => {
                    if (element?.ccid === component?.ccid) {
                        return;
                    }
                    const dataType = element.getAttributes()['typeid'];
                    if (dataType && dataType === componentChange) {
                        element.setStyle(propChanged.style);
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
                this.listenTo(this.model, 'active', this.openModal);
            },
            async openModal() {
                let tableAll = [];

                try {
                    const response = await fetch(`${apiUrl}/user-tables-all`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const data = await response.json();
                    tableAll = data;
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        window.location.href = '/login';
                        return;
                    }
                    console.error('Error fetching data:', error);
                }

                const divContainer = document.createElement('div');
                const containerRows = document.createElement('div');
                containerRows.className = 'modal-table-column';
                const labelRows = document.createElement('label');
                labelRows.innerHTML = 'Custem Items';
                containerRows.appendChild(labelRows);
                const url = this.model.get('attributes').url;

                const selectRows = document.createElement('select');
                selectRows.setAttribute('type', 'number');
                const structure_data = this.model.get('attributes').structure_data;
                const type_data = this.model.get('attributes').type_data;
                const create_table_data = this.model.get('attributes').create_table_data;

                let isTapy = tableAll.filter((table) => table.type_data === type_data);

                if (tableAll.length === 0 || isTapy.length === 0) {
                    const div_type = document.createElement('div');
                    div_type.className = 'fetch m-2';
                    div_type.innerHTML = `No data of type: ${type_data}`;
                    containerRows.appendChild(div_type);
                } else {
                    tableAll.forEach((data) => {
                        const option = document.createElement('option');
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
                }
                //** */
                const createBtn = document.createElement('button');
                createBtn.className = 'btn btn-primary';
                createBtn.innerHTML = 'Create data';
                createBtn.onclick = () => {
                    openFetchComponent(editor.getContainer(), {
                        table_structure: structure_data,
                        create_table_data: create_table_data,
                        table_name: type_data,
                        type_data: type_data,
                    });
                    //  editor.Modal.close();
                };
                containerRows.appendChild(createBtn);
                //** */
                divContainer.appendChild(containerRows);

                const containerBtn = document.createElement('div');
                containerBtn.className = 'modal-create-btn';
                const btn = document.createElement('button');
                btn.setAttribute('type', 'button');
                btn.innerHTML = 'Set item';

                btn.onclick = () => {
                    if (selectRows.value === url) {
                        this.model.addAttributes({ url: null });
                    }
                    this.model.addAttributes({ url: selectRows.value });
                    editor.Modal.close();
                };

                containerBtn.appendChild(btn);
                divContainer.appendChild(containerBtn);
                const style = document.createElement('style');

                style.innerHTML = `
        .gjs-mdl-dialog {
          width: 35%;
        }
        .modal-table-column {
          display: flex;
          flex-direction: column;
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
          outline: none;
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
          outline: none;
        }
        `;
                divContainer.appendChild(style);
                editor.Modal.open({
                    title: 'Custom data',
                    content: divContainer,
                    attributes: {
                        class: 'my-small-modal',
                    },
                });
            },
        },
    });

    editor.BlockManager.add('productFetchListing', {
        label: 'ProductFetchListing',
        category: 'Fetch',
        activate: true,
        content: {
            type: 'productFetchListing',
            attributes: {
                create_table_data: true,
                type_data: 'block_one',
                structure_data: [
                    { name: 'image_url', type: 'text', tag: 'img' },
                    { name: 'name_file', type: 'text', tag: 'a' },
                    { name: 'size', type: 'number', tag: 'p' },
                ],
            },
            start: `<!-- ====== Table Grid Section Start -->
           <section class="bg-white pb-[84px] pt-[120px] dark:bg-dark">
             <div class="mx-auto px-4 sm:container">
              <div class="mb-9">
                <h2 class="mb-2 text-2xl font-semibold text-dark sm:text-[28px] dark:text-white">
                  My Library
                </h2>
              <p class="text-base text-body-color dark:text-dark-6">
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div class="-mx-4 flex flex-wrap">`,
            structure: `
            <div data-display-only={display} type="fetch" url="{attributes:url}"  class="w-full px-4 sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <div class="mb-9">
                <div class="mb--10px- overflow-hidden rounded">
                  <img src="{image_url}" alt="table grids" class="h-full w-full object-cover object-center"/>
                </div>
                <div>
                  <a class="inline-block text-base font-medium text-dark hover:text-primary dark:text-white">
                    {name_file}
                  </a>
                  <p class="text-sm text-body-color dark:text-dark-6">{size}KB
                  </p>
                </div>
              </div>
            </div>`,
            end: `
         </div>
      </div>
    </section>
  <!-- ====== Table Grid Section End -->`,
        },
    });
};
