import { source as st1 } from './data/team-1';
import { source as st2 } from './data/team-2';
import { source as st3 } from './data/team-3';
import { source as st4 } from './data/team-4';
import { source as st5 } from './data/team-5';
import { source as st6 } from './data/team-6';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'team-1',
        class: '',
        label: a1s,
        content: st1,
        category: 'Teams',
    },
    {
        id: 'team-2',
        class: '',
        label: a1s,
        content: st2,
        category: 'Teams',
    },
    {
        id: 'team-3',
        class: '',
        label: a1s,
        content: st3,
        category: 'Teams',
    },
    {
        id: 'team-4',
        class: '',
        label: a1s,
        content: st4,
        category: 'Teams',
    }
    ,
    {
        id: 'team-5',
        class: '',
        label: a1s,
        content: st5,
        category: 'Teams',
    }
    ,
    {
        id: 'team-6',
        class: '',
        label: a1s,
        content: st6,
        category: 'Teams',
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
