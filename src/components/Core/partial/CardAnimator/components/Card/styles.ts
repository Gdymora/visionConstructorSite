// src/components/CardAnimator/components/Card/styles.ts
import styled, { css } from 'styled-components';
import { StyledCardProps } from '../../types';
import {
  gradientAnimation, flipAnimation, fadeInAnimation, createHoverAnimation,
  getBorderGradientAnimation
} from '../../styles/animations';

export const CardWrapper = styled.div<StyledCardProps>`
  position: absolute;
  width: 18rem;
  height: 20rem;
  left: 30%;
  top: 30%;
  transform-style: preserve-3d;
  transition: all ${props => props.$styles?.duration || 1}s ${props => props.$styles?.timingFunction || 'ease-out'};
  z-index: ${props => props.$isAnimated ? 1 : 'auto'};

  ${({ $isAnimated, $index, $styles }) => {
    if ($isAnimated) {
      return css`
        transform: translate(
          ${$index === 0 ? '-' + ($styles?.distance || 0) :
          $index === 2 ? ($styles?.distance || 0) : 0}px,
          0
        ) rotate(0deg);
      `;
    }

    const translateX = $index === 0 ? -($styles?.initialSpacing || 0) :
      $index === 1 ? 0 :
        ($styles?.initialSpacing || 0);
    const rotation = $index === 1 ? -($styles?.rotation || 0) / 2 :
      $index === 2 ? -($styles?.rotation || 0) :
        ($styles?.rotation || 0);

    return css`
      transform: ${`translateX(${translateX}px) rotate(${rotation}deg)`};
    `;
  }}

  &:hover {
    z-index: 2;
  }
`;


export const CardInner = styled.div<StyledCardProps>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  ${CardWrapper}:hover & {
    animation: ${flipAnimation} 0.8s forwards;
  }
`;

export const CardSide = styled.div<StyledCardProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${props => `0 ${props.$styles?.shadow || 4}px ${(props.$styles?.shadow || 4) * 2}px rgba(0,0,0,0.1)`};
`;

export const CardFront = styled(CardSide)`
  ${props => {
    if (props.$styles?.borderGradient) {
      const gradientColors = props.$styles.borderGradientColors
        .slice(0, props.$styles.borderGradientColorCount)
        .join(', ');

        return css`
        position: relative;
        background: ${props.$styles?.gradientAnimation
          ? `linear-gradient(${props.$styles?.gradientDirection}deg, 
             ${props.$styles?.gradientColors.slice(0, props.$styles?.gradientColorCount).join(', ')})`
          : props.$styles?.gradientColors[0]};

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 0.5rem;
          padding: ${props.$styles.borderWidth}px;
          border-style: ${props.$styles.borderStyle}; // Додаємо стиль бордера
          background: linear-gradient(
            ${props.$styles.borderGradientDirection}deg,
            ${gradientColors}
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          
          // Додаємо специфічні стилі для dashed і dotted
          ${props.$styles.borderStyle === 'dashed' && css`
            border-style: dashed;
            border-width: ${props.$styles.borderWidth}px;
            padding: 0;
            background-clip: border-box;
          `}
          
          ${props.$styles.borderStyle === 'dotted' && css`
            border-style: dotted;
            border-width: ${props.$styles.borderWidth}px;
            padding: 0;
            background-clip: border-box;
          `}

          ${props.$styles.borderStyle === 'double' && css`
            border-width: ${props.$styles.borderWidth}px;
            border-style: double;
            padding: 0;
            background-clip: border-box;
          `}

          ${props.$styles.borderGradientRepeat && css`
            animation: ${getBorderGradientAnimation(props.$styles)} ${props.$styles.borderGradientSpeed}s linear infinite;
          `}
        }

        ${props.$styles?.gradientAnimation && props.$styles?.gradientRepeat && css`
          background-size: 200% 200%;
          animation: ${gradientAnimation} ${props.$styles?.gradientSpeed}s ease infinite;
        `}

        // Застосовуємо анімацію ховера тільки якщо вона включена
        ${props.$styles?.hoverAnimation && css`
          ${CardWrapper}:hover &:not(:has(animation)) {
            animation: ${createHoverAnimation(
            props.$styles.hoverScale,
            props.$styles.hoverTransform === 'both' || props.$styles.hoverTransform === 'translateY'
              ? props.$styles.hoverTranslateY
              : 0
          )} ${props.$styles.hoverDuration}s ease-in-out infinite;
          }
        `}
      `;
    }

    return css`
      border: ${props.$styles?.borderWidth}px ${props.$styles?.borderStyle} ${props.$styles?.borderColor};
      background: ${props.$styles?.gradientAnimation
        ? `linear-gradient(${props.$styles?.gradientDirection}deg, 
           ${props.$styles?.gradientColors.slice(0, props.$styles?.gradientColorCount).join(', ')})`
        : props.$styles?.gradientColors[0]};
      
      // Застосовуємо анімацію появи тільки якщо вона включена
      ${props.$styles?.fadeInAnimation ? css`
        opacity: 0;
        animation: ${fadeInAnimation} ${props.$styles.fadeInDuration}s forwards;
      ` : 'opacity: 1;'}

      ${props.$styles?.gradientAnimation && props.$styles?.gradientRepeat && css`
        background-size: 200% 200%;
        animation: ${gradientAnimation} ${props.$styles?.gradientSpeed}s ease infinite;
      `}

      // Застосовуємо анімацію ховера тільки якщо вона включена
      ${props.$styles?.hoverAnimation && css`
        ${CardWrapper}:hover &:not(:has(animation)) {
          animation: ${createHoverAnimation(
          props.$styles.hoverScale,
          props.$styles.hoverTransform === 'both' || props.$styles.hoverTransform === 'translateY'
            ? props.$styles.hoverTranslateY
            : 0
        )} ${props.$styles.hoverDuration}s ease-in-out infinite;
        }
      `}
    `;
  }}
`;

export const CardBack = styled(CardSide)`
  background: linear-gradient(135deg, #4a5568, #2b6cb0);
  transform: rotateY(180deg);
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: white;
`;

export const Description = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: white;
  margin: 0;
`;