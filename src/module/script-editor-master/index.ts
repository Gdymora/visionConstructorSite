import commands from "./commands";

export default (editor, opts = {}) => {
  const options = {
    ...{
      // Starter code
      starter: "/*document.getElementById(this.id) == this*/ let el = this; ",

      toolbarIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="white" d="M12 8V2H6a2 2 0 0 0-2 2v10.018Q4.123 14 4.25 14a1.75 1.75 0 0 1 1.548.932A2.94 2.94 0 0 1 7.95 14h.1A2.95 2.95 0 0 1 11 16.95V17c0 .45-.17.86-.45 1.17c.288.439.45.96.45 1.507v.373c0 .747-.278 1.43-.736 1.95H18a2 2 0 0 0 2-2V10h-6a2 2 0 0 1-2-2m1.5 0V2.5l6 6H14a.5.5 0 0 1-.5-.5m-9.25 7a.75.75 0 0 1 .75.75V20a2 2 0 1 1-4 0v-.25a.75.75 0 0 1 1.5 0V20a.5.5 0 0 0 1 0v-4.25a.75.75 0 0 1 .75-.75m3.7 0A1.95 1.95 0 0 0 6 16.95v.234c0 .614.323 1.184.85 1.5l1.529.918a.25.25 0 0 1 .121.214v.234a.45.45 0 0 1-.45.45h-.1a.45.45 0 0 1-.45-.45V20A.75.75 0 0 0 6 20v.05A1.95 1.95 0 0 0 7.95 22h.1A1.95 1.95 0 0 0 10 20.05v-.234a1.75 1.75 0 0 0-.85-1.5l-1.529-.918a.25.25 0 0 1-.121-.214v-.234a.45.45 0 0 1 .45-.45h.1a.45.45 0 0 1 .45.45V17a.75.75 0 0 0 1.5 0v-.05A1.95 1.95 0 0 0 8.05 15z"/></svg>',

      // Component types to allow script editing
      // Avoid components with predefined scripts
      scriptTypesSupport: ["wrapper"],
      //scriptTypesSupport: ['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg'],
      // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open custom code' } }`
      // Pass a falsy value to avoid adding the button
      toolbarBtnCustomScript: {},

      // On run success
      onRun: () => console.log("valid syntax"),

      // Logic when there is an error on run
      onError: (err) => console.log("error", err),

      // Title for the custom code modal
      modalTitle: "Script",

      // Textarea label
      codeLabel: "JS",

      // Additional options for the code viewer, eg. `{ theme: 'hopscotch', readOnly: 0 }`
      codeViewOptions: {},

      // Label for the default save button
      buttonLabel: "Save",

      // Object to extend the default inject logic command.
      // Check the source to see all available methods
      commandAttachScript: {},
    },
    ...opts,
  };

  // load commands
  commands(editor, options);
};
