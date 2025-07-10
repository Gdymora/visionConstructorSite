import { Button, ColorPicker, Slider } from "../UI";
import { ToolPanelProps } from "@/components/Core/partial/SvgIconEditor/utils/types";
import { TOOLS } from "../../utils/constants";
import { ShapeSettings } from "../Editor/ShapeSettings";

export const ToolPanel: React.FC<ToolPanelProps> = ({ selectedTool, onToolSelect, pathStyle, onStyleChange, onShapeDataChange, shapeData }) => {
  const tools = [
    { type: TOOLS.CURSOR, icon: "↖", label: "Курсор" },
    { type: TOOLS.LINE, icon: "━", label: "Лінія" },
    { type: TOOLS.RECT, icon: "□", label: "Прямокутник" },
    { type: TOOLS.CIRCLE, icon: "○", label: "Коло" },
    { type: TOOLS.ELLIPSE, icon: "⬭", label: "Еліпс" },
    { type: TOOLS.POLYGON, icon: "⬡", label: "Багатокутник" },
    { type: TOOLS.STAR, icon: "★", label: "Зірка" },
    { type: TOOLS.CURVE, icon: "⟿", label: "Крива" },
    { type: TOOLS.PENCIL, icon: "✏️", label: "Олівець" },
    { type: TOOLS.POINTSHAPE, icon: "✦", label: "Вільна фігура" },
    { type: TOOLS.ROUNDED_RECT, icon: "▭", label: "Прямокутник з округленими кутами" }, // Прямокутник з округленими кутами
    { type: TOOLS.ARC_RIGHT, icon: "◜", label: "Дуга вправо" },
    { type: TOOLS.ARC_LEFT, icon: "◞", label: "Дуга вгору" }, 
  ];
/*  { type: TOOLS.ARC_LEFT, icon: "◝", label: "Дуга вліво" },
  { type: TOOLS.ARC_RIGHT, icon: "◜", label: "Дуга вправо" },
  { type: TOOLS.ARC_UP, icon: "◞", label: "Дуга вгору" },
  { type: TOOLS.ARC_DOWN, icon: "◟", label: "Дуга вниз" },*/
  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="space-y-4">
        {/* Інструменти */}
        <div className="grid grid-cols-4 gap-2">
          {tools.map(({ type, icon, label }) => (
            <Button key={type} variant={selectedTool === type ? "primary" : "secondary"} size="sm" onClick={() => onToolSelect(type)} title={label}>
              {icon}
            </Button>
          ))}
        </div>
        {/* Налаштування фігури */}
        {(selectedTool === "polygon" ||
          selectedTool === "star" ||
          selectedTool === "curve" ||
          selectedTool === "arc_left" ||
          selectedTool === "arc_right" ||
          selectedTool === "roundedRect") && (
          <div className="border-t pt-3">
            <h3 className="text-sm font-medium mb-2">Налаштування фігури</h3>
            <ShapeSettings
              type={selectedTool}
              data={shapeData} // передаємо дані
              onUpdate={onShapeDataChange}
            />
          </div>
        )}
        {/* Налаштування стилю */}
        <div className="space-y-3 pt-3 border-t">
          <ColorPicker label="Колір лінії" value={pathStyle.strokeColor} onChange={(color) => onStyleChange({ strokeColor: color })} />

          <Slider
            label="Товщина лінії"
            min={1}
            max={20}
            value={pathStyle.strokeWidth}
            onChange={(e) =>
              onStyleChange({
                strokeWidth: parseInt(e.target.value),
              })
            }
            valueLabel="px"
          />
          <Slider
            label="Прозорість лінії"
            min={0}
            max={1}
            step={0.01}
            value={pathStyle.strokeOpacity}
            onChange={(e) =>
              onStyleChange({
                strokeOpacity: parseFloat(e.target.value),
              })
            }
            valueLabel={`${Math.round(pathStyle.strokeOpacity * 100)}%`}
          />
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                // При вмиканні/вимиканні заливки зберігаємо поточний колір
                onStyleChange({
                  fill: !pathStyle.fill,
                  // Якщо вмикаємо заливку - встановлюємо колір
                  ...(!pathStyle.fill && { fillColor: pathStyle.fillColor }),
                })
              }
            >
              {pathStyle.fill ? "Вимкнути заливку" : "Увімкнути заливку"}
            </Button>
            <ColorPicker
              label="Колір заливки"
              value={pathStyle.fillColor}
              onChange={(color) =>
                onStyleChange({
                  fillColor: color,
                  fill: true, // автоматично вмикаємо заливку при зміні кольору
                })
              }
              //disabled={!pathStyle.fill}
            />
          </div>

          <Slider
            label="Прозорість"
            min={0}
            max={1}
            step={0.01}
            value={pathStyle.fillOpacity}
            onChange={(e) =>
              onStyleChange({
                fillOpacity: parseFloat(e.target.value),
              })
            }
            valueLabel={`${Math.round(pathStyle.fillOpacity * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
};
