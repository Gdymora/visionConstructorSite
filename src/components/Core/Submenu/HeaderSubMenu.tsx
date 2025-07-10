import { useState } from 'react';
import { BlocksProvider, StylesProvider, useEditor } from '@grapesjs/react';
import CategorySubmenuBlockManager from '../partial/CategorySubMenuBlockManager';
import ConditionStyleManager from '../partial/ConditionStyleManager';
import TransitionColorPicker from '../../partial/ColorPicker/TransitionColorPicker';

const HeaderSubMenu = () => {
    const editor = useEditor();
    const [windowIds, setWindowIds] = useState([]);
    const [activeSubmenuWin, setActiveSubmenuWin] = useState({});
    const [copiedColor, setCopiedColor] = useState('');
    const transitionLength = 13;
    const headerColor = (color) => {
        setCopiedColor(color);
        const header = editor.getWrapper().find('div > .header-block');
        if (header) {
            header.map((component) => component.setStyle({ 'background-color': color }));
        }
    };
    const headerTextColor = (color) => {
        setCopiedColor(color);
        const header = editor.getWrapper().find('div > .header-block');
        if (header) {
            header.map((component) => component.setStyle({ color: color }));
        }
    };

    const navColor = (color) => {
        setCopiedColor(color);
        const nav = editor.getWrapper().find('div > .nav-block');
        if (nav) {
            nav.map((component) => component.setStyle({ 'background-color': color }));
        }
    };
    const navTextColor = (color) => {
        setCopiedColor(color);
        const nav = editor.getWrapper().find('div > .nav-block');
        console.log(nav);
        if (nav) {
            nav.map((component) => component.setStyle({ color: color }));
        }
    };
    const handleImageBackground = () => {
        const css = editor.Css;
        //https://images.stockcake.com/public/6/6/d/66d3292d-b931-407c-bcde-7ac1fcffab94/rustic-table-setting-stockcake.jpg
        css.addRules(
            `.header-block{
                background-image: url("./assets/images/header/header-1.jpg");
                background-repeat: no-repeat;
                background-size:cover; 
            }`
        );
    }; 

    return (
        <div className="general_menu__nav">
            <div className="general_menu__nav__row">
                {/* Цей рядок може містити кілька підменю, кожне з унікальним ідентифікатором */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row" style={{ backgroundColor: 'white' }}>
                        <div className="carus">
                            <BlocksProvider>
                                {(props) => <CategorySubmenuBlockManager {...props} selectedCategory="Header" />}
                            </BlocksProvider>
                        </div>
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    {/* <StylesProvider>{(props) => <ConditionStyleManager {...props} />}</StylesProvider> */}

                    <div className="general_menu__nav__row">Menu color</div>
                    <div className="general_menu__nav__row">
                        <TransitionColorPicker
                            fromColor="rgba(241, 34, 7, 0.93)"
                            toColor="rgba(75, 69, 70, 0.65)"
                            initialTransitionLength={transitionLength}
                            onColorCopied={navColor}
                        />
                    </div>
                    <div className="general_menu__nav__row">Menu text color</div>
                    <div className="general_menu__nav__row">
                        <TransitionColorPicker
                            fromColor="rgba(14, 13, 13, 0.12)"
                            toColor="rgba(14, 13, 13, 0.98)"
                            initialTransitionLength={transitionLength}
                            onColorCopied={navTextColor}
                        />
                    </div>
                </div>
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">Header color</div>
                    <div className="general_menu__nav__row">
                        <TransitionColorPicker
                            fromColor="rgba(241, 34, 7, 0.93)"
                            toColor="rgba(75, 69, 70, 0.65)"
                            initialTransitionLength={transitionLength}
                            onColorCopied={headerColor}
                        />
                    </div>
                    <div className="general_menu__nav__row">Header text color</div>
                    <div className="general_menu__nav__row">
                        <TransitionColorPicker
                            fromColor="rgba(14, 13, 13, 0.12)"
                            toColor="rgba(14, 13, 13, 0.98)"
                            initialTransitionLength={transitionLength}
                            onColorCopied={headerTextColor}
                        />
                    </div>
                </div>

                {/* Додаткові меню можуть мати свої підменю */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        <div className="general_menu__nav__row" onClick={handleImageBackground}>
                            <button>Set image background</button>
                        </div>
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row"> item </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderSubMenu;
