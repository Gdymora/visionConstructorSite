import { source as st1 } from './data/bl-1';
import { source as st2 } from './data/bl-2';
import { source as st3 } from './data/bl-3';
import { source as st4 } from './data/bl-4';

import { source as a1s } from './data/icons/cta-1';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'SectionHscreen-1',
        class: '',
        label: a1s,
        content: st1,
        category: 'Section h-screen',
    }, {
        id: 'SectionHscreen-2',
        class: '',
        label: a1s,
        content: st2,
        category: 'Section h-screen',
    }, {
        id: 'SectionHscreen-3',
        class: '',
        label: a1s,
        content: st3,
        category: 'Section h-screen',
    }, {
        id: 'SectionHscreen-4',
        class: '',
        label: a1s,
        content: st4,
        category: 'Section h-screen',
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
