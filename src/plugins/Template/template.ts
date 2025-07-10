import { source as a1 } from './data/cta-1';
import { source as a1s } from './data/icons/cta-1';
import { source as a2 } from './data/cta-2';
import { source as a2s } from './data/icons/cta-2';
/*  */
import { source as tmp2 } from './data/template-2';
/** */
import { source as blog1 } from './data/blog-1';
import { source as blog1Post } from './data/blog-1-post';
import { source as blog1s } from './data/icons/blog-1';
import { source as blog2 } from './data/blog-2';
import { source as blog2Pos } from './data/icons/blog-1';
import { source as blog2Ho } from './data/blog-2-home';
import { source as blog2Po } from './data/blog-2-post';
import { source as blog3 } from './data/blog-3';
import { source as blog4 } from './data/blog-4';
import { source as blog4_404 } from './data/blog-4-404';
import { source as blog4About } from './data/blog-4-about';
import { source as blog4Contact } from './data/blog-4-contact';
import { source as blog4Details } from './data/blog-4-details';
import { source as blog4Grids } from './data/blog-4-grids';
import { source as blog4Pricing } from './data/blog-4-pricing';
import { source as blog4Signin } from './data/blog-4-signin';
import { source as blog4Signup } from './data/blog-4-signup';
import { source as styleBlog4 } from './data/css/blog-4';
import { source as blog5 } from './data/blog-5';
import { source as blog5About } from './data/blog-5-about';
import { source as blog5ArticleDetails } from './data/blog-5-article-details';
import { source as blog5Categories } from './data/blog-5-categories';

import { source as blog6 } from './data/blog-6';
import { source as blog6Post } from './data/blog-6-post';
import { source as blog6PostVue } from './data/blog-6-post-vue';
import { source as blog6Multimenu } from './data/blog-6-multimenu';
import { source as blog7 } from './data/blog-7';
import { source as blog8 } from './data/blog-8';
//**** */
import { source as lp1 } from './data/landingPage-1';
import { source as lp2 } from './data/landingPage-2';
import { source as lp3 } from './data/landingPage-3';
import { source as lp4 } from './data/landingPage-4';
import { source as styleLP4 } from './data/css/lp4';
import { source as lp5 } from './data/landingPage-5';
import { source as styleLP5 } from './data/css/lp5';
import { source as lp6 } from './data/landingPage-6';
import { source as lp7 } from './data/landingPage-7';
import { source as lp8 } from './data/landingPage-8';
import { source as lp8Product } from './data/landingPage-8-product';
import { source as lp9 } from './data/landingPage-9';
import { source as lp9Help } from './data/landingPage-9-help';
import { source as lp10 } from './data/landingPage-10';
import { source as lp11 } from './data/landingPage-11';
import { source as lp12 } from './data/landingPage-12';
import { source as lp13 } from './data/landingPage-13';
import { source as lp14 } from './data/landingPage-14';
import { source as lp15 } from './data/landingPage-15';
import { source as lp16 } from './data/landingPage-16';
import { source as lp17 } from './data/landingPage-17';
import { source as lp18 } from './data/landingPage-18';
import { source as lp19 } from './data/landingPage-19';
import { source as lp20 } from './data/landingPage-20';

import { source as lp21 } from './data/landingPage-21';
import { source as lp22 } from './data/landingPage-22';
import { source as lp23 } from './data/landingPage-23';
import { source as lp24 } from './data/landingPage-24';
import { source as lp25 } from './data/landingPage-25';
import { source as lp26 } from './data/landingPage-26';
import { source as lp27 } from './data/landingPage-27';
import { source as lp28 } from './data/landingPage-28';
import { source as lp29 } from './data/landingPage-29';
import { source as lp30 } from './data/landingPage-30';
import { source as lp31 } from './data/landingPage-31';
import { source as lp32 } from './data/landingPage-32';
import { source as lp33 } from './data/landingPage-33';
import { source as lp34 } from './data/landingPage-34';
import { source as lp35 } from './data/landingPage-35';
import { source as lp36 } from './data/landingPage-36';
import { source as lp37 } from './data/landingPage-37';
//******** */
import { source as adP1 } from './data/adminPanel-1';
import { source as adP1Tabs } from './data/adminPanel-1-tabs';
import { source as adP1Tables } from './data/adminPanel-1-tables';
import { source as adP1Calendar } from './data/adminPanel-1-calendar';
import { source as adP1Forms } from './data/adminPanel-1-forms';
import { source as adP1Blank } from './data/adminPanel-1-blank';

