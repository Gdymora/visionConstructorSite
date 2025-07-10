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

  // Add autoFormatRange method to CodeMirror
  const CodeMirror = editor.CodeManager.getViewer('CodeMirror').CodeMirror;

  CodeMirror.defineExtension("autoFormatRange", function (from: any, to: any) {
    const cm = this;
    const outer = cm.getMode();
    const text = cm.getRange(from, to).split("\n");
    const state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
    const tabSize = cm.getOption("tabSize");

    let out = "";
    let lines = 0;
    let atSol = from.ch === 0;
    let inTemplateLiteral = false;
    let templateLiteralContent = "";

    function newline() {
      out += "\n";
      atSol = true;
      ++lines;
    }

    function processTemplateLiteral() {
      // Зберігаємо переноси рядків всередині шаблонного літералу
      out += templateLiteralContent;
      templateLiteralContent = "";
      inTemplateLiteral = false;
    }

    for (let i = 0; i < text.length; ++i) {
      const stream = new CodeMirror.StringStream(text[i], tabSize);
      while (!stream.eol()) {
        const inner = CodeMirror.innerMode(outer, state);
        const style = outer.token(stream, state);
        const cur = stream.current();
        stream.start = stream.pos;

        if (cur === '`' && (stream.pos === 0 || text[i][stream.pos - 1] !== '\\')) {
          if (inTemplateLiteral) {
            templateLiteralContent += cur;
            processTemplateLiteral();
          } else {
            inTemplateLiteral = true;
            templateLiteralContent = cur;
          }
        } else if (inTemplateLiteral) {
          templateLiteralContent += cur;
        } else {
          if (!atSol || /\S/.test(cur)) {
            out += cur;
            atSol = false;
          }
          if (!atSol && inner.mode.newlineAfterToken &&
            inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || "", inner.state))
            newline();
        }
      }
      if (inTemplateLiteral) {
        templateLiteralContent += "\n";
      } else {
        if (!stream.pos && outer.blankLine) outer.blankLine(state);
        if (!atSol && i < text.length - 1) newline();
      }
    }

    if (inTemplateLiteral) {
      processTemplateLiteral();
    }

    cm.operation(() => {
      cm.replaceRange(out, from, to);
      for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
        cm.indentLine(cur, "smart");
      cm.setSelection(from, cm.getCursor(false));
    });
  });

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
      setTimeout(() => {
        const codeViewer = this.getCodeViewer();
        codeViewer.setContent(code);
        this.formatCode();
      }, 100);
    },

    getPreContent(): HTMLElement | string {
      return "";
    },

    getPostContent(): HTMLElement | string {
      return "";
    },

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

      setTimeout(() => {
        codeViewer.refresh();
        codeViewer.focus();
      }, 0);

      return content;
    },

    getContentActions(): HTMLElement | string {
      const { editor } = this;
      const actions = document.createElement("div");
      actions.id = "actns";
      actions.style.display = "flex";
      actions.style.justifyContent = "space-between";
      actions.style.padding = "10px";

      const btn = document.createElement("button");
      const pfx = editor.getConfig("stylePrefix");
      btn.innerHTML = opts.buttonLabel || "Save";
      btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
      btn.onclick = () => this.handleSave();

      const runLogic = document.createElement("div");
      runLogic.id = "logic-toolbar";
      runLogic.className = "fa fa-bug";
      runLogic.style.cssText = "padding:10px;background:rgba(0,0,0,0.2);border-radius:3px;border:1px solid rgba(0,0,0,0.2);cursor:pointer";
      runLogic.onclick = () => this.runCode();

      const formatBtn = document.createElement("button");
      formatBtn.innerHTML = "Format Code";
      formatBtn.className = `${pfx}btn-prim`;
      formatBtn.onclick = () => this.formatCode();

      const leftActions = document.createElement("div");
      leftActions.appendChild(runLogic);
      leftActions.appendChild(formatBtn);

      actions.appendChild(leftActions);
      actions.appendChild(btn);

      return actions;
    },

    handleSave() {
      const { editor, target } = this;
      const code = this.getCodeViewer().getContent();
      target.set("script", code, { silent: true });
      editor.Modal.close();
    },

    getCodeViewer() {
      const { editor } = this;

      if (!this.codeViewer) {
        this.codeViewer = editor.CodeManager.createViewer({
          codeName: "javascript",
          theme: "hopscotch",
          readOnly: 0,
          autoBeautify: 1,
          lineNumbers: true,
          lineWrapping: true,
          styleActiveLine: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          ...codeViewOptions,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-/": "toggleComment",
            "Cmd-/": "toggleComment",
            "Alt-F": "findPersistent",
            "Ctrl-F": "findPersistent",
            "Ctrl-Alt-L": (cm: any) => this.formatCode(cm),
          },
        });
      }

      return this.codeViewer;
    },

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

    formatCode(cm?: any) {
      if (!cm) {
        cm = this.getCodeViewer().editor;
      }
      const totalLines = cm.lineCount();
      const totalChars = cm.getValue().length;
      const from = { line: 0, ch: 0 };
      const to = { line: totalLines - 1, ch: cm.getLine(totalLines - 1).length };
      cm.autoFormatRange(from, to);
      cm.setCursor(0, 0);
    },

    ...commandAttachScript,
  });
};