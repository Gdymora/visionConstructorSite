import FileSaver from "file-saver";
import type { Editor, Plugin } from "grapesjs";
import JSZip from "jszip";
import ResourcesService from "../../services/ResourcesService";

export type RootType = Record<string, unknown>;

export type PluginOptions = {
  /**
   * Add a button inside the export dialog
   * @default true
   */
  addExportBtn?: boolean;

  /**
   * Label of the export button
   * @default 'Export to ZIP'
   */
  btnLabel?: string;

  /**
   * ZIP filename prefix
   * @default 'grapesjs_template'
   */
  filenamePfx?: string;

  /**
   * Use a function to generate the filename, eg. `filename: editor => 'my-file.zip',`
   */
  filename?: (editor: Editor) => string;

  /**
   * Callback to execute once the export is completed
   */
  done?: () => void;

  /**
   * Callback to execute on export error
   */
  onError?: (error: Error) => void;

  /**
   * Include active resources in the exported HTML head
   * @default true
   */
  includeResources?: boolean;

  /**
   * Extract JavaScript to separate files
   * @default true
   */
  extractJs?: boolean;

  /**
   * JavaScript placement strategy
   * 'head' - place script in head with DOMContentLoaded
   * 'body' - place script at the end of body
   * 'both' - use both strategies for maximum compatibility
   * @default 'both'
   */
  jsPlacement?: "head" | "body" | "both";

  /**
   * Use the root object to create the folder structure of your zip (async functions are supported)
   * @example
   * root: {
   *   css: {
   *     'style.css': ed => ed.getCss(),
   *     'some-file.txt': 'My custom content',
   *   },
   *   img: async ed => {
   *     const images = await fetchImagesByStructue(ed.getComponents());
   *     return images;
   *     // Where `images` is an object like this:
   *     // { 'img1.png': '...png content', 'img2.jpg': '...jpg content' }
   *   },
   *   'index.html': ed => `<body>${ed.getHtml()}</body>`
   * }
   */
  root?:
    | RootType
    | ((editor: Editor) => Promise<RootType>)
    | ((editor: Editor) => RootType);

  /**
   * Custom function for checking if the file content is binary
   */
  isBinary?: (content: string, name: string) => boolean;
};

