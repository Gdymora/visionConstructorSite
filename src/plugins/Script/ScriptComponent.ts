import CodeMirror from "codemirror";
// Or, if you need to import specific modes or addons
import "codemirror/mode/javascript/javascript";

export const ScriptComponent = (editor, commonTraits) => {
  const codemirrorEnabled = true; // otherwise trait editor is just a plain textarea

  const script = function (props) {
    this.onclick = function () {
      try {
        const func = new Function(props.jscript); // Створюємо функцію з рядка коду
        if (typeof func === "function") {
          func();
        } else {
          console.error("Provided jscript is not a function");
        }
      } catch (error) {
        console.error("Error while executing jscript:", error);
      }
    };
  };

  editor.DomComponents.addType("customScript", {
    isComponent: (el) => el.hasAttribute && el.hasAttribute("data-scriptable"),
    model: {
      defaults: {
        attributes: {
          jscript: `let res = 1 + 3; console.log('result is', res);`,
        },
        traits: [
          {
            // type: 'text',
            type: "jcodemirror-editor", // defined below
            name: "jscript",
            changeProp: true,
          },
          ...commonTraits,
        ],
        script,
        jscript: `let res = 1 + 3; console.log('result is', res);`,
        "script-props": ["jscript"],
      },
      init() {
        //this.listenTo(this, "active", this.openModal);
        this.listenTo(this, "change:jscript", this.changeJscript);
      },
      changeJscript(el, value, context) {
        this.addAttributes({ jscript: value });
      },
    },
    view: {
      events: {
        dblclick: "onActive",
      },
      onActive() {
        this.openModal();
      },
      init() {
        this.listenTo(this.model, "active", this.openModal);
      },

      async openModal() {
        //
        const divContainer = document.createElement("div");
        const containerCheckBox = document.createElement("div");
        containerCheckBox.className = "modal-table-column";
        const el = document.createElement("div");
        el.innerHTML = `
                    <form>
                        <textarea id="myjscript" name="myjscript" rows="14">
                        </textarea>
                    </form>
                    `;
        const textareaEl = el.querySelector("textarea");
        textareaEl.value = this.model.get("attributes").jscript || "";

        const myCodeMirror = CodeMirror.fromTextArea(textareaEl, {
          mode: "javascript",
          theme: "hopscotch",
          lineNumbers: true, // Додати номери рядків коду
          autoFormatOnStart: false,
          autoFormatOnModeChange: false,
          autoBeautify: true,
          styleActiveLine: true,
          smartIndent: true,
          indentWithTabs: true,
          lineWrapping: false, // вимикає перенесення рядків
          autoCloseBrackets: false,
          autoCloseTags: false
        });

        setTimeout(function () {
          const modalEl: HTMLElement | null =
            document.querySelector(".CodeMirror");
          if (modalEl) {
            modalEl.style.width = "100%";
            modalEl.style.height = "30%";
          }
          myCodeMirror.refresh();
        }, 100);
        divContainer.appendChild(el);
        //
        const containerBtn = document.createElement("div");
        containerBtn.className = "modal-create-btn";
        const btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.innerHTML = "Set item";

        btn.onclick = () => {
          const code_to_run = myCodeMirror.getValue();
          this.model.set("jscript", code_to_run);
          this.model.addAttributes({ jscript: code_to_run });
          editor.Modal.close();
        };
        containerBtn.appendChild(btn);
        divContainer.appendChild(containerBtn);
        //
        const style = document.createElement("style");

        style.innerHTML = `
              .gjs-mdl-dialog {
                width: 35%;
              }
              .modal-table-column {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 15px;
              }
              .modal-table-column label {
                font-size: 14px;
                flex: 1;
              }
              .modal-table-column select {
                flex: 1;
                height: 35px;
                border-radius: 10px;
                border: 1px solid #f5f5f5;
                padding: 2px 16px;
                color: #333333;
              }
              .modal-table-column select:focus {
                outline: none
              }
              .modal-create-btn {
                text-align: right;
              }
              .modal-create-btn button {
                height: 35px;
                border-radius: 10px;
                border: none;
                cursor: pointer;
                padding: 0 10px;
                color: #333333;
              }
              .modal-create-btn button:focus {
                outline: none
              }
              `;

        divContainer.appendChild(style);
        editor.Modal.open({
          title: "My title",
          content: divContainer,
          attributes: {
            class: "my-small-modal",
          },
        });
      },
    },
  });

  editor.TraitManager.addType("jcodemirror-editor", {
    createInput({ trait }) {
      const el = document.createElement("div");
      el.innerHTML = `
                      <form id=34>
                        <textarea id="myjscript" name="myjscript" rows="14">
                        </textarea>
                        </form>
                    `;
      if (codemirrorEnabled) {
        const textareaEl = el.querySelector("textarea");
        var myCodeMirror = CodeMirror.fromTextArea(textareaEl, {
          mode: "javascript",
          lineWrapping: true,
        });

        // This is the 'more accurate' codemirror 'change' event
        // which is triggered key by key. We need it cos if we paste
        // or backspace or delete etc. in codemirror then the
        // regular 'change' event is never issued! But how do we get
        // this event to trigger the proper, usual 'onEvent' below?
        // Currently cheating and doing the onEvent work here with
        // this special handler.
        myCodeMirror.on("change", function (cm, changeObj) {
          // HACK
          const component = editor.getSelected();
          const code_to_run = myCodeMirror.getValue();
          component.getTrait("jscript").set("value", code_to_run);
          console.log(
            "onEvent hack - (myCodeMirror change event) updating jscript trait to be:",
            code_to_run
          );
        });
      }

      return el;
    },

    // UI textarea & codemirror 'change' events trigger this function,
    // so that we can update the component 'jscript' trait property.
    onEvent({ elInput, component, event }) {
      let code_to_run;
      console.log("elInput");
      if (codemirrorEnabled)
        code_to_run = elInput
          .querySelector(".CodeMirror")
          .CodeMirror.getValue();
      else code_to_run = elInput.querySelector("textarea").value;

      console.log("onEvent - updating jscript trait to be:", code_to_run);
      component.getTrait("jscript").set("value", code_to_run);
    }, // onEvent

    // Updates the trait area UI based on what is in the component.
    onUpdate({ elInput, component }) {
      console.log(
        "onUpdate - component trait jscript -> UI",
        component.get("jscript")
      );
      if (codemirrorEnabled) {
        const cm = elInput.querySelector(".CodeMirror").CodeMirror;
        cm.setValue(component.get("jscript"));
        // codemirror content doesn't appear till you click on it - fix with this trick
        setTimeout(function () {
          cm.refresh();
        }, 1);
      } else {
        const textareaEl = elInput.querySelector("textarea");
        textareaEl.value = component.get("jscript");

        // actually is this even needed as things still update automatically without it?
        // textareaEl.dispatchEvent(new CustomEvent('change'));
      }
    }, // onUpdate
  }); // addType

  editor.BlockManager.add("btnRegular", {
    category: "Basic",
    label: "Regular Button",
    attributes: { class: "fa fa-square-o" },
    content: '<button type="button" data-scriptable="true">Click Me</button>',
  });

  editor.BlockManager.add("btnScriptable", {
    category: "Scriptable",
    label: "Scriptable Button",
    attributes: { class: "fa fa-rocket" },
    content: '<button type="button" data-scriptable="true">Run Script</button>',
  });
};
