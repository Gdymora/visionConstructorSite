// registerBlocks.ts
import type { Editor } from "grapesjs";

//https://grapesjs.com/docs/modules/Blocks.html#important-caveats
export const registerBlocks = (editor: Editor) => {
  editor.BlockManager.add('my-block-id', {
    label: 'Simple Block',
    content: '<div class="simple-block">Content</div>',
    category: 'Basic',
    media: '<svg>...</svg>', // іконка для візуалізації блоку
  });

  editor.BlockManager.add('image-1', {
    label: 'Simple Block Imag',
    content: '<div class="simple-block"  name="Header" type="Header">Content 1</div>',
    category: 'Custom',
    media: '<svg>...</svg>', // іконка для візуалізації блоку
  });
  editor.Components.addType('my-cmp', {});
  editor.Components.addType('my-cmp-alt', {
    extend: 'my-cmp',
    model: {
      defaults: {
        prop1: 'value1-EXT',
        prop2: 'value2-EXT'
      }
    }
  });
  // Your blocks
  [
    { content: { type: 'my-cmp-alt' } },
    { content: { type: 'my-cmp-alt' } },
    { content: { type: 'my-cmp-alt' } }
  ]

  editor.BlockManager.add('column-1', {
    label: '1 Columns',
    category: 'Custom',
    content: `
        <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
          <div class="row-cell" data-gjs-draggable=".row"></div> 
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
            flex-basis: calc(100% / 3); /* Оновлено для підтримки трьох стовпчиків */
            padding: 5px;
          }
      </style>
     `,
    media: `<svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M2 20h20V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h20a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Z"/>
               </svg>`,
  })

  editor.BlockManager.add('column-2', {
    label: '2 Columns',
    category: 'Custom',
    content: `
          <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
              <div class="row-cell" data-gjs-draggable=".row"></div>
              <div class="row-cell" data-gjs-draggable=".row"></div>
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
          </style>
      `,
    media: `<svg viewBox="0 0 23 24">
        <path fill="currentColor" d="M2 20h8V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM13 20h8V4h-8v16Zm-1 0V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1Z"/>
      </svg>`,
  })

  editor.BlockManager.add('column-3', {
    label: '3 Columns',
    category: 'Custom',
    content: `
          <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
             <div class="row-cell" data-gjs-draggable=".row"></div>
             <div class="row-cell" data-gjs-draggable=".row"></div>
             <div class="row-cell" data-gjs-draggable=".row"></div>
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
              flex-basis: calc(100% / 3); /* Оновлено для підтримки трьох стовпчиків */
            padding: 5px;
            }
           </style>
        `,
    media: `<svg viewBox="0 0 23 24">
      <path fill="currentColor" d="M2 20h4V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM17 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1ZM9.5 20h4V4h-4v16Zm-1 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z"/>
    </svg>`,
  })

  editor.BlockManager.add('column-3/7', {
    label: '3/7 Columns',
    category: 'Custom',
    content: `
                <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
                    <div class="row-cell" data-gjs-draggable=".row"></div>
                    <div class="row-cell" data-gjs-draggable=".row"></div>
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
                </style>
            `,
    media: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M2 20h5V4H2v16Zm-1 0V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1ZM10 20h12V4H10v16Zm-1 0V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1Z"/>
          </svg>`,
    attributes: { class: 'fa fa-columns' }, // Пример добавления кастомного атрибута для иконки
    // Другие свойства...
  });

  editor.BlockManager.add('text', {
    label: 'text',
    category: 'Custom',
    content: `
          <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">
              <div class="row-cell" data-gjs-draggable=".row"></div>
              <div class="row-cell" data-gjs-draggable=".row"></div>
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
          </style>
      `,
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
    </svg>`,
  })

  
  editor.BlockManager.add('image', {
    label: 'image',
    category: 'Custom',
    content: { type: 'image' },
    activate: true,
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M21,3H3C2,3 1,4 1,5V19A2,2 0 0,0 3,21H21C22,21 23,20 23,19V5C23,4 22,3 21,3M5,17L8.5,12.5L11,15.5L14.5,11L19,17H5Z" />
    </svg>`,
  })

  editor.BlockManager.add('video', {
    label: 'video',
    category: 'Custom',
    content: { type: 'video' },
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
    </svg>`,
  })

  editor.BlockManager.add('map', {
    label: 'map',
    category: 'Custom',
    content: { type: 'map' },
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
    </svg>`,
  })

  editor.BlockManager.add('buttond', {
    label: 'buttond',
    category: 'Custom',
    content: `
        <div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row"> 
            <div class="row-cell" data-gjs-draggable=".row"></div>
        </div> 
    `,
    media: `<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z"></path>
  </svg>`,
  })
};


/* 
divider 
<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M21 18H2V20H21V18M19 10V14H4V10H19M20 8H3C2.45 8 2 8.45 2 9V15C2 15.55 2.45 16 3 16H20C20.55 16 21 15.55 21 15V9C21 8.45 20.55 8 20 8M21 4H2V6H21V4Z"></path>
</svg> 
    
group social
<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"></path>
</svg>
Spacer
<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"></path>
</svg>
Navbar
<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M21,15.61L19.59,17L14.58,12L19.59,7L21,8.39L17.44,12L21,15.61M3,6H16V8H3V6M3,13V11H13V13H3M3,18V16H16V18H3Z"></path>
</svg>
Wrapper
<svg viewBox="0 0 24 24">
  <path fill="currentColor" d="M18 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V4C20 2.9 19.11 2 18 2M18 20H6V16H18V20M18 8H6V4H18V8Z"></path>
</svg>
Raw
<svg viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,17.56L16.07,16.43L16.62,10.33H9.38L9.2,8.3H16.8L17,6.31H7L7.56,12.32H14.45L14.22,14.9L12,15.5L9.78,14.9L9.64,13.24H7.64L7.93,16.43L12,17.56M4.07,3H19.93L18.5,19.2L12,21L5.5,19.2L4.07,3Z"></path>
</svg>  
Navbar
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
    <rect class="gjs-block-svg-path" x="15" y="10" width="5" height="1"></rect>
    <rect class="gjs-block-svg-path" x="15" y="13" width="5" height="1"></rect>
    <rect class="gjs-block-svg-path" x="15" y="11.5" width="5" height="1"></rect>
</svg> 
Custom code
<svg viewBox="0 0 24 24">
    <path d="M14.6 16.6l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4m-5.2 0L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4z"></path>
</svg>
Form
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,5.5 C22,5.2 21.5,5 20.75,5 L3.25,5 C2.5,5 2,5.2 2,5.5 L2,8.5 C2,8.8 2.5,9 3.25,9 L20.75,9 C21.5,9 22,8.8 22,8.5 L22,5.5 Z M21,8 L3,8 L3,6 L21,6 L21,8 Z" fill-rule="nonzero"></path>
        <path class="gjs-block-svg-path" d="M22,10.5 C22,10.2 21.5,10 20.75,10 L3.25,10 C2.5,10 2,10.2 2,10.5 L2,13.5 C2,13.8 2.5,14 3.25,14 L20.75,14 C21.5,14 22,13.8 22,13.5 L22,10.5 Z M21,13 L3,13 L3,11 L21,11 L21,13 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="2" y="15" width="10" height="3" rx="0.5"></rect>
</svg>
Input
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 10 5 10 5 14 4 14"></polygon>
</svg>
Textarea
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,7.5 C22,6.6 21.5,6 20.75,6 L3.25,6 C2.5,6 2,6.6 2,7.5 L2,16.5 C2,17.4 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.4 22,16.5 L22,7.5 Z M21,17 L3,17 L3,7 L21,7 L21,17 Z"></path>
        <polygon class="gjs-block-svg-path" points="4 8 5 8 5 12 4 12"></polygon>
        <polygon class="gjs-block-svg-path" points="19 7 20 7 20 17 19 17"></polygon>
        <polygon class="gjs-block-svg-path" points="20 8 21 8 21 9 20 9"></polygon>
        <polygon class="gjs-block-svg-path" points="20 15 21 15 21 16 20 16"></polygon>
</svg>
Select
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
        <polygon class="gjs-block-svg-path" transform="translate(18.500000, 12.000000) scale(1, -1) translate(-18.500000, -12.000000) " points="18.5 11 20 13 17 13"></polygon>
        <rect class="gjs-block-svg-path" x="4" y="11.5" width="11" height="1"></rect>
</svg>
Button
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
</svg>
Label
<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path class="gjs-block-svg-path" d="M22,11.875 C22,11.35 21.5,11 20.75,11 L3.25,11 C2.5,11 2,11.35 2,11.875 L2,17.125 C2,17.65 2.5,18 3.25,18 L20.75,18 C21.5,18 22,17.65 22,17.125 L22,11.875 Z M21,17 L3,17 L3,12 L21,12 L21,17 Z" fill-rule="nonzero"></path>
        <rect class="gjs-block-svg-path" x="2" y="5" width="14" height="5" rx="0.5"></rect>
        <polygon class="gjs-block-svg-path" fill-rule="nonzero" points="4 13 5 13 5 16 4 16"></polygon>
</svg>
*/