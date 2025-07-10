export default (comps, config) => {
  const type = "tbody";
  const attrKey = config.attrTableBody;
  const classKey = config.classTableBody;

  const defaultComponent = comps.getType("tbody");
  const tableModel = defaultComponent.model;
  const tableView = defaultComponent.view;

  comps.addType(type, {
    model: {
      defaults: { ...tableModel.prototype.defaults, ...config.footerProps },
    },
    init() {
      const attrs = this.getAttributes();
      attrs[attrKey] = 1;
      this.setAttributes(attrs);
      classKey && this.addClass(classKey);
    },
    view: tableView,
    isComponent(el) {
      if (el.hasAttribute && el.hasAttribute(attrKey)) {
        return { type };
      }
    },
  });
};
