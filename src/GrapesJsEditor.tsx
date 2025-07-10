import GjsEditor, { AssetsProvider, Canvas, ModalProvider } from "@grapesjs/react";
import grapesjs from "grapesjs";
import type { Editor, EditorConfig } from "grapesjs";
import customCodePlugin from "grapesjs-custom-code";
import plugintailwind from "grapesjs-tailwind";
import gtManager from "grapesjs-project-manager";
import "grapesjs/dist/css/grapes.min.css";

import gjsBlocksBasic from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MAIN_BORDER_COLOR } from "./components/common";
import CustomModal from "./components/CustomModal";
import CustomAssetManager from "./components/CustomAssetManager";
import Topbar from "./components/Topbar";
import RightSidebar from "./components/RightSidebar";
import "grapesjs/dist/css/grapes.min.css";
import "./assets/style/style.css"; 
import "css-tooltip/dist/css-tooltip.min.css";
import { registerBlocks } from "./blocks/registerBlocks";
import { PluginsBasicComponents } from "./plugins/PluginsBasicComponents";
import { PluginsImageComponents } from "./plugins/PluginsImageComponents";
import { PluginsReactComponents } from "./plugins/PluginsReactComponents";
import { PluginsScriptComponents } from "./plugins/PluginsScriptComponents";
import { PluginsTagComponents } from "./plugins/PluginsTagComponents";
import { PluginsLayoutComponents } from "./plugins/PluginsLayoutComponents";
import { PluginsFetchComponents } from "./plugins/FetchComponents";
//grapesjs-custom-code
const theme = createTheme({
  palette: {
    mode: "dark",
  },
});
const gjsOptions: EditorConfig = {
  height: "90vh",
  // storageManager: false,
  storageManager: {
    type: "indexeddb",
    /*  type: "rest-api",
    options: {
      remote: {
        urlStore: "http://127.0.0.1:8000/grapejs/save",
        urlLoad: "http://127.0.0.1:8000/grapejs/load",
      },
    },
    autosave: true,
    autoload: true,
    stepsBeforeSave: 1, */
  },
  undoManager: { trackSelection: false },
  // styleManager: { clearProperties: true },
  /* styleManager: {
    sectors: [{
        name: 'General',
        open: false,
        buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom']
      },{
        name: 'Dimension',
        open: false,
        buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
        properties: [{
          id: 'flex-width',
          type: 'integer',
          name: 'Width',
          units: ['px', '%'],
          property: 'flex-basis', 
        }]
    },{
      name: 'Decorations',
      open: false,
      buildProps: ['border-radius-c', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
    }]
  }, */
  // dragMode: "absolute", // 'absolute' | 'translate'
  selectorManager: { componentFirst: true },
  // traitManager: {custom: true,},
  blockManager: {},
  assetManager: {
    assets: [
      "http://placehold.it/350x250/78c5d6/fff/image1.jpg",
      // Pass an object with your properties
      {
        type: "image",
        src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
        height: 350,
        width: 250,
        name: "displayName",
      },
      {
        // As the 'image' is the base type of assets, omitting it will
        // be set as `image` by default
        src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
        height: 350,
        width: 250,
        name: "displayName",
      },
    ],
  },
  projectData: {
    assets: [
      "https://via.placeholder.com/350x250/78c5d6/fff",
      "https://via.placeholder.com/350x250/459ba8/fff",
      "https://via.placeholder.com/350x250/79c267/fff",
      "https://via.placeholder.com/350x250/c5d647/fff",
      "https://via.placeholder.com/350x250/f28c33/fff",
    ],
    pages: [
      {
        name: "/home",
        component: `<h1>VisionExp React Custom UI</h1>`,
      },
    ],
    keepUnusedStyles: true, //all to save in one css
  },

  plugins: [PluginsBasicComponents, PluginsReactComponents, PluginsImageComponents, PluginsScriptComponents, PluginsLayoutComponents, PluginsFetchComponents],
  pluginsOpts: {
    "grapesjs-custom-code": {
      // options
    },
  },
  canvas: {
    scripts: [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
      "https://cdn.tailwindcss.com",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js",
      /* "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", */
    ],
    styles: [
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
      "https://www.w3schools.com/w3css/4/w3.css",
      /*"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"*/
    ],
  },
};

export default function App() {
  const onEditor = (editor: Editor) => {
    (window as any).editor = editor;
    registerBlocks(editor);
  };
  return (
    // @ts-ignore
    <ThemeProvider theme={theme}>
      <GjsEditor
        className="gjs-custom-editor text-white bg-slate-900"
        grapesjs={grapesjs}
        options={gjsOptions}
        plugins={[ 
          /*   plugintailwind,gjsBlocksBasic ,  formPlugin,*/
          customCodePlugin,
          gtManager,
        ]}
        onEditor={onEditor}
      >
        <div className={`flex h-full border-t ${MAIN_BORDER_COLOR}`}>
          <div className="gjs-column-m flex flex-col flex-grow">
            <Topbar className="min-h-[48px]" />
            <Canvas className="flex-grow gjs-custom-editor-canvas" />
          </div>
          <RightSidebar className={`gjs-column-r w-[300px] border-l ${MAIN_BORDER_COLOR}`} />
        </div>
        <ModalProvider>{({ open, title, content, close }) => <CustomModal open={open} title={title} children={content} close={close} />}</ModalProvider>
        {/*  <AssetsProvider>
          {({ assets, select, close, Container }) => (
            <Container>
              <CustomAssetManager assets={assets} select={select} close={close} />
            </Container>
          )}
        </AssetsProvider> */}
      </GjsEditor>
    </ThemeProvider>
  );
}
