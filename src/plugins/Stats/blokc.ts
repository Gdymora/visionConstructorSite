import { source as st1 } from './data/stat-1';
import { source as st2 } from './data/stat-2';
import { source as st3 } from './data/stat-3';
import { source as st4 } from './data/stat-4';
import { source as st5 } from './data/stat-5';
import { source as st6 } from './data/stat-6';
import { source as st7 } from './data/stat-7';
import { source as st8 } from './data/stat-8';
import { source as st9 } from './data/stat-9';
import { source as st10 } from './data/stat-10';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'state-1',
        class: '',
        label: a1s,
        content: st1,
        category: 'Stats',
    },
    {
        id: 'state-2',
        class: '',
        label: a1s,
        content: st2,
        category: 'Stats',
    },
    {
        id: 'state-3',
        class: '',
        label: a1s,
        content: st3,
        category: 'Stats',
    },
    {
        id: 'state-4',
        class: '',
        label: a1s,
        content: st4,
        category: 'Stats',
    }
    ,
    {
        id: 'state-5',
        class: '',
        label: a1s,
        content: st5,
        category: 'Stats',
    }
    ,
    {
        id: 'state-6',
        class: '',
        label: a1s,
        content: st6,
        category: 'Stats',
    }
    ,
    {
        id: 'state-7',
        class: '',
        label: a1s,
        content: st7,
        category: 'Stats',
    }
    ,
    {
        id: 'state-8',
        class: '',
        label: a1s,
        content: st8,
        category: 'Stats',
    }
    ,
    {
        id: 'state-9',
        class: '',
        label: a1s,
        content: st9,
        category: 'Stats',
    }
    ,
    {
        id: 'state-10',
        class: '',
        label: a1s,
        content: st10,
        category: 'Stats',
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
