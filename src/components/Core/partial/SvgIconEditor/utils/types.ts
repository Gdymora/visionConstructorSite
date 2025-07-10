export interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
  type: 'single' | 'multiple';
}
export interface Point {
  x: number;
  y: number;
  handleIn?: {
      x: number;
      y: number;
  };
  handleOut?: {
      x: number;
      y: number;
  };
  type?: "line" | "curve";
  controlPoints?: Point[];
}

export interface Transform {
  translate: Point;
  rotate: number;
  scale: Point;
}
export interface ControlPointsProps {
  element: PathElement;
  onStartTransform: (type: TransformationType, point: Point, centerPoint: Point) => void;
}
export interface PathStyle {
  strokeColor: string;
  strokeWidth: number;
  strokeOpacity: number; // додаємо прозорість для лінії
  fillColor: string;
  fill: boolean;
  fillOpacity: number; // перейменуємо opacity на fillOpacity
}

// Спочатку визначимо тип інструмента окремо від типу шляху
export type PathType =
  | 'line'
  | 'rect'
  | 'circle'
  | 'ellipse'
  | 'polygon'
  | 'star'
  | 'curve'
  | "pencil"
  | "pointShape"
  | "roundedRect"
  | "arc_left"
  | "arc_right"
  | 'path';

// Додамо тип для інструментів редактора
export type ToolType =
  | 'cursor'  // для виділення
  | PathType; // всі типи шляхів

  export interface PathElement {
    id: string;
    type: PathType;
    points: Point[];
    style?: PathStyle;
    transform?: Transform;
    isVisible?: boolean;
    isLocked?: boolean;
    groupId?: string;
    data?: {
        pathData?: string;
        isClosed?: boolean;
        tension?: number;
        sides?: number;
        starPoints?: number;
        innerRadius?: number;
        outerRadius?: number;
        cornerRadius?: number;
        startAngle?: number;
        endAngle?: number;
        [key: string]: any;
    };
    zIndex?:number;
}

export interface ToolPanelProps {
  selectedTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  pathStyle: PathStyle;
  onStyleChange: (updates: Partial<PathStyle>) => void;
  onShapeDataChange: (updates: Partial<ShapeData>) => void;
  shapeData: ShapeData | null;  // Залишаємо для відстеження стану
}

export interface LayerReorderParams {
  sourceId: string;
  targetId: string;
}
export interface LayersPanelProps {
  elements: PathElement[];
  selectedIds: string[];
  onSelect: (ids: string[]) => void;
  onReorder: (sourceId: string, targetId: string) => void;
  onDelete: (ids: string[]) => void;
}
export interface CanvasProps {
  elements: PathElement[];
  selectedIds: string[];
  showGrid: boolean;
  gridSize: number;
  activeTool: PathType | "cursor";
  activeStyle: PathStyle;
  onSelect: (ids: string[] | ((prev: string[]) => string[])) => void;  // Оновлено тип
  onElementUpdate: (id: string, updates: Partial<PathElement>) => void;
  onElementAdd: (element: PathElement) => void;
  onCreateElement: (point: Point, type: PathType) => PathElement;
  onStyleChange?: (elementId: string, style: Partial<PathStyle>) => void;
}
export interface ShapeData {
  sides: number;
  starPoints: number;
  tension: number;
  closed: boolean;
  outerRadius?: number;
  innerRadius?: number;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
}

// Додаткові типи для різних функціональностей
export interface Group {
  id: string;
  name: string;
  elementIds: string[];
  isCollapsed?: boolean;
  isVisible?: boolean;
  isLocked?: boolean;
}

export interface EditorState {
  elements: PathElement[];
  selectedIds: string[];
  hoveredId: string | null;
  activeToolType: PathType;
  activeStyle: PathStyle;
  groups: { [key: string]: Group };
  gridSettings: {
    show: boolean;
    size: number;
    snap: boolean;
    showRulers: boolean;
  };
  viewSettings: {
    zoom: number;
    pan: Point;
    showBounds: boolean;
    showControlPoints: boolean;
  };
}

export type TransformationType = 'move' | 'rotate' | 'scale' | 'none';

export interface TransformState {
  type: TransformationType;
  startPoint: Point;
  centerPoint: Point;
  initialTransform: Transform;
  initialBounds: {
    width: number;
    height: number;
  };
}

export interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  center: Point;
}

export type AlignmentType =
  | 'left'
  | 'center'
  | 'right'
  | 'top'
  | 'middle'
  | 'bottom'
  | 'distribute-horizontal'
  | 'distribute-vertical';

export interface HistoryEntry {
  elements: PathElement[];
  selectedIds: string[];
  groups: { [key: string]: Group };
}

export type Operation = "union" | "subtract" | "intersect" | "exclude" | "divide" | "divide_blob";

// Типи для операцій з елементами
export interface PathOperation {
  type: 'add' | 'update' | 'delete' | 'reorder';
  elements: PathElement[];
}

// Типи для експорту/імпорту
export interface ExportOptions {
  format: 'svg' | 'png' | 'json';
  includeBackground?: boolean;
  width?: number;
  height?: number;
  scale?: number;
}

export interface ImportOptions {
  replaceExisting?: boolean;
  position?: Point;
  scale?: number;
}

// Типи для подій
export interface EditorEventMap {
  selectionChange: Set<string>;
  elementChange: PathOperation;
  toolChange: PathType;
  styleChange: PathStyle;
  viewChange: EditorState['viewSettings'];
  historyChange: { canUndo: boolean; canRedo: boolean };
}

// Типи помилок
export class EditorError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_OPERATION' | 'INVALID_ELEMENT' | 'INVALID_STATE',
    public details?: any
  ) {
    super(message);
    this.name = 'EditorError';
  }
}

// Константи
export const DEFAULT_STYLE: PathStyle = {
  strokeColor: '#000000',
  strokeWidth: 2,
  strokeOpacity: 1,
  fillColor: '#ffffff',
  fillOpacity: 1,
  fill: false
};

export const DEFAULT_TRANSFORM: Transform = {
  translate: { x: 0, y: 0 },
  rotate: 0,
  scale: { x: 1, y: 1 }
};

export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 10;
export const GRID_SIZES = [5, 10, 20, 50, 100];
export interface ScalePoint extends Point {
  scaleX: boolean;
  scaleY: boolean;
}