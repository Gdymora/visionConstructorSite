import React, { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "./Grid";
import { ControlPoints } from "./ControlPoints";
import { SelectionBoxExtended } from "./SelectionBox";
import { generatePathData, isElementSelected, getBoundingBox, getElementCenter } from "../../utils";
import {
  CanvasProps,
  ContextMenu,
  Operation,
  PathElement,
  PathOperation,
  Point,
  ScalePoint,
  TransformState,
  TransformationType,
} from "@/components/Core/partial/SvgIconEditor/utils/types";
import { divideElements, divideElementsBlob, excludeElements, intersectElements, subtractElements, unionElements } from "../../utils/booleanOperations";
import { SVGDeformer } from "./SVGDeformer";

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedIds,
  showGrid,
  gridSize,
  activeTool,
  activeStyle,
  onSelect,
  onElementUpdate,
  onElementAdd,
  onCreateElement,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<Point | null>(null);
  const [selectionBox, setSelectionBox] = React.useState<{
    start: Point;
    end: Point;
  } | null>(null);
  const [transformType, setTransformType] = React.useState<TransformationType>("none");
  const [currentElement, setCurrentElement] = React.useState<PathElement | null>(null);
  const [transformState, setTransformState] = React.useState<TransformState | null>(null);
  const [editingElement, setEditingElement] = useState<PathElement | null>(null);

  // Стан для контекстного меню
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  // Додаємо обробник для початку редагування
  const startEditing = useCallback(
    (elementId: string) => {
      const element = elements.find((el) => el.id === elementId);
      if (element) {
        setEditingElement(element);
        setContextMenu(null);
      }
    },
    [elements]
  );

  // Додаємо обробник оновлення точок
  const handlePointsUpdate = useCallback(
    (points: Point[]) => {
      if (editingElement) {
        onElementUpdate(editingElement.id, {
          ...editingElement,
          points: points,
        });
      }
    },
    [editingElement, onElementUpdate]
  );

  // Обробник операцій
  const handleOperation = useCallback(
    (operation: Operation) => {
      if (selectedIds.length >= 2) {
        try {
          const [element1, element2] = selectedIds.map((id) => elements.find((el) => el.id === id)).filter(Boolean) as PathElement[];

          if (!element1 || !element2) {
            console.error("Selected elements not found");
            return;
          }

          let result: PathElement | PathElement[] | null = null;

          // Виконуємо відповідну операцію
          switch (operation) {
            case "union":
              result = unionElements(element1, element2);
              break;
            case "subtract":
              result = subtractElements(element1, element2);
              break;
            case "intersect":
              result = intersectElements(element1, element2);
              break;
            case "exclude":
              result = excludeElements(element1, element2);
              break;
            case "divide":
              result = divideElements(element1, element2);
              break;
            case "divide_blob":
              result = divideElementsBlob(element1, element2);
              break;
          }

          // Додаємо результат
          if (result) {
            // Приховуємо оригінальні елементи
            selectedIds.forEach((id) => {
              onElementUpdate(id, { isVisible: false });
            });

            // Додаємо новий елемент(и)
            if (Array.isArray(result)) {
              result.forEach((element) => onElementAdd(element));
              onSelect(result.map((element) => element.id));
            } else {
              onElementAdd(result);
              onSelect([result.id]);
            }
          }
        } catch (error) {
          console.error(`Error in ${operation} operation:`, error);
        }
      }
      setContextMenu(null);
    },
    [selectedIds, elements, onElementAdd, onElementUpdate, onSelect]
  );

  // Додаємо обробник кліку поза меню для його закриття
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenu?.show) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [contextMenu]);

  useEffect(() => {
    if (currentElement) {
      setCurrentElement({
        ...currentElement,
        style: activeStyle,
      });
    }
  }, [activeStyle]);

  const getMousePosition = useCallback(
    (event: React.MouseEvent): Point => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };

      const CTM = svg.getScreenCTM();
      if (!CTM) return { x: 0, y: 0 };

      const point = {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d,
      };

      // Прив'язка до сітки, якщо вона активна
      if (showGrid) {
        point.x = Math.round(point.x / gridSize) * gridSize;
        point.y = Math.round(point.y / gridSize) * gridSize;
      }

      return point;
    },
    [showGrid, gridSize]
  );

  const startDrawing = useCallback(
    (point: Point) => {
      if (activeTool === "cursor") return;

      const newElement = onCreateElement(point, activeTool);
      setCurrentElement(newElement);
    },
    [activeTool, onCreateElement]
  );

  const continueDrawing = useCallback(
    (point: Point) => {
      if (!currentElement) return;

      setCurrentElement((prev) => {
        if (!prev) return null;

        let updatedPoints = [...prev.points];
        switch (prev.type) {
          case "line":
          case "rect":
          case "circle":
          case "ellipse":
          case "polygon":
          case "arc_left":
          case "arc_right":
          case "roundedRect":
          case "path":
          case "star":
            updatedPoints = [prev.points[0], point];
            break;
          case "curve":
            const lastPoint = updatedPoints[updatedPoints.length - 1];
            const minDistance = 1;

            const distance = Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2));

            if (distance >= minDistance) {
              updatedPoints.push(point);
            }
            break;
          case "pencil": {
            const lastPoint = updatedPoints[updatedPoints.length - 1];
            const minDistance = 2; // Змінити для згладжування

            const distance = Math.sqrt(Math.pow(point.x - lastPoint.x, 2) + Math.pow(point.y - lastPoint.y, 2));

            if (distance >= minDistance) {
              updatedPoints.push(point);
            }
            break;
          }

          /*  case "pointShape": {
             // Add points up to a maximum of five
            if (updatedPoints.length < 5) {
              updatedPoints.push(point);
            }
            break; 
          }*/

          default:
            break;
        }

        return {
          ...prev,
          points: updatedPoints,
          style: { ...activeStyle },
          data: { ...prev.data },
        };
      });
    },
    [currentElement, activeStyle]
  );

  const finishDrawing = useCallback(() => {
    if (!currentElement || currentElement.points.length < 2) return;

    let finalPoints = [...currentElement.points];

    if (currentElement.type === "curve" && currentElement.data?.closed) {
      finalPoints = [...finalPoints, finalPoints[0]];
    }

    onElementAdd({
      ...currentElement,
      points: finalPoints,
    });

    setCurrentElement(null);
  }, [currentElement, onElementAdd]);

  const startTransform = useCallback(
    (type: TransformationType, point: Point, centerPoint: Point) => {
      setTransformType(type);
      const selectedElement = elements.find((el) => selectedIds.includes(el.id));
      if (!selectedElement) return;

      const bounds = getBoundingBox(selectedElement);

      setTransformState({
        type,
        startPoint: point,
        centerPoint,
        initialTransform: { ...selectedElement.transform },
        initialBounds: {
          width: bounds.maxX - bounds.minX,
          height: bounds.maxY - bounds.minY,
        },
      });

      setIsDragging(true);
      setDragStart(point);
    },
    [elements, selectedIds]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      const point = getMousePosition(event);
      setIsDragging(true);
      // setDragStart(point);

      if (activeTool === "cursor") {
        const clickedElement = [...elements].reverse().find((el) => isElementSelected(point, el));

        if (clickedElement) {
          if (!event.shiftKey) {
            onSelect([clickedElement.id]);
          } else {
            onSelect([...selectedIds, clickedElement.id]);
          }
        } else {
          if (!event.shiftKey) {
            onSelect([]);
          }
          setSelectionBox({ start: point, end: point });
        }
      } else {
        startDrawing(point);
      }
    },
    [activeTool, elements, selectedIds, onSelect, startDrawing, getMousePosition]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging) return;
      const currentPoint = getMousePosition(event);

      if (currentElement) {
        continueDrawing(currentPoint);
      } else if (transformState && dragStart) {
        selectedIds.forEach((id) => {
          const element = elements.find((el) => el.id === id);
          if (!element) return;

          switch (transformState.type) {
            case "move": {
              const dx = currentPoint.x - dragStart.x;
              const dy = currentPoint.y - dragStart.y;
              onElementUpdate(id, {
                transform: {
                  ...element.transform,
                  translate: {
                    x: element.transform.translate.x + dx,
                    y: element.transform.translate.y + dy,
                  },
                },
              });
              break;
            }
            case "rotate": {
              const startAngle = Math.atan2(dragStart.y - transformState.centerPoint.y, dragStart.x - transformState.centerPoint.x);
              const currentAngle = Math.atan2(currentPoint.y - transformState.centerPoint.y, currentPoint.x - transformState.centerPoint.x);
              const rotation = ((currentAngle - startAngle) * 180) / Math.PI;

              onElementUpdate(id, {
                transform: {
                  ...element.transform,
                  rotate: element.transform.rotate + rotation,
                },
              });
              break;
            }
            case "scale": {
              const scalePoint = transformState.startPoint as ScalePoint;

              // Розраховуємо distance як і раніше
              const startDist = Math.hypot(dragStart.x - transformState.centerPoint.x, dragStart.y - transformState.centerPoint.y);
              const currentDist = Math.hypot(currentPoint.x - transformState.centerPoint.x, currentPoint.y - transformState.centerPoint.y);
              const scale = currentDist / startDist;

              // Обчислюємо нові значення scale
              const newScaleX = scalePoint.scaleX ? Math.max(element.transform.scale.x * scale, 0.1) : element.transform.scale.x;

              const newScaleY = scalePoint.scaleY ? Math.max(element.transform.scale.y * scale, 0.1) : element.transform.scale.y;

              // Просто оновлюємо трансформацію
              onElementUpdate(id, {
                transform: {
                  ...element.transform,
                  scale: {
                    x: newScaleX,
                    y: newScaleY,
                  },
                },
              });
              break;
            }
          }
        });
        setDragStart(currentPoint);
      } else if (selectionBox) {
        setSelectionBox({
          ...selectionBox,
          end: currentPoint,
        });

        // Вибираємо елементи в області виділення
        const selectedElements = elements.filter((element) => {
          const bounds = getBoundingBox(element);
          const { start, end } = selectionBox;
          const selectionBounds = {
            minX: Math.min(start.x, end.x),
            maxX: Math.max(start.x, end.x),
            minY: Math.min(start.y, end.y),
            maxY: Math.max(start.y, end.y),
          };

          return (
            bounds.minX >= selectionBounds.minX &&
            bounds.maxX <= selectionBounds.maxX &&
            bounds.minY >= selectionBounds.minY &&
            bounds.maxY <= selectionBounds.maxY
          );
        });

        if (event.shiftKey) {
          onSelect([...new Set([...selectedIds, ...selectedElements.map((el) => el.id)])]);
        } else {
          onSelect(selectedElements.map((el) => el.id));
        }
      }
    },
    [isDragging, currentElement, transformState, selectedIds, elements, continueDrawing, onElementUpdate, getMousePosition, selectionBox]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
    setTransformType("none");
    setTransformState(null);
    if (currentElement) {
      finishDrawing();
    }

    setSelectionBox(null);
  }, [currentElement, finishDrawing]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (currentElement?.type === "curve") {
        setCurrentElement((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            data: {
              ...prev.data,
              isDrawing: false,
              closed: true,
            },
          };
        });
        finishDrawing();
      } // Для виділених елементів
      else if (selectedIds.length > 0) {
        if (selectedIds.length === 1) {
          // Одна фігура - показуємо меню редагування
          setContextMenu({
            x: e.clientX,
            y: e.clientY,
            show: true,
            type: "single",
          });
          console.log("Opening single menu"); // Для дебагу
        } else if (selectedIds.length >= 2) {
          // Дві або більше фігур - показуємо меню операцій
          setContextMenu({
            x: e.clientX,
            y: e.clientY,
            show: true,
            type: "multiple",
          });
          console.log("Opening multiple menu"); // Для дебагу
        }
      }
    },
    [currentElement, selectedIds, finishDrawing]
  );

  // Функція для конвертації hex кольору в rgba
  const hexToRGBA = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 800 600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onContextMenu={handleContextMenu}
      >
        {showGrid && <Grid size={gridSize} />}

        {elements.map((element) => {
          const center = getElementCenter(element);
          const bounds = getBoundingBox(element);

          return (
            <g key={element.id}>
              {/* Сама фігура */}
              <path
                d={generatePathData(element)}
                fill={element.style.fill ? hexToRGBA(element.style.fillColor, element.style.fillOpacity) : "none"}
                stroke={hexToRGBA(element.style.strokeColor, element.style.strokeOpacity)}
                strokeWidth={element.style.strokeWidth}
                fillRule="evenodd"
                paintOrder="stroke fill"
                transform={`
                  translate(${element.transform.translate.x} ${element.transform.translate.y})
                  translate(${center.x} ${center.y})
                  rotate(${element.transform.rotate})
                  scale(${element.transform.scale.x} ${element.transform.scale.y})
                  translate(${-center.x} ${-center.y})
                `}
                className={selectedIds.includes(element.id) ? "outline-blue-500" : ""}
              />

              {/* Додаємо відображення координат та bounds для вибраних елементів */}
              {selectedIds.includes(element.id) && (
                <>
                  {/* Центр фігури */}
                  <circle cx={center.x + element.transform.translate.x} cy={center.y + element.transform.translate.y} r="3" fill="red" />
                  <text x={center.x + element.transform.translate.x + 5} y={center.y + element.transform.translate.y - 5} fill="red" fontSize="10">
                    Center: ({Math.round(center.x + element.transform.translate.x)},{Math.round(center.y + element.transform.translate.y)})
                  </text>

                  {/* Bounds координати */}
                  <text x={bounds.minX} y={bounds.minY - 5} fill="blue" fontSize="10">
                    Min: ({Math.round(bounds.minX)}, {Math.round(bounds.minY)})
                  </text>
                  <text x={bounds.maxX - 80} y={bounds.maxY + 15} fill="blue" fontSize="10">
                    Max: ({Math.round(bounds.maxX)}, {Math.round(bounds.maxY)})
                  </text>

                  {/* Трансформації */}
                  <text x={bounds.minX} y={bounds.minY - 20} fill="green" fontSize="10">
                    Transform: translate({Math.round(element.transform.translate.x)},{Math.round(element.transform.translate.y)}) rotate(
                    {Math.round(element.transform.rotate)}) scale({element.transform.scale.x.toFixed(2)},{element.transform.scale.y.toFixed(2)})
                  </text>

                  {/* Контрольні точки */}
                  <ControlPoints element={element} onStartTransform={startTransform} />
                </>
              )}
            </g>
          );
        })}

        {currentElement && (
          <path
            d={generatePathData(currentElement)}
            fill="none"
            stroke={currentElement.style.strokeColor}
            strokeWidth={currentElement.style.strokeWidth}
            strokeDasharray="4,4"
          />
        )}

        {selectionBox && (
          <SelectionBoxExtended
            start={selectionBox.start}
            end={selectionBox.end}
            showDimensions={true}
            showGuides={true}
            style={{
              fillColor: "#0066ff",
              fillOpacity: 0.1,
              strokeColor: "#0066ff",
              strokeWidth: 1,
              strokeDasharray: "4,4",
            }}
          />
        )}
      </svg>

      {/* Додаємо SVGDeformer поверх основного SVG */}
      {editingElement && (
        <SVGDeformer
          element={editingElement}
          onPointsUpdate={handlePointsUpdate}
          onElementUpdate={onElementUpdate} // Додано цей проп
          onFinishEdit={() => setEditingElement(null)}
        />
      )}

      {/* Контекстне меню */}
      {contextMenu?.show && contextMenu.type === "multiple" && (
        <div
          className="fixed bg-white shadow-lg rounded-lg py-1 z-50"
          style={{
            left: contextMenu.x,
            top: contextMenu.y,
            minWidth: "150px",
          }}
        >
          <button
            title="Створити нову фігуру з обох фігур"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("union")}
          >
            <span>Об'єднання фігур (A ∪ B)</span>{" "}
          </button>

          <button
            title="Забрати другу фігуру з першої"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("subtract")}
          >
            <span>Різниця фігур (A \ B)</span>
          </button>

          <button
            title="Залишити тільки спільну частину фігур"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("intersect")}
          >
            <span>Перетин фігур (A ∩ B)</span>
          </button>

          <button
            title="Залишити тільки області без перетину"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("exclude")}
          >
            <span>Симетрична різниця (A ⊕ B)</span>
          </button>

          <button
            title="Розбиває фігури на окремі частини: перетин та області без перетину"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("divide")}
          >
            <span>Декомпозиція фігур</span>
          </button>

          <button
            title="Розбиває фігури на спотворені окремі частини: перетин та області без перетину"
            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
            onClick={() => handleOperation("divide_blob")}
          >
            <span>Декомпозиція фігур у блоби</span>
          </button>
        </div>
      )}
      {contextMenu?.show && contextMenu.type === "single" && (
        <div className="fixed bg-white shadow-lg rounded-lg py-1 z-50" style={{ left: contextMenu.x, top: contextMenu.y, minWidth: "150px" }}>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center" onClick={() => startEditing(selectedIds[0])}>
            <span>Редагувати точки</span>
          </button>
        </div>
      )}
    </div>
  );
};
