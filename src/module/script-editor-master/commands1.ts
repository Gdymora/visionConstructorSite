import { cmdId } from "./consts";

interface Options {
  modalTitle?: string;
  codeViewOptions?: any;
  commandAttachScript?: any;
  toolbarIcon?: string;
  onRun?: () => void;
  onError?: (err: Error) => void;
  starter?: string;
  scriptTypesSupport?: string | string[];
  toolbarBtnCustomScript?: any;
  buttonLabel?: string;
}

export default (editor: any, opts: Options = {}) => {
  const cm = editor.Commands;
  const md = editor.Modal;
  const domc = editor.Components;
  const { modalTitle, codeViewOptions, commandAttachScript, toolbarIcon, onRun, onError, starter } = opts;
  let scriptTypesSupport: string | string[] = opts.scriptTypesSupport;

  let content: HTMLElement | null = null;

  const appendToContent = (target: HTMLElement, content: HTMLElement | string) => {
    if (content instanceof HTMLElement) {
      target.appendChild(content);
    } else if (content) {
      target.insertAdjacentHTML("beforeend", content);
    }
  };

  if (typeof scriptTypesSupport === 'string') {
    scriptTypesSupport = scriptTypesSupport.split(",");
  }

  if (Array.isArray(scriptTypesSupport)) {
    scriptTypesSupport = scriptTypesSupport.includes("*") ? domc.getTypes().map((c: any) => c.id) : scriptTypesSupport;
  }

  // Add icons to specified component types
  scriptTypesSupport &&
    (scriptTypesSupport as string[]).forEach((type) => {
      const typeOpt = domc.getType(type).model;
      domc.addType(type, {
        model: {
          initToolbar() {
            typeOpt.prototype.initToolbar.apply(this, arguments);
            const tb = this.get("toolbar");
            const tbExists = tb.some((item: any) => item.command === cmdId);

            if (!tbExists) {
              tb.unshift({
                command: cmdId,
                label: toolbarIcon,
                ...opts.toolbarBtnCustomScript,
              });
              this.set("toolbar", tb);
            }
          },
        },
      });
    });

  // Add the script command
  cm.add(cmdId, {
    run(editor: any, sender: any, opts: any = {}) {
      this.editor = editor;
      this.options = opts;
      this.target = opts.target || editor.getSelected();
      const target = this.target;

      if (target) this.showCustomCode(target);
    },

    stop(editor: any) {
      md.close();
    },

    /**
     * Method which tells how to show the custom code
     * @param  {Component} target
     */
    showCustomCode(target: any) {
      const { editor, options } = this;
      const title = options.title || modalTitle;
      if (!content) content = this.getContent();
      let code = target.getScriptString() || starter;
      md.open({
        title,
        content,
        attributes: { class: 'custom-modal' }
      })
        .getModel()
        .once("change:open", () => editor.stopCommand(this.id));
      setTimeout(() => this.getCodeViewer().setContent(code), 100);
    },

    /**
     * Custom pre-content. Can be a simple string or an HTMLElement
     */
    getPreContent(): HTMLElement | string {
      return "";
    },

    /**
     * Custom post-content. Can be a simple string or an HTMLElement
     */
    getPostContent(): HTMLElement | string {
      return "";
    },

    /**
     * Get all the content for the custom code
     * @return {HTMLElement}
     */
    getContent(): HTMLElement {
      const { editor } = this;
      const content = document.createElement("div");
      const pfx = editor.getConfig("stylePrefix");
      content.className = `${pfx}attach-script`;
      content.style.cssText = 'height: 80vh; display: flex; flex-direction: column;';

      appendToContent(content, this.getPreContent());

      const codeViewerContainer = document.createElement('div');
      codeViewerContainer.style.cssText = 'flex-grow: 1; overflow: auto;';
      const codeViewer = this.getCodeViewer();
      codeViewerContainer.appendChild(codeViewer.getElement());
      content.appendChild(codeViewerContainer);

      appendToContent(content, this.getPostContent());
      appendToContent(content, this.getContentActions());

      // Оновлюємо CodeMirror після додавання до DOM
      setTimeout(() => {
        codeViewer.refresh();
        codeViewer.focus();
      }, 0);

      return content;
    },

    /**
     * Get the actions content. Can be a simple string or an HTMLElement
     * @return {HTMLElement | string}
     */
    getContentActions(): HTMLElement | string {
      const { editor } = this;
      const actions = document.createElement("div");
      actions.id = "actns";
      const btn = document.createElement("button");
      const pfx = editor.getConfig("stylePrefix");
      btn.innerHTML = opts.buttonLabel || "Save";
      btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
      btn.onclick = () => this.handleSave();

      const runLogic = document.createElement("div");
      runLogic.id = "logic-toolbar";
      runLogic.className = "fa fa-bug";
      runLogic.style.cssText = "margin:5px;padding:10px;background:rgba(0,0,0,0.2);border-radius:3px;border:1px solid rgba(0,0,0,0.2);cursor:pointer";
      runLogic.onclick = () => this.runCode();

      actions.appendChild(runLogic);
      actions.appendChild(btn);

      return actions;
    },

    /**
     * Handle the main save task
     */
    handleSave() {
      const { editor, target } = this;
      const code = this.getCodeViewer().getContent();
      target.set("script", code);
      editor.Modal.close();
    },

    /**
     * Return the code viewer instance
     * @return {any}
     */
    getCodeViewer() {
      const { editor } = this;

      if (!this.codeViewer) {
        this.codeViewer = editor.CodeManager.createViewer({
          codeName: "javascript",
          theme: "hopscotch",
          readOnly: 0,
          autoBeautify: 1,
          ...codeViewOptions,
          // Додайте ці опції для збільшення розміру
          heightAdjust: 1, // Дозволяє CodeMirror заповнити весь контейнер
          viewportMargin: Infinity, // Рендерить весь вміст 
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineWrapping: true,
          styleActiveLine: true,
          smartIndent: true,
          indentWithTabs: true,
      
          toggleComment: true, // needed?
          commentRange: true, // needed?
          extraKeys: {
            'Cmd-1': function (cm) { cm.commentRange(true, cm.getCursor(true), cm.getCursor(false)) },  // comment
            'Cmd-2': function (cm) { cm.commentRange(false, cm.getCursor(true), cm.getCursor(false)) },  // uncomment'Cmd-3': function (cm) { cm.execCommand('commentRange') },  // FAILS
            'Cmd-4': function (cm) { cm.execCommand('transposeChars') }, // WORKS
            'Ctrl-X': function (cm) { cm.execCommand('deleteLine') }, // WORKS
          },
        });
      }

      return this.codeViewer;
    },

    /**
     * Evaluate code syntax
     */
    runCode() {
      try {
        const code = this.getCodeViewer().getContent();
        const func = new Function('"use strict";' + code);
        if (typeof func === "function") {
          func();
          onRun && onRun();
        } else {
          console.error("Provided jscript is not a function");
        }
      } catch (err) {
        console.log("error", err);
        onError && onError(err);
      }
    },

    ...commandAttachScript,
  });
};
