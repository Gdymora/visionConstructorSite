import { ConversionOptions } from '../types';
import { 
  convertHtmlAttributesToJSX, 
  cleanHtml, 
  hasInteractiveElements 
} from './utils';

/**
 * Список самозакриваючих тегів в HTML/JSX
 */
const SELF_CLOSING_TAGS = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 
  'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'
];

/**
 * Перетворення HTML в JSX
 */
export class HtmlToTsxConverter {
  private options: ConversionOptions;

  constructor(options: ConversionOptions) {
    this.options = options;
  }

  /**
   * Основний метод конвертації HTML в TSX
   */
  convert(html: string, css?: string): string {
    // Очищаємо HTML
    const cleanedHtml = cleanHtml(html);
    
    // Конвертуємо атрибути
    let jsxContent = this.convertToJSX(cleanedHtml);
    
    // Виправляємо самозакриваючі теги
    jsxContent = this.fixSelfClosingTags(jsxContent);
    
    // Обробляємо інтерактивні елементи
    jsxContent = this.processInteractiveElements(jsxContent);
    
    // Генеруємо повний компонент
    return this.generateComponent(jsxContent, css);
  }

  /**
   * Конвертація HTML атрибутів в JSX
   */
  private convertToJSX(html: string): string {
    let jsx = html;
    
    // Видаляємо html, head, body теги якщо вони є
    jsx = jsx.replace(/<\/?(?:html|head|body)[^>]*>/gi, '');
    
    // Конвертуємо атрибути HTML в JSX
    jsx = convertHtmlAttributesToJSX(jsx);
    
    // Обробляємо style атрибути (конвертуємо в об'єкт)
    jsx = this.convertStyleAttributes(jsx);
    
    // Видаляємо небезпечні HTML коментарі
    jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
    
    return jsx;
  }

  /**
   * Виправлення самозакриваючих тегів для JSX
   */
  private fixSelfClosingTags(jsx: string): string {
    SELF_CLOSING_TAGS.forEach(tag => {
      // Додаємо / перед > якщо його немає
      const regex = new RegExp(`<${tag}([^>]*[^/])>`, 'gi');
      jsx = jsx.replace(regex, `<${tag}$1 />`);
      
      // Видаляємо закриваючі теги
      const closeRegex = new RegExp(`</${tag}>`, 'gi');
      jsx = jsx.replace(closeRegex, '');
    });
    
    return jsx;
  }

  /**
   * Конвертація style атрибутів в JSX style об'єкти
   */
  private convertStyleAttributes(jsx: string): string {
    return jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
      const styleObj = this.parseStyleString(styleString);
      const styleObjectString = JSON.stringify(styleObj)
        .replace(/"/g, "'")
        .replace(/'/g, '"');
      return `style={${styleObjectString}}`;
    });
  }

  /**
   * Парсинг CSS рядка в JavaScript об'єкт
   */
  private parseStyleString(styleString: string): Record<string, string> {
    const styles: Record<string, string> = {};
    
    styleString.split(';').forEach(declaration => {
      const [property, value] = declaration.split(':').map(s => s.trim());
      if (property && value) {
        // Конвертуємо kebab-case в camelCase
        const camelProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        styles[camelProperty] = value;
      }
    });
    
    return styles;
  }

  /**
   * Обробка інтерактивних елементів
   */
  private processInteractiveElements(jsx: string): string {
    // Замінюємо onclick на onClick з правильним синтаксисом
    jsx = jsx.replace(/onclick="([^"]*)"/gi, 'onClick={() => {/* TODO: Implement handler */}}');
    
    // Обробляємо форми
    jsx = jsx.replace(/onsubmit="([^"]*)"/gi, 'onSubmit={(e) => {e.preventDefault(); /* TODO: Implement handler */}}');
    
    // Обробляємо зміни в input
    jsx = jsx.replace(/onchange="([^"]*)"/gi, 'onChange={(e) => {/* TODO: Implement handler */}}');
    
    return jsx;
  }

  /**
   * Генерація повного React компонента
   */
  private generateComponent(jsxContent: string, css?: string): string {
    const { componentName, includeTypes, includeReactImports } = this.options;
    
    const imports = this.generateImports();
    const componentDeclaration = this.generateComponentDeclaration(jsxContent);
    const exportStatement = `export default ${componentName};`;
    
    return [
      imports,
      '',
      componentDeclaration,
      '',
      exportStatement
    ].join('\n');
  }

  /**
   * Генерація імпортів
   */
  private generateImports(): string {
    const { includeReactImports } = this.options;
    
    const imports = [];
    
    if (includeReactImports) {
      imports.push("import React from 'react';");
    }
    
    return imports.join('\n');
  }

  /**
   * Генерація декларації компонента
   */
  private generateComponentDeclaration(jsxContent: string): string {
    const { componentName, includeTypes } = this.options;
    
    // Перевіряємо чи потрібні пропси
    const needsProps = this.checkIfNeedsProps(jsxContent);
    
    if (includeTypes && needsProps) {
      const propsInterface = this.generatePropsInterface();
      const componentSignature = `const ${componentName}: React.FC<${componentName}Props> = (props) => {`;
      
      return [
        propsInterface,
        '',
        componentSignature,
        '  return (',
        this.indentJSX(jsxContent, 4),
        '  );',
        '};'
      ].join('\n');
    } else if (includeTypes) {
      const componentSignature = `const ${componentName}: React.FC = () => {`;
      
      return [
        componentSignature,
        '  return (',
        this.indentJSX(jsxContent, 4),
        '  );',
        '};'
      ].join('\n');
    } else {
      const componentSignature = `const ${componentName} = () => {`;
      
      return [
        componentSignature,
        '  return (',
        this.indentJSX(jsxContent, 4),
        '  );',
        '};'
      ].join('\n');
    }
  }

  /**
   * Генерація інтерфейсу для пропсів
   */
  private generatePropsInterface(): string {
    const { componentName } = this.options;
    
    return [
      `interface ${componentName}Props {`,
      '  // TODO: Define component props here',
      '  className?: string;',
      '}'
    ].join('\n');
  }

  /**
   * Перевірка чи потрібні пропси для компонента
   */
  private checkIfNeedsProps(jsxContent: string): boolean {
    // Поки що повертаємо false, пізніше можемо додати логіку
    // для автоматичного визначення необхідних пропсів
    return false;
  }

  /**
   * Додавання відступів до JSX коду
   */
  private indentJSX(jsx: string, spaces: number): string {
    const indent = ' '.repeat(spaces);
    return jsx
      .split('\n')
      .map(line => line.trim() ? indent + line : line)
      .join('\n');
  }
}