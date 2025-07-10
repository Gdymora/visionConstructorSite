import { useState, useEffect } from 'react';
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
import HeaderSubMenu from './HeaderSubMenu';
import ModalCustom from '../../partial/ModalCustom';

// Додаємо імпорти з BackgroundSubMenu для дизайн інструментів
import GradientGenerator from '../partial/GradientGenerator';
import { CardAnimator } from '../partial/CardAnimator';
import GradientRandomGenerator from '../partial/GradientRandomGenerator';
import GradientSvgGridEditor from '../partial/GradientSvgGridEditor';
import SvgBlobGenerator from '../partial/SvgBlobGenerator';
import SvgIconEditor from '../partial/SvgIconEditor/SvgIconEditor';
import TextEffectGenerator from '../partial/SvgText/TextEffectGenerator';

// Додаємо імпорти для Project Controls
import SaveProjectDialog from '../../Dashboard/SaveProjectDialog';
import ModalYesOrNot from '../../partial/ModalYesOrNot';
import MenuProject from './MenuProject';
import ProjectResourcesManager from '../../../components/ProjectResourcesManager';
import DeploymentPanel from '../../../components/DeploymentPanel';
import useAxios from '../../../Hooks/useAxios';
import JsonProjectService from '../../../services/JsonProjectService';
import useProjectJson from '../../../Hooks/useProjectJson';
import { useDispatch } from 'react-redux';
import { setProject } from '../../../store/slices/projectSlice';
import { setProjects as setProjectsAction } from '../../../store/slices/projectsSlice';
import { addProjectNameToUrl, getHashUrl } from '../../../utils/getHashUrl';
import Swal from 'sweetalert2';

const apiUrl = process.env.REACT_APP_API_URL;
const generateUrl = process.env.REACT_APP_GENERATE_URL;

