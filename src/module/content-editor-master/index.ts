import commands from "./commands";

export default (editor, opts = {}) => {
  const options = {
    ...{
      // Starter code
      starter: "<div>test</div>",

      toolbarIcon:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="white" d="M5.59 3.41L7 4.82L3.82 8L7 11.18L5.59 12.6L1 8zm5.82 0L16 8l-4.59 4.6L10 11.18L13.18 8L10 4.82zM22 6v12c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2v-4h2v4h16V6h-2.97V4H20c1.11 0 2 .89 2 2"/></svg>',

      // Component types to allow script editing
      // Avoid components with predefined scripts
      scriptTypesSupport: ["default", "text", "textnode", "image", "video", "svg"],

      // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open custom code' } }`
      // Pass a falsy value to avoid adding the button
      toolbarBtnCustomScript: {},

      // On run success
      onRun: () => console.log("valid syntax"),

      // Logic when there is an error on run
      onError: (err) => console.log("error", err),

      // Title for the custom code modal
      modalTitle: "Html",

      // Textarea label
      codeLabel: "HTML",

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
