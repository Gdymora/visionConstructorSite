import React, { useState, useRef, useCallback, useEffect } from "react";
import { PathElement, Point } from "@/components/Core/partial/SvgIconEditor/utils/types";
import { generatePathData } from "../../utils";

interface SVGDeformerProps {
  element: PathElement;
  onPointsUpdate: (points: Point[]) => void;
  onElementUpdate: (id: string, updates: Partial<PathElement>) => void;
  onFinishEdit: () => void;
}

// Типи точок для різних фігур
interface BaseDeformPoint extends Point {
  type: string;
  isControl?: boolean; // Чи є точка контрольною
  segmentType?: "line" | "arc" | "curve"; // Тип сегмента після точки
}

interface ArcDeformPoint extends BaseDeformPoint {
  type: "arc";
  radiusX: number;
  radiusY: number;
  sweep?: boolean;
  largeArc?: boolean;
}

interface CurveDeformPoint extends BaseDeformPoint {
  type: "curve";
  controlPoint1?: Point;
  controlPoint2?: Point;
  tension?: number;
}

interface RoundedCornerPoint extends BaseDeformPoint {
  type: "roundedCorner";
  radius: number;
  isCorner: boolean;
}

type DeformPoint = BaseDeformPoint | ArcDeformPoint | CurveDeformPoint | RoundedCornerPoint;

const POINT_RADIUS = 3;
const MIN_POINTS = 4;

