import type { Editor } from "grapesjs";
import Listing from "./Listing";

export const ListingComponent = (editor: Editor, commonTraits) => {
  editor.Components.addType('Listing', {
    extend: 'react-component',
    model: {
      defaults: {
        component: Listing,
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
          }
        ]
      }
    },
    isComponent: (el) => el.tagName === 'LISTING'
  });

  editor.BlockManager.add('listing', {
    label: "Listing",
    category: 'React Components',
    content: '<Listing>Foo</Listing>'
  });
};
