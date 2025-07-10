import type { Editor } from "grapesjs";
import { commonTraits } from "../configs/traits";
import { Columns1Component } from "./Layout/Columns1Component";
import { Columns2Component } from "./Layout/Columns2Component";
import { Columns37Component } from "./Layout/Columns3-7Component";
import { Columns3Component } from "./Layout/Columns3Component";
import { ItemsComponent } from "./Layout/ItemsComponent";
import { ProductListingsComponent } from "./Layout/ProductListingComponent";
import { TableBlockComponent } from "./Layout/TableBlockComponent";

import vsgjsTable from "./Table";
export const PluginsLayoutComponents = (editor: Editor) => {
  Columns1Component(editor, commonTraits);
  Columns2Component(editor, commonTraits);
  Columns3Component(editor, commonTraits);
  Columns37Component(editor, commonTraits);
  ItemsComponent(editor, commonTraits);
  ProductListingsComponent(editor, commonTraits);
  TableBlockComponent(editor, commonTraits);
  vsgjsTable(editor);

  editor.Commands.add('tlb-refresh', (editor, sender) => {
    try {
      const cmp = editor.getSelected();
      console.log('tlb-refresh'); 
      //cmp.set('src', `https://via.placeholder.com/200?text=Hello${num}`);
      cmp.set('src', 'https://via.placeholder.com/200/ff2231');
    } catch (e) {
      console.log(e);
    }
  });


  const TOOLBAR_CELL = [
    {
      attributes: { class: "fa fa-arrows" },
      command: "tlb-move"
    },
    {
      attributes: { class: "fa fa-flag" },
      command: "table-insert-row-above"
    },

    {
      attributes: { class: 'fa fa-clone' },
      command: 'tlb-clone',
    },
    {
      attributes: { class: 'fa fa-trash-o' },
      command: 'tlb-delete',
    },
    {
      attributes: { class: 'fa fa-gear' },
      command: 'tlb-open-info'
    },
  ];
  const TOOLBAR_TableFetch_CELL = [{
    attributes: { class: 'fa fa-arrow-up' }, command: 'select-parent'
  },
  { attributes: { class: 'fa fa-arrows-alt' }, command: 'tlb-fill' },
  { attributes: { class: 'fa fa-arrows-alt' }, command: 'tlb-refresh' }
  ]
  const getCellToolbar = () => TOOLBAR_CELL;
  const getTableFetchToolbar = () => TOOLBAR_TableFetch_CELL;
  editor.on('component:selected', m => {
    const compType = m.get('type');
    switch (compType) {
      case 'cell':
        m.set('toolbar', getCellToolbar());
        break;
      case 'thead':
        m.set('toolbar', getTableFetchToolbar());
        break;
    }
  });

  editor.Commands.add('tlb-refresh', (editor, sender) => {
    try {
      const cmp = editor.getSelected();
      console.log('tlb-refresh');      let num = Math.round(Math.random());
      //cmp.set('src', `https://via.placeholder.com/200?text=Hello${num}`);
      cmp.set('src', 'https://via.placeholder.com/200/ff2231');
    } catch (e) {
      console.error(e);
    }
  });

};