/*  */
import { source as movie1 } from './data/movie-1';
/*  */
import { source as styleEcomerce1 } from './data/css/ecomerce-1';
import { source as ecomerce1 } from './data/ecomerce-1';
import { source as ecomerce1Cart } from './data/ecomerce-1-cart';
import { source as ecomerce1Category } from './data/ecomerce-1-category';
import { source as ecomerce1Contact } from './data/ecomerce-1-contact';
import { source as ecomerce1Product } from './data/ecomerce-1-product';

import { source as styleEcomerce2 } from './data/css/ecomerce-2';
import { source as ecomerce2 } from './data/ecomerce-2';
import { source as ecomerce2Account } from './data/ecomerce-2-account';
import { source as ecomerce2Checkout } from './data/ecomerce-2-checkout';
import { source as ecomerce2Login } from './data/ecomerce-2-login';
import { source as ecomerce2Product } from './data/ecomerce-2-product';
import { source as ecomerce2Profile } from './data/ecomerce-2-profile';
import { source as ecomerce2Register } from './data/ecomerce-2-register';
import { source as ecomerce2Shop } from './data/ecomerce-2-shop';
import { source as ecomerce2Wishlist } from './data/ecomerce-2-wishlist';

const getSvgHtml = (svg) => {
    if (typeof window === 'undefined') return '';
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    return svg.outerHTML;
};

