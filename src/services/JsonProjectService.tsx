const JsonProjectService = {
  getProjectJson: (editor) => {
    const filterDisplayOnly = false;
   // const wrappers = editor.Pages.getAllWrappers();
   console.log('getProjectJson');
    const jsonAll = editor.Pages.getSelected().collection.map((p) => {
      editor.Pages.select(p);
      const css = editor.getCss();
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
            if (component.attributes && component.attributes[attribute] === "true") {
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

    if (filterDisplayOnly) {
      jsonAll.forEach((item) => {
        const components = findComponentsWithAttribute(JSON.parse(JSON.stringify(item.pages, null, 2)), "data-display-only");
        item.pages = components;
      });
    }

    function jsonToCss(jsonStyles) {
      if (jsonStyles.length === 0) return;
      return jsonStyles
        .map((styleObj) => {
          const selectors = styleObj.selectors.join(", ");
          const styles = Object.entries(styleObj.style)
            .map(([key, value]) => {
              return `${key}: ${value};`;
            })
            .join(" ");
          return `${selectors} { ${styles} }`;
        })
        .join(" ");
    }

   // const stylesJson = editor.getStyle();
    //const projectCss = jsonToCss(JSON.parse(JSON.stringify(stylesJson, null, 0)));
    //const projectJsonAndCss = JSON.stringify(jsonAll, null, 0);
    const projectJsonAndCss = jsonAll;
    return { json: projectJsonAndCss/* , css: projectCss */ };
  }/* ,

  setProjectJson: (editor, value) => {
    try {
      console.log('setProjectJson');
      const jsonInput = JSON.parse(value);
      const pages = editor.Pages.getAll();
      pages.map((page) => editor.Pages.remove(page.id));
      jsonInput.forEach((pageData) => {
        const page = editor.Pages.add({ name: pageData.name });
        editor.Pages.select(page);
        editor.setComponents(pageData.pages);
        editor.setStyle(pageData.css);
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }, */
};

export default JsonProjectService;
