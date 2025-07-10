import React from "react";
import { PathElement, Point, TransformationType } from "@/components/Core/partial/SvgIconEditor/utils/types";
import { getBoundingBox, getElementCenter } from "../../utils";
interface ControlPointsProps {
  element: PathElement;
  onStartTransform: (type: TransformationType, point: Point, controlPoint: Point) => void;
}

// ControlPoints.tsx
export const ControlPoints: React.FC<ControlPointsProps> = ({ element, onStartTransform }) => {
  const originalCenter = getElementCenter(element);
  const fixedCenter = {
    x: originalCenter.x + element.transform.translate.x,
    y: originalCenter.y + element.transform.translate.y,
  };

  // Отримуємо bounds
  const bounds = element.type === "path" && element.data?.bounds ? element.data.bounds : getBoundingBox(element);

  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxY - bounds.minY;

  // Функція обертання курсорів
  const getRotatedCursor = (baseCursor: string, angle: number): string => {
    const normalizedAngle = ((angle % 360) + 360) % 360;
    const cursors = ["nw-resize", "n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize"];

    const baseIndex = cursors.indexOf(baseCursor);
    if (baseIndex === -1) return baseCursor;

    const shift = Math.round(normalizedAngle / 45) % 8;
    const newIndex = (baseIndex + shift) % 8;

    return cursors[newIndex];
  };

  // Розширені контрольні точки з типом resize
  type ControlPoint = {
    x: number;
    y: number;
    cursor: string;
    resizeType: "corner" | "edge-x" | "edge-y";
  };

  // Базові контрольні точки з типами resize
  const baseControlPoints: ControlPoint[] = [
    // Кутові точки - рівномірне масштабування
    { x: bounds.minX, y: bounds.minY, cursor: "nw-resize", resizeType: "corner" },
    { x: bounds.maxX, y: bounds.minY, cursor: "ne-resize", resizeType: "corner" },
    { x: bounds.maxX, y: bounds.maxY, cursor: "se-resize", resizeType: "corner" },
    { x: bounds.minX, y: bounds.maxY, cursor: "sw-resize", resizeType: "corner" },
    // Бокові точки - масштабування по X
    { x: bounds.maxX, y: bounds.minY + height / 2, cursor: "e-resize", resizeType: "edge-x" },
    { x: bounds.minX, y: bounds.minY + height / 2, cursor: "w-resize", resizeType: "edge-x" },
    // Верхня і нижня точки - масштабування по Y
    { x: bounds.minX + width / 2, y: bounds.minY, cursor: "n-resize", resizeType: "edge-y" },
    { x: bounds.minX + width / 2, y: bounds.maxY, cursor: "s-resize", resizeType: "edge-y" },
  ];

  // Функція обертання точок
  const rotateAroundCenter = (point: ControlPoint): ControlPoint => {
    const angle = element.transform.rotate;
    const dx = point.x - fixedCenter.x;
    const dy = point.y - fixedCenter.y;

    const rotatedX = fixedCenter.x + dx * Math.cos((angle * Math.PI) / 180) - dy * Math.sin((angle * Math.PI) / 180);
    const rotatedY = fixedCenter.y + dx * Math.sin((angle * Math.PI) / 180) + dy * Math.cos((angle * Math.PI) / 180);

    return {
      ...point,
      x: rotatedX,
      y: rotatedY,
      cursor: getRotatedCursor(point.cursor, angle),
    };
  };

  // Обертаємо контрольні точки
  const controlPoints = baseControlPoints.map((point) => rotateAroundCenter(point));

  // Оновлюємо точку обертання відносно bounds
  const rotationPoint = rotateAroundCenter({
    x: fixedCenter.x,
    y: bounds.minY - 25,
    cursor: "pointer",
    resizeType: "corner",
  });

  // Функція для початку трансформації з урахуванням типу resize
  const handleStartTransform = (e: React.MouseEvent, point: ControlPoint) => {
    e.stopPropagation();

    if (element.type === "path") {
      // Для path елементів враховуємо поточний кут обертання
      const angle = (-element.transform.rotate * Math.PI) / 180; // Від'ємний кут для компенсації
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      // Коригуємо точку відносно центру обертання
      const dx = point.x - fixedCenter.x;
      const dy = point.y - fixedCenter.y;

      // Повертаємо точку назад
      const adjustedPoint = {
        x: fixedCenter.x + (dx * cos - dy * sin),
        y: fixedCenter.y + (dx * sin + dy * cos),
        scaleX: point.resizeType !== "edge-y",
        scaleY: point.resizeType !== "edge-x",
      };

      onStartTransform("scale", adjustedPoint, fixedCenter);
    } else {
      // Для інших елементів залишаємо як є
      const scalePoint = {
        x: point.x,
        y: point.y,
        scaleX: point.resizeType !== "edge-y", // масштабуємо по X якщо не вертикальна точка
        scaleY: point.resizeType !== "edge-x", // масштабуємо по Y якщо не горизонтальна точка
      };

      onStartTransform("scale", scalePoint, fixedCenter);
    }
  };

  return (
    <g>
      {/* Рамка виділення */}
      <path
        d={`M ${controlPoints[0].x} ${controlPoints[0].y}
           L ${controlPoints[1].x} ${controlPoints[1].y}
           L ${controlPoints[2].x} ${controlPoints[2].y}
           L ${controlPoints[3].x} ${controlPoints[3].y} Z`}
        fill="none"
        stroke="#0099ff"
        strokeWidth={1}
        strokeDasharray="4,4"
        pointerEvents="none"
      />

      {/* Контрольні точки */}
      {controlPoints.map((point, index) => (
        <rect
          key={index}
          x={point.x - 4}
          y={point.y - 4}
          width={8}
          height={8}
          fill="white"
          stroke="#0099ff"
          strokeWidth={1}
          style={{ cursor: point.cursor }}
          onMouseDown={(e) => handleStartTransform(e, point)}
        />
      ))}

      {/* Лінія до точки обертання */}
      <line
        x1={fixedCenter.x}
        y1={fixedCenter.y}
        x2={rotationPoint.x}
        y2={rotationPoint.y}
        stroke="#0099ff"
        strokeWidth={1}
        strokeDasharray="4,4"
        pointerEvents="none"
      />

      {/* Точка обертання */}
      <circle
        cx={rotationPoint.x}
        cy={rotationPoint.y}
        r={4}
        fill="white"
        stroke="#0099ff"
        strokeWidth={1}
        style={{ cursor: "pointer" }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onStartTransform("rotate", rotationPoint, fixedCenter);
        }}
      />

      {/* Центральна точка */}
      <circle
        cx={fixedCenter.x}
        cy={fixedCenter.y}
        r={4}
        fill="#0099ff"
        style={{ cursor: "move" }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onStartTransform("move", fixedCenter, fixedCenter);
        }}
      />
    </g>
  );
};
