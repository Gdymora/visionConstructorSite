export const Columns37Component = (editor, commonTraits) => {
    editor.DomComponents.addType('column-3/7', {
        model: {
            defaults: {
                type: 'column-3/7',
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
                    .row {
                      display: flex;
                      justify-content: flex-start;
                      align-items: stretch;
                      flex-wrap: nowrap;
                      padding: 10px;
                      min-height: 75px;
                    }
                    .row-cell:first-child {
                      flex-grow: 1;
                      flex-basis: 30%; /* 3 з 10 частин */
                      padding: 5px;
                    }
                    .row-cell:last-child {
                      flex-grow: 1;
                      flex-basis: 70%; /* 7 з 10 частин */
                      padding: 5px;
                    }
                `,
            },
        },
    });

    editor.BlockManager.add('column-3/7', {
        label: '3/7 Columns',
        category: 'Layout',
        content: `<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row" name="column-37" type="column">
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-37" type="column"></div>
                    <div class="row-cell" data-gjs-draggable=".row" name="column-row-37" type="column"></div>
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
                    .row-cell:first-child {
                      flex-grow: 1;
                      flex-basis: 30%; /* 3 з 10 частин */
                      padding: 5px;
                    }
                    .row-cell:last-child {
                      flex-grow: 1;
                      flex-basis: 70%; /* 7 з 10 частин */
                      padding: 5px;
                    }
                  </style>`,
        media: `<svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"/>
                  </svg>`,
        attributes: { class: 'fa fa-columns' },
    });
};
