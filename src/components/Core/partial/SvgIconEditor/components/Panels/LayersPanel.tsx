import React, { useCallback } from "react";
import { LayersPanelProps, PathElement } from "../../utils";

export const LayersPanel: React.FC<LayersPanelProps> = ({ elements, selectedIds, onSelect, onReorder, onDelete }) => {
  const getElementIcon = (type: PathElement["type"]) => {
    switch (type) {
      case "line":
        return "━";
      case "rect":
        return "□";
      case "circle":
        return "○";
      case "polygon":
        return "⬡";
      case "star":
        return "★";
      case "curve":
        return "⟿";
      case "pencil":
        return "✏️";
      case "pointShape":
        return "✦";
      case "roundedRect":
        return "▭";
      case "arc_left":
        return "◝";
      case "arc_right":
        return "◞";
      default:
        return "?";
    }
  };

  const handleDragStart = useCallback((e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
    (e.target as HTMLElement).classList.add("opacity-50");
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const target = e.currentTarget;
    target.classList.add("bg-blue-50");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.remove("bg-blue-50");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("text/plain");
      const elements = document.querySelectorAll(".layer-item");
      elements.forEach((el) => {
        el.classList.remove("opacity-50", "bg-blue-50");
      });

      if (sourceId !== targetId) {
        onReorder(sourceId, targetId);
      }
    },
    [onReorder]
  );

  const handleDragEnd = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const elements = document.querySelectorAll(".layer-item");
    elements.forEach((el) => {
      el.classList.remove("opacity-50", "bg-blue-50");
    });
  }, []);

  const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="space-y-2">
        <h3 className="font-medium">Шари</h3>
        <div className="space-y-1">
          {sortedElements.map((element) => (
            <div
              key={element.id}
              className={`
                layer-item flex items-center p-2 rounded cursor-move
                ${selectedIds.includes(element.id) ? "bg-blue-50" : "hover:bg-gray-50"}
                transition-colors duration-150 ease-in-out
              `}
              draggable
              onClick={(e) => {
                if (e.shiftKey) {
                  onSelect([...selectedIds, element.id]);
                } else {
                  onSelect([element.id]);
                }
              }}
              onDragStart={(e) => handleDragStart(e, element.id)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, element.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex items-center w-full">
                <span className="mr-2">{getElementIcon(element.type)}</span>
                <span className="flex-1">
                  {element.type} {element.id.slice(-4)}
                </span>
                <span className="text-xs text-gray-500 mr-2">z-index: {element.zIndex}</span>
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete([element.id]);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
