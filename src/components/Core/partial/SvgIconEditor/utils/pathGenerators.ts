// src/utils/pathGenerators.ts
import { PathElement, Point } from './types';


export const getControlPoints = (
  p0: Point,
  p1: Point,
  p2: Point,
  tension: number
): { cp1: Point; cp2: Point } => {
  // Збільшуємо вплив tension на контрольні точки
  // tension контролює "натяг" кривої:
  // - При tension = 0 крива майже пряма
  // - При tension = 1 крива максимально вигнута 
  if (!tension) return;
  const d01 = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
  const d12 = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

  const fa = tension * d01 / (d01 + d12);
  const fb = tension * d12 / (d01 + d12);

  // Розраховуємо контрольні точки з більшим впливом tension
  const cp1 = {
    x: p1.x - fa * (p2.x - p0.x),
    y: p1.y - fa * (p2.y - p0.y)
  };

  const cp2 = {
    x: p1.x + fb * (p2.x - p0.x),
    y: p1.y + fb * (p2.y - p0.y)
  };

  return { cp1, cp2 };
};
export const isPointInPath = (point: Point, element: PathElement): boolean => {
  // Створюємо тимчасовий канвас для перевірки точки
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;

  // Створюємо новий шлях
  const path = new Path2D(generatePathData(element));

  // Застосовуємо трансформації
  ctx.save();
  ctx.translate(element.transform.translate.x, element.transform.translate.y);
  ctx.rotate((element.transform.rotate * Math.PI) / 180);
  ctx.scale(element.transform.scale.x, element.transform.scale.y);

  // Перевіряємо, чи точка знаходиться на контурі або всередині фігури
  const isOnStroke = ctx.isPointInStroke(path, point.x, point.y);
  const isInFill = element.style.fill && ctx.isPointInPath(path, point.x, point.y);

  ctx.restore();

  return isOnStroke || isInFill;
};

// Хелпер для перевірки, чи точка знаходиться в межах прямокутника
export const isPointInBounds = (
  point: Point,
  bounds: { minX: number; minY: number; maxX: number; maxY: number }
): boolean => {
  return (
    point.x >= bounds.minX &&
    point.x <= bounds.maxX &&
    point.y >= bounds.minY &&
    point.y <= bounds.maxY
  );
};

// Хелпер для отримання обмежувального прямокутника елемента
export const getElementBounds = (element: PathElement) => {
  //коли курсором виділяємо
  const points = element.points.map(point => ({
    x: point.x * element.transform.scale.x + element.transform.translate.x,
    y: point.y * element.transform.scale.y + element.transform.translate.y
  }));

  return points.reduce(
    (bounds, point) => ({
      minX: Math.min(bounds.minX, point.x),
      minY: Math.min(bounds.minY, point.y),
      maxX: Math.max(bounds.maxX, point.x),
      maxY: Math.max(bounds.maxY, point.y)
    }),
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    }
  );
};

// Хелпер для швидкої перевірки виділення
export const isElementSelected = (
  point: Point,
  element: PathElement,
  threshold: number = 5
): boolean => {
  // Спочатку перевіряємо обмежувальний прямокутник
  const bounds = getElementBounds(element);
  if (!isPointInBounds(point, {
    minX: bounds.minX - threshold,
    minY: bounds.minY - threshold,
    maxX: bounds.maxX + threshold,
    maxY: bounds.maxY + threshold
  })) {
    return false;
  }

  // Якщо точка в межах прямокутника, перевіряємо точний шлях
  return isPointInPath(point, element);
};

