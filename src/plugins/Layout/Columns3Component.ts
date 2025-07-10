export const Columns3Component = (editor, commonTraits) => {
    editor.DomComponents.addType('column-3', {
        model: {
            defaults: {
                type: 'column-3',
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
                      flex-basis: calc(100% / 3);
                      padding: 5px;
                      min-height: 75px;
                    }
                `,
            },
        },
    });

    editor.BlockManager.add('column-3', {
        label: '3 Columns',
        category: 'Layout',
        content: `<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row" name="column-3" type="column">
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-3" type="column"></div>
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-3" type="column"></div>
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-3" type="column"></div>
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
                      flex-basis: calc(100% / 3);
                      padding: 5px;
                    }
                  </style>`,
        media: `<svg viewBox="0 0 23 24">
                  <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
                </svg>`,
    });
};