const TemplateSubMenu = () => {
    const { setWidth } = useWidth();
    const [windowIds, setWindowIds] = useState([]);
    const [activeSubmenuWin, setActiveSubmenuWin] = useState({});
    const [headerModalVisible, setHeaderModalVisible] = useState(false);

    // Design Tools States (з BackgroundSubMenu)
    const [gradientVisible, setGradientVisible] = useState(false);
    const [animationCardsVisible, setAnimationCardsVisible] = useState(false);
    const [gradientRandomVisible, setGradientRandomVisible] = useState(false);
    const [gradientSVGVisible, setGradientSVGVisible] = useState(false);
    const [gradientSVGBlobVisible, setGradientSVGBlobVisible] = useState(false);
    const [svgIconEditorVisible, setSvgIconEditorVisible] = useState(false);
    const [textEffectGeneratorVisible, setTextEffectGeneratorVisible] = useState(false);

    // Project Controls States
    const editor = (window as any).editor;
    const dispatch = useDispatch();
    
    const [isOpen, setIsOpen] = useState(false);
    const { sendRequest, data, error } = useAxios(`${apiUrl}/projects`);
    const { sendRequest: sendRequestSave, data: dataSave, error: errorSave } = useAxios(null);
    const { sendRequest: sendRequestDelete, data: dataDelete, error: errorDelete } = useAxios(null);
    const [token, setToken] = useState('');
    const [projects, setProjects] = useState(null);
    const [projectNow, setProjectNow] = useState(null);
    
    // Ініціалізуємо useProjectJson після setProjectNow
    const { setProjectJson } = useProjectJson(setProjectNow);
    const [projectIdDelete, setProjectIdDelete] = useState(null);
    const [isOpenYes, setIsOpenYes] = useState(false);
    const [showProject, setShowProject] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showDeploy, setShowDeploy] = useState(false);

    const handleWidthChange = (newWidth) => {
        setWidth(newWidth);
    };

    const screenWidth = window.innerWidth;
    const windowWidth = 400;
    const horizontalSpacing = 20;
    const initialPosX = screenWidth - windowWidth - 50;
    const initialPosY = 2 * (windowWidth + horizontalSpacing);

    const hasSVG = {
        layer: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="white" d="M.011 0v8.406H8.61V0zm15.39 0v8.406H24V0z"/></svg>',
        style: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32"><path fill="white" d="M16.19 29.434c3.063-10.949 2.974-11 5.187-18.806l.532.308c.29.166.526.029.526-.3V6.908"/></svg>',
        pages: '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6"><path d="M7 18h7m-7-4h1m-1-4h3M7 2h9.5L21 6.5V19"/></g></svg>',
    };

    // Дані для анімації карток
    const cardsData = [
        {
            title: "Безшовна інтеграція з Blender",
            description: "Імпортуйте свої 3D-ресурси безпосередньо з Blender на нашу платформу.",
            backTitle: "Додаткова інформація",
            backDescription: "Наша інтеграція з Blender зберігає всі матеріали та текстури.",
        },
        {
            title: "Безшовна інтеграція з Blender",
            description: "Імпортуйте свої 3D-ресурси безпосередньо з Blender на нашу платформу.",
            backTitle: "Додаткова інформація",
            backDescription: "Наша інтеграція з Blender зберігає всі матеріали та текстури.",
        },
        {
            title: "Безшовна інтеграція з Blender",
            description: "Імпортуйте свої 3D-ресурси безпосередньо з Blender на нашу платформу.",
            backTitle: "Додаткова інформація",
            backDescription: "Наша інтеграція з Blender зберігає всі матеріали та текстури.",
        },
    ];

    // Project Management Functions
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        if (token) {
            sendRequest('get', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
    }, []);

    useEffect(() => {
        if (projectNow) {
            dispatch(setProject(projectNow));
        }
    }, [projectNow, dispatch]);

    useEffect(() => {
        if (dataSave) {
            Swal.fire({
                icon: 'success',
                title: 'Project Saved',
                text: 'Your project has been successfully saved!',
            });
        }
        if (dataDelete) {
            Swal.fire({
                icon: 'success',
                title: 'Project Deleted',
                text: 'Your project has been successfully deleted!',
            });
            const updatedProjects = projects.filter(project => project.id !== projectIdDelete);
            setProjects(updatedProjects);
        }
    }, [dataSave, dataDelete, projects, projectIdDelete]);

    useEffect(() => {
        if (data) {
            setProjects(data);
            dispatch(setProjectsAction(data));
            const projectNameUrl = getHashUrl();
            if (projectNameUrl && data) {
                const nowProjects = data.filter(project => project.name === projectNameUrl)[0];
                if (nowProjects) {
                    const jsonData = JSON.parse(nowProjects.project_data).json;
                    setProjectNow({
                        id: nowProjects.id,
                        name: nowProjects.name,
                        json: jsonData,
                    });
                }
            }
        }
    }, [data, dispatch]);

    const setNewProjectAsNowProject = (project) => {
        const jsonData = JSON.parse(project.project_data).json;
        if (jsonData) {
            setProjectNow({ id: project.id, name: project.name, json: jsonData });
            setProjects((prevProjects) => [...prevProjects, project]);
            addProjectNameToUrl(project.name);
        }
    };

    const saveProjectClick = () => {
        const projectdataSave = JsonProjectService.getProjectJson(editor);
        const updatedProjects = projects.map((project) => {
            if (project.id === projectNow.id) {
                return {
                    ...project,
                    project_data: JSON.stringify(projectdataSave, null, 0),
                };
            }
            return project;
        });

        setProjects(updatedProjects);
        const url = `${apiUrl}/projects/${projectNow.id}`;
        if (projectdataSave && projectNow) {
            sendRequestSave('patch', 
                { name: projectNow.name, project_data: projectdataSave }, 
                { headers: { Authorization: `Bearer ${token}` } }, 
                url
            );
        }
    };

    const viewProject = () => {
        if (typeof projectNow.json === 'string') {
            try {
                projectNow.json = JSON.parse(projectNow.json);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        }
        const url = `${generateUrl}/${projectNow.id}${projectNow.json[0].name}`;
        window.open(url, '_blank');
    };

    const deleteProjectClick = (projectId) => {
        if (projectId) {
            setProjectIdDelete(projectId);
            const url = `${apiUrl}/projects/${projectId}`;
            sendRequestDelete('delete', {}, 
                { headers: { Authorization: `Bearer ${token}` } }, 
                url
            );
        }
    };

    const handleProjectClick = (projectId) => {
        const selectedProject = projects.find(project => project.id === projectId);
        if (!selectedProject) return;

        try {
            let jsonData;
            const projectData = selectedProject.project_data;
            
            if (typeof projectData === 'string') {
                jsonData = JSON.parse(projectData).json;
            } else {
                jsonData = projectData.json;
            }

            const project = setProjectJson(editor, jsonData, projectId);
            if (project) {
                setProjectNow((prevProjectNow) => ({
                    ...prevProjectNow,
                    id: selectedProject.id,
                    name: selectedProject.name,
                }));
            }
        } catch (error) {
            console.error('Error handling project click:', error);
        }
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

    const closeHeaderModal = () => setHeaderModalVisible(false);

    return (
        <>
            {/* Photoshop Style Menu - Адаптивний з скролингом */}
            <div className="bg-gray-100 border-b border-gray-300 p-2 overflow-x-auto">
                <div className="flex items-center gap-4 min-w-max">
                    
                    {/* Device Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">📱</span>
                        <DevicesProvider>
                            {({ selected, select, devices }) => (
                                <div className="flex items-center gap-1">
                                    {devices.map((device) => (
                                        <button
                                            key={device.id}
                                            onClick={() => select(String(device.id))}
                                            className={`p-1 rounded border transition-colors ${
                                                selected === device.id
                                                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                            title={device.getName()}
                                        >
                                            {String(device.id) === 'desktop' && '🖥️'}
                                            {String(device.id) === 'tablet' && '📱'}
                                            {String(device.id) === 'mobile' && '📲'}
                                            {!['desktop', 'tablet', 'mobile'].includes(String(device.id)) && '📺'}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </DevicesProvider>
                        <BodyStyle />
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Capture Section with Icons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">📸</span>
                        <div className="flex items-center gap-1">
                            <ScreenshotComponent />
                            <ScreenshotImageComponent />
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Zoom Section with Compact Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">🔍</span>
                        <WithEditor>
                            <div className="zoom-compact">
                                <CanvasZoom />
                            </div>
                        </WithEditor>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Tools Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">🔧</span>
                        <WithEditor>
                            <div className="tools-compact">
                                <TopbarButtons className="flex gap-1" />
                            </div>
                        </WithEditor>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Canvas Width Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">📐</span>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => handleWidthChange('70%')}
                                className="px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 border rounded transition-colors"
                                title="70% Width"
                            >
                                70%
                            </button>
                            <button 
                                onClick={() => handleWidthChange('90%')}
                                className="px-2 py-1 text-xs bg-green-50 hover:bg-green-100 border rounded transition-colors"
                                title="90% Width"
                            >
                                90%
                            </button>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Panels Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">🪟</span>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => toggleSubmenuWin('layer')} 
                                className="px-2 py-1 text-xs bg-purple-50 hover:bg-purple-100 border rounded transition-colors"
                                title="Layers Panel"
                            >
                                📚
                            </button>
                            
                            <button 
                                onClick={() => toggleSubmenuWin('style')} 
                                className="px-2 py-1 text-xs bg-pink-50 hover:bg-pink-100 border rounded transition-colors"
                                title="Styles Panel"
                            >
                                🎨
                            </button>
                            
                            <button 
                                onClick={() => toggleSubmenuWin('pages')} 
                                className="px-2 py-1 text-xs bg-yellow-50 hover:bg-yellow-100 border rounded transition-colors"
                                title="Pages Panel"
                            >
                                📑
                            </button>
                            
                            <button 
                                onClick={() => setHeaderModalVisible(true)} 
                                className="px-2 py-1 text-xs bg-orange-50 hover:bg-orange-100 border rounded transition-colors"
                                title="Header Editor"
                            >
                                🗂️
                            </button>
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-6 bg-gray-300 flex-shrink-0"></div>

                    {/* Design Tools Section */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-gray-600">✨</span>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setGradientVisible(true)}
                                className="px-2 py-1 text-xs bg-red-50 hover:bg-red-100 border rounded transition-colors"
                                title="Gradient Generator"
                            >
                                🌈
                            </button>
                            
                            <button 
                                onClick={() => setGradientRandomVisible(true)}
                                className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 border rounded transition-colors"
                                title="Random Gradient"
                            >
                                🎲
                            </button>
                            
                            <button 
                                onClick={() => setAnimationCardsVisible(true)}
                                className="px-2 py-1 text-xs bg-cyan-50 hover:bg-cyan-100 border rounded transition-colors"
                                title="Card Animation"
                            >
                                💫
                            </button>
                            
                            <button 
                                onClick={() => setGradientSVGBlobVisible(true)}
                                className="px-2 py-1 text-xs bg-purple-50 hover:bg-purple-100 border rounded transition-colors"
                                title="SVG Blob Generator"
                            >
                                🔵
                            </button>
                            
                            <button 
                                onClick={() => setSvgIconEditorVisible(true)}
                                className="px-2 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 border rounded transition-colors"
                                title="SVG Icon Editor"
                            >
                                🔷
                            </button>
                            
                            <button 
                                onClick={() => setTextEffectGeneratorVisible(true)}
                                className="px-2 py-1 text-xs bg-teal-50 hover:bg-teal-100 border rounded transition-colors"
                                title="Text Effects"
                            >
                                🎯
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Project Management Modals */}
            {isOpen && (
                <SaveProjectDialog
                    closeModal={() => setIsOpen(false)}
                    setNowProject={setNewProjectAsNowProject}
                />
            )}

            {showProject && (
                <ModalCustom
                    isOpen={showProject}
                    closeModal={() => setShowProject(false)}
                    text={{ title: "Open Project" }}
                >
                    <MenuProject
                        projects={projects}
                        projectNow={projectNow}
                        onProjectSelect={handleProjectClick}
                        onOpenModalYes={(projectId) => {
                            setProjectIdDelete(projectId);
                            setIsOpenYes(true);
                        }}
                        saveProjectClick={saveProjectClick}
                        viewProject={viewProject}
                    />
                </ModalCustom>
            )}

            {isOpenYes && (
                <ModalYesOrNot
                    closeModal={() => setIsOpenYes(false)}
                    handleButtonClick={() => {
                        if (projectIdDelete) {
                            deleteProjectClick(projectIdDelete);
                            setProjectNow(null);
                        }
                        setIsOpenYes(false);
                    }}
                    text={{
                        head: "Delete a project",
                        title: "Do you want to delete a project?",
                    }}
                />
            )}

            {showSettings && (
                <ModalCustom
                    isOpen={showSettings}
                    closeModal={() => setShowSettings(false)}
                    text={{ title: "Project Settings" }}
                >
                    <ProjectResourcesManager projectId={projectNow?.id} />
                </ModalCustom>
            )}

            {showDeploy && (
                <ModalCustom
                    isOpen={showDeploy}
                    closeModal={() => setShowDeploy(false)}
                    text={{ title: "Deploy Project" }}
                >
                    <DeploymentPanel projectId={projectNow?.id} />
                </ModalCustom>
            )}

            {/* Design Tools Modals */}
            {gradientVisible && (
                <ModalCustom 
                    isOpen={gradientVisible} 
                    closeModal={() => setGradientVisible(false)} 
                    text={{ title: "Gradient Generator" }} 
                    maxW={"max-w-6xl"}
                >
                    <GradientGenerator />
                </ModalCustom>
            )}

            {gradientRandomVisible && (
                <ModalCustom 
                    isOpen={gradientRandomVisible} 
                    closeModal={() => setGradientRandomVisible(false)} 
                    text={{ title: "Random Gradient Generator" }} 
                    maxW={"max-w-6xl"}
                >
                    <GradientRandomGenerator />
                </ModalCustom>
            )}

            {animationCardsVisible && (
                <ModalCustom 
                    isOpen={animationCardsVisible} 
                    closeModal={() => setAnimationCardsVisible(false)} 
                    text={{ title: "Card Animation" }} 
                    maxW={"max-w-6xl"}
                >
                    <CardAnimator
                        cards={cardsData}
                        initialStyles={{
                            duration: 1.5,
                            distance: 400,
                        }}
                        onStylesChange={(styles) => console.log("Styles changed:", styles)}
                    />
                </ModalCustom>
            )}

            {gradientSVGVisible && (
                <ModalCustom 
                    isOpen={gradientSVGVisible} 
                    closeModal={() => setGradientSVGVisible(false)} 
                    text={{ title: "SVG Grid Editor" }} 
                    maxW={"max-w-6xl"}
                >
                    <GradientSvgGridEditor />
                </ModalCustom>
            )}

            {gradientSVGBlobVisible && (
                <ModalCustom 
                    isOpen={gradientSVGBlobVisible} 
                    closeModal={() => setGradientSVGBlobVisible(false)} 
                    text={{ title: "SVG Blob Generator" }} 
                    maxW={"max-w-8xl"}
                >
                    <SvgBlobGenerator />
                </ModalCustom>
            )}

            {svgIconEditorVisible && (
                <ModalCustom 
                    isOpen={svgIconEditorVisible} 
                    closeModal={() => setSvgIconEditorVisible(false)} 
                    text={{ title: "SVG Icon Editor" }} 
                    maxW={"max-w-8xl"}
                >
                    <SvgIconEditor />
                </ModalCustom>
            )}

            {textEffectGeneratorVisible && (
                <ModalCustom 
                    isOpen={textEffectGeneratorVisible} 
                    closeModal={() => setTextEffectGeneratorVisible(false)} 
                    text={{ title: "Text Effect Generator" }} 
                    maxW={"max-w-8xl"}
                >
                    <TextEffectGenerator />
                </ModalCustom>
            )}

            {/* Header Modal */}
            {headerModalVisible && (
                <ModalCustom
                    isOpen={headerModalVisible}
                    closeModal={closeHeaderModal}
                    text={{ title: "Header Editor" }}
                    maxW={"max-w-6xl"}
                >
                    <WithEditor>
                        <HeaderSubMenu />
                    </WithEditor>
                </ModalCustom>
            )}

            {/* Windows for panels */}
            {['layer', 'style', 'pages'].map((menu, index) => (
                activeSubmenuWin[menu] && (
                    <Window
                        key={menu}
                        title={menu}
                        initialPos={{ x: initialPosX, y: initialPosY, zIndex: 2 + index }}
                        onClose={() => closeWindow(menu)}
                        hasSVG={hasSVG[menu]}
                    >
                        {menu === 'layer' && (
                            <LayersProvider>{(props) => <CustomLayerManager {...props} />}</LayersProvider>
                        )}
                        {menu === 'style' && (
                            <>
                                <SelectorsProvider>{(props) => <CustomSelectorManager {...props} />}</SelectorsProvider>
                                <StylesProvider>{(props) => <CustomStyleManager {...props} />}</StylesProvider>
                            </>
                        )}
                        {menu === 'pages' && (
                            <PagesProvider>{(props) => <CustomPageManager {...props} />}</PagesProvider>
                        )}
                    </Window>
                )
            ))}
        </>
    );
};

export default TemplateSubMenu;