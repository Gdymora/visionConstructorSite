export const Columns2Component = (editor, commonTraits) => {
  editor.DomComponents.addType('column-2', {
    model: {
      defaults: {
        type: 'column-2',
        tagName: 'div',
        draggable: '.row',
        droppable: false,
        stylable: true, // Дозволяє редагування стилів
        badgable: true,
        highlightable: true,
        selectable: true,
        copyable: true,
        resizable: true,
        editable: true,
        hoverable: true,
        content: '',
        traits: [
          ...commonTraits,
        ],
        attributes: { class: 'row' },
        styles: `
                    .row-cell {
                      flex-grow: 1;
                      flex-basis: 50%;
                      padding: 5px;
                      min-height: 75px;
                    }
                `,
      },
      init() {
      },
      updateContent() { }
    },
  });

  editor.BlockManager.add('column-2', {
    label: '2 Columns',
    category: 'Layout',
    content: `<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row" name="column-2" type="column">
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-2" type="column"></div>
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-2" type="column"></div>
                  </div>
                  <style>
                    .row {
                      display: flex;
                      justify-content: flex-start;
                      align-items: stretch;
                      flex-wrap: nowrap;
                      padding: 10px;
                      min-height: 75px;
                    }
                    .row-cell {
                      flex-grow: 1;
                      flex-basis: 50%;
                      padding: 5px;
                    }
                  </style>`,
    media: `<svg viewBox="0 0 23 24">
                  <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"/>
                </svg>`,
  });
};
