import type { Editor } from 'grapesjs';
import CodeMirror from 'codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
export const registerButton = (editor: Editor) => {
    editor.Commands.add('save-json', {
        run: (editor) => {
            // Отримуємо та трансформуємо компоненти
            const textarea = document.createElement('textarea');
            textarea.style.width = '100%';
            textarea.style.height = '750px';
            textarea.style.color = 'black';
            const jsonAll = editor.Pages.getSelected().collection.map((p) => {
                editor.Pages.select(p);
                const css = editor.getCss();
                console.log('pages ', css);
                return {
                    name: p.attributes.name,
                    id: p.getMainComponent().getId(),
                    pages: p.getMainComponent().toJSON(),
                    css: css,
                };
            });

            function findComponentsWithAttribute(pages, attribute) {
                function traverse(components) {
                    if (Array.isArray(components)) {
                        for (let index = components.length - 1; index >= 0; index--) {
                            const component = components[index];
                            if (component.attributes && component.attributes[attribute] === 'true') {
                                components.splice(index, 1);
                            } else if (component.components) {
                                traverse(component.components);
                            }
                        }
                    }
                }
                traverse(pages.components);
                return pages;
            }

            jsonAll.forEach((item) => {
                const components = findComponentsWithAttribute(JSON.parse(JSON.stringify(item.pages, null, 2)), 'data-display-only');
                console.log(`Components with 'data-display-only' attribute in ${item.name}: `, components);
                item.pages = components;
            });

            textarea.value = JSON.stringify(jsonAll, null, 2);

            // function jsonToCss(jsonStyles) {
            //     if (jsonStyles.length === 0) return;
            //     return jsonStyles.map(styleObj => {
            //         const selectors = styleObj.selectors.join(", ");
            //         const styles = Object.entries(styleObj.style).map(([key, value]) => {
            //             return `${key}: ${value};`;
            //         }).join(" ");
            //         return `${selectors} { ${styles} }`;
            //     }).join(" ");
            // }
            // console.log("pages", editor.Pages, "editor-", editor);
            // const stylesJson = editor.getStyle();
            // const cssContent = editor.getCss();
            // console.log("css", jsonToCss(JSON.parse(JSON.stringify(stylesJson, null, 2))), "css-", cssContent);
            //  console.log('parse-', JSON.parse(textarea.value));
            //  editor.setComponents(JSON.parse(textarea.value)[0].pages.components);

            editor.Modal.setTitle('Components JSON').setContent(textarea).open();
        },
    });

    editor.Commands.add('html-import', {
        run: function (editor) {
            const codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
            codeViewer.set({
                codeName: 'htmlmixed',
                readOnly: false,
                theme: 'hopscotch',
                autoBeautify: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineWrapping: true,
                styleActiveLine: true,
                smartIndent: true,
                indentWithTabs: true,
            });

            const container = document.createElement('div');
            const btnEdit = document.createElement('button');
            btnEdit.innerHTML = 'Import';
            btnEdit.onclick = function () {
                const code = codeViewer.editor.getValue().trim();
                // Розділити HTML, CSS і JavaScript
                const htmlContent = code.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
                // getJs()
                // Очищення старого контенту
                editor.DomComponents.getWrapper().set('content', '');
                const content = htmlContent;
                editor.setComponents(content);

                editor.Modal.close();
            };
            let viewer = codeViewer.editor;
            editor.Modal.setTitle('Edit code');
            if (!viewer) {
                const txtarea = document.createElement('textarea');
                container.appendChild(txtarea);
                codeViewer.init(txtarea);
                viewer = codeViewer.editor;
            }
            container.appendChild(btnEdit);
            //editor.getJs()
            const currentComponents = editor.getHtml() + '<style>' + editor.getCss() + '</style>';
            codeViewer.setContent(currentComponents);

            // editor.Modal.setContent("");
            editor.Modal.setContent(container);
            editor.Modal.open();

            // viewer.refresh(); // Оновлюємо редактор коду для коректного відображення
            setTimeout(function () {
                const modalEl: HTMLElement | null = document.querySelector('.CodeMirror');
                if (modalEl) {
                    // modalEl.style.width = '100%';
                    // modalEl.style.height = '100%';
                }
                viewer.refresh();
            }, 100);
        },
    });

    editor.Commands.add('json-import', {
        run: function (editor) {
            const modalContent = document.createElement('div');
            const importButton = document.createElement('button');
            const textarea = document.createElement('textarea');
            textarea.style.width = '100%';
            textarea.style.height = '350px';
            textarea.style.color = 'black';
            modalContent.appendChild(textarea);

            importButton.textContent = 'Import JSON';
            importButton.onclick = function () {
                try {
                    const jsonInput = JSON.parse(textarea.value);
                    //editor.Pages.getAll().reset();
                    jsonInput.forEach((pageData) => {
                        const page = editor.Pages.add({ name: pageData.name });
                        editor.Pages.select(page);
                        editor.setComponents(pageData.pages); // Встановлення компонентів сторінки
                        editor.setStyle(pageData.css); // Встановлення CSS для сторінки
                    });

                    editor.Modal.close();
                } catch (e) {
                    alert('Invalid JSON');
                    console.error(e);
                }
            };

            modalContent.appendChild(importButton);
            editor.Modal.setTitle('Import JSON').setContent(modalContent).open();
        },
    });

    editor.Commands.add('clear', {
        run: function (editor) {
            editor.DomComponents.clear();
            editor.CssComposer.clear();
            //   editor.StyleManager.clear();
            //  editor.UndoManager.clear();
            //  editor.AssetManager.clear();
            //  editor.BlockManager.clear();
        },
    });

    editor.Commands.add('change_mode', {
        run: function (editor) {
            editor.getModel().set('dmode', 'absolute');
        },
        stop: function (editor) {
            editor.getModel().set('dmode', 'default');
        },
    });

    /* ALLOW AND DISABLE SCRIPTS */
    editor.Commands.add('allowScripts', {
        run: function (editor) {
            console.log('----> Scripts Enabled <----');
            (editor.getConfig() as any).allowScripts = 0;
        },
        stop: function (editor) {
            console.log('----> Scripts Disabled <----');
            (editor.getConfig() as any).allowScripts = 1;
        },
    });

    editor.Commands.add('component-code-editor-button', {
        run: function (editor) {
            const container = document.createElement('div');
            const tabsContainer = document.createElement('div');
            const codeContainer = document.createElement('div');
            
            container.appendChild(tabsContainer);
            container.appendChild(codeContainer);
    
            let currentMode = 'htmlmixed';
            let htmlContent = editor.getHtml();
            let cssContent = editor.getCss();
            let jsContent = editor.getJs();
    
            const cmEditor = CodeMirror(codeContainer, {
                value: htmlContent,
                mode: currentMode,
                theme: 'hopscotch',
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineWrapping: true,
                styleActiveLine: true,
                smartIndent: true,
                indentWithTabs: true,
            });
    
            const setEditorContent = () => {
                switch (currentMode) {
                    case 'htmlmixed':
                        cmEditor.setValue(htmlContent);
                        break;
                    case 'css':
                        cmEditor.setValue(cssContent);
                        break;
                    case 'javascript':
                        cmEditor.setValue(jsContent);
                        break;
                }
                cmEditor.setOption('mode', currentMode);
            };
    
            const createTab = (label, mode) => {
                const tab = document.createElement('button');
                tab.innerHTML = label;
                tab.onclick = () => {
                    currentMode = mode;
                    setEditorContent();
                };
                return tab;
            };
    
            tabsContainer.appendChild(createTab('HTML', 'htmlmixed'));
            tabsContainer.appendChild(createTab('CSS', 'css'));
            tabsContainer.appendChild(createTab('JS', 'javascript'));
    
            const btnImport = document.createElement('button');
            btnImport.innerHTML = 'Import';
            btnImport.onclick = function () {
                switch (currentMode) {
                    case 'htmlmixed':
                        htmlContent = cmEditor.getValue().trim();
                        break;
                    case 'css':
                        cssContent = cmEditor.getValue().trim();
                        break;
                    case 'javascript':
                        jsContent = cmEditor.getValue().trim();
                        break;
                }
    
                // Combine HTML, CSS, and JS
                const fullContent = `
                    ${htmlContent}
                    <style>${cssContent}</style>
                    <script>${jsContent}</script>
                `;
    
                editor.DomComponents.getWrapper().set('content', '');
                editor.setComponents(fullContent);
                editor.Modal.close();
            };
    
            container.appendChild(btnImport);
    
            editor.Modal.setTitle('Edit Code');
            editor.Modal.setContent(container);
            editor.Modal.open();
    
            setTimeout(function () {
                cmEditor.refresh();
            }, 100);
        },
    });

    editor.Commands.add('component-code-editor', {
        run: function (editor) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.height = '600px'; // Adjust as needed
    
            const createEditorContainer = () => {
                const div = document.createElement('div');
                div.style.flex = '1';
                div.style.marginBottom = '10px';
                return div;
            };
    
            const htmlContainer = createEditorContainer();
            const cssContainer = createEditorContainer();
            const jsContainer = createEditorContainer();
    
            container.appendChild(htmlContainer);
            container.appendChild(cssContainer);
            container.appendChild(jsContainer);
    
            const commonOptions = {
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineWrapping: true,
                styleActiveLine: true,
                smartIndent: true,
                indentWithTabs: true,
            };
    
            const htmlEditor = CodeMirror(htmlContainer, {
                ...commonOptions,
                mode: 'htmlmixed',
                value: editor.getHtml(),
            });
    
            const cssEditor = CodeMirror(cssContainer, {
                ...commonOptions,
                mode: 'css',
                value: editor.getCss(),
            });
    
            const jsEditor = CodeMirror(jsContainer, {
                ...commonOptions,
                mode: 'javascript',
                value: editor.getJs(),
            });
    
            const btnImport = document.createElement('button');
            btnImport.innerHTML = 'Import';
            btnImport.onclick = function () {
                const htmlContent = htmlEditor.getValue().trim();
                const cssContent = cssEditor.getValue().trim();
                const jsContent = jsEditor.getValue().trim();
    
                const fullContent = `
                    ${htmlContent}
                    <style>${cssContent}</style>
                    <script>${jsContent}</script>
                `;
    
                editor.DomComponents.getWrapper().set('content', '');
                editor.setComponents(fullContent);
                editor.Modal.close();
            };
    
            container.appendChild(btnImport);
    
            editor.Modal.setTitle('Edit Code');
            editor.Modal.setContent(container);
            editor.Modal.open();
    
            setTimeout(function () {
                htmlEditor.refresh();
                cssEditor.refresh();
                jsEditor.refresh();
            }, 100);
        },
    });

};
