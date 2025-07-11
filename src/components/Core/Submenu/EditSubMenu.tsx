import { useState } from 'react';

const EditSubMenu = () => {
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
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                Default
                            </button>
                            <button
                                type="button"
                                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Alternative
                            </button>
                            <button
                                type="button"
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            >
                                Dark
                            </button>
                            <button
                                type="button"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                Light
                            </button>
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                                Green
                            </button>
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Red
                            </button>
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                            >
                                Yellow
                            </button>
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            >
                                Purple
                            </button>
                        </div>
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

export default EditSubMenu;
