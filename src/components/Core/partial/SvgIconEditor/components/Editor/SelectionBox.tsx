import React from 'react';
import { Point } from '@/components/Core/partial/SvgIconEditor/utils/types';

interface SelectionBoxProps {
  start: Point;
  end: Point;
}
/* Малюємо рамку з координатими для виділення області */
export const SelectionBox: React.FC<SelectionBoxProps> = ({ start, end }) => {
  // Розрахунок розмірів і позиції області виділення
  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);

  console.log("setSelectionBox");
  return (
    <g>
      {/* Напівпрозора область виділення */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#0066ff"
        fillOpacity={0.1}
        stroke="#0066ff"
        strokeWidth={1}
        strokeDasharray="4,4"
      />

      {/* Розміри області (опціонально) */}
      <text
        x={x + width / 2}
        y={y - 5}
        textAnchor="middle"
        fill="#0066ff"
        fontSize="12"
      >
        {`${Math.round(width)} × ${Math.round(height)}`}
      </text>
    </g>
  );
};

// Розширена версія з додатковими функціями
export interface SelectionBoxExtendedProps extends SelectionBoxProps {
  showDimensions?: boolean;  // показувати розміри
  showGuides?: boolean;      // показувати напрямні
  style?: {
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  };
}

export const SelectionBoxExtended: React.FC<SelectionBoxExtendedProps> = ({
  start,
  end,
  showDimensions = true,
  showGuides = true,
  style = {}
}) => {
  const {
    fillColor = '#0066ff',
    fillOpacity = 0.1,
    strokeColor = '#0066ff',
    strokeWidth = 1,
    strokeDasharray = '4,4'
  } = style;

  const x = Math.min(start.x, end.x);
  const y = Math.min(start.y, end.y);
  const width = Math.abs(end.x - start.x);
  const height = Math.abs(end.y - start.y);
 
  return (
    <g>
      {/* Напрямні лінії */}
      {showGuides && (
        <g stroke={strokeColor} strokeWidth={0.5} strokeDasharray="2,2">
          <line x1={0} y1={start.y} x2="100%" y2={start.y} />
          <line x1={0} y1={end.y} x2="100%" y2={end.y} />
          <line x1={start.x} y1={0} x2={start.x} y2="100%" />
          <line x1={end.x} y1={0} x2={end.x} y2="100%" />
        </g>
      )}

      {/* Область виділення */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        fillOpacity={fillOpacity}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />

      {/* Розміри */}
      {showDimensions && (
        <g>
          {/* Ширина */}
          <text
            x={x + width / 2}
            y={y - 5}
            textAnchor="middle"
            fill={strokeColor}
            fontSize="12"
          >
            {`${Math.round(width)}px`}
          </text>

          {/* Висота */}
          <text
            x={x - 5}
            y={y + height / 2}
            textAnchor="end"
            fill={strokeColor}
            fontSize="12"
            transform={`rotate(-90 ${x - 5} ${y + height / 2})`}
          >
            {`${Math.round(height)}px`}
          </text>

          {/* Координати */}
          <text
            x={x}
            y={y - 20}
            textAnchor="start"
            fill={strokeColor}
            fontSize="12"
          >
            {`(${Math.round(x)}, ${Math.round(y)})`}
          </text>
        </g>
      )}

      {/* Кути для ресайзу */}
      {[
        { x, y },                    // Top-left
        { x: x + width, y },         // Top-right
        { x: x + width, y: y + height }, // Bottom-right
        { x, y: y + height }         // Bottom-left
      ].map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={4}
          fill="white"
          stroke={strokeColor}
          strokeWidth={1}
          className="cursor-move"
        />
      ))}
    </g>
  );
};

// Хелпер для визначення перетину з областю виділення
export const isInSelectionBox = (point: Point, selectionBox: { start: Point; end: Point }): boolean => {
  const minX = Math.min(selectionBox.start.x, selectionBox.end.x);
  const maxX = Math.max(selectionBox.start.x, selectionBox.end.x);
  const minY = Math.min(selectionBox.start.y, selectionBox.end.y);
  const maxY = Math.max(selectionBox.start.y, selectionBox.end.y);

  return (
    point.x >= minX &&
    point.x <= maxX &&
    point.y >= minY &&
    point.y <= maxY
  );
};

// Хелпер для отримання напрямку ресайзу
export const getResizeDirection = (point: Point, selectionBox: { start: Point; end: Point }): string => {
  const { start, end } = selectionBox;
  const corners = [
    { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y), dir: 'nw' },
    { x: Math.max(start.x, end.x), y: Math.min(start.y, end.y), dir: 'ne' },
    { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y), dir: 'se' },
    { x: Math.min(start.x, end.x), y: Math.max(start.y, end.y), dir: 'sw' }
  ];

  const corner = corners.find(c => 
    Math.abs(c.x - point.x) < 5 && Math.abs(c.y - point.y) < 5
  );

  return corner ? corner.dir : '';
};