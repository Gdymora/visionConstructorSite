import loadBlocks from './blokc';
import type { Editor } from 'grapesjs';

export default (editor: Editor, opts = {}) => {
    const options = {
        ...{
            i18n: {}, 
            tailwindPlayCdn: '',  
            plugins: [],
            config: {}, 
            changeStatsText: 'Change Section FAQ',
            openCategory: 'Section FAQ', 
        },
        ...opts,
    };
 
    loadBlocks(editor, options);
};
