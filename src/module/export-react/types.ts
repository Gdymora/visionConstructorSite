import type { Editor } from "grapesjs";

export type ReactExportRootType = Record<string, unknown>;

export interface ReactExportOptions {
  /**
   * Add a button inside the export dialog
   * @default true
   */
  addExportBtn?: boolean;

  /**
   * Label of the export button
   * @default 'Export to React'
   */
  btnLabel?: string;

  /**
   * ZIP filename prefix
   * @default 'react_components'
   */
  filenamePfx?: string;

  /**
   * Use a function to generate the filename
   */
  filename?: (editor: Editor) => string;

  /**
   * Callback to execute once the export is completed
   */
  done?: () => void;

  /**
   * Callback to execute on export error
   */
  onError?: (error: Error) => void;

  /**
   * Include TypeScript types
   * @default true
   */
  includeTypes?: boolean;

  /**
   * Component naming strategy
   * @default 'PascalCase'
   */
  componentNaming?: 'PascalCase' | 'camelCase';

  /**
   * Export format
   * @default 'typescript'
   */
  exportFormat?: 'typescript' | 'javascript';

  /**
   * Include React imports
   * @default true
   */
  includeReactImports?: boolean;

  /**
   * Custom function for checking if the file content is binary
   */
  isBinary?: (content: string, name: string) => boolean;
}

export interface ComponentInfo {
  name: string;
  safeName: string;
  content: string;
  path: string;
  hasInteractivity: boolean;
}

export interface ConversionOptions {
  componentName: string;
  includeTypes: boolean;
  includeReactImports: boolean;
}