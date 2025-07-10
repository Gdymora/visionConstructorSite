export const MapComponent = (editor, commonTraits) => {
    editor.DomComponents.addType('basic-map', {
        isComponent: el => el.tagName === 'IFRAME' && el.src.includes("map"),

        model: {
            defaults: {
                components: [
                    {
                        type: 'textnode',
                        content: `<div style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(0,0,0,0); pointer-events: none;"></div>`,
                    },
                    // Ваш <iframe> та інші компоненти
                ],
                highlightable: true,
                selectable: true,
                copyable: true,
                resizable: true,
                editable: true,
                type: 'basic-map',
                tagName: 'iframe', 
                traits: [
                    ...editor.DomComponents.getType('map').model.prototype.defaults.traits,

                    { type: 'text', label: 'Address', name: 'address', placeholder: 'e.g., London, UK' },
                    { type: 'select', label: 'Map Type', name: 'mapType', options: [{ value: 'roadmap', name: 'Roadmap' }, { value: 'satellite', name: 'Satellite' }, { value: 'hybrid', name: 'Hybrid' }, { value: 'terrain', name: 'Terrain' }] },
                    { type: 'number', label: 'Zoom', name: 'zoom', min: 1, max: 20, placeholder: true },
                    ...commonTraits,
                ],
                attributes: { src: 'https://maps.google.com/maps?&z=1&t=q&output=embed' },
            },
            init() {
                // Слухаємо зміни трейтів
                this.on('change:address change:mapType change:zoom', this.updateMapSrc, this);
            },
            updateMapSrc() {
                // Отримуємо значення трейтів
                const address = this.getTrait('address').get('value');
                const zoom = this.getTrait('zoom').get('value');
                const mapType = this.getTrait('mapType').get('value');

                // Формуємо URL для карти
                const src = `https://maps.google.com/maps?&q=${encodeURIComponent(address)}&z=${zoom}&t=${mapType}&output=embed`;
                const uniqueKey = Date.now(); // Унікальний ключ для компонента

                // Оновлюємо атрибут src для <iframe> у вмісті компонента
                this.set('attributes', { ...this.get('attributes'), src }); 
                // Оновлюємо вміст компонента з новим src
                const content = `<iframe key="${uniqueKey}" src="${src}" frameborder="0"></iframe>`;
                this.set('content', content);  
            }
        },
    });

    editor.BlockManager.add('custom-map-block', {
        label: 'Basic Map',
        category: 'Basic',
        content: {
            type: 'basic-map',
        },
        media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
      </svg>`,
    });

    editor.BlockManager.add('map', {
        label: 'map',
        category: 'Basic',
        content: { type: 'map' },
        media: `<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M20.5,3L20.34,3.03L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21L3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19.03 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3M10,5.47L14,6.87V18.53L10,17.13V5.47M5,6.46L8,5.45V17.15L5,18.31V6.46M19,17.54L16,18.55V6.86L19,5.7V17.54Z" />
        </svg>`,
    })
};
