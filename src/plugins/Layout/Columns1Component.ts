export const Columns1Component = (editor, commonTraits) => {

  editor.DomComponents.addType('column1', {

    //isComponent: el => el.getAttribute && el.getAttribute('data-gjs-type') === 'column1',

    model: {
      defaults: {
        tagName: 'div',
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
          { type: "text", label: "Route", name: "route" },
          ...commonTraits,
        ],
        attributes: { class: 'row', type: "column1" },
        classes: ["row"],
        styles: `.row-cell {
                      flex-grow: 1;
                      flex-basis: 100%;
                      padding: 5px;
                      min-height: 75px;
                    }
                `,
      },
    },
    view: {}
  });
  editor.BlockManager.add('column1', {
    label: '1 Column',
    category: 'Layout',
    content: `<div data-gjs-type="column1" class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row" name="column1" type="column">
                  <div class="row-cell" data-gjs-draggable=".row" name="column-row-1" type="column"></div> 
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
            flex-basis: 100%;
            padding: 5px;
          }
        </style>`,

    media: `<svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/>
             </svg>`,
  });
};
