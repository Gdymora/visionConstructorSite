import type { Editor } from "grapesjs";
import { ReactExportOptions, ComponentInfo, ReactExportRootType } from '../types';

import { 
  createSafeComponentName, 
  createSafeFileName, 
  hasInteractiveElements,
  generatePackageJson,
  generateTailwindConfig,
  generatePostCSSConfig
} from './utils';
import { HtmlToTsxConverter } from "./htmlToJsx";

/**
 * Генератор React компонентів з GrapesJS
 */
export class ReactComponentGenerator {
  private editor: Editor;
  private options: ReactExportOptions;

  constructor(editor: Editor, options: ReactExportOptions) {
    this.editor = editor;
    this.options = options;
  }

  /**
   * Головний метод генерації проекту
   */
  async generateProject(): Promise<ReactExportRootType> {
    const projectStructure: ReactExportRootType = {
      src: {
        components: {},
        styles: {},
        'App.tsx': '',
        'index.tsx': '',
        'index.css': ''
      },
      public: {
        'index.html': this.generatePublicIndexHtml()
      },
      'package.json': JSON.stringify(generatePackageJson('grapesjs-react-export'), null, 2),
      'tailwind.config.js': generateTailwindConfig(),
      'postcss.config.js': generatePostCSSConfig(),
      'tsconfig.json': this.generateTsConfig(),
      'README.md': this.generateReadme()
    };

    // Перевіряємо чи є сторінки
    const pages = this.editor.Pages ? this.editor.Pages.getAll() : null;
    const components: ComponentInfo[] = [];

    if (pages && pages.length > 0) {
      // Багатосторінковий проект
      const currentPage = this.editor.Pages.getSelected();

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        this.editor.Pages.select(page);

        const componentInfo = await this.generatePageComponent(page, i);
        components.push(componentInfo);
        
        // Додаємо компонент до структури
        (projectStructure.src as any).components[componentInfo.name] = {
          [`${componentInfo.name}.tsx`]: componentInfo.content,
          'index.ts': `export { default } from './${componentInfo.name}';`
        };
      }

      // Відновлюємо вибрану сторінку
      this.editor.Pages.select(currentPage);
    } else {
      // Односторінковий проект
      const componentInfo = await this.generateSinglePageComponent();
      components.push(componentInfo);
      
      (projectStructure.src as any).components[componentInfo.name] = {
        [`${componentInfo.name}.tsx`]: componentInfo.content,
        'index.ts': `export { default } from './${componentInfo.name}';`
      };
    }

    // Генеруємо App.tsx та index.tsx
    (projectStructure.src as any)['App.tsx'] = this.generateAppComponent(components);
    (projectStructure.src as any)['index.tsx'] = this.generateIndexFile();
    (projectStructure.src as any)['index.css'] = this.generateIndexCss();

