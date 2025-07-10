// CardAnimator.tsx
import React, { useState, useCallback } from 'react';
import { Card, ConfigPanel, CodePanel } from './components';
import { CardAnimatorProps, StylesConfig, defaultStyles } from './types';
import { 
  LayoutGrid, 
  CardsContainer, 
  BottomContainer,
  CodeContainer,
  ConfigContainer 
} from './styles';

export const CardAnimator: React.FC<CardAnimatorProps> = ({ 
  cards,
  initialStyles = {},
  onStylesChange,
  className 
}) => {
  const [styles, setStyles] = useState<StylesConfig>(() => ({
    ...defaultStyles,
    ...initialStyles
  }));
  const [isAnimated, setIsAnimated] = useState(false);

  const handleStylesChange = useCallback((newStyles: StylesConfig) => {
    setStyles(newStyles);
    onStylesChange?.(newStyles);
  }, [onStylesChange]);

  const handleAnimateClick = useCallback(() => {
    setIsAnimated(prev => !prev);
  }, []);

  return (
    <LayoutGrid className={className}>
      <CardsContainer>
        <div className="cards">
          {cards.map((card, index) => (
            <Card
              key={index}
              data={card}
              index={index}
              styles={styles}
              isAnimated={isAnimated}
            />
          ))}
        </div>
      </CardsContainer>
      
      <BottomContainer>
        <CodeContainer>
          <CodePanel styles={styles} />
        </CodeContainer>
        
        <ConfigContainer>
          <ConfigPanel 
            styles={styles} 
            onStylesChange={handleStylesChange}
            onAnimateClick={handleAnimateClick}
          />
        </ConfigContainer>
      </BottomContainer>
    </LayoutGrid>
  );
};