// Функція для перетворення вбудованого JavaScript в самовиконуючийся код
const transformJavaScript = (js: string): string => {
  if (!js || !js.trim()) return "";

  try {
    // Перевіряємо, чи містить код типовий GrapesJS патерн
    const hasGrapesjsPattern =
      /var\s+items\s*=\s*document\.querySelectorAll\s*\(/i.test(js);

    if (hasGrapesjsPattern) {
      // Обгортаємо код DOMContentLoaded, щоб гарантувати виконання після завантаження DOM
      return `document.addEventListener('DOMContentLoaded', function() {
// Код згенерований GrapesJS, перенесений в DOMContentLoaded
${js}
});`;
    } else {
      // Якщо не містить шаблон GrapesJS, просто додаємо DOMContentLoaded
      return `document.addEventListener('DOMContentLoaded', function() {
${js}
});`;
    }
  } catch (error) {
    console.error("Error transforming JavaScript:", error);
    // У випадку помилки повертаємо оригінальний код
    return js;
  }
};

const plugin: Plugin<PluginOptions> = (editor, opts = {}) => {
  const pfx = editor.getConfig("stylePrefix");
  const commandName = "gjs-export-zip";

  // Функція для отримання всіх ресурсів з head
  const getResourcesHtml = (editor: Editor): string => {
    // Отримуємо всі ресурси з ResourcesService
    const resources = ResourcesService.getResources(editor);

    // Фільтруємо лише активні ресурси
    const activeResources = resources.filter((res) => res.is_active);

    // Перетворюємо їх на HTML-теги
    return activeResources
      .map((res) => {
        if (res.type === "script") {
          return `<script src="${res.url}"></script>`;
        } else if (res.type === "style") {
          return `<link rel="stylesheet" href="${res.url}">`;
        } else if (res.type === "font") {
          return `<link rel="stylesheet" href="${res.url}">`;
        }
        return "";
      })
      .join("\n    ");
  };

  // Функція для очищення HTML від вбудованих скриптів
  const cleanHtmlFromScripts = (html: string): string => {
    // Видаляємо всі теги <script> з HTML
    return html.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
  };

  // Функція для перевірки наявності CSS стилів
  const hasCss = (cssContent: string): boolean => {
    return cssContent && cssContent.trim().length > 0;
  };

  // Функція для перевірки наявності JavaScript коду
  const hasJs = (jsContent: string): boolean => {
    return jsContent && jsContent.trim().length > 0;
  };

  // Функція для створення HTML-файлу для певної сторінки
  const createPageHtml = (
    htmlContent: string,
    pageName: string,
    safePageName: string,
    includeCss: boolean,
    includeJs: boolean,
    cssPath: string,
    jsPath: string
  ): string => {
    // Очищаємо HTML від вбудованих скриптів якщо виносимо JS в окремий файл
    const cleanedHtml = includeJs
      ? cleanHtmlFromScripts(htmlContent)
      : htmlContent;

    // Отримуємо зовнішні ресурси
    const resourcesHtml = config.includeResources
      ? getResourcesHtml(editor)
      : "";

    // Додаємо посилання на CSS і JS якщо вони є
    const cssLink = includeCss
      ? `<link rel="stylesheet" href="${cssPath}">`
      : "";

    // Визначаємо розміщення JavaScript згідно з конфігурацією
    const jsPlacement = config.jsPlacement || "both";

    // Підготуємо теги скриптів залежно від конфігурації
    const headScript =
      includeJs && (jsPlacement === "head" || jsPlacement === "both")
        ? `<script src="${jsPath}"></script>`
        : "";

    const bodyScript =
      includeJs && (jsPlacement === "body" || jsPlacement === "both")
        ? `<script src="${jsPath}"></script>`
        : "";

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${pageName}</title>
  ${cssLink}
  ${resourcesHtml}
  ${headScript}
</head>
<body>
  ${cleanedHtml}
  ${bodyScript}
</body>
</html>`;
  };

  // Функція для створення безпечного імені файлу з назви сторінки
  const getSafeFileName = (pageName: string): string => {
    return (
      pageName
        .toLowerCase()
        .replace(/^\//g, "") // Видаляємо початковий слеш
        .replace(/\//g, "-") // Замінюємо слеші на дефіси
        .replace(/[^a-z0-9-]/g, "") // Видаляємо небезпечні символи
        .replace(/^-+|-+$/g, "") || // Видаляємо дефіси на початку і в кінці
      "page"
    ); // Якщо нічого не залишилося, використовуємо 'page'
  };

  const config: PluginOptions = {
    addExportBtn: true,
    btnLabel: "Export to ZIP",
    filenamePfx: "grapesjs_template",
    filename: undefined,
    done: () => {},
    onError: console.error,
    includeResources: true,
    extractJs: true,
    jsPlacement: "body", // "head" | "body" | "both"
    root: async (editor: Editor) => {
      // Базова структура для експорту
      const rootObj: RootType = {
        css: {},
        js: {},
      };

      // Перевіряємо, чи є у проекті сторінки
      const pages = editor.Pages ? editor.Pages.getAll() : null;

      if (pages && pages.length > 0) {
        // Зберігаємо поточну сторінку, щоб відновити її пізніше
        const currentPage = editor.Pages.getSelected();

        // Обробляємо кожну сторінку окремо
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          editor.Pages.select(page); // Вибираємо сторінку для отримання її даних

          // Отримуємо назву сторінки та безпечне ім'я файлу
          const pageName = page.get("name") || `Page ${i + 1}`;
          const safePageName = getSafeFileName(pageName);

          // Визначаємо імена файлів для цієї сторінки
          const htmlFileName = i === 0 ? "index.html" : `${safePageName}.html`;
          const cssFileName = `${safePageName}.css`;
          const jsFileName = `${safePageName}.js`;

          // Отримуємо CSS і JS цієї сторінки
          const pageCss = editor.getCss();
          const pageJs = editor.getJs();

          // Додаємо CSS файл, якщо є стилі
          if (hasCss(pageCss)) {
            (rootObj.css as Record<string, string>)[
              cssFileName
            ] = `/* Styles for page: ${pageName} */\n${pageCss}`;
          }

          // Додаємо JavaScript файл, якщо є код і опція extractJs включена
          if (hasJs(pageJs) && config.extractJs) {
            (rootObj.js as Record<string, string>)[
              jsFileName
            ] = `/* Scripts for page: ${pageName} */\n${transformJavaScript(
              pageJs
            )}`;
          }

          // Додаємо HTML файл
          rootObj[htmlFileName] = createPageHtml(
            editor.getHtml(),
            pageName,
            safePageName,
            hasCss(pageCss),
            hasJs(pageJs) && config.extractJs,
            `./css/${cssFileName}`,
            `./js/${jsFileName}`
          );
        }

        // Видаляємо папки, якщо вони порожні
        if (Object.keys(rootObj.css as object).length === 0) {
          delete rootObj.css;
        }

        if (Object.keys(rootObj.js as object).length === 0) {
          delete rootObj.js;
        }

        // Відновлюємо вибрану сторінку
        editor.Pages.select(currentPage);
      } else {
        // Односторінковий проект
        const pageName = "Home";
        const safePageName = "home";

        // Отримуємо CSS і JS
        const css = editor.getCss();
        const js = editor.getJs();

        // Додаємо CSS файл, якщо є стилі
        if (hasCss(css)) {
          rootObj["css"] = {
            [`${safePageName}.css`]: `/* Styles for page: ${pageName} */\n${css}`,
          };
        }

        // Додаємо JavaScript файл, якщо є код
        if (hasJs(js) && config.extractJs) {
          rootObj["js"] = {
            [`${safePageName}.js`]: `/* Scripts for page: ${pageName} */\n${transformJavaScript(
              js
            )}`,
          };
        }

        // Додаємо HTML файл
        rootObj["index.html"] = createPageHtml(
          editor.getHtml(),
          pageName,
          safePageName,
          hasCss(css),
          hasJs(js) && config.extractJs,
          `./css/${safePageName}.css`,
          `./js/${safePageName}.js`
        );
      }

      return rootObj;
    },
    isBinary: undefined,
    ...opts,
  };

  // Add command
  editor.Commands.add(commandName, {
    run(editor, s, opts: PluginOptions = {}) {
      const zip = new JSZip();
      const onError = opts.onError || config.onError;
      const root = opts.root || config.root;

      this.createDirectory(zip, root)
        .then(async () => {
          const content = await zip.generateAsync({ type: "blob" });
          const filenameFn = opts.filename || config.filename;
          const done = opts.done || config.done;
          const filenamePfx = opts.filenamePfx || config.filenamePfx;
          const filename = filenameFn
            ? filenameFn(editor)
            : `${filenamePfx}_${Date.now()}.zip`;
          FileSaver.saveAs(content, filename);
          done?.();
        })
        .catch(onError);
    },

    createFile(zip: JSZip, name: string, content: string) {
      const opts: JSZip.JSZipFileOptions = {};
      const ext = name.split(".")[1];
      const isBinary = config.isBinary
        ? config.isBinary(content, name)
        : !(ext && ["html", "css", "js"].indexOf(ext) >= 0) &&
          !/^[\x00-\x7F]*$/.test(content);

      if (isBinary) {
        opts.binary = true;
      }

      editor.log("Create file", {
        ns: "plugin-export",
        // @ts-ignore
        name,
        content,
        opts,
      });

      zip.file(name, content, opts);
    },

    async createDirectory(zip: JSZip, root: PluginOptions["root"]) {
      root = typeof root === "function" ? await root(editor) : root;

      for (const name in root) {
        if (root.hasOwnProperty(name)) {
          let content = root[name];
          content =
            typeof content === "function" ? await content(editor) : content;
          const typeOf = typeof content;

          if (typeOf === "string") {
            this.createFile(zip, name, content as string);
          } else if (typeOf === "object") {
            const dirRoot = zip.folder(name)!;
            await this.createDirectory(dirRoot, content as RootType);
          }
        }
      }
    },
  });

  // Додаємо метод до Editor для створення ZIP blob без скачування
  editor.createProjectZip = async (): Promise<Blob> => {
    const zip = new JSZip();
    const root = config.root;
    const command = editor.Commands.get(commandName);
    
    if (!command) {
      throw new Error('Export command not found');
    }
    
    const rootData = typeof root === "function" ? await root(editor) : root;
    
    // Викликаємо createDirectory з команди, передаючи правильний контекст
    await command.createDirectory.call(command, zip, rootData);
    
    // Генеруємо blob
    return await zip.generateAsync({ type: "blob" });
  };

  editor.onReady(() => {
    // Add button inside export dialog
    if (config.addExportBtn) {
      const btnExp = document.createElement("button");
      btnExp.innerHTML = config.btnLabel!;
      btnExp.className = `${pfx}btn-prim`;
      btnExp.type = "button";

      editor.on("run:export-template", () => {
        const el = editor.Modal.getContentEl();
        el?.appendChild(btnExp);
        btnExp.onclick = () => editor.runCommand(commandName);
      });
    }
  });
};

// Розширюємо тип Editor, щоб TypeScript знав про новий метод
declare module "grapesjs" {
  interface Editor {
    createProjectZip(): Promise<Blob>;
  }
}

export default plugin;