import { cmdId } from './consts';

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
            target.insertAdjacentHTML('beforeend', content);
        }
    };

    if (typeof scriptTypesSupport === 'string') {
        scriptTypesSupport = scriptTypesSupport.split(',');
    }

    if (Array.isArray(scriptTypesSupport)) {
        scriptTypesSupport = scriptTypesSupport.includes('*') ? domc.getTypes().map((c: any) => c.id) : scriptTypesSupport;
    }

    // Add icons to specified component types
    scriptTypesSupport &&
        (scriptTypesSupport as string[]).forEach((type) => {
            const typeOpt = domc.getType(type).model;
            domc.addType(type, {
                model: {
                    initToolbar() {
                        typeOpt.prototype.initToolbar.apply(this, arguments);
                        const tb = this.get('toolbar');
                        const tbExists = tb.some((item) => item.command === cmdId);

                        if (!tbExists) {
                            tb.unshift({
                                command: cmdId,
                                label: toolbarIcon,
                                ...opts.toolbarBtnCustomScript,
                            });
                            this.set('toolbar', tb);
                        }
                    },
                },
            });
        });

    // Add the custom HTML editing command
    cm.add(cmdId, {
        run(editor: any, sender: any, opts: any = {}) {
            this.editor = editor;
            this.options = opts;
            this.target = opts.target || editor.getSelected();
            const target = this.target;

            if (target) this.showCustomHTML(target);
        },

        stop(editor) {
            md.close();
        },

        /**
         * Method which tells how to show the custom HTML
         * @param  {Component} target
         */
        showCustomHTML(target) {
            const { editor, options } = this;
            const title = options.title || modalTitle;
            if (!content) content = this.getContent();
            let code = target.toHTML() || starter;
            md.open({
                title,
                content,
            })
                .getModel()
                .once('change:open', () => editor.stopCommand(this.id));
            setTimeout(() => this.getCodeViewer().setContent(code), 100);
            // setTimeout(() => this.getCodeViewer().editor.refresh(), 100);
        },

        /**
         * Custom pre-content. Can be a simple string or an HTMLElement
         */
        getPreContent() { },

        /**
         * Custom post-content. Can be a simple string or an HTMLElement
         */
        getPostContent() { },

        /**
         * Get all the content for the custom HTML
         * @return {HTMLElement}
         */
        getContent() {
            const { editor } = this;
            const content = document.createElement('div');
            const pfx = editor.getConfig('stylePrefix');
            content.className = `${pfx}attach-html`;
            appendToContent(content, this.getPreContent());
            const codeViewer = this.getCodeViewer();
            codeViewer.refresh();
            setTimeout(() => codeViewer.focus(), 0);
            content.appendChild(codeViewer.getElement());
            appendToContent(content, this.getPostContent());
            appendToContent(content, this.getContentActions());

            return content;
        },

        /**
         * Get the actions content. Can be a simple string or an HTMLElement
         * @return {HTMLElement|String}
         */
        getContentActions() {
            const { editor } = this;
            const actions = document.createElement('div');
            actions.id = 'actns';
            const btn = document.createElement('button');
            const pfx = editor.getConfig('stylePrefix');
            btn.innerHTML = opts.buttonLabel;
            btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
            btn.onclick = () => this.handleSave();

            actions.appendChild(btn);

            return actions;
        },

        /**
         * Handle the main save task
         */
        handleSave() {
            const { editor, target } = this;
            const code = this.getCodeViewer().getContent();
            target.replaceWith(code);
            editor.Modal.close();
        },

        /**
         * Return the code viewer instance
         * @return {CodeViewer}
         */
        getCodeViewer() {
            const { editor } = this;

            if (!this.codeViewer) {
                this.codeViewer = editor.CodeManager.createViewer({
                    codeName: 'htmlmixed',
                    theme: 'hopscotch', // You can choose a different theme here
                    readOnly: false,
                    autoBeautify: true,
                    autoCloseTags: true,
                    autoCloseBrackets: true,
                    lineWrapping: true,
                    styleActiveLine: true,
                    smartIndent: true,
                    indentWithTabs: true,
                    ...codeViewOptions,
                });
            }

            return this.codeViewer;
        },

        ...commandAttachScript,
    });
};
