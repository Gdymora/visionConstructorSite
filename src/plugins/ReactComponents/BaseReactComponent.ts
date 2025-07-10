import ReactDOM from 'react-dom';
import React from 'react';
import { createRoot } from 'react-dom/client';

const BaseReactComponent = (editor) => {
  const domc = editor.Components;
  const defType = domc.getType('default');
  const defModel = defType.model;
  const wrpChld = 'data-chld';

  // Main React component
  domc.addType('react-component', {
    model: {
      toHTML(opts = {}) {
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get('type')
        });
      }
    },
    view: {
      tagName: 'div',

      init() {
        const { model } = this;
        this.listenTo(model, 'change:attributes', this.render);
        this.listenTo(model.components(), 'add remove reset', this.__upRender);
      },

      getChildrenContainer() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement('childc');

        return this.childrenContainer;
      },

      /**
       * We need this container to understand if the React component is able
       * to render children
       */
      createReactChildWrap() {
        return React.createElement('span', { [wrpChld]: true });
      },

      createReactEl(cmp, props) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },

      mountReact(cmp, el) {
        const root = createRoot(el); // Створюємо root для компонента
        root.render(cmp); // Рендеримо компонент використовуючи createRoot API
      },

      render() {
        const { model, el } = this;
        this.updateAttributes();
        this.renderChildren();
        const reactEl = this.createReactEl(model.get('component'), {
          ...model.get('attributes')
        });
        console.log(model.get('attributes'))
        this.mountReact(reactEl, el);
        const chld = el.querySelector(`span[${wrpChld}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainer();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }

        return this;
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.render());
      }
    }
  });
};
export default BaseReactComponent;

/* 

  Компонент BaseReactComponent слугує як базовий компонент для інтеграції React компонентів у GrapesJS.
Ось основні аспекти та функціональність BaseReactComponent:
  Визначення тегу та рендеринг HTML: Він переоприділяє метод toHTML, щоб визначити, як модель повинна бути перетворена у HTML. Це важливо для експорту та збереження створеного контенту.
Ініціалізація та прослуховування змін: У методі init він налаштовує прослуховування змін атрибутів моделі та змін у компонентах. Це забезпечує оновлення React компонента при змінах у редакторі.
Визначення контейнера для children: Метод getChildrenContainer створює та повертає контейнер для дочірніх елементів. Це важливо для React компонентів, які підтримують дочірні компоненти.
Створення та монтування React елементу: У render методі створюється React елемент із відповідними пропсами, які передаються з моделі GrapesJS, а потім він монтується у DOM.
Оновлення рендерингу: Метод __upRender визначає логіку для асинхронного оновлення рендерингу, забезпечуючи, що React компонент відображатиме актуальний стан.
Цей базовий компонент є ключовим для інтеграції React в GrapesJS, оскільки він дозволяє використовувати React компоненти як частини сторінки або шаблону, 
які можуть бути візуально редаговані в GrapesJS. Завдяки цьому можна комбінувати потужні можливості React з гнучкістю візуального редактора GrapesJS,
 створюючи інтерактивні веб-дизайни та додатки.
*/