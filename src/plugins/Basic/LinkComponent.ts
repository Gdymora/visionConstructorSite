export const LinkComponent = (editor, commonTraits) => {
    editor.DomComponents.addType('link', {
        isComponent: el => {
            if (el.tagName === 'A') {
                return { type: 'link',  tagName: 'a' };
            }
        },
        model: {
            defaults: {
                tagName: 'a',
                editable: true,
                stylable: true, // Дозволяє редагування стилів
                badgable: true,
                highlightable: true,
                selectable: true,
                copyable: true,
                resizable: true,
                hoverable: true,
                href: '/#',
                content: 'link',
               /*  attributes: {
                    target: '_blank' 
                }, */
                traits: [
                    { type: 'text', label: 'Text', name: 'content', changeProp: true },
                    {
                        type: "select",
                        options: [
                            { value: "page", name: "Page" },
                            { value: "url", name: "Url" },
                        ],
                        label: "Type",
                        name: "typeUrl",
                        changeProp: true,
                    },
                    {
                        type: 'select',
                        label: 'URLorPage',
                        name: 'pageSelect',
                        options: [], // Опції з назвами сторінок
                        changeProp: true,
                    },
                    {
                        type: 'text',
                        label: 'URL',
                        name: 'href',
                        changeProp: true,
                    },
                ],
            },

            init() {
                this.on('change:href', this.updateHref);
                this.on('change:typeUrl', this.updatePageOptions);
                this.on('change:pageSelect', this.updateHref);
                this.on('change:content', this.updateContent);
            },

            updatePageOptions(el, value, context) {
                console.log('this', this, 'el ', el, 'val ', value, 'cont ', context, 'trait ', this.getTraits())
                const pageSelectTrait = this.getTrait('pageSelect');
                if (value === 'url') {
                    pageSelectTrait.set('options', [
                        { value: 'http://', name: 'HTTP' },
                        { value: 'https://', name: 'HTTPS' }
                    ]);
                } else if (value === 'page') {
                    const pages = editor.Pages.getAll().map(page => ({
                        value: page.get('name'),
                        name: page.get('name')
                    }));
                    pageSelectTrait.set('options', pages);
                }

            },

            updateHref(el, value, context) {
                const hrefTrait = this.getTrait('href');
                // Встановити нове значення для trait href
                hrefTrait.setValue(value);
                // Оновити атрибут href елемента
                // this.addAttributes({ href: value });
                this.addAttributes({ href: this.get('href') });
            },

            updateContent(el, value, context) {
                console.log('this', this, 'el ', el, 'val ', value, 'cont ', context, 'trait ', this.getTraits())
                const contentTrait = this.getTrait('content');
                // Встановити нове значення для trait content
                contentTrait.setValue(value);
                // Оновити атрибут content елемента
                // this.addAttributes({ content: value });
                this.addAttributes({ content: this.get('content') });
                const anchorElement = this.view.el;
                if (anchorElement) {
                    anchorElement.innerHTML = contentTrait.getValue() || value;
                }
            },
        },
        view: {
            init() {
                // Тут можна виконати додаткові дії під час ініціалізації відображення
            }
        }
    });

    editor.BlockManager.add('newLink', {
        label: 'Link',
        category: 'Basic',
        content: `<a href="/#">link</a>`,
        media: `<svg viewBox="0 0 24 24"> 
        <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
     </svg>`
    });
}
