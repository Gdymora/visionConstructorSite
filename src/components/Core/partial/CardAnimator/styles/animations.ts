// src/components/CardAnimator/styles/animations.ts
import { keyframes } from 'styled-components';
import { StylesConfig } from '../types';

// Анімація градієнта
export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Анімація повороту картки
export const flipAnimation = keyframes`
  0% { transform: rotateY(0); }
  100% { transform: rotateY(180deg); }
`;

// Анімація появи картки
export const fadeInAnimation = keyframes`
from { 
  opacity: 0; 
  transform: translateY(20px); 
}
to { 
  opacity: 1; 
  transform: translateY(0); 
}
`;

// Анімація ховера 

export const createHoverAnimation = (scale: number, translateY: number) => keyframes`
  0% { 
    transform: scale(1) translateY(0); 
  }
  50% { 
    transform: scale(${scale}) translateY(${translateY}px); 
  }
  100% { 
    transform: scale(1) translateY(0); 
  }
`;
export const createBorderGradientAnimation = (colors: string[], direction: number) => keyframes`
  0% {
    background: linear-gradient(${direction}deg, ${colors.join(', ')});
  }
  50% {
    background: linear-gradient(${direction + 180}deg, ${colors.join(', ')});
  }
  100% {
    background: linear-gradient(${direction + 360}deg, ${colors.join(', ')});
  }
`;

export const getBorderGradientAnimation = (styles: StylesConfig) => {
    return createBorderGradientAnimation(
        styles.borderGradientColors.slice(0, styles.borderGradientColorCount),
        styles.borderGradientDirection
    );
};