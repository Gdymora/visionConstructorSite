import { useState } from 'react';

const LayoutSubMenu = () => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const toggleSubmenu = (id) => {
        setActiveSubmenu(activeSubmenu === id ? null : id);
    };

    return (
        <ul className="general_menu__nav">
            <div className="general_menu__nav__row">
                {/* Цей рядок може містити кілька підменю, кожне з унікальним ідентифікатором */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                        {['blocks'].map((menu, index) => (
                            <li key={menu}>
                                <button onClick={() => toggleSubmenu(menu)} className="but_submenu">
                                    {menu}
                                </button>
{/* 
                                <div className="submenu_col" style={{ display: activeSubmenu === menu ? 'flex' : 'none' }}>
                                    {index === 0 ? <MenuProject /> : null}
                                </div> */}
                            </li>
                        ))}
                    </div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row">
                      
                    </div>

                    <div className="mt-3 general_menu__nav__row grid grid-cols-2 gap-4"></div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row"></div>
                </div>

                {/* Додаткові меню можуть мати свої підменю */}
                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row"></div>
                </div>

                <div className="general_menu__nav__column">
                    <div className="general_menu__nav__row"></div>
                </div>
            </div>
        </ul>
    );
};

export default LayoutSubMenu;
