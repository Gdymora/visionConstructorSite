// src/components/SvgIconEditor/index.tsx
import React, { useState, useCallback, useEffect, useReducer } from "react";

import { PathElement, ToolType, ShapeData, PathStyle, Point, PathType } from "@/components/Core/partial/SvgIconEditor/utils/types";
import { PropertiesPanel, ToolPanel } from "./components";
import { LayersPanel } from "./components/Panels/LayersPanel";
import { Canvas } from "./components/Editor/Canvas";
import { TOOLS } from "./utils";

// Редюсер для управління даними фігур
type ShapeAction = { type: "UPDATE"; payload: Partial<ShapeData> };

// Спрощуємо reducer
function shapeReducer(state: ShapeData, action: ShapeAction): ShapeData {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export const SvgIconEditor: React.FC = () => {
  // І змінюємо ініціалізацію reducer'а, додавши початкові значення
  const [shapeData, dispatch] = useReducer(shapeReducer, {
    tension: 0.1,
    closed: false,
    sides: 5,
    starPoints: 5,
  });
  // Основний стан
  const [elements, setElements] = useState<PathElement[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTool, setActiveTool] = useState<ToolType>(TOOLS.CURSOR);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(20);
  const [styleUpdates, setStyleUpdates] = useState<Partial<PathStyle>>({});

  const [activeStyle, setActiveStyle] = useState<PathStyle>({
    strokeColor: "#000000",
    strokeWidth: 2,
    strokeOpacity: 1,
    fillColor: "#ffffff",
    fillOpacity: 1,
    fill: false,
  });

  // Історія змін
  const [history, setHistory] = useState<{
    past: PathElement[][];
    future: PathElement[][];
  }>({
    past: [],
    future: [],
  });

  useEffect(() => {
    //оновлюємо стилі
    if (selectedIds.length > 0 && Object.keys(styleUpdates).length > 0) {
      setElements((prevElements) => prevElements.map((el) => (selectedIds.includes(el.id) ? { ...el, style: { ...el.style, ...styleUpdates } } : el)));
    }
  }, [styleUpdates]);

  const handleCreateElement = useCallback(
    (point: Point, type: PathType) => {
      // Якщо shapeData ще не ініціалізовано, використовуємо дефолтні значення
      const defaultData = {
        tension: 0.8,
        closed: false,
        sides: 5,
        starPoints: 5,
      };

      const data = shapeData || defaultData;

      const newElement: PathElement = {
        id: `element-${Date.now()}`,
        type,
        points: [point],
        style: activeStyle,
        transform: {
          translate: { x: 0, y: 0 },
          rotate: 0,
          scale: { x: 1, y: 1 },
        },
        data: {
          ...(type === "polygon" && { sides: data.sides }),
          ...(type === "star" && { starPoints: 5, innerRadius: 0.4 }),
          ...(type === "curve" && {
            tension: data.tension,
            closed: data.closed,
          }),
        },
        zIndex: elements.length,
      };

      return newElement;
    },
    [activeTool, activeStyle, elements.length, shapeData]
  );
  // функція для оновлення всіх z-індексів
  const updateZIndices = useCallback(() => {
    setElements((prevElements) => {
      const sorted = [...prevElements].sort((a, b) => b.zIndex - a.zIndex);
      return sorted.map((element, index) => ({
        ...element,
        zIndex: prevElements.length - index - 1,
      }));
    });
  }, []);
  // Оновлюємо обробник зміни даних фігури
  const handleElementUpdate = useCallback((id: string, updates: Partial<PathElement>) => {
    setElements((prev) => {
      const newElements = prev.map((el) => (el.id === id ? { ...el, ...updates } : el));
      setHistory((h) => ({
        past: [...h.past, prev],
        future: [],
      }));
      return newElements;
    });
  }, []);

  const handleShapeDataChange = useCallback(
    (updates: Partial<ShapeData>) => {
      dispatch({ type: "UPDATE", payload: updates });

      // Оновлюємо вибраний елемент, якщо він є
      if (selectedIds.length === 1) {
        const selectedElement = elements.find((el) => el.id === selectedIds[0]);
        if (selectedElement) {
          setElements((prev) =>
            prev.map((el) =>
              el.id === selectedIds[0]
                ? {
                    ...el,
                    data: {
                      ...el.data,
                      ...updates,
                    },
                  }
                : el
            )
          );
        }
      }
    },
    [selectedIds, elements]
  );

  const handleStyleChange = useCallback((updates: Partial<PathStyle>) => {
    setActiveStyle((prev) => {
      const newStyle = {
        ...prev,
        ...updates,
        // Якщо змінюється fill або fillColor, переконуємося що вони узгоджені
        ...(("fillColor" in updates || "fill" in updates) && {
          fill: updates.fill ?? prev.fill,
          fillColor: updates.fillColor ?? prev.fillColor,
        }),
      };
      setStyleUpdates(updates); // Зберігаємо оновлені стилі
      return newStyle;
    });
  }, []);
  // Обробники подій для елементів
  const handleElementAdd = useCallback((element: PathElement) => {
    setElements((prev) => {
      const newElements = [...prev, element];
      // Оновлюємо z-індекси після додавання нового елемента
      return newElements.map((el, index) => ({
        ...el,
        zIndex: newElements.length - index - 1,
      }));
    });
  }, []);
  const handleElementDelete = useCallback((ids: string[]) => {
    setElements((prev) => {
      const newElements = prev.filter((el) => !ids.includes(el.id));
      setHistory((h) => ({
        past: [...h.past, prev],
        future: [],
      }));
      return newElements;
    });
    setSelectedIds([]);
  }, []);
  const undo = useCallback(() => {
    setHistory((h) => {
      if (h.past.length === 0) return h;
      const newPast = h.past.slice(0, -1);
      const currentState = h.past[h.past.length - 1];
      setElements(currentState);
      // Оновлюємо z-індекси після відміни дії
      setTimeout(updateZIndices, 0);
      return {
        past: newPast,
        future: [...h.future, elements],
      };
    });
  }, [elements, updateZIndices]);

  // Оновлена функція redo
  const redo = useCallback(() => {
    setHistory((h) => {
      if (h.future.length === 0) return h;
      const newFuture = h.future.slice(0, -1);
      const nextState = h.future[h.future.length - 1];
      setElements(nextState);
      // Оновлюємо z-індекси після повтору дії
      setTimeout(updateZIndices, 0);
      return {
        past: [...h.past, elements],
        future: newFuture,
      };
    });
  }, [elements, updateZIndices]);

  // Експорт SVG
  const handleExport = useCallback(() => {
    const svgData = `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="800" 
        height="600" 
        viewBox="0 0 800 600"
      >
        ${elements
          .map(
            (element) => `
          <path
            d="${element.type}"
            fill="${element.style.fill ? element.style.fillColor : "none"}"
            stroke="${element.style.strokeColor}"
            stroke-width="${element.style.strokeWidth}"
            stroke-opacity ="${element.style.strokeOpacity}" 
            fill-opacity="${element.style.fillOpacity}"
            transform="
              translate(${element.transform.translate.x} ${element.transform.translate.y})
              rotate(${element.transform.rotate})
              scale(${element.transform.scale.x} ${element.transform.scale.y})
            "
          />
        `
          )
          .join("")}
      </svg>
    `;
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "icon.svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [elements]);

  // Обробники гарячих клавіш
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (e.key === "Delete" || e.key === "Backspace") {
        handleElementDelete(selectedIds);
      } else if (e.key === "Escape") {
        setSelectedIds([]);
        setActiveTool(TOOLS.CURSOR);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo, handleElementDelete, selectedIds]);

  const handleLayerReorder = useCallback(
    (sourceId: string, targetId: string) => {
      setElements((prevElements) => {
        const newElements = [...prevElements];
        const sourceIndex = newElements.findIndex((el) => el.id === sourceId);
        const targetIndex = newElements.findIndex((el) => el.id === targetId);

        if (sourceIndex === -1 || targetIndex === -1) return prevElements;

        // Видаляємо елемент з початкової позиції
        const [movedElement] = newElements.splice(sourceIndex, 1);
        // Вставляємо його в нову позицію
        newElements.splice(targetIndex, 0, movedElement);

        // Оновлюємо z-індекси для всіх елементів
        return newElements.map((element, index) => ({
          ...element,
          zIndex: newElements.length - index - 1,
        }));
      });

      // Додаємо зміну до історії
      setHistory((prev) => ({
        past: [...prev.past, elements],
        future: [],
      }));
    },
    [elements]
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Ліва панель */}
      <div className="w-82 bg-white border-r p-4 space-y-4">
        <ToolPanel
          selectedTool={activeTool}
          onToolSelect={setActiveTool}
          pathStyle={activeStyle}
          onStyleChange={handleStyleChange}
          onShapeDataChange={handleShapeDataChange}
          shapeData={shapeData} // передаємо дані з reducer'а
        />

        <div className="border-t pt-4">
          <LayersPanel elements={elements} selectedIds={selectedIds} onSelect={setSelectedIds} onReorder={handleLayerReorder} onDelete={handleElementDelete} />
        </div>
      </div>

      {/* Головна область редактора */}
      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-10 flex space-x-2">
          <button onClick={() => setShowGrid(!showGrid)} className="px-3 py-1 bg-white rounded shadow">
            {showGrid ? "Сховати сітку" : "Показати сітку"}
          </button>
          <button onClick={handleExport} className="px-3 py-1 bg-blue-500 text-white rounded shadow">
            Експорт SVG
          </button>
        </div>

        <Canvas
          elements={elements}
          selectedIds={selectedIds}
          showGrid={showGrid}
          gridSize={gridSize}
          activeTool={activeTool}
          activeStyle={activeStyle}
          onSelect={setSelectedIds}
          onElementUpdate={handleElementUpdate}
          onElementAdd={handleElementAdd}
          onCreateElement={handleCreateElement}
        />
      </div>

      {/* Права панель */}
      {selectedIds.length > 0 && (
        <div className="w-64 bg-white border-l p-4">
          <PropertiesPanel
            selectedElement={selectedIds.length === 1 ? elements.find((el) => el.id === selectedIds[0]) ?? null : null}
            onElementUpdate={handleElementUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default SvgIconEditor;