export const generatePathData = (element: PathElement): string => {
  const { type, points } = element;
  console.log(type);
  switch (type) {
    case 'line':
      return `M ${points[0].x} ${points[0].y} L ${points[1]?.x || points[0].x} ${points[1]?.y || points[0].y}`;

    case 'rect': {
      const [p1, p2] = points;

      // if (!p2 || !p1) return '';
      if (!p2 || !p1 || p1.x === p2.x || p1.y === p2.y) return '';
      //  console.log('rect ', p1, p2, p1.x === p2.x || p1.y === p2.y)

      const x = Math.min(p1.x, p2.x);
      const y = Math.min(p1.y, p2.y);
      const width = Math.abs(p2.x - p1.x);
      const height = Math.abs(p2.y - p1.y);
      return `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
    }

    case 'circle': {
      const [center, radiusPoint] = points;
      // if (!center || !radiusPoint || center.x === radiusPoint.x || center.y === radiusPoint.y) return '';
      // console.log('circle ', center, radiusPoint)
      if (!radiusPoint) return '';
      const radius = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y);
      return `
        M ${center.x - radius} ${center.y}
        a ${radius} ${radius} 0 1 0 ${radius * 2} 0
        a ${radius} ${radius} 0 1 0 ${-radius * 2} 0
      `;
    }

    case 'ellipse': {
      const [center, radiusPoint] = points;
      // console.log('ellipse ', center, radiusPoint)
      if (!radiusPoint) return '';
      const rx = Math.abs(radiusPoint.x - center.x);
      const ry = Math.abs(radiusPoint.y - center.y);
      return `
        M ${center.x - rx} ${center.y}
        a ${rx} ${ry} 0 1 0 ${rx * 2} 0
        a ${rx} ${ry} 0 1 0 ${-rx * 2} 0
      `;
    }

    case 'polygon': {
      // if (points.length < 3) return '';
      // console.log('polygon ', element.data?.sides, 'points ', points)
      const sides = element.data?.sides || 5; //points.length;
      const center = points[0];
      const radius = points[1] ?
        Math.hypot(points[1].x - center.x, points[1].y - center.y) : 0;

      const polygonPoints = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
        polygonPoints.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }

      return `M ${polygonPoints.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
    }

    case 'star': {
      // console.log('Star generation:', { points: element.points, data: element.data });

      if (element.points.length < 2) {
        return '';
      }

      const points_count = element.data?.starPoints || 5;
      const center = element.points[0];

      // Базовий радіус від другої точки
      const baseRadius = Math.hypot(
        element.points[1].x - center.x,
        element.points[1].y - center.y
      );

      // Застосовуємо масштаб зовнішнього радіусу
      const outerRadiusScale = element.data?.outerRadius || 1;
      const outerRadius = baseRadius * outerRadiusScale;

      // Внутрішній радіус
      const innerRadiusRatio = element.data?.innerRadius ?? 0.4;
      const innerRadius = outerRadius * innerRadiusRatio;

      /* console.log('Star calculation:', {
        points_count,
        center,
        baseRadius,
        outerRadiusScale,
        outerRadius,
        innerRadiusRatio,
        innerRadius
      }); */

      const starPoints = [];
      for (let i = 0; i < points_count * 2; i++) {
        const angle = (i * Math.PI) / points_count - Math.PI / 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;

        starPoints.push({
          x: center.x + radius * Math.cos(angle),
          y: center.y + radius * Math.sin(angle)
        });
      }

      return `M ${starPoints.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
    }
    case 'curve': {
      //if (points.length < 2) return '';
      //  console.log(element.data, points);
      let path = `M ${points[0].x} ${points[0].y}`;

      if (points.length === 2) {
        // Якщо тільки 2 точки - малюємо пряму лінію
        path += ` L ${points[1].x} ${points[1].y}`;
      } else {
        // Для 3+ точок використовуємо криві Безьє

        for (let i = 1; i < points.length - 1; i++) {
          const cp = getControlPoints(
            points[i - 1],
            points[i],
            points[i + 1],
            element.data?.tension || 0.5
          );
          path += ` C ${cp.cp1.x} ${cp.cp1.y} ${cp.cp2.x} ${cp.cp2.y} ${points[i + 1].x} ${points[i + 1].y}`;
        }
      }

      // Якщо крива замкнута, додаємо з'єднання з першою точкою
      if (element.data?.closed && points.length > 2) {
        path += ' Z';
      }

      return path;
    }
    case 'path':
      // Якщо є збережені SVG path дані, використовуємо їх
      if (element.data?.pathData) {
          return element.data.pathData;
      }
      // Якщо немає даних, створюємо path з точок
      return `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;

    case 'pencil': {
      if (points.length < 2) return '';
      let path = `M ${points[0].x} ${points[0].y}`;

      for (let i = 1; i < points.length - 1; i++) {
        const cp1 = points[i];
        const cp2 = points[i + 1];
        // Q використовує кожну точку як контрольну, малюючи плавну лінію між точками.
        path += ` Q ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y}`;
      }

      return path;
    }

    case "roundedRect":
      if (points.length < 2) return '';
      const [start, end] = points;
      const width = Math.abs(end.x - start.x);
      const height = Math.abs(end.y - start.y);
      const cornerRadius = element.data.cornerRadius || 10;
      return generateRoundedRectPath(start.x, start.y, width, height, cornerRadius);

    case "arc_left":
      if (points.length < 2) return '';
      const [centerLeft, edgeLeft] = points;
      const radiusLeft = Math.sqrt((edgeLeft.x - centerLeft.x) ** 2 + (edgeLeft.y - centerLeft.y) ** 2);
      const startAngleLeft = element.data.startAngle || 0;
      const endAngleLeft = element.data.endAngle || 90;
      return generateArcPath(centerLeft.x, centerLeft.y, radiusLeft, startAngleLeft, endAngleLeft, "left"); // Лівий напрямок

    case "arc_right":
      if (points.length < 2) return '';
      const [centerRight, edgeRight] = points;
      const radiusRight = Math.sqrt((edgeRight.x - centerRight.x) ** 2 + (edgeRight.y - centerRight.y) ** 2);
      const startAngleRight = element.data.startAngle || 0;
      const endAngleRight = element.data.endAngle || 90;
      return generateArcPath(centerRight.x, centerRight.y, radiusRight, startAngleRight, endAngleRight, "right"); // Правий напрямок

    default:
      return '';
  }
};

// Функція для округленого прямокутника
function generateRoundedRectPath(x, y, width, height, radius) {
  return `
    M ${x + radius} ${y}
    H ${x + width - radius}
    Q ${x + width} ${y} ${x + width} ${y + radius}
    V ${y + height - radius}
    Q ${x + width} ${y + height} ${x + width - radius} ${y + height}
    H ${x + radius}
    Q ${x} ${y + height} ${x} ${y + height - radius}
    V ${y + radius}
    Q ${x} ${y} ${x + radius} ${y}
    Z
  `;
}

// Функція для дуги
function generateArcPath(cx, cy, radius, startAngle, endAngle, direction) {
  const adjustedStartAngle = direction === "left" ? startAngle : endAngle;
  const adjustedEndAngle = direction === "left" ? endAngle : startAngle;

  const startX = cx + radius * Math.cos((Math.PI / 180) * adjustedStartAngle);
  const startY = cy + radius * Math.sin((Math.PI / 180) * adjustedStartAngle);
  const endX = cx + radius * Math.cos((Math.PI / 180) * adjustedEndAngle);
  const endY = cy + radius * Math.sin((Math.PI / 180) * adjustedEndAngle);
  const largeArcFlag = adjustedEndAngle - adjustedStartAngle <= 180 ? '0' : '1';

  return `
    M ${startX} ${startY}
    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
  `;
}

/* 

Пояснення кожної форми:
лінія :

Створює пряму лінію від однієї точки до іншої за допомогою Lкоманди.
Синтаксис: M x1 y1 L x2 y2.
Прямокутник :

Обчислює ширину та висоту на основі двох кутових точок і малює прямокутник.
Синтаксис: M x y h width v height h -width Z.
Коло :

Створює коло на основі центральної точки та точки, що визначає радіус.
Використовує aкоманду (дуга), щоб створити круговий шлях.
Синтаксис: M (center.x - radius) center.y a radius radius 0 1 0 (2*radius) 0 a radius radius 0 1 0 (-2*radius) 0.
Еліпс :

Схоже на коло, але з різними радіусами x і y.
Синтаксис: M (center.x - rx) center.y a rx ry 0 1 0 (2*rx) 0 a rx ry 0 1 0 (-2*rx) 0.
Багатокутник :

Малює багатокутник із заданою кількістю сторін.
Точки багатокутника обчислюються на основі кутів від центру та радіуса.
Синтаксис: M x1 y1 L x2 y2 ... Z.
зірка :

Створює форму зірки шляхом чергування зовнішніх і внутрішніх радіусів для формування точок зірки.
Синтаксис: M x1 y1 L x2 y2 ... Z.
Крива :

Для кривих ліній контрольні точки обчислюються за допомогою коефіцієнта натягу, щоб згладити криву.
Синтаксис: M x1 y1 C cp1x cp1y cp2x cp2y x2 y2 ....
Якщо закрито, малюється додаткова крива для з’єднання з початковою точкою.
шлях :

Шлях довільної форми, який просто з’єднує дані точки прямими лініями.
Синтаксис: M x1 y1 L x2 y2 ....
*/