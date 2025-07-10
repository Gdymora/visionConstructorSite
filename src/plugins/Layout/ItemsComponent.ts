export const ItemsComponent = (editor, commonTraits) => {
  
  
  
  const gridItem =
    `<table class="grid-item-card">
      <tr>
        <td class="grid-item-card-cell">
          <img class="grid-item-image" src="https://via.placeholder.com/250x150/78c5d6/fff/" alt="Image"/>
          <table class="grid-item-card-body">
            <tr>
              <td class="grid-item-card-content">
                <h1 class="card-title">Title here</h1>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  editor.BlockManager.add('grid-items', {
    label: 'Grid Items',
    category: 'Layout',
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3"/>
    </svg>`,
    content: `
      <table class="grid-item-row">
        <tr>
          <td class="grid-item-cell2-l">${gridItem}</td>
          <td class="grid-item-cell2-r">${gridItem}</td>
        </tr>
      </table>
    `,
  });

  const listItem =
    `<table class="list-item">
      <tr>
        <td class="list-item-cell">
          <table class="list-item-content">
            <tr class="list-item-row">
              <td class="list-cell-left">
                <img class="list-item-image" src="https://via.placeholder.com/150/78c5d6/fff" alt="Image"/>
              </td>
              <td class="list-cell-right">
                <h1 class="card-title">Title here</h1>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

    const components =  editor.DomComponents;
    const text = components.getType('text').model.prototype.defaults.traits.push({ type: 'text', label: 'Text', name: 'content', changeProp: true })
    console.log(text)

  editor.BlockManager.add('list-items', {
    label: 'List Items',

    category: 'Layout',
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M2 14H8V20H2M16 8H10V10H16M2 10H8V4H2M10 4V6H22V4M10 20H16V18H10M10 16H22V14H10"/>
    </svg>`,
    content: listItem + listItem,
  });
}