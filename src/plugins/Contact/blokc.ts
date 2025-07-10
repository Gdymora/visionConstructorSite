import { source as bl1 } from './data/bl-1';
import { source as bl2 } from './data/bl-2';
import { source as bl3 } from './data/bl-3';
import { source as bl4 } from './data/bl-4';
import { source as bl5 } from './data/bl-5';
import { source as bl6 } from './data/bl-6';
import { source as bl7 } from './data/bl-7';
import { source as bl8 } from './data/bl-8';
import { source as bl9 } from './data/bl-9';
import { source as bl10 } from './data/bl-10';
import { source as bl11 } from './data/bl-11';
import { source as bl12 } from './data/bl-12';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'Contact-1',
        class: '',
        label: a1s,
        content: bl1,
        category: 'Contact',
    },
    {
        id: 'Contact-2',
        class: '',
        label: a1s,
        content: bl2,
        category: 'Contact',
    },
    {
        id: 'Contact-3',
        class: '',
        label: a1s,
        content: bl3,
        category: 'Contact',
    },
    {
        id: 'Contact-4',
        class: '',
        label: a1s,
        content: bl4,
        category: 'Contact',
    }
    ,
    {
        id: 'Contact-5',
        class: '',
        label: a1s,
        content: bl5,
        category: 'Contact',
    }
    ,
    {
        id: 'Contact-6',
        class: '',
        label: a1s,
        content: bl6,
        category: 'Contact',
    }
    ,
    {
        id: 'Contact-7',
        class: '',
        label: a1s,
        content: bl7,
        category: 'Contact',
    },
    {
        id: 'Contact-8',
        class: '',
        label: a1s,
        content: bl8,
        category: 'Contact',
    },
    {
        id: 'Contact-9',
        class: '',
        label: a1s,
        content: bl9,
        category: 'Contact',
    },
    {
        id: 'Contact-10',
        class: '',
        label: a1s,
        content: bl10,
        category: 'Contact',
    },
    {
        id: 'Contact-11',
        class: '',
        label: a1s,
        content: bl11,
        category: 'Contact',
    },
    {
        id: 'Contact-12',
        class: '',
        label: a1s,
        content: bl12,
        category: 'Contact',
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
