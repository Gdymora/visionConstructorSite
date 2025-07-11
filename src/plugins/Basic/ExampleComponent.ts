export const ExampleComponent = (editor, commonTraits) => {
    editor.Components.addType("cmp-Y", {
        // You don't need `isComponent` anymore as you declare types already on elements
        model: {
            defaults: {
                name: "Component Y", // Simple custom name
                draggable: ".el-X", // Add `draggable` logic
                stylable: true, // Дозволяє редагування стилів
                badgable: true,
                highlightable: true,
                selectable: true,
                copyable: true,
                resizable: true,
                editable: true,
                hoverable: true,
            },
            traits: [
                ...commonTraits,
            ],
        },
    });
    editor.BlockManager.add("listinger", {
        label: "example",
        category: "React Components",
        content: `<div class="el">Element</div>
          <div class="el2">Element 2</div>
          <style>
            .el { color: blue }
            .el2 { color: violet }
          </style>`,
        media: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
              <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
            </svg>`,
    });
};