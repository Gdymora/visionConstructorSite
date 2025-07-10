import { source as bl1 } from './data/bl-1'; 
import { source as bl2 } from './data/bl-2'; 
import { source as bl3 } from './data/bl-3'; 
import { source as bl4 } from './data/bl-4'; 

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'Gallery-1',
        class: '',
        label: a1s,
        content: bl1,
        category: 'Gallery',
    }, {
        id: 'Gallery-2',
        class: '',
        label: a1s,
        content: bl2,
        category: 'Gallery',
    }, {
        id: 'Gallery-3',
        class: '',
        label: a1s,
        content: bl3,
        category: 'Gallery',
    }, {
        id: 'Gallery-4',
        class: '',
        label: a1s,
        content: bl4,
        category: 'Gallery',
    }
];

export default (editor, options: any = {}) => {
    const bm = editor.Blocks;

    sources.forEach((s) => {
        bm.add(s.id, {
            media: getSvgHtml(editor.$(s.label).get(0)),
            attributes: { class: `${s.class}` },
            content: s.content,
            category: { label: s.category, open: s.category === options.openCategory },
        });
    });
};
