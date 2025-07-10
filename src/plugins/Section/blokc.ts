import { source as st1 } from './data/bl-1';
import { source as st2 } from './data/bl-2';
import { source as st3 } from './data/bl-3';
import { source as st4 } from './data/bl-4';
import { source as st5 } from './data/bl-5';
import { source as st6 } from './data/bl-6';
import { source as st7 } from './data/bl-7';
import { source as st8 } from './data/bl-8';
import { source as st9 } from './data/bl-9';
import { source as st10 } from './data/bl-10';
import { source as st11 } from './data/bl-11';
import { source as st12 } from './data/bl-12';
import { source as st13 } from './data/bl-13';
import { source as st14 } from './data/bl-14';
import { source as st15 } from './data/bl-15';
import { source as st16 } from './data/bl-16';
import { source as st17 } from './data/bl-17';
import { source as st18 } from './data/bl-18';
import { source as st19 } from './data/bl-19';
import { source as st20 } from './data/bl-20';
import { source as st21 } from './data/bl-21';
import { source as st22 } from './data/bl-22';
import { source as st23 } from './data/bl-23';
import { source as st24 } from './data/bl-24';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'Section-1',
        class: '',
        label: a1s,
        content: st1,
        category: 'Section',
    }, {
        id: 'Section-2',
        class: '',
        label: a1s,
        content: st2,
        category: 'Section',
    }, {
        id: 'Section-3',
        class: '',
        label: a1s,
        content: st3,
        category: 'Section',
    }, {
        id: 'Section-4',
        class: '',
        label: a1s,
        content: st4,
        category: 'Section',
    }, {
        id: 'Section-5',
        class: '',
        label: a1s,
        content: st5,
        category: 'Section',
    }, {
        id: 'Section-6',
        class: '',
        label: a1s,
        content: st6,
        category: 'Section',
    }, {
        id: 'Section-7',
        class: '',
        label: a1s,
        content: st7,
        category: 'Section',
    }, {
        id: 'Section-8',
        class: '',
        label: a1s,
        content: st8,
        category: 'Section',
    }, {
        id: 'Section-9',
        class: '',
        label: a1s,
        content: st9,
        category: 'Section',
    }, {
        id: 'Section-10',
        class: '',
        label: a1s,
        content: st10,
        category: 'Section',
    }, {
        id: 'Section-11',
        class: '',
        label: a1s,
        content: st11,
        category: 'Section',
    }, {
        id: 'Section-12',
        class: '',
        label: a1s,
        content: st12,
        category: 'Section',
    }, {
        id: 'Section-13',
        class: '',
        label: a1s,
        content: st13,
        category: 'Section',
    }, {
        id: 'Section-14',
        class: '',
        label: a1s,
        content: st14,
        category: 'Section',
    }, {
        id: 'Section-15',
        class: '',
        label: a1s,
        content: st15,
        category: 'Section',
    }, {
        id: 'Section-16',
        class: '',
        label: a1s,
        content: st16,
        category: 'Section',
    }, {
        id: 'Section-17',
        class: '',
        label: a1s,
        content: st17,
        category: 'Section',
    }, {
        id: 'Section-18',
        class: '',
        label: a1s,
        content: st18,
        category: 'Section',
    }, {
        id: 'Section-19',
        class: '',
        label: a1s,
        content: st19,
        category: 'Section',
    }, {
        id: 'Section-20',
        class: '',
        label: a1s,
        content: st20,
        category: 'Section',
    }, {
        id: 'Section-21',
        class: '',
        label: a1s,
        content: st21,
        category: 'Section',
    }, {
        id: 'Section-22',
        class: '',
        label: a1s,
        content: st22,
        category: 'Section',
    }, {
        id: 'Section-23',
        class: '',
        label: a1s,
        content: st23,
        category: 'Section',
    }, {
        id: 'Section-24',
        class: '',
        label: a1s,
        content: st24,
        category: 'Section',
    },
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
