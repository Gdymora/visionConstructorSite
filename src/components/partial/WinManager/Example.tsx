import { useState } from 'react';
import block3 from '../../../assets/images/block3.png';
import block1 from '../../../assets/images/block1.png';
import TopbarButtons from '../../TopbarButtons';
import { LayersProvider, DevicesProvider, PagesProvider, SelectorsProvider, StylesProvider, WithEditor } from '@grapesjs/react';
import { FormControl, MenuItem, Select } from '@mui/material';
import BodyStyle from '../partial/BodyStyle';
import ScreenshotComponent from '../../partial/ScreenshotComponent';

import CanvasZoom from '../partial/CanvasZoom'; 
import CustomSelectorManager from '../../CustomSelectorManager';
import CustomStyleManager from '../../CustomStyleManager';
import CustomPageManager from '../../CustomPageManager';
import Window from '../../partial/WinManager/Window';
import { useWidth } from '../../../providers/WidthProvider';
import ScreenshotImageComponent from '../../partial/ScreenShotImageComponent'; 
import CustomLayerManager from '../../CustomLayerManager';

const TemplateSubMenu = () => {
    const { setWidth } = useWidth();

    const handleWidthChange = (newWidth) => {
        setWidth(newWidth);
    };

    const screenWidth = window.innerWidth;
    const windowWidth = 400;
    const horizontalSpacing = 20;

    const initialPosX = screenWidth - windowWidth - 50;
    const initialPosY = 2 * (windowWidth + horizontalSpacing);

    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [windowIds, setWindowIds] = useState([]);
    const [activeSubmenuWin, setActiveSubmenuWin] = useState({});
    const hasSVG = {
        blocks: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M.011 0v8.406H8.61V0zm15.39 0v8.406H24V0zM8.972.658l.012 7.869l2.54 2.43l.007-5.564zm6.066 0l-2.555 4.735l.004 5.564l2.54-2.43zM.332 8.768l5.52 2.677l5.655-.006l-2.773-2.67zm14.944 0L12.53 11.49l5.655-.09l5.498-2.631zm-9.323 3.855L.318 15.232h8.405l2.748-2.722zm6.565-.113l2.747 2.722h8.402l-5.586-2.609zm-1.006.533l-2.54 2.43l-.011 7.873l2.555-4.74zm.964 0l-.008 5.564l2.559 4.74l-.011-7.874zM0 15.598V24h8.598v-8.402zm15.39 0V24h8.598v-8.402z"/></svg>',
        style: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="white" d="M16.19 29.434c3.063-10.949 2.974-11 5.187-18.806l.532.308c.29.166.526.029.526-.3V6.908c.588-2.057 1.047-3.647 1.183-4.123h2.4L30 6.474l-2.617 2.261l1.979 2.14l-13.04 18.559c-.063.105-.152.081-.132 0m1.425-23.6c.119 0 .214.065.214.147v1.906c0 .08-.1.145-.214.145h-3.22c-.119 0-.215-.065-.215-.146V5.978c0-.081.1-.147.214-.147h3.221Zm3.976-2.114l-3.543 2.046a.4.4 0 0 1 .066.213v1.909a.4.4 0 0 1-.1.259l3.579 2.066c.244.141.444.026.444-.255V3.976c-.003-.282-.202-.397-.446-.256M13.9 7.888v-1.91a.4.4 0 0 1 .066-.213l-3.549-2.046c-.244-.14-.444-.025-.444.256v5.981c0 .281.2.4.445.255L14 8.146a.4.4 0 0 1-.1-.259Zm1.783 21.546h.132c-3.062-10.949-2.974-11-5.187-18.806l-.532.308c-.289.166-.526.029-.526-.3V6.908c-.594-2.056-1.053-3.647-1.189-4.123h-2.4L2 6.474l2.616 2.261l-1.979 2.141Zm.217-17.417a.967.967 0 1 0-.967-.967a.967.967 0 0 0 .967.967m0 5.75a.967.967 0 1 0-.967-.967a.967.967 0 0 0 .967.968Zm0 5.752a.967.967 0 1 0-.967-.967a.967.967 0 0 0 .967.968Z"/></svg>',
        pages: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"><path d="M7 18h7m-7-4h1m-1-4h3M7 2h9.5L21 6.5V19"/><path d="M3 20.5v-14A1.5 1.5 0 0 1 4.5 5h9.752a.6.6 0 0 1 .424.176l3.148 3.148A.6.6 0 0 1 18 8.75V20.5a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 3 20.5"/><path d="M14 5v3.4a.6.6 0 0 0 .6.6H18"/></g></svg>',
    };
    const toggleSubmenu = (menu) => {
        setActiveSubmenu(activeSubmenu === menu ? null : menu);
    };

    const toggleSubmenuWin = (menu) => {
        const newWindowIds = [...windowIds, menu];
        setActiveSubmenuWin((prevSubmenus) => ({
            ...prevSubmenus,
            [menu]: true,
        }));
        setWindowIds(newWindowIds);
    };

    const closeWindow = (id) => {
        setActiveSubmenuWin((prevSubmenus) => ({
            ...prevSubmenus,
            [id]: false,
        }));
        setWindowIds(windowIds.filter((windowId) => windowId !== id));
    };

    return (
        <div className="general_menu__nav">
            <div className="general_menu__nav__row">
                {/* Цей рядок може містити кілька підменю, кожне з унікальним ідентифікатором */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        {Array.from({ length: 3 }, (_, i) => (
                            <li key={i}>
                                <button onClick={() => toggleSubmenu(`menu${i}`)} className="but_submenu">
                                    Menu
                                </button>
                                <div className="submenu_col" style={{ display: activeSubmenu === `menu${i}` ? 'flex' : 'none' }}>
                                    <div className="sub-column">Option 1</div>
                                    {i === 1 ? <div className="sub-column">Option 2</div> : null}
                                </div>
                            </li>
                        ))}
                    </div>
                    <div className="general_menu__nav__row" style={{ backgroundColor: 'white' }}>
                        <div className="carus">
                            <div className="carus__col">
                                <img src={block3} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block1} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block3} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block1} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block3} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block1} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block3} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block1} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block3} alt="" />
                            </div>
                            <div className="carus__col">
                                <img src={block1} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        <div className="grid grid-cols-2 gap-4">
                            <DevicesProvider>
                                {({ selected, select, devices }) => (
                                    <FormControl size="small">
                                        <Select value={selected} onChange={(ev) => select(ev.target.value)}>
                                            {devices.map((device) => (
                                                <MenuItem value={device.id} key={device.id}>
                                                    {device.getName()}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}
                            </DevicesProvider>
                            <BodyStyle />
                        </div>{' '}
                    </div>

                    <div className="mt-3 general_menu__nav__row grid grid-cols-2 gap-4">
                        <ScreenshotComponent />
                        <ScreenshotImageComponent />
                        <WithEditor>
                            <CanvasZoom />
                        </WithEditor>
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        <WithEditor>
                            <TopbarButtons className="ml-auto px-2  grid grid-cols-6" />
                        </WithEditor>
                    </div>
                </div>
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        <button onClick={() => handleWidthChange('70%')}>Змінити ширину на 70%</button>
                        <button onClick={() => handleWidthChange('90%')}>Змінити ширину на 90%</button>
                    </div>
                </div>

                {/* Додаткові меню можуть мати свої підменю */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        {['layer', 'style', 'pages'].map((menu, index) => (
                            <li key={menu}>
                                <button onClick={() => toggleSubmenuWin(menu)} className="but_submenu">
                                    {menu}
                                </button>
                                <div style={{ display: activeSubmenuWin[menu] ? 'flex' : 'none' }}>
                                    {menu === 'layer' && (
                                        <Window
                                            key={menu}
                                            title={menu}
                                            initialPos={{ x: initialPosX, y: initialPosY, zIndex: 2 + index }}
                                            onClose={() => closeWindow(menu)}
                                            hasSVG={hasSVG[menu]}
                                        >
                                            <LayersProvider>{(props) => <CustomLayerManager {...props} />}</LayersProvider>
                                        </Window>
                                    )}
                                    {menu === 'style' && (
                                        <Window
                                            key={menu}
                                            title={menu}
                                            initialPos={{ x: initialPosX, y: initialPosY, zIndex: 2 + index }}
                                            onClose={() => closeWindow(menu)}
                                            hasSVG={hasSVG[menu]}
                                        >
                                            <SelectorsProvider>{(props) => <CustomSelectorManager {...props} />}</SelectorsProvider>
                                            <StylesProvider>{(props) => <CustomStyleManager {...props} />}</StylesProvider>
                                        </Window>
                                    )}
                                    {menu === 'pages' && (
                                        <Window
                                            key={menu}
                                            title={menu}
                                            initialPos={{ x: initialPosX, y: initialPosY, zIndex: 2 + index }}
                                            onClose={() => closeWindow(menu)}
                                            hasSVG={hasSVG[menu]}
                                        >
                                            <PagesProvider>{(props) => <CustomPageManager {...props} />}</PagesProvider>
                                        </Window>
                                    )}
                                </div>
                            </li>
                        ))}
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        {/*   <BlocksProvider>{(props) => <CustomSubmenuBlockManager {...props} />}</BlocksProvider> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateSubMenu;
