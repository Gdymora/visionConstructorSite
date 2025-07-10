export interface Resource {
    id?: number;
    type: 'style' | 'script' | 'font';
    url: string;
    priority?: number;
    is_active?: boolean;
  }
  
  export interface ResourceElement extends HTMLElement {
    href?: string;
    src?: string;
  }
  
  export interface ResourcesConfig {
    styles?: string[];
    scripts?: string[];
  }
  
  export interface ProjectJson {
    json: any[];
    resources?: {
      styles: string[];
      scripts: string[];
    };
  }