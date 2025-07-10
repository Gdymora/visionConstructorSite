// components/Card/Card.tsx
import React from 'react';
import { CardProps } from '../../types';
import { 
  CardWrapper, 
  CardInner, 
  CardFront, 
  CardBack, 
  Title, 
  Description 
} from './styles';

export const Card: React.FC<CardProps> = ({ 
  data, 
  index, 
  styles, 
  isAnimated 
}) => {
  return (
    <CardWrapper 
      $index={index}
      $styles={styles}
      $isAnimated={isAnimated}
    >
      <CardInner>
        <CardFront $styles={styles}>
          <Title>{data.title}</Title>
          <Description>{data.description}</Description>
        </CardFront>
        <CardBack>
          <Title>{data.backTitle}</Title>
          <Description>{data.backDescription}</Description>
        </CardBack>
      </CardInner>
    </CardWrapper>
  );
};