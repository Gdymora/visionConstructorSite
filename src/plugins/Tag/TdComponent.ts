export const TDComponent = (editor, commonTraits) => {
    editor.DomComponents.addType('td-tag', {
        isComponent: el => {
            if (el.tagName == 'TD') {
                return { type: 'td', tagName:'td' };
            }
        },
        model: {
            defaults: {
                tagName: 'td',
                traits: [
                    { type: 'text', label: '<td>', name: 'content', changeProp: true },
                ],
                // Властивості за замовчуванням
                stylable: ['color', 'margin', 'padding'], // Вказуєте, які CSS властивості доступні для стилювання
            },
            init() {
                this.listenTo(this, 'change:content', this.updateContent);
            },
            updateContent() {
                const content = this.get('content');
                this.set('content', content);
            }
        },
        view: {}
    });

    // Додавання компонента до менеджера блоків, щоб його можна було легко перетягнути на холст
    editor.BlockManager.add('td-tag', {
        label: 'TD Component',
        category: 'Tage',
        content: {
            type: 'td-tag',
            content: `world`,
        },
        media: `<svg class="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path class="gjs-block-svg-path" d="M22,9 C22,8.4 21.5,8 20.75,8 L3.25,8 C2.5,8 2,8.4 2,9 L2,15 C2,15.6 2.5,16 3.25,16 L20.75,16 C21.5,16 22,15.6 22,15 L22,9 Z M21,15 L3,15 L3,9 L21,9 L21,15 Z" fill-rtde="nonzero"></path>
              <rect class="gjs-block-svg-path" x="4" y="11.5" width="16" height="1"></rect>
            </svg>`,
    });
};
