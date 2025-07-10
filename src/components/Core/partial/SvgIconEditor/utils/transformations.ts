// transformations.ts
import { PathElement, Point, Transform } from "./types";

const getAllPathPoints = (element: PathElement): Point[] => {
  let points: Point[] = [];
  const numSamplePoints = 36; // Збільшимо кількість точок для точнішого bounds

  switch (element.type) {
    case "circle": {
      const [center, radiusPoint] = element.points;
      const radius = Math.sqrt(
        Math.pow(radiusPoint.x - center.x, 2) +
        Math.pow(radiusPoint.y - center.y, 2)
      );

      // Генеруємо більше точок по колу
      for (let i = 0; i < numSamplePoints; i++) {
        const angle = (i * 2 * Math.PI) / numSamplePoints;
        points.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }

      points.push(center);
      break;
    }
    case "ellipse": {
      const [center, radiusPoint] = element.points;
      const rx = Math.abs(radiusPoint.x - center.x);
      const ry = Math.abs(radiusPoint.y - center.y);

      // Генеруємо більше точок по еліпсу
      for (let i = 0; i < numSamplePoints; i++) {
        const angle = (i * 2 * Math.PI) / numSamplePoints;
        points.push({
          x: center.x + rx * Math.cos(angle),
          y: center.y + ry * Math.sin(angle)
        });
      }

      points.push(center);
      break;
    }
    case "polygon": {
      const [center, radiusPoint] = element.points;
      if (!center || !radiusPoint) return element.points;

      const sides = Math.max(3, element.data?.sides || 5);
      const radius = Math.sqrt(
        Math.pow(radiusPoint.x - center.x, 2) +
        Math.pow(radiusPoint.y - center.y, 2)
      );

      // Генеруємо точки для кожного кута
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides;
        points.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }

      // Додаємо проміжні точки для кращого bounds
      for (let i = 0; i < sides; i++) {
        const angle1 = (i * 2 * Math.PI) / sides;
        const angle2 = ((i + 1) * 2 * Math.PI) / sides;
        const midAngle = (angle1 + angle2) / 2;

        points.push({
          x: center.x + radius * Math.cos(midAngle),
          y: center.y + radius * Math.sin(midAngle)
        });
      }

      points.push(center);
      break;
    }
    case "star": {
      const [center, radiusPoint] = element.points;
      if (!center || !radiusPoint) return element.points;

      const points_count = Math.max(3, element.data?.starPoints || 5);
      const baseRadius = Math.sqrt(
        Math.pow(radiusPoint.x - center.x, 2) +
        Math.pow(radiusPoint.y - center.y, 2)
      );

      const outerRadiusScale = element.data?.outerRadius || 1;
      const outerRadius = baseRadius * outerRadiusScale;
      const innerRadiusRatio = element.data?.innerRadius ?? 0.4;
      const innerRadius = outerRadius * innerRadiusRatio;

      // Генеруємо основні точки зірки
      for (let i = 0; i < points_count * 2; i++) {
        const angle = (i * Math.PI) / points_count;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;

        points.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }

      // Додаємо проміжні точки для кращого bounds
      for (let i = 0; i < numSamplePoints; i++) {
        const angle = (i * 2 * Math.PI) / numSamplePoints;
        points.push({
          x: center.x + outerRadius * Math.cos(angle),
          y: center.y + outerRadius * Math.sin(angle)
        });
      }

      points.push(center);
      break;
    }
    case "rect": {
      const [start, end] = element.points;
      const width = Math.abs(end.x - start.x);
      const height = Math.abs(end.y - start.y);

      // Додаємо кути та проміжні точки
      points = [
        start,
        { x: start.x + width / 2, y: start.y },
        { x: start.x + width, y: start.y },
        { x: start.x + width, y: start.y + height / 2 },
        end,
        { x: start.x + width / 2, y: start.y + height },
        { x: start.x, y: start.y + height },
        { x: start.x, y: start.y + height / 2 }
      ];
      break;
    }
    case "arc_left":
    case "arc_right": {
      const [center, edge] = element.points;
      const radius = Math.hypot(
        edge.x - center.x,
        edge.y - center.y
      );

      const startAngle = element.data?.startAngle || 0;
      const endAngle = element.data?.endAngle || 90;

      // Генеруємо точки по дузі
      for (let i = 0; i <= numSamplePoints; i++) {
        const angle = (startAngle + (i * (endAngle - startAngle)) / numSamplePoints) * Math.PI / 180;
        // Використовуємо однакову формулу для обох типів дуг
        points.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }
      break;
    }
    default:
      points = element.points;
  }

  return points;
};

