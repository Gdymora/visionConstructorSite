import React from "react";
import { PathElement, Transform } from "@/components/Core/partial/SvgIconEditor/utils/types";

interface PropertiesPanelProps {
  selectedElement: PathElement | null;
  onElementUpdate: (id: string, updates: Partial<PathElement>) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ selectedElement, onElementUpdate }) => {
  if (!selectedElement) return null;

  const handleTransformChange = (updates: Partial<Transform>) => {
    onElementUpdate(selectedElement.id, {
      transform: {
        ...selectedElement.transform,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Властивості</h3>

      {/* Позиція */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm">X</label>
          <input
            type="number"
            value={selectedElement.transform.translate.x}
            onChange={(e) =>
              handleTransformChange({
                translate: {
                  ...selectedElement.transform.translate,
                  x: parseFloat(e.target.value) || 0,
                },
              })
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="text-sm">Y</label>
          <input
            type="number"
            value={selectedElement.transform.translate.y}
            onChange={(e) =>
              handleTransformChange({
                translate: {
                  ...selectedElement.transform.translate,
                  y: parseFloat(e.target.value) || 0,
                },
              })
            }
            className="w-full p-1 border rounded"
          />
        </div>
      </div>

      {/* Поворот */}
      <div>
        <label className="text-sm">Поворот</label>
        <input
          type="range"
          min={0}
          max={360}
          value={selectedElement.transform.rotate}
          onChange={(e) =>
            handleTransformChange({
              rotate: parseInt(e.target.value),
            })
          }
          className="w-full"
        />
        <input
          type="number"
          value={selectedElement.transform.rotate}
          onChange={(e) =>
            handleTransformChange({
              rotate: parseInt(e.target.value) || 0,
            })
          }
          className="w-full p-1 border rounded mt-1"
        />
      </div>

      {/* Масштаб */}
      <div className="space-y-2">
        <div>
          <label className="text-sm">Масштаб X</label>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={selectedElement.transform.scale.x}
            onChange={(e) =>
              handleTransformChange({
                scale: {
                  ...selectedElement.transform.scale,
                  x: parseFloat(e.target.value),
                },
              })
            }
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm">Масштаб Y</label>
          <input
            type="range"
            min={0.1}
            max={2}
            step={0.1}
            value={selectedElement.transform.scale.y}
            onChange={(e) =>
              handleTransformChange({
                scale: {
                  ...selectedElement.transform.scale,
                  y: parseFloat(e.target.value),
                },
              })
            }
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