// Функція для розрахунку відстані від точки до лінії
const pointToLineDistance = (point: Point, lineStart: Point, lineEnd: Point): number => {
  const A = point.x - lineStart.x;
  const B = point.y - lineStart.y;
  const C = lineEnd.x - lineStart.x;
  const D = lineEnd.y - lineStart.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  const param = lenSq ? dot / lenSq : -1;

  let xx, yy;
  if (param < 0) {
    xx = lineStart.x;
    yy = lineStart.y;
  } else if (param > 1) {
    xx = lineEnd.x;
    yy = lineEnd.y;
  } else {
    xx = lineStart.x + param * C;
    yy = lineStart.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
};

// Функція для створення точок на дузі
const createArcPoints = (
  center: Point,
  radiusX: number,
  radiusY: number,
  startAngle: number,
  endAngle: number,
  numPoints: number,
  type: string = "arc"
): DeformPoint[] => {
  const points: DeformPoint[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = startAngle + (i * (endAngle - startAngle)) / numPoints;
    points.push({
      x: center.x + radiusX * Math.cos(angle),
      y: center.y + radiusY * Math.sin(angle),
      type,
      radiusX,
      radiusY,
      sweep: true,
    } as ArcDeformPoint);
  }
  return points;
};

// Функція для створення точок багатокутника
const createPolygonPoints = (center: Point, radius: number, sides: number, startAngle: number = -Math.PI / 2): DeformPoint[] => {
  const points: DeformPoint[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (i * 2 * Math.PI) / sides;
    points.push({
      x: center.x + radius * Math.cos(angle),
      y: center.y + radius * Math.sin(angle),
      type: "line",
      segmentType: "line",
    });
  }
  return points;
};

export const SVGDeformer: React.FC<SVGDeformerProps> = ({ element, onPointsUpdate, onElementUpdate, onFinishEdit }) => {
  const [originalElement] = useState(element);
  const [isDragging, setIsDragging] = useState(false);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [numPoints, setNumPoints] = useState<number | null>(null);
  const [points, setPoints] = useState<DeformPoint[]>([]);

  useEffect(() => {
    const generatePoints = () => {
      switch (element.type) {
        case "circle": {
          const [center, radiusPoint] = element.points;
          const radius = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y);
          return createArcPoints(center, radius, radius, 0, 2 * Math.PI, 8);
        }

        case "ellipse": {
          const [center, radiusPoint] = element.points;
          const radiusX = Math.abs(radiusPoint.x - center.x);
          const radiusY = Math.abs(radiusPoint.y - center.y);
          return createArcPoints(center, radiusX, radiusY, 0, 2 * Math.PI, 8);
        }

        case "rect": {
          const [p1, p2] = element.points;
          const minX = Math.min(p1.x, p2.x);
          const minY = Math.min(p1.y, p2.y);
          const maxX = Math.max(p1.x, p2.x);
          const maxY = Math.max(p1.y, p2.y);

          return [
            { x: minX, y: minY, type: "line", segmentType: "line" },
            { x: (minX + maxX) / 2, y: minY, type: "line", segmentType: "line" },
            { x: maxX, y: minY, type: "line", segmentType: "line" },
            { x: maxX, y: (minY + maxY) / 2, type: "line", segmentType: "line" },
            { x: maxX, y: maxY, type: "line", segmentType: "line" },
            { x: (minX + maxX) / 2, y: maxY, type: "line", segmentType: "line" },
            { x: minX, y: maxY, type: "line", segmentType: "line" },
            { x: minX, y: (minY + maxY) / 2, type: "line", segmentType: "line" },
          ];
        }

        case "roundedRect": {
          const [p1, p2] = element.points;
          const minX = Math.min(p1.x, p2.x);
          const minY = Math.min(p1.y, p2.y);
          const maxX = Math.max(p1.x, p2.x);
          const maxY = Math.max(p1.y, p2.y);
          const radius = element.data?.cornerRadius || 10;

          const pts: DeformPoint[] = [];

          // Верхня сторона
          pts.push({ x: minX + radius, y: minY, type: "line", segmentType: "line" });
          pts.push({ x: (minX + maxX) / 2, y: minY, type: "line", segmentType: "line" });
          pts.push({ x: maxX - radius, y: minY, type: "line", segmentType: "line" });

          // Верхній правий кут
          pts.push(...createArcPoints({ x: maxX - radius, y: minY + radius }, radius, radius, -Math.PI / 2, 0, 2, "roundedCorner"));

          // Права сторона
          pts.push({ x: maxX, y: minY + radius, type: "line", segmentType: "line" });
          pts.push({ x: maxX, y: (minY + maxY) / 2, type: "line", segmentType: "line" });
          pts.push({ x: maxX, y: maxY - radius, type: "line", segmentType: "line" });

          // Нижній правий кут
          pts.push(...createArcPoints({ x: maxX - radius, y: maxY - radius }, radius, radius, 0, Math.PI / 2, 2, "roundedCorner"));

          // Нижня сторона
          pts.push({ x: maxX - radius, y: maxY, type: "line", segmentType: "line" });
          pts.push({ x: (minX + maxX) / 2, y: maxY, type: "line", segmentType: "line" });
          pts.push({ x: minX + radius, y: maxY, type: "line", segmentType: "line" });

          // Нижній лівий кут
          pts.push(...createArcPoints({ x: minX + radius, y: maxY - radius }, radius, radius, Math.PI / 2, Math.PI, 2, "roundedCorner"));

          // Ліва сторона
          pts.push({ x: minX, y: maxY - radius, type: "line", segmentType: "line" });
          pts.push({ x: minX, y: (minY + maxY) / 2, type: "line", segmentType: "line" });
          pts.push({ x: minX, y: minY + radius, type: "line", segmentType: "line" });

          // Верхній лівий кут
          pts.push(...createArcPoints({ x: minX + radius, y: minY + radius }, radius, radius, Math.PI, (Math.PI * 3) / 2, 2, "roundedCorner"));

          return pts;
        }

        case "polygon": {
          const [center, radiusPoint] = element.points;
          const radius = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y);
          const sides = element.data?.sides || 5;
          return createPolygonPoints(center, radius, sides);
        }

        case "star": {
          const [center, radiusPoint] = element.points;
          const points_count = element.data?.starPoints || 5;
          const baseRadius = Math.hypot(radiusPoint.x - center.x, radiusPoint.y - center.y);
          const outerRadius = baseRadius * (element.data?.outerRadius || 1);
          const innerRadius = baseRadius * (element.data?.innerRadius || 0.4);

          const pts: DeformPoint[] = [];
          for (let i = 0; i < points_count * 2; i++) {
            const angle = (i * Math.PI) / points_count - Math.PI / 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            pts.push({
              x: center.x + radius * Math.cos(angle),
              y: center.y + radius * Math.sin(angle),
              type: "line",
              segmentType: "line",
            });
          }
          return pts;
        }

        case "arc_left":
        case "arc_right": {
          const [center, edge] = element.points;
          const radius = Math.hypot(edge.x - center.x, edge.y - center.y);
          const startAngle = ((element.data?.startAngle || 0) * Math.PI) / 180;
          const endAngle = ((element.data?.endAngle || 90) * Math.PI) / 180;
          return createArcPoints(center, radius, radius, startAngle, endAngle, 4, "arc");
        }

        case "path": {
          const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
          tempPath.setAttribute(
            "d",
            generatePathData({
              ...element,
              transform: { translate: { x: 0, y: 0 }, rotate: 0, scale: { x: 1, y: 1 } },
            })
          );

          const length = tempPath.getTotalLength();
          const pointsCount = numPoints || 85;
          const pts: Point[] = [];

          for (let i = 0; i <= pointsCount; i++) {
            const point = tempPath.getPointAtLength((i * length) / pointsCount);
            pts.push({
              x: point.x + element.transform.translate.x,
              y: point.y + element.transform.translate.y,
            });
          }

          return pts;
        }

        default:
          return element.points.map((p) => ({ ...p, type: "line", segmentType: "line" }));
      }
    };

    setPoints(generatePoints());
  }, [numPoints, element]);

  const generateDeformedPath = useCallback(
    (deformPoints: DeformPoint[]): string => {
      if (deformPoints.length < 2) return "";

      let path = `M ${deformPoints[0].x} ${deformPoints[0].y}`;

      for (let i = 0; i < deformPoints.length - 1; i++) {
        // -1 щоб не замикати
        const current = deformPoints[i];
        const next = deformPoints[i + 1];

        switch (current.type) {
          case "arc": {
            const arcPoint = current as ArcDeformPoint;
            path += ` A ${arcPoint.radiusX} ${arcPoint.radiusY} 0 0 ${arcPoint.sweep ? "1" : "0"} ${next.x} ${next.y}`;
            break;
          }
          case "roundedCorner": {
            const cornerPoint = current as RoundedCornerPoint;
            if (cornerPoint.isCorner) {
              path += ` Q ${cornerPoint.x} ${cornerPoint.y} ${next.x} ${next.y}`;
            } else {
              path += ` L ${next.x} ${next.y}`;
            }
            break;
          }
          default:
            path += ` L ${next.x} ${next.y}`;
        }
      }

      // Замикаємо тільки замкнені фігури
      const shouldClose =
        ["rect", "polygon", "star", "ellipse", "circle", "roundedRect"].includes(element.type) ||
        (element.type === "curve" && element.data?.closed) ||
        (element.type === "path" && element.data?.closed);

      return path + (shouldClose ? " Z" : "");
    },
    [element.type]
  );

  const updateElement = useCallback(
    (newPoints: DeformPoint[]) => {
      const pathData = generateDeformedPath(newPoints);
      const bounds = calculateBounds(newPoints);

      onElementUpdate(element.id, {
        type: "path",
        points: element.points, // Зберігаємо оригінальні опорні точки
        data: {
          ...element.data,
          pathData,
          originalType: element.type,
          bounds,
          deformPoints: newPoints,
        },
        transform: {
          translate: { x: 0, y: 0 },
          rotate: 0,
          scale: { x: 1, y: 1 },
        },
      });
    },
    [element.id, element.type, element.data, element.points, generateDeformedPath, onElementUpdate]
  );

  const calculateBounds = useCallback((pts: Point[]) => {
    const minX = Math.min(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxX = Math.max(...pts.map((p) => p.x));
    const maxY = Math.max(...pts.map((p) => p.y));
    return { minX, minY, maxX, maxY };
  }, []);

  const getMousePosition = useCallback((event: React.MouseEvent | TouchEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };

    let clientX, clientY;
    if ("touches" in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d,
    };
  }, []);

  const startDragging = useCallback((index: number, event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setIsDragging(true);
    setActivePoint(index);
    setSelectedPoint(index);
  }, []);

  const stopDragging = useCallback(() => {
    if (isDragging) {
      updateElement(points);
    }
    setIsDragging(false);
    setActivePoint(null);
  }, [isDragging, points, updateElement]);

  const drag = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || activePoint === null) return;
      event.preventDefault();

      const mousePos = getMousePosition(event as any);
      setPoints((prevPoints) => {
        const newPoints = [...prevPoints];
        const currentPoint = prevPoints[activePoint];

        // Оновлюємо позицію активної точки
        let updatedPoint: DeformPoint = { ...currentPoint, x: mousePos.x, y: mousePos.y };

        // Специфічна обробка для різних типів фігур
        switch (element.type) {
          case "circle":
          case "ellipse": {
            const center = element.points[0];
            const radiusX = Math.hypot(mousePos.x - center.x, mousePos.y - center.y);
            const radiusY = element.type === "circle" ? radiusX : Math.abs(mousePos.y - center.y);
            updatedPoint = {
              ...updatedPoint,
              type: "arc",
              radiusX,
              radiusY,
              sweep: true,
            } as ArcDeformPoint;
            break;
          }

          case "rect":
          case "roundedRect": {
            // Оновлюємо сусідні точки для збереження прямокутної форми
            if (activePoint % 2 === 0) {
              // Якщо це кутова точка
              const nextIdx = (activePoint + 1) % newPoints.length;
              const prevIdx = (activePoint - 1 + newPoints.length) % newPoints.length;
              // const oppositeIdx = (activePoint + newPoints.length / 2) % newPoints.length;

              // Оновлюємо проміжні точки
              newPoints[nextIdx] = {
                ...newPoints[nextIdx],
                x: mousePos.x,
                y: newPoints[nextIdx].y,
              };

              newPoints[prevIdx] = {
                ...newPoints[prevIdx],
                x: newPoints[prevIdx].x,
                y: mousePos.y,
              };
            }
            break;
          }

          case "star":
          case "polygon": {
            const center = element.points[0];
            // Зберігаємо симетрію при переміщенні точок
            if (element.type === "star" && activePoint % 2 === 0) {
              const oppositeIdx = (activePoint + points.length / 2) % points.length;
              const radius = Math.hypot(mousePos.x - center.x, mousePos.y - center.y);
              const angle = Math.atan2(mousePos.y - center.y, mousePos.x - center.x);

              newPoints[oppositeIdx] = {
                x: center.x + radius * Math.cos(angle + Math.PI),
                y: center.y + radius * Math.sin(angle + Math.PI),
                type: "line",
                segmentType: "line",
              };
            }
            break;
          } 
        }

        newPoints[activePoint] = updatedPoint;
        return newPoints;
      });
    },
    [isDragging, activePoint, getMousePosition, element, points]
  );

  const addPoint = useCallback(
    (event: React.MouseEvent) => {
      if (event.detail === 2 && points.length < 50) {
        const mousePos = getMousePosition(event);
        let closestLineStart = 0;
        let minDistance = Infinity;

        // Знаходимо найближчий сегмент
        for (let i = 0; i < points.length; i++) {
          const start = points[i];
          const end = points[(i + 1) % points.length];
          const distance = pointToLineDistance(mousePos, start, end);

          if (distance < minDistance) {
            minDistance = distance;
            closestLineStart = i;
          }
        }

        // Створюємо нову точку з тим же типом, що й сусідні
        const newPoint: DeformPoint = {
          ...mousePos,
          type: points[closestLineStart].type,
          segmentType: points[closestLineStart].segmentType,
        };

        if (points[closestLineStart].type === "arc") {
          const arcPoint = points[closestLineStart] as ArcDeformPoint;
          Object.assign(newPoint, {
            radiusX: arcPoint.radiusX,
            radiusY: arcPoint.radiusY,
            sweep: arcPoint.sweep,
          });
        }

        const newPoints = [...points];
        newPoints.splice(closestLineStart + 1, 0, newPoint);
        setPoints(newPoints);
        updateElement(newPoints);
        setSelectedPoint(closestLineStart + 1);
      }
    },
    [points, getMousePosition, updateElement]
  );

  const removePoint = useCallback(
    (index: number) => {
      if (points.length > MIN_POINTS) {
        const newPoints = points.filter((_, i) => i !== index);
        setPoints(newPoints);
        updateElement(newPoints);
        setSelectedPoint(null);
      }
    },
    [points, updateElement]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onElementUpdate(element.id, originalElement);
        onFinishEdit();
      }

      if ((event.key === "Delete" || event.key === "Backspace") && selectedPoint !== null) {
        removePoint(selectedPoint);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPoint, originalElement, element.id, onElementUpdate, onFinishEdit, removePoint]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-10">
      <div className="absolute top-4 right-4 space-x-2">
        <button
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={() => {
            onElementUpdate(element.id, originalElement);
            onFinishEdit();
          }}
        >
          Скасувати
        </button>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onClick={onFinishEdit}>
          Застосувати
        </button>
        <div className="bg-violet-300 my-2 px-3 rounded">
          <label className="p-4" htmlFor="numPoint">
            Num Point
          </label>
          <input id="numPoint" min={2} value={numPoints ?? ""} type="number" onChange={(e) => setNumPoints(e.target.value ? parseInt(e.target.value) : null)} />{" "}
        </div>
      </div>
      <div className="absolute top-4 left-4 text-sm text-gray-600">
        <div>Подвійний клік: додати точку</div>
        <div>Alt + клік: видалити точку</div>
        <div>Delete: видалити вибрану точку</div>
        <div>Esc: скасувати всі зміни</div>
      </div>

      <svg
        ref={svgRef}
        className="w-full h-full touch-none"
        viewBox="0 0 800 600"
        onMouseMove={drag as any}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        onClick={addPoint}
        onTouchMove={drag as any}
        onTouchEnd={stopDragging}
        onTouchCancel={stopDragging}
      >
        {isDragging && (
          <g>
            {(() => {
              const bounds = calculateBounds(points);
              return (
                <rect
                  x={bounds.minX}
                  y={bounds.minY}
                  width={bounds.maxX - bounds.minX}
                  height={bounds.maxY - bounds.minY}
                  fill="none"
                  stroke="#666"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })()}
          </g>
        )}

        {/* Деформований шлях */}
        <path d={generateDeformedPath(points)} fill="none" stroke="#2196f3" strokeWidth={1} />

        {/* Точки керування */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={POINT_RADIUS}
              fill={selectedPoint === index ? "#2196f3" : "white"}
              stroke="#2196f3"
              strokeWidth="1.5"
              style={{ cursor: "move" }}
              onMouseDown={(e) => startDragging(index, e)}
              onTouchStart={(e) => startDragging(index, e)}
              onClick={(e) => {
                e.stopPropagation();
                if (e.altKey && points.length > MIN_POINTS) {
                  removePoint(index);
                } else {
                  setSelectedPoint(index);
                }
              }}
            />
            {selectedPoint === index && (
              <text x={point.x + (POINT_RADIUS + 2)} y={point.y - (POINT_RADIUS + 2)} fontSize="10" fill="#666">
                {index + 1}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SVGDeformer;
