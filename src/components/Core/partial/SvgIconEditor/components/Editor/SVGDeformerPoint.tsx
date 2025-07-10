import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PathElement, Point } from '@/components/Core/partial/SvgIconEditor/utils/types';
import { generatePathData } from '../../utils';

interface SVGDeformerProps {
  element: PathElement;
  onPointsUpdate: (points: Point[]) => void;
  onElementUpdate: (id: string, updates: Partial<PathElement>) => void;
  onFinishEdit: () => void;
}

const POINT_RADIUS = 3;
const MIN_POINTS = 4;

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

export const SVGDeformerPoint: React.FC<SVGDeformerProps> = ({
  element,
  onPointsUpdate,
  onElementUpdate,
  onFinishEdit
}) => {
  const [originalElement] = useState(element);
  const [points, setPoints] = useState<Point[]>(() => {
    const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    tempPath.setAttribute("d", generatePathData({
      ...element,
      transform: { translate: { x: 0, y: 0 }, rotate: 0, scale: { x: 1, y: 1 } }
    }));

    const length = tempPath.getTotalLength();
    const numPoints = 16;
    const pts: Point[] = [];

    for (let i = 0; i <= numPoints; i++) {
      const point = tempPath.getPointAtLength(i * length / numPoints);
      pts.push({
        x: point.x + element.transform.translate.x,
        y: point.y + element.transform.translate.y
      });
    }

    return pts;
  });

  const [isDragging, setIsDragging] = useState(false);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateBounds = useCallback((pts: Point[]) => {
    const minX = Math.min(...pts.map(p => p.x));
    const minY = Math.min(...pts.map(p => p.y));
    const maxX = Math.max(...pts.map(p => p.x));
    const maxY = Math.max(...pts.map(p => p.y));
    return { minX, minY, maxX, maxY };
  }, []);

  const getMousePosition = useCallback((event: React.MouseEvent | TouchEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };

    let clientX, clientY;
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d
    };
  }, []);

  const updateElement = useCallback((newPoints: Point[]) => {
    const pathData = `M ${newPoints.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
    const bounds = calculateBounds(newPoints);
    
    onElementUpdate(element.id, {
      type: 'path',
      points: [{ x: 0, y: 0 }],
      data: {
        ...element.data,
        pathData,
        originalType: element.type,
        bounds
      },
      transform: {
        translate: { x: 0, y: 0 },
        rotate: 0,
        scale: { x: 1, y: 1 }
      }
    });
  }, [element.id, element.type, element.data, calculateBounds, onElementUpdate]);

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

  const drag = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || activePoint === null) return;
    event.preventDefault();

    const mousePos = getMousePosition(event as any);
    setPoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[activePoint] = mousePos;

      // Синхронізуємо першу і останню точки для замкнутих фігур
      if (element.type !== 'curve') {
        if (activePoint === 0) {
          newPoints[newPoints.length - 1] = mousePos;
        } else if (activePoint === newPoints.length - 1) {
          newPoints[0] = mousePos;
        }
      }
      
      // Оновлюємо елемент під час перетягування для живого відображення
      updateElement(newPoints);
      return newPoints;
    });
  }, [isDragging, activePoint, getMousePosition, element.type, updateElement]);

  const handlePointClick = useCallback((index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (event.altKey && points.length > MIN_POINTS) {
      const newPoints = points.filter((_, i) => i !== index);
      setPoints(newPoints);
      updateElement(newPoints);
      setSelectedPoint(null);
    } else {
      setSelectedPoint(index);
    }
  }, [points, updateElement]);

  const addPoint = useCallback((event: React.MouseEvent) => {
    if (event.detail === 2 && points.length < 50) {
      const mousePos = getMousePosition(event);
      let closestLineStart = 0;
      let minDistance = Infinity;

      for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];
        const distance = pointToLineDistance(mousePos, start, end);

        if (distance < minDistance) {
          minDistance = distance;
          closestLineStart = i;
        }
      }

      const newPoints = [...points];
      newPoints.splice(closestLineStart + 1, 0, mousePos);
      setPoints(newPoints);
      updateElement(newPoints);
      setSelectedPoint(closestLineStart + 1);
    }
  }, [points, getMousePosition, updateElement]);

  const removePoint = useCallback((index: number) => {
    if (points.length > MIN_POINTS) {
      const newPoints = points.filter((_, i) => i !== index);
      setPoints(newPoints);
      updateElement(newPoints);
      setSelectedPoint(null);
    }
  }, [points, updateElement]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Escape для скасування всіх змін
      if (event.key === 'Escape') {
        onElementUpdate(element.id, originalElement);
        onFinishEdit();
      }

      // Delete або Backspace для видалення вибраної точки
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedPoint !== null) {
        removePoint(selectedPoint);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        <button 
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          onClick={onFinishEdit}
        >
          Застосувати
        </button>
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
        {/* Bounding Box */}
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

        {/* Шлях */}
        <path
          d={`M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`}
          fill="none"
          stroke="#2196f3"
          strokeWidth={1}
        />

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
              style={{ cursor: 'move' }}
              onMouseDown={(e) => startDragging(index, e)}
              onTouchStart={(e) => startDragging(index, e)}
              onClick={(e) => handlePointClick(index, e)}
            />
            {selectedPoint === index && (
              <text
                x={point.x + (POINT_RADIUS + 2)}
                y={point.y - (POINT_RADIUS + 2)}
                fontSize="10"
                fill="#666"
              >
                {index + 1}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default SVGDeformerPoint;