    return projectStructure;
  }

  /**
   * Генерація компонента для сторінки
   */
  private async generatePageComponent(page: any, index: number): Promise<ComponentInfo> {
    const pageName = page.get('name') || `Page${index + 1}`;
    const componentName = createSafeComponentName(pageName);
    const safeName = createSafeFileName(pageName);

    const html = this.editor.getHtml();
    const css = this.editor.getCss();

    const converter = new HtmlToTsxConverter({
      componentName,
      includeTypes: this.options.includeTypes ?? true,
      includeReactImports: this.options.includeReactImports ?? true
    });

    const content = converter.convert(html, css);
    const hasInteractivity = hasInteractiveElements(html);

    return {
      name: componentName,
      safeName,
      content,
      path: `/${safeName}`,
      hasInteractivity
    };
  }

  /**
   * Генерація компонента для односторінкового проекту
   */
  private async generateSinglePageComponent(): Promise<ComponentInfo> {
    const componentName = 'HomePage';
    const safeName = 'home-page';

    const html = this.editor.getHtml();
    const css = this.editor.getCss();

    const converter = new HtmlToTsxConverter({
      componentName,
      includeTypes: this.options.includeTypes ?? true,
      includeReactImports: this.options.includeReactImports ?? true
    });

    const content = converter.convert(html, css);
    const hasInteractivity = hasInteractiveElements(html);

    return {
      name: componentName,
      safeName,
      content,
      path: '/',
      hasInteractivity
    };
  }

  /**
   * Генерація головного App компонента
   */
  private generateAppComponent(components: ComponentInfo[]): string {
    const imports = components
      .map(comp => `import ${comp.name} from './components/${comp.name}';`)
      .join('\n');

    if (components.length === 1) {
      // Односторінковий додаток
      return [
        "import React from 'react';",
        "import './index.css';",
        imports,
        '',
        'function App() {',
        '  return (',
        '    <div className="App">',
        `      <${components[0].name} />`,
        '    </div>',
        '  );',
        '}',
        '',
        'export default App;'
      ].join('\n');
    } else {
      // Багатосторінковий додаток з роутингом
      return [
        "import React from 'react';",
        "import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';",
        "import './index.css';",
        imports,
        '',
        'function App() {',
        '  return (',
        '    <Router>',
        '      <div className="App">',
        '        <nav className="bg-gray-800 text-white p-4">',
        '          <div className="container mx-auto">',
        '            <div className="flex space-x-4">',
        ...components.map(comp => 
          `              <Link to="${comp.path}" className="hover:text-gray-300">${comp.name}</Link>`
        ),
        '            </div>',
        '          </div>',
        '        </nav>',
        '',
        '        <main>',
        '          <Routes>',
        ...components.map(comp => 
          `            <Route path="${comp.path}" element={<${comp.name} />} />`
        ),
        '          </Routes>',
        '        </main>',
        '      </div>',
        '    </Router>',
        '  );',
        '}',
        '',
        'export default App;'
      ].join('\n');
    }
  }

  /**
   * Генерація index.tsx файлу
   */
  private generateIndexFile(): string {
    return [
      "import React from 'react';",
      "import { createRoot } from 'react-dom/client';",
      "import './index.css';",
      "import App from './App';",
      '',
      "const container = document.getElementById('root');",
      'if (!container) throw new Error("Root container missing in index.html");',
      '',
      'const root = createRoot(container);',
      'root.render(',
      '  <React.StrictMode>',
      '    <App />',
      '  </React.StrictMode>',
      ');'
    ].join('\n');
  }

  /**
   * Генерація index.css з Tailwind
   */
  private generateIndexCss(): string {
    return [
      '@tailwind base;',
      '@tailwind components;',
      '@tailwind utilities;',
      '',
      '/* Custom styles generated from GrapesJS */',
      this.editor.getCss()
    ].join('\n');
  }

  /**
   * Генерація public/index.html
   */
  private generatePublicIndexHtml(): string {
    return [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '  <head>',
      '    <meta charset="utf-8" />',
      '    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />',
      '    <meta name="viewport" content="width=device-width, initial-scale=1" />',
      '    <meta name="theme-color" content="#000000" />',
      '    <meta name="description" content="React app generated from GrapesJS" />',
      '    <title>React App - Generated from GrapesJS</title>',
      '  </head>',
      '  <body>',
      '    <noscript>You need to enable JavaScript to run this app.</noscript>',
      '    <div id="root"></div>',
      '  </body>',
      '</html>'
    ].join('\n');
  }

  /**
   * Генерація tsconfig.json
   */
  private generateTsConfig(): string {
    return JSON.stringify({
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "es6"],
        allowJs: true,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        noFallthroughCasesInSwitch: true,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx"
      },
      include: ["src"]
    }, null, 2);
  }

  /**
   * Генерація README.md
   */
  private generateReadme(): string {
    return [
      '# React App - Generated from GrapesJS',
      '',
      'This project was generated from GrapesJS editor and converted to React components.',
      '',
      '## Getting Started',
      '',
      '1. Install dependencies:',
      '```bash',
      'npm install',
      '```',
      '',
      '2. Start the development server:',
      '```bash',
      'npm start',
      '```',
      '',
      '3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.',
      '',
      '## Technologies Used',
      '',
      '- React 18',
      '- TypeScript',
      '- Tailwind CSS',
      '- React Router (for multi-page projects)',
      '',
      '## Project Structure',
      '',
      '- `src/components/` - React components generated from GrapesJS',
      '- `src/App.tsx` - Main application component',
      '- `src/index.tsx` - Application entry point',
      '- `src/index.css` - Global styles including Tailwind CSS',
      '',
      '## Note',
      '',
      'This is an automatically generated project. You may need to:',
      '- Implement interactive functionality for buttons and forms',
      '- Add state management if needed',
      '- Customize styling and layout',
      '- Add proper TypeScript types for component props'
    ].join('\n');
  }
}