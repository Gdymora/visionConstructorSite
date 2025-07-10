import loadBlocks from './block';
import type { Editor } from 'grapesjs';

export default (editor: Editor, opts = {}) => {
    const options = {
        ...{
            i18n: {}, 
            tailwindPlayCdn: '',  
            plugins: [],
            config: {}, 
            changeStatsText: 'Change Header',
            openCategory: 'Header', 
        },
        ...opts,
    };
 
    loadBlocks(editor, options);
};
