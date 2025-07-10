import loadBlocks from './blokc';
import type { Editor } from 'grapesjs';

export default (editor: Editor, opts = {}) => {
    const options = {
        ...{
            i18n: {}, 
            tailwindPlayCdn: '',  
            plugins: [],
            config: {}, 
            changeStatsText: 'Change Section testimonials',
            openCategory: 'Section testimonials', 
        },
        ...opts,
    };
 
    loadBlocks(editor, options);
};
