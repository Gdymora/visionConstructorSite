import { source as p404_1 } from './data/p404-1';
import { source as p404_2 } from './data/p404-2';
import { source as p404_3 } from './data/p404-3';
import { source as p404_4 } from './data/p404-4';
import { source as p404_5 } from './data/p404-5';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'p404-1',
        class: '',
        label: a1s,
        content: p404_1,
        category: '404',
    },
    {
        id: 'p404-2',
        class: '',
        label: a1s,
        content: p404_2,
        category: '404',
    },
    {
        id: 'p404-3',
        class: '',
        label: a1s,
        content: p404_3,
        category: '404',
    },
    {
        id: 'p404-4',
        class: '',
        label: a1s,
        content: p404_4,
        category: '404',
    },
    {
        id: 'p404-5',
        class: '',
        label: a1s,
        content: p404_5,
        category: '404',
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
