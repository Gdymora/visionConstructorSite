import FileSaver from "file-saver";
import type { Plugin } from "grapesjs";
import JSZip from "jszip";
import { ReactExportOptions, ReactExportRootType } from './types';
import { ReactComponentGenerator } from './compiler/componentGenerator';

const plugin: Plugin<ReactExportOptions> = (editor, opts = {}) => {
  const pfx = editor.getConfig("stylePrefix");
  const commandName = "gjs-export-react";

  const config: ReactExportOptions = {
    addExportBtn: true,
    btnLabel: "Export to React",
    filenamePfx: "react_components",
    filename: undefined,
    done: () => {},
    onError: console.error,
    includeTypes: true,
    componentNaming: 'PascalCase',
    exportFormat: 'typescript',
    includeReactImports: true,
    isBinary: undefined,
    ...opts,
  };

  // Add command
  editor.Commands.add(commandName, {
    run(editor, s, opts: ReactExportOptions = {}) {
      const zip = new JSZip();
      const onError = opts.onError || config.onError;
      const generator = new ReactComponentGenerator(editor, { ...config, ...opts });

      this.generateReactProject(generator)
        .then(async (projectStructure) => {
          await this.createDirectory(zip, projectStructure);
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

    async generateReactProject(generator: ReactComponentGenerator): Promise<ReactExportRootType> {
      try {
        return await generator.generateProject();
      } catch (error) {
        console.error('Error generating React project:', error);
        throw error;
      }
    },

    createFile(zip: JSZip, name: string, content: string) {
      const opts: JSZip.JSZipFileOptions = {};
      const ext = name.split(".").pop()?.toLowerCase();
      const isBinary = config.isBinary
        ? config.isBinary(content, name)
        : !(ext && ["html", "css", "js", "jsx", "ts", "tsx", "json", "md"].includes(ext)) &&
          !/^[\x00-\x7F]*$/.test(content);

      if (isBinary) {
        opts.binary = true;
      }

      editor.log("Create file", {
        ns: "plugin-export-react",
        name,
        content: content.slice(0, 100) + (content.length > 100 ? '...' : ''),
        opts,
      });

      zip.file(name, content, opts);
    },

    async createDirectory(zip: JSZip, root: ReactExportRootType) {
      for (const name in root) {
        if (root.hasOwnProperty(name)) {
          let content = root[name];
          content = typeof content === "function" ? await content(editor) : content;
          const typeOf = typeof content;

          if (typeOf === "string") {
            this.createFile(zip, name, content as string);
          } else if (typeOf === "object" && content !== null) {
            const dirRoot = zip.folder(name)!;
            await this.createDirectory(dirRoot, content as ReactExportRootType);
          }
        }
      }
    },
  });

  // Додаємо метод до Editor для створення React ZIP blob без скачування
  editor.createReactProjectZip = async (): Promise<Blob> => {
    const zip = new JSZip();
    const generator = new ReactComponentGenerator(editor, config);
    const command = editor.Commands.get(commandName);
    
    if (!command) {
      throw new Error('React export command not found');
    }
    
    const projectStructure = await generator.generateProject();
    
    // Викликаємо createDirectory з команди, передаючи правильний контекст
    await command.createDirectory.call(command, zip, projectStructure);
    
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
      btnExp.style.marginLeft = "10px";

      editor.on("run:export-template", () => {
        const el = editor.Modal.getContentEl();
        if (el) {
          // Перевіряємо чи кнопка вже додана
          const existingBtn = el.querySelector('.react-export-btn');
          if (!existingBtn) {
            btnExp.classList.add('react-export-btn');
            el.appendChild(btnExp);
            btnExp.onclick = () => editor.runCommand(commandName);
          }
        }
      });
    }
  });
};

// Розширюємо тип Editor, щоб TypeScript знав про новий метод
declare module "grapesjs" {
  interface Editor {
    createReactProjectZip(): Promise<Blob>;
  }
}

export default plugin;