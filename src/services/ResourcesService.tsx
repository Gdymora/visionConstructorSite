// ResourcesService.ts
import { Editor, EditorConfig } from 'grapesjs';

interface Resource {
  type: "style" | "script" | "font";
  url: string;
  is_active?: boolean;
}

interface CustomEditorConfig extends EditorConfig {
  canvas?: {
    styles?: string[];
    scripts?: string[];
  };
}

const ResourcesService = {
  addResource: (editor: Editor, resource: Resource) => {
    const canvas = editor.Canvas.getDocument();
    const head = canvas.head;
    let element: HTMLElement | null = null;
    console.log('Adding resource:', resource);
    // Створюємо елемент залежно від типу
    if (resource.type === 'script') {
      element = canvas.createElement('script');
      (element as HTMLScriptElement).src = resource.url;
    } else {
      element = canvas.createElement('link');
      (element as HTMLLinkElement).rel = 'stylesheet';
      (element as HTMLLinkElement).href = resource.url;
    }

    // Додаємо атрибути для відстеження стану
    element.setAttribute('data-resource', 'true');
    element.setAttribute('data-resource-type', resource.type);
    element.setAttribute('data-resource-active', String(resource.is_active));

    if (resource.is_active === false) {
      element.setAttribute('disabled', 'true');
    }

    head.appendChild(element);
    console.log('Resource added:', element); 
    // Оновлюємо конфігурацію редактора
    const config = editor.getConfig() as CustomEditorConfig;
    if (!config.canvas) config.canvas = {};

    if (resource.type === 'script') {
      if (!config.canvas.scripts) config.canvas.scripts = [];
      config.canvas.scripts.push(resource.url);
    } else {
      if (!config.canvas.styles) config.canvas.styles = [];
      config.canvas.styles.push(resource.url);
    }
  },

  removeResource: (editor: Editor, url: string) => {
    const canvas = editor.Canvas.getDocument();
    const head = canvas.head;
    const element = head.querySelector(`[href="${url}"], [src="${url}"]`);

    if (element) {
      element.remove();

      // Оновлюємо конфігурацію редактора
      const config = editor.getConfig() as CustomEditorConfig;
      if (config.canvas) {
        if (config.canvas.styles) {
          config.canvas.styles = config.canvas.styles.filter(u => u !== url);
        }
        if (config.canvas.scripts) {
          config.canvas.scripts = config.canvas.scripts.filter(u => u !== url);
        }
      }
    }
  },

  getResources: (editor: Editor): Resource[] => {
    const canvas = editor.Canvas.getDocument();
    const head = canvas.head;

    const styles = Array.from(
      head.querySelectorAll('link[rel="stylesheet"]')
    ).map((link) => ({
      type: "style" as const,
      url: (link as HTMLLinkElement).href,
      is_active: !link.hasAttribute('disabled')
    }));

    const scripts = Array.from(
      head.querySelectorAll('script[src]')
    ).map((script) => ({
      type: "script" as const,
      url: (script as HTMLScriptElement).src,
      is_active: !script.hasAttribute('disabled')
    }));

    return [...styles, ...scripts];
  },

  updateResourceState: (editor: Editor, url: string, isActive: boolean) => {
    const canvas = editor.Canvas.getDocument();
    const head = canvas.head;
    const element = head.querySelector(`[href="${url}"], [src="${url}"]`);

    if (element) {
      element.setAttribute('data-resource-active', String(isActive));
      if (isActive) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', 'true');
      }
    }
  }
};

export default ResourcesService;