const sources = [
    {
        id: 'template-0',
        class: '',
        label: a1s, //'a1s().outerHTML',
        content: a1,
        category: 'Template',
        styles: `@layer utilities { .h-screen-minus-navbar { height: calc(100vh - 56px);}}</style>`,
    },
    {
        id: 'template-1',
        class: '',
        label: a2s,
        content: a2,
        category: 'Template',
    },
    {
        id: 'template-2',
        class: '',
        label: a2s,
        content: tmp2,
        category: 'Template',
    },
    {
        id: 'blog-1',
        class: '',
        label: blog1s,
        content: blog1,
        category: 'BlogTemplate',
        styles: `@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');.font-family-karla {font-family: karla;}</style>`,
    },
    {
        id: 'blog-1-post',
        class: '',
        label: blog1s,
        content: blog1Post,
        category: 'BlogTemplate',
        styles: `@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');.font-family-karla {font-family: karla;}</style>`,
    },
    {
        id: 'blog-2',
        class: '',
        label: blog2Pos,
        content: blog2,
        category: 'BlogTemplate',
    },

    {
        id: 'blog-2-post',
        class: '',
        label: blog2Pos,
        content: blog2Po,
        category: 'BlogTemplate',
        styles: `@import url('https://fonts.googleapis.com/css?family=Karla:400,700&display=swap');.font-family-karla {font-family: karla;}</style>`,
    },
    {
        id: 'blog-2-home',
        class: '',
        label: blog2Pos,
        content: blog2Ho,
        category: 'BlogTemplate',
        styles: ``,
    },
    {
        id: 'blog-3',
        class: '',
        label: blog2Pos,
        content: blog3,
        category: 'BlogTemplate',
        styles: ``,
    },
    {
        id: 'blog-4',
        class: '',
        label: blog2Pos,
        content: blog4,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4_404',
        class: '',
        label: blog2Pos,
        content: blog4_404,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-about',
        class: '',
        label: blog2Pos,
        content: blog4About,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-contact',
        class: '',
        label: blog2Pos,
        content: blog4Contact,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-details',
        class: '',
        label: blog2Pos,
        content: blog4Details,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-grids',
        class: '',
        label: blog2Pos,
        content: blog4Grids,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-pricing',
        class: '',
        label: blog2Pos,
        content: blog4Pricing,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-signin',
        class: '',
        label: blog2Pos,
        content: blog4Signin,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-4-signup',
        class: '',
        label: blog2Pos,
        content: blog4Signup,
        category: 'BlogTemplate',
        styles: styleBlog4,
    },
    {
        id: 'blog-5',
        class: '',
        label: blog2Pos,
        content: blog5,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-5-about',
        class: '',
        label: blog2Pos,
        content: blog5About,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-5-article-details',
        class: '',
        label: blog2Pos,
        content: blog5ArticleDetails,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-5-categories',
        class: '',
        label: blog2Pos,
        content: blog5Categories,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-6',
        class: '',
        label: blog2Pos,
        content: blog6,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-6-post',
        class: '',
        label: blog2Pos,
        content: blog6Post,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-6-post-vue',
        class: '',
        label: blog2Pos,
        content: blog6PostVue,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-6-multimenu',
        class: '',
        label: blog2Pos,
        content: blog6Multimenu,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-7',
        class: '',
        label: blog2Pos,
        content: blog7,
        category: 'BlogTemplate',
        styles: ``,
    }, {
        id: 'blog-8',
        class: '',
        label: blog2Pos,
        content: blog8,
        category: 'BlogTemplate',
        styles: ``,
    },
    {
        id: 'landing-page-1',
        class: '',
        label: blog2Pos,
        content: lp1,
        category: 'LandingTemplate',
        styles: ``,
    },
    {
        id: 'landing-page-2',
        class: '',
        label: blog2Pos,
        content: lp2,
        category: 'LandingTemplate',
        styles: ``,
    },
    {
        id: 'landing-page-3',
        class: '',
        label: blog2Pos,
        content: lp3,
        category: 'LandingTemplate',
        styles: ``,
    },
    {
        id: 'landing-page-4',
        class: '',
        label: blog2Pos,
        content: lp4,
        category: 'LandingTemplate',
        styles: styleLP4,
    },
    {
        id: 'landing-page-5',
        class: '',
        label: blog2Pos,
        content: lp5,
        category: 'LandingTemplate',
        styles: styleLP5,
    },
    {
        id: 'landing-page-6',
        class: '',
        label: blog2Pos,
        content: lp6,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-7',
        class: '',
        label: blog2Pos,
        content: lp7,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-8',
        class: '',
        label: blog2Pos,
        content: lp8,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-8-product',
        class: '',
        label: blog2Pos,
        content: lp8Product,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-9',
        class: '',
        label: blog2Pos,
        content: lp9,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-9-help',
        class: '',
        label: blog2Pos,
        content: lp9Help,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-blank',
        class: '',
        label: blog2Pos,
        content: adP1Blank,
        category: 'AdminPanelTemplate',
        styles: ``,
    }, {
        id: 'landing-page-9',
        class: '',
        label: blog2Pos,
        content: lp9,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-10',
        class: '',
        label: blog2Pos,
        content: lp10,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-11',
        class: '',
        label: blog2Pos,
        content: lp11,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-12',
        class: '',
        label: blog2Pos,
        content: lp12,
        category: 'LandingTemplate',
        styles: '',
    }, {
        id: 'landing-page-13',
        class: '',
        label: blog2Pos,
        content: lp13,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-14',
        class: '',
        label: blog2Pos,
        content: lp14,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-15',
        class: '',
        label: blog2Pos,
        content: lp15,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-136',
        class: '',
        label: blog2Pos,
        content: lp16,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-17',
        class: '',
        label: blog2Pos,
        content: lp17,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-18',
        class: '',
        label: blog2Pos,
        content: lp18,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-19',
        class: '',
        label: blog2Pos,
        content: lp19,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-20',
        class: '',
        label: blog2Pos,
        content: lp20,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-21',
        class: '',
        label: blog2Pos,
        content: lp21,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-22',
        class: '',
        label: blog2Pos,
        content: lp22,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-23',
        class: '',
        label: blog2Pos,
        content: lp23,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-24',
        class: '',
        label: blog2Pos,
        content: lp24,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-25',
        class: '',
        label: blog2Pos,
        content: lp25,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-26',
        class: '',
        label: blog2Pos,
        content: lp26,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-27',
        class: '',
        label: blog2Pos,
        content: lp27,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-28',
        class: '',
        label: blog2Pos,
        content: lp28,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-29',
        class: '',
        label: blog2Pos,
        content: lp29,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-30',
        class: '',
        label: blog2Pos,
        content: lp30,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-31',
        class: '',
        label: blog2Pos,
        content: lp31,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-32',
        class: '',
        label: blog2Pos,
        content: lp32,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-33',
        class: '',
        label: blog2Pos,
        content: lp33,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-34',
        class: '',
        label: blog2Pos,
        content: lp34,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-35',
        class: '',
        label: blog2Pos,
        content: lp35,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'landing-page-36',
        class: '',
        label: blog2Pos,
        content: lp36,
        category: 'LandingTemplate',
        styles: '',
    },{
        id: 'landing-page-37',
        class: '',
        label: blog2Pos,
        content: lp37,
        category: 'LandingTemplate',
        styles: '',
    },
    {
        id: 'admin-panel-1',
        class: '',
        label: blog2Pos,
        content: adP1,
        category: 'AdminPanelTemplate',
        styles: ``,
    },
    {
        id: 'admin-panel-1-tabs',
        class: '',
        label: blog2Pos,
        content: adP1Tabs,
        category: 'AdminPanelTemplate',
        styles: ``,
    },
    {
        id: 'admin-panel-1-tables',
        class: '',
        label: blog2Pos,
        content: adP1Tables,
        category: 'AdminPanelTemplate',
        styles: ``,
    },
    {
        id: 'admin-panel-1-calendar',
        class: '',
        label: blog2Pos,
        content: adP1Calendar,
        category: 'AdminPanelTemplate',
        styles: ``,
    },
    {
        id: 'admin-panel-1-forms',
        class: '',
        label: blog2Pos,
        content: adP1Forms,
        category: 'AdminPanelTemplate',
        styles: ``,
    },
    {
        id: 'movie-1',
        class: '',
        label: blog2Pos,
        content: movie1,
        category: 'Movie',
        styles: ``,
    },
    {
        id: 'ecomerce-1',
        class: '',
        label: blog2Pos,
        content: ecomerce1,
        category: 'Ecomerce',
        styles: styleEcomerce1,
    }, {
        id: 'ecomerce-1-cart',
        class: '',
        label: blog2Pos,
        content: ecomerce1Cart,
        category: 'Ecomerce',
        styles: styleEcomerce1,
    }, {
        id: 'ecomerce-1-contact',
        class: '',
        label: blog2Pos,
        content: ecomerce1Contact,
        category: 'Ecomerce',
        styles: styleEcomerce1,
    }, {
        id: 'ecomerce-1-category',
        class: '',
        label: blog2Pos,
        content: ecomerce1Category,
        category: 'Ecomerce',
        styles: styleEcomerce1,
    }, {
        id: 'ecomerce-1-product',
        class: '',
        label: blog2Pos,
        content: ecomerce1Product,
        category: 'Ecomerce',
        styles: styleEcomerce1,
    }, {
        id: 'ecomerce-2',
        class: '',
        label: blog2Pos,
        content: ecomerce2,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-account',
        class: '',
        label: blog2Pos,
        content: ecomerce2Account,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-checkout',
        class: '',
        label: blog2Pos,
        content: ecomerce2Checkout,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-login',
        class: '',
        label: blog2Pos,
        content: ecomerce2Login,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-product',
        class: '',
        label: blog2Pos,
        content: ecomerce2Product,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-profile',
        class: '',
        label: blog2Pos,
        content: ecomerce2Profile,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-shop',
        class: '',
        label: blog2Pos,
        content: ecomerce2Shop,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-wishlist',
        class: '',
        label: blog2Pos,
        content: ecomerce2Wishlist,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
    {
        id: 'ecomerce-2-register',
        class: '',
        label: blog2Pos,
        content: ecomerce2Register,
        category: 'Ecomerce',
        styles: styleEcomerce2,
    },
];

export default (editor, options: any = {}) => {
    const bm = editor.Blocks;

    sources.forEach((s) => {
        bm.add(s.id, {
            media: getSvgHtml(editor.$(s.label).get(0)),
            attributes: { class: `${s.class} block-full-width` },
            content: s.content + s.styles,
            category: { label: s.category, open: s.category === options.openCategory },
        });
    });
};
