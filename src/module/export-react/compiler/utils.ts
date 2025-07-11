/**
 * Утіліти для React Export плагіну
 */

/**
 * Створює безпечне ім'я компонента для React
 */
export const createSafeComponentName = (name: string): string => {
  return name
    .replace(/[^a-zA-Z0-9]/g, ' ') // Замінюємо спеціальні символи на пробіли
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('') || 'Component';
};

/**
 * Створює безпечне ім'я файлу
 */
export const createSafeFileName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/^\//g, '') // Видаляємо початковий слеш
    .replace(/\//g, '-') // Замінюємо слеші на дефіси
    .replace(/[^a-z0-9-]/g, '') // Видаляємо небезпечні символи
    .replace(/^-+|-+$/g, '') || // Видаляємо дефіси на початку і в кінці
    'component';
};

/**
 * Екранування спеціальних символів у JSX рядках
 */
export const escapeJSX = (text: string): string => {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
};

/**
 * Очищення HTML від небажаних атрибутів та тегів
 */
export const cleanHtml = (html: string): string => {
  return html
    // Видаляємо DOCTYPE
    .replace(/<\!DOCTYPE[^>]*>/i, '')
    // Видаляємо коментарі
    .replace(/<!--[\s\S]*?-->/g, '')
    // Видаляємо порожні рядки та зайві пробіли
    .replace(/\n\s*\n/g, '\n')
    .replace(/^\s+|\s+$/gm, '')
    .trim();
};

/**
 * Конвертація HTML атрибутів в JSX атрибути
 */
export const convertHtmlAttributesToJSX = (html: string): string => {
  return html
    // class → className
    .replace(/\s+class=/g, ' className=')
    // for → htmlFor (для label)
    .replace(/\s+for=/g, ' htmlFor=')
    // Конвертуємо kebab-case атрибути в camelCase
    .replace(/\s+([\w-]+)=/g, (match, attr) => {
      const jsxAttr = attr.replace(/-([a-z])/g, (g: string) => g[1].toUpperCase());
      return ` ${jsxAttr}=`;
    });
};

/**
 * Перевірка чи містить HTML інтерактивні елементи
 */
export const hasInteractiveElements = (html: string): boolean => {
  const interactiveElements = [
    '<button', '<input', '<select', '<textarea', 
    '<form', '<a href', 'onclick=', 'onchange=', 
    'onsubmit=', 'onload='
  ];
  
  return interactiveElements.some(element => 
    html.toLowerCase().includes(element)
  );
};

/**
 * Генерація базового package.json для React проекту
 */
export const generatePackageJson = (projectName: string) => {
  const packageName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  
  return {
    name: packageName,
    version: "0.1.0",
    private: true,
    dependencies: {
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1"
    },
    devDependencies: {
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^4.9.5",
      "tailwindcss": "^3.3.0",
      "autoprefixer": "^10.4.14",
      "postcss": "^8.4.24"
    },
    scripts: {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    eslintConfig: {
      extends: [
        "react-app",
        "react-app/jest"
      ]
    },
    browserslist: {
      production: [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      development: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  };
};

/**
 * Генерація Tailwind конфігурації
 */
export const generateTailwindConfig = () => {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;
};

/**
 * Генерація PostCSS конфігурації
 */
export const generatePostCSSConfig = () => {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;
};