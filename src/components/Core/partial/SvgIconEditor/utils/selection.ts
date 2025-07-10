// utils/selection.ts

import { PathElement, Point } from './types';
import { getBoundingBox } from './transformations';

export function isPointInSelection(point: Point, selectionBox: { start: Point; end: Point }): boolean {
  const minX = Math.min(selectionBox.start.x, selectionBox.end.x);
  const maxX = Math.max(selectionBox.start.x, selectionBox.end.x);
  const minY = Math.min(selectionBox.start.y, selectionBox.end.y);
  const maxY = Math.max(selectionBox.start.y, selectionBox.end.y);

  return point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
}

export function getElementsInSelection(
  elements: PathElement[], 
  selectionBox: { start: Point; end: Point }
): PathElement[] {
  return elements.filter(element => {
    const bounds = getBoundingBox(element);
    // Перевіряємо чи хоча б одна точка елемента знаходиться в області виділення
    const points = [
      { x: bounds.minX, y: bounds.minY },
      { x: bounds.maxX, y: bounds.minY },
      { x: bounds.minX, y: bounds.maxY },
      { x: bounds.maxX, y: bounds.maxY }
    ];

    return points.some(point => isPointInSelection(point, selectionBox));
  });
}

export function getSelectionBounds(elements: PathElement[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  if (elements.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  }

  return elements.reduce(
    (bounds, element) => {
      const elementBounds = getBoundingBox(element);
      return {
        minX: Math.min(bounds.minX, elementBounds.minX),
        minY: Math.min(bounds.minY, elementBounds.minY),
        maxX: Math.max(bounds.maxX, elementBounds.maxX),
        maxY: Math.max(bounds.maxY, elementBounds.maxY)
      };
    },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    }
  );
}

// Додамо функцію для перевірки, чи точка знаходиться в межах елемента
export function isElementHit(point: Point, element: PathElement): boolean {
  const bounds = getBoundingBox(element);
  return (
    point.x >= bounds.minX &&
    point.x <= bounds.maxX &&
    point.y >= bounds.minY &&
    point.y <= bounds.maxY
  );
}