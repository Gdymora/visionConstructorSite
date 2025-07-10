import loadTailwindBlocks from './tailwind'
import type { Editor } from "grapesjs";

export default (editor: Editor, opts = {}) => { 
  const options = {
    ...{
      i18n: {},
      // default options
      tailwindPlayCdn: 'https://cdn.tailwindcss.com',
      plugins: [],
      config: {},
      cover: `.object-cover { filter: sepia(1) hue-rotate(190deg) opacity(.46) grayscale(.7) !important; }`,
      changeThemeText: 'Change Theme',
      openCategory: 'Blog',
    }, ...opts
  };
  loadTailwindBlocks(editor, options);
};