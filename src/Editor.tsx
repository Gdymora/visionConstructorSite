import GjsEditor, { ModalProvider } from "@grapesjs/react";
import grapesjs from "grapesjs";
import type { Editor, EditorConfig } from "grapesjs";
import customCodePlugin from "grapesjs-custom-code";
import gtManager from "grapesjs-project-manager";
import "grapesjs/dist/css/grapes.min.css";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import formPlugin from "grapesjs-plugin-forms";
import CustomModal from "./components/CustomModal";
import "grapesjs/dist/css/grapes.min.css";

import "./assets/style/style.css";
// import pluginTooltip from "grapesjs-tooltip";
// import scriptEditor from 'grapesjs-script-editor';
// import pluginExport from "grapesjs-plugin-export";
// import pluginImageEditor from "grapesjs-tui-image-editor";

import scriptEditor from "./module/script-editor-master";
import htmlEditor from "./module/content-editor-master";
import exportZip from "./module/export-zip";
import imageEditor from "./module/image-editor";
import touchMobile from "./module/touch-master";
import deployToServer from "./module/deploy-to-server";

import { registerBlocks } from "./blocks/registerBlocks";
import { PluginsBasicComponents } from "./plugins/PluginsBasicComponents";
import { PluginsImageComponents } from "./plugins/PluginsImageComponents";
import { PluginsReactComponents } from "./plugins/PluginsReactComponents";
import { PluginsScriptComponents } from "./plugins/PluginsScriptComponents";
import { PluginsLayoutComponents } from "./plugins/PluginsLayoutComponents";
import { PluginsFetchComponents } from "./plugins/FetchComponents";
import { PluginsIdeasComponents } from "./plugins/PluginsIdeasComponents";

import Application from "./components/Core/Application";
import Tailwind from "./plugins/Tailwind";
import { useAuth } from "./components/Auth/AuthProvider";
import { useEffect } from "react";
const apiURl = process.env.REACT_APP_API_URL;

const getGjsOptions = (authToken) => ({
  height: "80vh",
  protectedCss: "",
  //protectedCss: "* { box-sizing: border-box; } body {margin: 0;}",
  canvasCss: `.gjs-selected{outline: 2px solid #61707c !important; outline-offset: -2px; } .gjs-layer.gjs-hovered .gjs-layer-item{background-color:#61707c !important;}`,
  // Usually when you update the `style` of the component this changes the
  // element's `style` attribute. Unfortunately, inline styling doesn't allow
  // use of media queries (@media) or even pseudo selectors (eg. :hover).
  // When `avoidInlineStyle` is true all styles are inserted inside the css rule

  avoidInlineStyle: true,
  /* avoidInlineStyle: true — стилі не будуть додаватися в атрибут style,
   а натомість будуть генеруватися як окремі CSS правила */
  allowScripts: 1,
  storageManager: {
    type: "rest-api",
    stepsBeforeSave: 10,
    autosave: true,
    autoload: true,
    options: {
      remote: {
        urlStore: `${apiURl}/pages-constructor`,
        urlLoad: `${apiURl}/pages-constructor`,
        fetchOptions: (opts) =>
          opts.method === "POST" ? { method: "PATCH" } : {},
        onStore: (data) => ({ id: "projectID", data }),
        onLoad: (result) => result.data,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      params: {
        "Access-Control-Allow-Origin": apiURl,
        "User-Agent": apiURl,
      },

      contentTypeJson: true,
      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,
      json_encode: {
        components: [],
        css: [],
        html: [],
        style: [],
      },
    },
  },

  undoManager: { trackSelection: false },
  selectorManager: { componentFirst: true },
  blockManager: {},
  assetManager: {
    embedAsBase64: true,
    upload: "assets/tmp",
    assets: [],
    headers: {},
    params: {},
    credentials: "include",
    autoAdd: true,
    dropzone: false,
    openAssetsOnDrop: true,
    multiUpload: true,
    showUrlInput: true,
    // https://blog.webnersolutions.com/adding-image-upload-feature-in-grapesjs-editor/
    uploadFile: function (e) {
      const fileData = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      const formData = new FormData();
      formData.append("titleData", "");
      if (fileData) {
        Array.from(fileData).forEach((file: any, index) => {
          formData.append(`fileData${index}`, file);
        });
      }
      fetch(`${apiURl}/user-file`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Access-Control-Allow-Origin": "https://vision.jdymora.com",
        },
        body: formData,
        credentials: "include", // Використовуйте це, якщо потрібно відправляти cookies з запитом
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Успішне завантаження:", data);
          if (typeof data["data"] != "undefined" && data != "null") {
            console.log(data["data"]);
            const assets = data["data"].map((asset) => ({
              ...asset,
              src: `${apiURl}/user-file/${asset.url}`,
            }));
            (window as any).editor.AssetManager.add(assets); //adding images to asset manager of GrapesJS
          }
        })
        .catch((error) => {
          console.error("Помилка при завантаженні:", error);
        });
    },
  },
  projectData: {
    assets: [],
    pages: [
      {
        name: "/home",
        component: `<h1>VisionExp React Custom UI</h1>`,
        css: "* { box-sizing: border-box; } body {margin: 0;}",
      },
    ],
    keepUnusedStyles: true, //all to save in one css
  },

  plugins: [
    PluginsBasicComponents,
    PluginsReactComponents,
    PluginsImageComponents,
    PluginsScriptComponents,
    PluginsLayoutComponents,
    PluginsFetchComponents,
    PluginsIdeasComponents,
    Tailwind,
  ],
  pluginsOpts: {
    "grapesjs-custom-code": {},
  },
  canvas: {
    scripts: [
      // "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      // "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
      "https://cdn.tailwindcss.com",
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js",
      "./js/myLibrary.js",
      "./js/script.js",
      // "https://cdn.jsdelivr.net/npm/@ckeditor/ckeditor5-build-classic@latest/build/ckeditor.js",
      "./js/ckeditor.js",
      "./js/moderndom-ckeditor-plugin.js",
      /* "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", */
    ],
    styles: [
      /*  "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css", */
      "https://www.w3schools.com/w3css/4/w3.css",
      "./css/style_modern.css",
      /*"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"*/
    ],
  },
});