const applyTransformations = (point: Point, transform: Transform, origin: Point): Point => {
  // 1. Переміщення точки відносно центру трансформації
  let x = point.x - origin.x;
  let y = point.y - origin.y;

  // 2. Застосування масштабу
  x *= transform.scale.x;
  y *= transform.scale.y;

  // 3. Застосування обертання
  const angle = (transform.rotate * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rotatedX = x * cos - y * sin;
  const rotatedY = x * sin + y * cos;

  // 4. Повернення відносно центру + застосування переміщення
  return {
    x: rotatedX + origin.x + transform.translate.x,
    y: rotatedY + origin.y + transform.translate.y
  };
};

const getBoundingBox = (element: PathElement) => {
  // Для path елементів використовуємо збережені bounds
  if (element.type === 'path' && element.data?.bounds) {
    return element.data.bounds;
  }
  const center = getElementCenter(element);
  // Отримуємо ВСІ точки фігури, включаючи додаткові
  const points = getAllPathPoints(element);

  // Трансформуємо всі точки
  const transformedPoints = points.map(point =>
    applyTransformations(point, element.transform, center)
  );

  // Знаходимо bounds на основі всіх трансформованих точок
  const bounds = transformedPoints.reduce(
    (acc, point) => ({
      minX: Math.min(acc.minX, point.x),
      minY: Math.min(acc.minY, point.y),
      maxX: Math.max(acc.maxX, point.x),
      maxY: Math.max(acc.maxY, point.y)
    }),
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    }
  );

  // При обертанні для кола, прямокутника і дуг використовуємо спеціальну логіку
  if ((element.type === "circle" ||
    element.type === "rect" ||
    element.type === "arc_left" ||
    element.type === "arc_right") &&
    Math.abs(element.transform.rotate) > 0) {
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    const transformedCenter = applyTransformations(center, element.transform, center);

    return {
      minX: transformedCenter.x - diagonal / 2,
      minY: transformedCenter.y - diagonal / 2,
      maxX: transformedCenter.x + diagonal / 2,
      maxY: transformedCenter.y + diagonal / 2
    };
  }

  const padding = 2;
  return {
    minX: bounds.minX - padding,
    minY: bounds.minY - padding,
    maxX: bounds.maxX + padding,
    maxY: bounds.maxY + padding
  };
};

const getElementCenter = (element: PathElement): Point => {
  // Для path елементів використовуємо центр bounds
  // Отримуємо всі точки фігури
  const points = getAllPathPoints(element);
  if (element.type === 'path' && element.data?.bounds) {
    const bounds = element.data.bounds;
    return {
      x: bounds.minX + (bounds.maxX - bounds.minX) / 2,
      y: bounds.minY + (bounds.maxY - bounds.minY) / 2
    };
  } 

  // Для типів, які мають центр в першій точці
  if (element.type === 'star' || element.type === 'polygon' ||
    element.type === 'circle' || element.type === 'ellipse') {
    // Повертаємо першу точку як центр
    return element.points[0];
  }

  // Для інших фігур обчислюємо центр як середнє всіх точок
  return {
    x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
    y: points.reduce((sum, p) => sum + p.y, 0) / points.length
  };
};

export {
  getBoundingBox,
  getElementCenter,
  applyTransformations,
  getAllPathPoints
};