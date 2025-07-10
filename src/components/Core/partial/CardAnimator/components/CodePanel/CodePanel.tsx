// components/CodePanel/CodePanel.tsx
import React from 'react';
import { CodePanelProps } from '../../types';
import { Panel, CodeOutput, CopyButton } from './styles';

// components/CodePanel/CodePanel.tsx
export const CodePanel: React.FC<CodePanelProps> = ({ styles }) => {
  const generateCSS = () => {
    const css = `
/* Базові стилі */
.card {
    transition: all ${styles.duration}s ${styles.timingFunction};
    box-shadow: 0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0, 0, 0, 0.1);
}

/* Початкове положення */
.card:nth-child(1) { transform: translateX(-${styles.initialSpacing}px) rotate(${styles.rotation}deg); }
.card:nth-child(2) { transform: translateX(0) rotate(${-styles.rotation / 2}deg); }
.card:nth-child(3) { transform: translateX(${styles.initialSpacing}px) rotate(${-styles.rotation}deg); }

/* Анімоване положення */
.container.animate .card:nth-child(1) { transform: translate(calc(-50% - ${styles.distance}px), -50%) rotate(0deg); }
.container.animate .card:nth-child(2) { transform: translate(-50%, -50%) rotate(0deg); }
.container.animate .card:nth-child(3) { transform: translate(calc(-50% + ${styles.distance}px), -50%) rotate(0deg); }

.card-front {
    ${styles.borderGradient 
      ? `position: relative;
         background: ${styles.gradientAnimation
           ? `linear-gradient(${styles.gradientDirection}deg, ${styles.gradientColors.slice(0, styles.gradientColorCount).join(', ')})`
           : styles.gradientColors[0]};
        }

        .card-front:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 0.5rem;
          border-style: ${styles.borderStyle};
          border-width: ${styles.borderWidth}px;
          background: linear-gradient(${styles.borderGradientDirection}deg, ${styles.borderGradientColors.slice(0, styles.borderGradientColorCount).join(', ')});
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          ${styles.borderGradientRepeat ? `animation: borderGradient ${styles.borderGradientSpeed}s linear infinite;` : ''}`
      : `border: ${styles.borderWidth}px ${styles.borderStyle} ${styles.borderColor};
         background: ${styles.gradientAnimation
           ? `linear-gradient(${styles.gradientDirection}deg, ${styles.gradientColors.slice(0, styles.gradientColorCount).join(', ')})`
           : styles.gradientColors[0]};`
    }

    ${styles.gradientAnimation && styles.gradientRepeat
      ? `background-size: 200% 200%;
         animation: ${styles.gradientRepeat ? `gradientAnimation ${styles.gradientSpeed}s ease infinite` : 'none'};`
      : ''
    }

    ${styles.fadeInAnimation
      ? `opacity: 0;
         animation: fadeIn ${styles.fadeInDuration}s forwards;`
      : ''
    }
}

/* Анімації */
@keyframes fadeIn {
    from { 
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

${styles.hoverAnimation ? `
@keyframes hover {
    0% { transform: scale(1)${styles.hoverTransform.includes('translateY') ? ' translateY(0)' : ''}; }
    50% { transform: scale(${styles.hoverScale})${styles.hoverTransform.includes('translateY') ? ` translateY(${styles.hoverTranslateY}px)` : ''}; }
    100% { transform: scale(1)${styles.hoverTransform.includes('translateY') ? ' translateY(0)' : ''}; }
}

.card:hover {
    animation: hover ${styles.hoverDuration}s ease-in-out infinite;
}` : ''}

${styles.gradientAnimation && styles.gradientRepeat ? `
@keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}` : ''}

${styles.borderGradient && styles.borderGradientRepeat ? `
@keyframes borderGradient {
    0% {
        background: linear-gradient(${styles.borderGradientDirection}deg, ${styles.borderGradientColors.slice(0, styles.borderGradientColorCount).join(', ')});
    }
    50% {
        background: linear-gradient(${styles.borderGradientDirection + 180}deg, ${styles.borderGradientColors.slice(0, styles.borderGradientColorCount).join(', ')});
    }
    100% {
        background: linear-gradient(${styles.borderGradientDirection + 360}deg, ${styles.borderGradientColors.slice(0, styles.borderGradientColorCount).join(', ')});
    }
}` : ''}
`.trim();

    return css;
  };

  return (
    <Panel>
      <h3>Згенерований CSS</h3>
      <CodeOutput>{generateCSS()}</CodeOutput>
      <CopyButton onClick={() => {
        navigator.clipboard.writeText(generateCSS());
        alert('CSS скопійовано в буфер обміну!');
      }}>
        Копіювати CSS
      </CopyButton>
    </Panel>
  );
};