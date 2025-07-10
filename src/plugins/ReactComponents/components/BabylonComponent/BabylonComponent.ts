import type { Editor } from "grapesjs";
import BabylonScene from "./BabylonScene";
 
export const BabylonComponent = (editor: Editor, commonTraits) => {
  editor.Components.addType('babylon', {
    extend: 'react-component',
    model: {
      defaults: {
        component: BabylonScene,
        stylable: true,
        resizable: true,
        editable: true,
        draggable: true,
        droppable: true,
        attributes: { },
        traits: [
          ...commonTraits, 
        ]
      }
    },
    isComponent: (el) => el.tagName === 'BABYLON'
  });

  editor.BlockManager.add('babylon', {
    label: "Babylon Scene",
    category: 'React Components',
    content: '<babylon></babylon>'
  });
};