const loadAssetsFromServer = async (editor, apiURl, authToken) => {
  try {
    const response = await fetch(`${apiURl}/user-file`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    const assets = data.map((asset) => ({
      type: asset.type, // 'image' або 'video'
      src: `${apiURl}/user-file/${asset.url}`, // URL до активу
      name: asset.title, // Ім'я активу
    }));
    editor.AssetManager.add(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
  }
};

const gradintAddStyle = (editor) => {
  editor.StyleManager.addProperty("decorations", {
    name: "Gradient",
    property: "background-image",
    type: "gradient",
    defaults: "none",
  });
};

export default function App() {
  const onEditor = async (editor: Editor) => {
    (window as any).editor = editor;
    registerBlocks(editor);
    await loadAssetsFromServer(
      editor,
      process.env.REACT_APP_API_URL,
      authToken
    );
    gradintAddStyle(editor); //linear-gradient(90deg, rgb(0, 255, 205) 1%, rgb(227, 162, 220) 99%)
    // const head = editor.Canvas.getDocument().head;
    // head.insertAdjacentHTML('beforeend', `<script src="./assest/js/myLibrary.js"></script>`);

    // Застосовуємо CSS при завантаженні проекту
    const css = `* { box-sizing: border-box; } body {margin: 0;}`;

    // Застосовуємо CSS при створенні нової сторінки
    editor.on("page:add", () => {
      editor.CssComposer.addRules(css);
    });
  
  };
  const { authToken, setAuthToken } = useAuth();

  useEffect(() => {
    console.log("Editor");
  }, []);

  return (
    //ref https://nhn.github.io/tui.image-editor
    // @ts-ignore
    <GjsEditor
      className="text-white"
      grapesjs={grapesjs}
      options={getGjsOptions(authToken) as EditorConfig}
      plugins={[
        (editor) => htmlEditor(editor, {}),
        (editor) => scriptEditor(editor, {}),
        (editor) => exportZip(editor, {}),
        (editor) => deployToServer(editor, {}),
        (editor) => imageEditor(editor, {}),
        (editor) => touchMobile(editor),
        customCodePlugin,
        gtManager,
        gjsBlocksBasic,
        // formPlugin,
      ]}
      onEditor={onEditor}
    >
      <Application />
      <ModalProvider>
        {({ open, title, content, close }) => (
          <CustomModal
            open={open}
            title={title}
            children={content}
            close={close}
          />
        )}
      </ModalProvider>
    </GjsEditor>
  );
}
