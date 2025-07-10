import loadTemplateBlocks from './template';
import type { Editor } from 'grapesjs';

export default (editor: Editor, opts = {}) => {
    const options = {
        ...{
            i18n: {},
            // default options
            tailwindPlayCdn: '', // Вимикаємо завантаження Tailwind 'https://cdn.tailwindcss.com',
            plugins: [],
            config: {},
            cover: `.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`,
            changeThemeText: 'Change Theme',
            openCategory: 'Template',
            bootstrapCdn: '', // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css', // Вказуємо CDN Bootstrap
            customStyles: '/css/pluginscss/template.css', 
        },
        ...opts,
    };

    // Завантажуємо шаблони блоків
    loadTemplateBlocks(editor, options);

    // Підключаємо свої стилі
    if (options.customStyles) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = options.customStyles;
        document.head.appendChild(link);
      }

    // Підключаємо Bootstrap
    if (options.bootstrapCdn) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = options.bootstrapCdn;
        document.head.appendChild(link);
    }
};
