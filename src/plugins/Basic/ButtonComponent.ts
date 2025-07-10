export const ButtonComponent = (editor, commonTraits) => {
    editor.DomComponents.addType('button', {
        isComponent: (el) => {
            if (el.tagName === 'BUTTON') {
                return { type: 'button', tagName: 'button' };
            } else if (el.tagName === 'A' && el.getAttribute('role') === 'button') {
                return { type: 'a', tagName: 'a' };
            }
        },
        model: {
            defaults: {
                // Основні властивості моделі
                attributes: { type: 'button' }, // Атрибути HTML тегу кнопки
                stylable: true, // Дозволяє редагування стилів
                content: 'Click Me',
                badgable: true,
                highlightable: true,
                selectable: true,
                copyable: true,
                resizable: true,
                editable: true,
                hoverable: true,
                traits: [
                    ...commonTraits,
                    {
                        type: 'text', // Використовуємо class_select для управління класами
                        label: 'Button Style',
                        name: 'class',
                        changeProp: true,
                    },
                    {
                        type: 'select',
                        options: [
                            { value: 'button', name: 'Button' },
                            { value: 'submit', name: 'Submit' },
                        ],
                        label: 'Type',
                        name: 'type',
                    },
                ],
                classes: ['btn', 'btn-primary'],
            },
            // Функція для оновлення тегу в залежності від наявності href
            init() {
                this.on('change:href', this.updateTagName);
                this.listenTo(this, 'change:content', this.updateContent);
                const content = this.get('content');
                this.set('content', content);
                this.updateTagName();
            },

            updateContent(el, value, context) {
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

            updateTagName() {
                const hasHref = Boolean(this.get('href'));
                this.set('tagName', hasHref ? 'a' : 'button');
                if (hasHref) {
                    this.set('attributes', { ...this.get('attributes'), role: 'button' });
                } else {
                    const { role, ...rest } = this.get('attributes');
                    this.set('attributes', rest);
                }
            },
        },
        view: {
            init(element) {
                this.el.addEventListener('click', (e) => {
                    e.preventDefault();
                    // console.log('Button clicked!', element, this.el);
                });
                // console.log(editor.Canvas.getDocument())
            },

            onRender(element) {
                const jscript = element.el.attributes?.jscript?.value;
                if (jscript) {
                    console.log('anchorElement!', jscript);
                    element.model.set('jscript', jscript);
                }
            },
        },
    });

    editor.BlockManager.add('button', {
        label: 'Button',
        category: 'Basic',
        content: '<button type="button"></button>',
        media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z"></path>
        </svg>`,
    });

    editor.on('component:selected', function (model) {
        model.on('change:class', function () {
            const selectedClass = model.get('class'); // Отримати вибраний клас
            let currentClasses = model.getClasses(); // Отримати поточний список класів
            model.setClass([...currentClasses]); // Очистити існуючі класи
            if (selectedClass) {
                model.addClass(selectedClass); // Додати вибраний клас
            }
        });
    });
};
