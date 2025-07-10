// types/index.ts

// Базові інтерфейси даних
export interface CardData {
  title: string;
  description: string;
  backTitle: string;
  backDescription: string;
}

// Конфігурація стилів
export interface StylesConfig {
  duration: number;
  distance: number;
  initialSpacing: number;
  rotation: number;
  scale: number;
  shadow: number;
  timingFunction: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double'; // Уточнюємо тип
  borderColor: string;
  gradientAnimation: boolean;
  gradientSpeed: number;
  gradientDirection: number;
  gradientColorCount: number;
  gradientColors: string[];
  gradientRepeat: boolean;
   
  flipDuration: number; 
  hoverAnimationDuration: number;
  borderGradient: boolean;
  borderGradientDirection: number;
  borderGradientColors: string[];
  borderGradientColorCount: number;
  borderGradientRepeat: boolean;
  borderGradientSpeed: number;
   // Налаштування появи
  fadeInAnimation: boolean;
  fadeInDuration: number;
  
  // Налаштування ховера
  hoverAnimation: boolean;
  hoverDuration: number;
  hoverTransform: 'scale' | 'translateY' | 'both';
  hoverScale: number;
  hoverTranslateY: number;
}

// Пропси для основного компонента CardAnimator
export interface CardAnimatorProps {
  cards: CardData[];
  initialStyles?: Partial<StylesConfig>;
  onStylesChange?: (styles: StylesConfig) => void;
  className?: string;
}

// Пропси для компонента Card
export interface CardProps {
  data: CardData;
  index: number;
  styles: StylesConfig;
  isAnimated: boolean;
}

// Пропси для ConfigPanel
export interface ConfigPanelProps {
  styles: StylesConfig;
  onStylesChange: (newStyles: StylesConfig) => void;
  onAnimateClick: () => void;
}

// Пропси для CodePanel
export interface CodePanelProps {
  styles: StylesConfig;
}

// Інтерфейси для стилізованих компонентів
export interface StyledCardProps {
  $isAnimated?: boolean;
  $index?: number;
  $styles?: StylesConfig;
  $visible?: boolean;
}

// Типи для інпутів конфігурації
export type ConfigInputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export type ConfigInputType =
  | 'range'
  | 'color'
  | 'checkbox'
  | 'select';

export interface ConfigInputProps {
  label: string;
  type: ConfigInputType;
  value: string | number | boolean;
  onChange: (value: any) => void;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ value: string; label: string }>;
}

// Переконуємося, що defaultStyles містить всі необхідні поля
export const defaultStyles: StylesConfig = {
  duration: 1,
  distance: 300,
  initialSpacing: 0,
  rotation: 10,
  scale: 1.1,
  shadow: 10,
  timingFunction: 'ease-out',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#4299e1',
  gradientAnimation: false,
  gradientSpeed: 5,
  gradientDirection: 45,
  gradientColorCount: 3,
  gradientColors: ['#2d3748', '#4a5568', '#718096', '#a0aec0', '#cbd5e0'],
  gradientRepeat: false,
  flipDuration: 0.8,
  hoverAnimationDuration: 1,
  borderGradient: false,
  borderGradientDirection: 45,
  borderGradientColors: ['#4299e1', '#667eea', '#764ba2', '#6B8DD6', '#8E37D7'],
  borderGradientColorCount: 2,
  borderGradientRepeat: false,
  borderGradientSpeed: 3,

  fadeInAnimation: false,
  fadeInDuration: 0.5,
  
  hoverAnimation: false,
  hoverDuration: 1,
  hoverTransform: 'both',
  hoverScale: 1.05,
  hoverTranslateY: -5,
};

// Допоміжна функція для злиття стилів (можна використовувати за потреби)
export const mergeStyles = (initial?: Partial<StylesConfig>): StylesConfig => ({
  ...defaultStyles,
  ...initial
});

// Константи для конфігурації
export const TIMING_FUNCTIONS = [
  { value: 'ease-out', label: 'ease-out' },
  { value: 'ease-in', label: 'ease-in' },
  { value: 'ease-in-out', label: 'ease-in-out' },
  { value: 'linear', label: 'linear' },
  { value: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', label: 'bounce' }
];

export const BORDER_STYLES = [
  { value: 'solid', label: 'Суцільний' },
  { value: 'dashed', label: 'Пунктирний' },
  { value: 'dotted', label: 'Точковий' },
  { value: 'double', label: 'Подвійний' }
];

export const GRADIENT_COLOR_COUNTS = [
  { value: '2', label: '2 кольори' },
  { value: '3', label: '3 кольори' },
  { value: '4', label: '4 кольори' },
  { value: '5', label: '5 кольорів' }
];

export interface CardAnimatorProps {
  cards: CardData[];
  initialStyles?: Partial<StylesConfig>; // явно позначаємо як опціональний і частковий
  onStylesChange?: (styles: StylesConfig) => void;
  className?: string;
}

