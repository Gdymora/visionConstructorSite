export const TableBlockComponent = (editor, commonTraits) => {
  /* const TOOLBAR_CELL = [
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
    }
  ];
  const getCellToolbar = () => TOOLBAR_CELL;
 */
  editor.DomComponents.addType('table-cell', {
    model: {
      defaults: {
        type: 'table-cell', 
        draggable: ['tr'],
        components: [`
        <table class="table  table-bordered table-resizable">
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
            <tr><td></td><td></td><td></td></tr>
        </table>
      `],   
        traits: [
          { type: 'text', label: 'Text', name: 'content', changeProp: true },
          ...commonTraits,
        ],
      },
    },
    isComponent: (el) => el.tagName === 'TABLE-CELL',
    view: {
      events: {
        dblclick: 'onActive',
        focusout: 'onDisable',
      },
      onActive() {
        this.el.contentEditable = true;
      },
      onDisable() {
      /*   const { el, model } = this;
        el.contentEditable = false;
        model.set('content', el.innerHTML) */
      },
    }
  });

  /* editor.on('component:selected', m => {
    const compType = m.get('type');
    switch (compType) {
      case 'cell':
        m.set('toolbar', getCellToolbar()); // set a toolbars
        break; 
    }
  }); */

  editor.Commands.add('table-insert-row-above', editor => {
    const selected = editor.getSelected();
    if (selected.is('cell')) {
      const rowComponent = selected.parent();
      const rowIndex = rowComponent.collection.indexOf(rowComponent);
      const cells = rowComponent.components().length;
      const rowContainer = rowComponent.parent();

      rowContainer.components().add({
        type: 'row',
        components: [...Array(cells).keys()].map(i => ({
          tagName: 'td',
          type: 'cell',
          content: 'New Cell',
        }))
      }, { at: rowIndex });
    }
  });

  editor.BlockManager.add('table-block', {
    id: 'table',
    label: 'Table',
    attributes: { class: 'fa fa-table' },
    content: '<table-cell></table-cell>',
    category: 'Layout',
    media: `<svg viewBox="0 0 23 24">
                <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
              </svg>`,
  });
};
/* 
https://github.com/GrapesJS/grapesjs/issues/1632
*/