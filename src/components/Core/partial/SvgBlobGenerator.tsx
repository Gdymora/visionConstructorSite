import React, { useCallback, useState } from "react";
interface Group {
  id: string;
  name: string;
  color: string;
  // Додаємо групові налаштування
  animation?: {
    isAnimated: boolean;
    type: BlobShape["animationType"];
    duration: number;
    direction: BlobShape["animationDirection"];
  };
  position?: {
    x: number;
    y: number;
    rotation: number;
  };
}
interface DraggableTextProps {
  text: TextElement;
  onUpdate: (id: number, updates: Partial<TextElement>) => void;
  isSelected: boolean;
  onSelect: () => void;
}
interface InputProps {
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  className?: string;
  placeholder?: string;
}

interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

interface GradientStop {
  offset: number;
  color: string;
}

interface BlobGradient {
  type: "linear" | "radial";
  stops: GradientStop[];
  angle?: number; // для лінійного градієнта
  center?: { x: number; y: number }; // для радіального градієнта
}

interface BlobShape {
  id: number;
  points: number;
  radius: number;
  randomness: number;
  color: string;
  gradient?: BlobGradient;
  path: string;
  isAnimated: boolean;
  animationDuration: number;
  animationType: "morph" | "rotate" | "pulse" | "float" | "bounce" | "wave";
  animationDirection: "normal" | "reverse" | "alternate";
  blur: number;
  opacity: number;
  scale: number;
  rotation: number;
  x: number;
  y: number;
  zIndex: number;
  groupId?: string;
}

/* interface HistoryState {
  blobs: BlobShape[];
  selectedBlob: number | null;
  backgroundColor: string;
} */
interface TextElement {
  id: number;
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  rotation: number;
  opacity: number;
  isAnimated: boolean;
  animationType: "fade" | "scale" | "bounce" | "wave" | "none";
  animationDuration: number;
  animationDirection: "normal" | "reverse" | "alternate";
  zIndex: number;
}

// Розширюємо інтерфейс HistoryState
interface HistoryState {
  blobs: BlobShape[];
  texts: TextElement[]; // Додаємо масив текстових елементів
  selectedBlob: number | null;
  selectedText: number | null; // Додаємо вибраний текст
  backgroundColor: string;
}
// Пресети форм
const SHAPE_PRESETS = {
  circle: { points: 36, randomness: 0 },
  blob: { points: 6, randomness: 0.5 },
  star: { points: 5, randomness: 0.2 },
  square: { points: 4, randomness: 0 },
  triangle: { points: 3, randomness: 0 },
  organic: { points: 8, randomness: 0.7 },
};

// Пресети градієнтів
const GRADIENT_PRESETS = {
  sunset: {
    type: "linear" as const,
    stops: [
      { offset: 0, color: "#FF512F" },
      { offset: 1, color: "#F09819" },
    ],
    angle: 45,
  },
  ocean: {
    type: "linear" as const,
    stops: [
      { offset: 0, color: "#2193b0" },
      { offset: 1, color: "#6dd5ed" },
    ],
    angle: 135,
  },
  rainbow: {
    type: "linear" as const,
    stops: [
      { offset: 0, color: "#FF0000" },
      { offset: 0.2, color: "#FFD700" },
      { offset: 0.4, color: "#00FF00" },
      { offset: 0.6, color: "#00FFFF" },
      { offset: 0.8, color: "#0000FF" },
      { offset: 1, color: "#FF00FF" },
    ],
    angle: 90,
  },
};

// Базові компоненти
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white shadow-sm ${className}`}>{children}</div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <label className={`text-sm font-medium leading-none block mb-2 ${className}`}>{children}</label>
);

const Input = ({ type = "text", value, onChange, min, max, step, className = "", placeholder = "" }: InputProps) => (
  <input type={type} value={value} onChange={onChange} min={min} max={max} step={step} className={`w-full p-2 border rounded-md ${className}`} />
);

const Select = ({ options, value, onChange, className = "" }: SelectProps) => (
  <select value={value} onChange={onChange} className={`w-full p-2 border rounded-md ${className}`}>
    {options.map(({ value, label }) => (
      <option key={value} value={value}>
        {label}
      </option>
    ))}
  </select>
);

// Допоміжні функції
const generatePoints = (count: number, radius: number, randomness: number) => {
  const points = [];
  const angleStep = (Math.PI * 2) / count;

  for (let i = 0; i < count; i++) {
    const angle = i * angleStep;
    const randRadius = radius * (1 + (Math.random() - 0.5) * randomness);

    points.push({
      x: Math.cos(angle) * randRadius + 200,
      y: Math.sin(angle) * randRadius + 200,
    });
  }

  return points;
};

const generateBlobPath = (points: Array<{ x: number; y: number }>) => {
  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < points.length; i++) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const previous = points[(i - 1 + points.length) % points.length];

    const cp1x = current.x + (next.x - previous.x) * 0.25;
    const cp1y = current.y + (next.y - previous.y) * 0.25;
    const cp2x = next.x - (next.x - current.x) * 0.25;
    const cp2y = next.y - (next.y - current.y) * 0.25;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
  }

  return path + " Z";
};

const useHistory = (initialState: HistoryState) => {
  const [current, setCurrent] = useState(0);
  const [history, setHistory] = useState<HistoryState[]>([initialState]);

  const push = useCallback(
    (newState: HistoryState) => {
      setHistory((prev) => {
        const newHistory = prev.slice(0, current + 1);
        return [...newHistory, newState];
      });
      setCurrent((prev) => prev + 1);
    },
    [current]
  );

  const undo = useCallback(() => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      return history[current - 1];
    }
  }, [current, history]);

  const redo = useCallback(() => {
    if (current < history.length - 1) {
      setCurrent((prev) => prev + 1);
      return history[current + 1];
    }
  }, [current, history]);

  return {
    state: history[current],
    push,
    undo,
    redo,
    canUndo: current > 0,
    canRedo: current < history.length - 1,
  };
};

const GradientEditor = ({ gradient, onChange }: { gradient?: BlobGradient; onChange: (gradient: BlobGradient) => void }) => {
  const [type, setType] = useState<"linear" | "radial">(gradient?.type || "linear");
  const [stops, setStops] = useState<GradientStop[]>(
    gradient?.stops || [
      { offset: 0, color: "#ffffff" },
      { offset: 1, color: "#000000" },
    ]
  );

  const handleStopChange = (index: number, updates: Partial<GradientStop>) => {
    const newStops = stops.map((stop, i) => (i === index ? { ...stop, ...updates } : stop));
    setStops(newStops);
    onChange({
      type,
      stops: newStops,
      angle: gradient?.angle || 0,
      center: gradient?.center || { x: 0.5, y: 0.5 },
    });
  };

  const addStop = () => {
    const newStop = { offset: 0.5, color: "#808080" };
    setStops([...stops, newStop]);
  };

  const removeStop = (index: number) => {
    if (stops.length > 2) {
      setStops(stops.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <Select
        value={type}
        onChange={(e) => {
          setType(e.target.value as "linear" | "radial");
          onChange({ ...gradient, type: e.target.value as "linear" | "radial" });
        }}
        options={[
          { value: "linear", label: "Лінійний" },
          { value: "radial", label: "Радіальний" },
        ]}
      />

      {type === "linear" && (
        <div>
          <Label>Кут</Label>
          <Input
            type="range"
            min={0}
            max={360}
            value={gradient?.angle || 0}
            onChange={(e) =>
              onChange({
                ...gradient,
                angle: parseInt(e.target.value),
              })
            }
          />
        </div>
      )}

      <div className="space-y-2">
        {stops.map((stop, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={stop.offset}
              onChange={(e) =>
                handleStopChange(index, {
                  offset: parseFloat(e.target.value),
                })
              }
            />
            <Input
              type="color"
              value={stop.color}
              onChange={(e) =>
                handleStopChange(index, {
                  color: e.target.value,
                })
              }
            />
            <button onClick={() => removeStop(index)} className="p-2 text-red-500" disabled={stops.length <= 2}>
              Видалити
            </button>
          </div>
        ))}
        <button onClick={addStop} className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md">
          Додати точку
        </button>
      </div>

      <div className="space-y-2">
        <Label>Пресети</Label>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(GRADIENT_PRESETS).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => {
                setType(preset.type);
                setStops(preset.stops);
                onChange(preset);
              }}
              className="p-2 border rounded-md"
              style={{
                background: `linear-gradient(${preset.angle}deg, ${preset.stops.map((s) => `${s.color} ${s.offset * 100}%`).join(", ")})`,
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
const BlobShape = ({ blob }: { blob: BlobShape }) => {
  const gradientId = `gradient-${blob.id}`;

  const getAnimationKeyframes = () => {
    switch (blob.animationType) {
      case "morph":
        return `
          @keyframes morph${blob.id} {
            0% { d: path('${blob.path}'); transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
            50% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius, blob.randomness))}'); 
                  transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 180}deg) scale(${blob.scale * 1.1}); }
            100% { d: path('${blob.path}'); transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 360}deg) scale(${blob.scale}); }
          }
        `;
      case "rotate":
        return `
          @keyframes rotate${blob.id} {
            0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
            100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 360}deg) scale(${blob.scale}); }
          }
        `;
      case "pulse":
        return `
          @keyframes pulse${blob.id} {
            0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
            50% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale * 1.2}); }
            100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
          }
        `;
      case "wave":
        return `
          @keyframes wave${blob.id} {
            0% { d: path('${blob.path}'); }
            25% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 1.1, blob.randomness))}'); }
            50% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 0.9, blob.randomness))}'); }
            75% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 1.1, blob.randomness))}'); }
            100% { d: path('${blob.path}'); }
          }
        `;
      case "bounce":
        return `
          @keyframes bounce${blob.id} {
            0%, 100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
            50% { transform: translate(${blob.x}px, ${blob.y - 30}px) rotate(${blob.rotation}deg) scale(${blob.scale * 0.95}); }
          }
        `;
      case "float":
        return `
          @keyframes float${blob.id} {
            0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
            33% { transform: translate(${blob.x + 10}px, ${blob.y - 15}px) rotate(${blob.rotation + 5}deg) scale(${blob.scale * 1.05}); }
            66% { transform: translate(${blob.x - 10}px, ${blob.y + 15}px) rotate(${blob.rotation - 5}deg) scale(${blob.scale * 0.95}); }
            100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
          }
        `;
      default:
        return "";
    }
  };

  return (
    <>
      <style>{blob.isAnimated ? getAnimationKeyframes() : ""}</style>
      <defs>
        {blob.gradient &&
          (blob.gradient.type === "linear" ? (
            <linearGradient id={gradientId} gradientTransform={`rotate(${blob.gradient.angle || 0})`}>
              {blob.gradient.stops.map((stop, index) => (
                <stop key={index} offset={`${stop.offset * 100}%`} stopColor={stop.color} />
              ))}
            </linearGradient>
          ) : (
            <radialGradient id={gradientId} cx={blob.gradient.center?.x || "50%"} cy={blob.gradient.center?.y || "50%"} r="50%">
              {blob.gradient.stops.map((stop, index) => (
                <stop key={index} offset={`${stop.offset * 100}%`} stopColor={stop.color} />
              ))}
            </radialGradient>
          ))}
      </defs>
      <path
        d={blob.path}
        fill={blob.gradient ? `url(#${gradientId})` : blob.color}
        style={{
          opacity: blob.opacity,
          filter: `blur(${blob.blur}px)`,
          transform: `translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale})`,
          animation: blob.isAnimated ? `${blob.animationType}${blob.id} ${blob.animationDuration}s ${blob.animationDirection} infinite` : "none",
          zIndex: blob.zIndex,
        }}
      />
    </>
  );
};

// Додаємо функцію для перетягування тексту
const DraggableText = ({ text, onUpdate, isSelected, onSelect }: DraggableTextProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const svg = (e.target as Element).closest("svg");
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const scale = svgRect.width / 400;

    setIsDragging(true);
    setOffset({
      x: (e.clientX - svgRect.left) / scale - text.x,
      y: (e.clientY - svgRect.top) / scale - text.y,
    });
    onSelect();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const svg = (e.target as Element).closest("svg");
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();
    const scale = svgRect.width / 400;

    const newX = (e.clientX - svgRect.left) / scale - offset.x;
    const newY = (e.clientY - svgRect.top) / scale - offset.y;

    const boundedX = Math.max(0, Math.min(400, newX));
    const boundedY = Math.max(0, Math.min(400, newY));

    onUpdate(text.id, { x: boundedX, y: boundedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Створюємо стилі анімації
  const animationStyle = text.isAnimated
    ? `
    @keyframes text${text.animationType}${text.id} {
      ${
        text.animationType === "fade"
          ? `
        0% { opacity: ${text.opacity}; }
        50% { opacity: ${text.opacity * 0.5}; }
        100% { opacity: ${text.opacity}; }
      `
          : text.animationType === "scale"
          ? `
        0% { transform: rotate(${text.rotation}deg) scale(1); }
        50% { transform: rotate(${text.rotation}deg) scale(1.2); }
        100% { transform: rotate(${text.rotation}deg) scale(1); }
      `
          : text.animationType === "bounce"
          ? `
        0% { transform: rotate(${text.rotation}deg) translateY(0); }
        50% { transform: rotate(${text.rotation}deg) translateY(-10px); }
        100% { transform: rotate(${text.rotation}deg) translateY(0); }
      `
          : text.animationType === "wave"
          ? `
        0% { transform: rotate(${text.rotation}deg); }
        25% { transform: rotate(${text.rotation + 5}deg); }
        75% { transform: rotate(${text.rotation - 5}deg); }
        100% { transform: rotate(${text.rotation}deg); }
      `
          : ""
      }
    }
  `
    : "";

  return (
    <>
      {text.isAnimated && <style>{animationStyle}</style>}
      <g
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {/* Рамка выделения */}
        {isSelected && (
          <rect
            x={text.x - text.fontSize * text.content.length * 0.3}
            y={text.y - text.fontSize}
            width={text.fontSize * text.content.length * 0.6}
            height={text.fontSize * 2}
            fill="none"
            stroke="#2196F3"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{
              pointerEvents: "none",
              transform: `rotate(${text.rotation}deg)`,
              transformOrigin: `${text.x}px ${text.y}px`,
            }}
          />
        )}
        {/* Текстовий елемент */}
        <text
          x={text.x}
          y={text.y}
          style={{
            fontSize: `${text.fontSize}px`,
            fontFamily: text.fontFamily,
            fill: text.color,
            opacity: text.opacity,
            textAnchor: "middle",
            dominantBaseline: "middle",
            transform: `rotate(${text.rotation}deg)`,
            transformOrigin: "center center",
            transformBox: "fill-box",
            animation: text.isAnimated ? `text${text.animationType}${text.id} ${text.animationDuration}s ${text.animationDirection} infinite` : "none",
          }}
        >
          {text.content}
        </text>
      </g>
    </>
  );
};

// Компонент редагування тексту
const TextEditor = ({ text, onUpdate }: { text: TextElement; onUpdate: (updates: Partial<TextElement>) => void }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Текст</Label>
        <Input type="text" value={text.content} onChange={(e) => onUpdate({ content: e.target.value })} />
      </div>

      <div>
        <Label>Розмір шрифту</Label>
        <Input type="number" min={8} max={72} value={text.fontSize} onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })} />
      </div>

      <div>
        <Label>Шрифт</Label>
        <Select
          value={text.fontFamily}
          onChange={(e) => onUpdate({ fontFamily: e.target.value })}
          options={[
            { value: "Arial", label: "Arial" },
            { value: "Helvetica", label: "Helvetica" },
            { value: "Times New Roman", label: "Times New Roman" },
            { value: "Courier New", label: "Courier New" },
            { value: "Georgia", label: "Georgia" },
          ]}
        />
      </div>

      <div>
        <Label>Колір</Label>
        <Input type="color" value={text.color} onChange={(e) => onUpdate({ color: e.target.value })} />
      </div>

      <div>
        <Label>Прозорість</Label>
        <Input type="range" min={0} max={1} step={0.1} value={text.opacity} onChange={(e) => onUpdate({ opacity: parseFloat(e.target.value) })} />
      </div>

      <div>
        <Label>Поворот (градуси)</Label>
        <Input type="range" min={0} max={360} value={text.rotation} onChange={(e) => onUpdate({ rotation: parseInt(e.target.value) })} />
      </div>
      <div>
        <Label>Позиція X</Label>
        <div className="flex space-x-2">
          <Input type="range" min={0} max={400} value={text.x} onChange={(e) => onUpdate({ x: parseInt(e.target.value) })} className="flex-grow" />
          <Input type="number" min={0} max={400} value={text.x} onChange={(e) => onUpdate({ x: parseInt(e.target.value) })} className="w-20" />
        </div>
      </div>

      <div>
        <Label>Позиція Y</Label>
        <div className="flex space-x-2">
          <Input type="range" min={0} max={400} value={text.y} onChange={(e) => onUpdate({ y: parseInt(e.target.value) })} className="flex-grow" />
          <Input type="number" min={0} max={400} value={text.y} onChange={(e) => onUpdate({ y: parseInt(e.target.value) })} className="w-20" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={text.isAnimated} onChange={(e) => onUpdate({ isAnimated: e.target.checked })} className="w-4 h-4" />
          <Label>Анімація увімкнена</Label>
        </div>

        {text.isAnimated && (
          <>
            <div>
              <Label>Тип анімації</Label>
              <Select
                value={text.animationType}
                onChange={(e) => onUpdate({ animationType: e.target.value as TextElement["animationType"] })}
                options={[
                  { value: "fade", label: "Затухання" },
                  { value: "scale", label: "Масштабування" },
                  { value: "bounce", label: "Стрибки" },
                  { value: "wave", label: "Хвиля" },
                ]}
              />
            </div>

            <div>
              <Label>Тривалість (секунди)</Label>
              <Input
                type="number"
                min={0.1}
                step={0.1}
                value={text.animationDuration}
                onChange={(e) => onUpdate({ animationDuration: parseFloat(e.target.value) })}
              />
            </div>

            <div>
              <Label>Напрямок</Label>
              <Select
                value={text.animationDirection}
                onChange={(e) => onUpdate({ animationDirection: e.target.value as TextElement["animationDirection"] })}
                options={[
                  { value: "normal", label: "Нормальний" },
                  { value: "reverse", label: "Реверс" },
                  { value: "alternate", label: "Чергування" },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SvgBlobGenerator = () => {
  const { state, push, undo, redo, canUndo, canRedo } = useHistory({
    blobs: [],
    texts: [],
    selectedBlob: null,
    selectedText: null,
    backgroundColor: "#FFFFFF",
  });

  const [currentTab, setCurrentTab] = useState<"shape" | "style" | "animation" | "position" | "gradient" | "text">("shape");
  const [showGrid, setShowGrid] = useState(false);
  const [groups, setGroups] = useState<{ [key: string]: Group }>({});
  // Стани з історії
  const [blobs, setBlobs] = useState<BlobShape[]>(state.blobs);
  const [texts, setTexts] = useState<TextElement[]>(state.texts);
  const [selectedBlob, setSelectedBlob] = useState<number | null>(state.selectedBlob);
  const [selectedText, setSelectedText] = useState<number | null>(state.selectedText);
  const [backgroundColor, setBackgroundColor] = useState(state.backgroundColor);
  // Функції для роботи з текстом
  const addNewText = () => {
    const newText: TextElement = {
      id: Date.now(),
      content: "Новий текст",
      x: 200,
      y: 200,
      fontSize: 24,
      fontFamily: "Arial",
      color: "#000000",
      rotation: 0,
      opacity: 1,
      isAnimated: false,
      animationType: "none",
      animationDuration: 3,
      animationDirection: "normal",
      zIndex: texts.length,
    };
    setTexts((prevTexts) => [...prevTexts, newText]);
    setSelectedText(newText.id);
  };
  // Функція оновлення тексту
  const handleTextUpdate = useCallback((id: number, updates: Partial<TextElement>) => {
    setTexts((prevTexts) => prevTexts.map((text) => (text.id === id ? { ...text, ...updates } : text)));
  }, []);
  const updateText = (id: number, updates: Partial<TextElement>) => {
    const newTexts = texts.map((text) => (text.id === id ? { ...text, ...updates } : text));
    setTexts(newTexts);
    updateState(blobs, newTexts, selectedBlob, selectedText);
  };

  const deleteText = (id: number) => {
    const newTexts = texts.filter((text) => text.id !== id);
    updateState(blobs, newTexts, selectedBlob, null);
  };

  // Функція оновлення стану з історією
  const updateState = useCallback(
    (
      newBlobs: BlobShape[] = blobs,
      newTexts: TextElement[] = texts,
      newSelectedBlob: number | null = selectedBlob,
      newSelectedText: number | null = selectedText
    ) => {
      setBlobs(newBlobs);
      setTexts(newTexts);
      setSelectedBlob(newSelectedBlob);
      setSelectedText(newSelectedText);
      push({
        blobs: newBlobs,
        texts: newTexts,
        selectedBlob: newSelectedBlob,
        selectedText: newSelectedText,
        backgroundColor,
      });
    },
    [blobs, texts, selectedBlob, selectedText, backgroundColor, push]
  );
  // Оновлення обробників для кнопок undo/redo
  const handleUndo = () => {
    const previousState = undo();
    if (previousState) {
      setBlobs(previousState.blobs);
      setTexts(previousState.texts);
      setSelectedBlob(previousState.selectedBlob);
      setSelectedText(previousState.selectedText);
      setBackgroundColor(previousState.backgroundColor);
    }
  };

  const handleRedo = () => {
    const nextState = redo();
    if (nextState) {
      setBlobs(nextState.blobs);
      setTexts(nextState.texts);
      setSelectedBlob(nextState.selectedBlob);
      setSelectedText(nextState.selectedText);
      setBackgroundColor(nextState.backgroundColor);
    }
  };

  const addNewBlob = (preset?: keyof typeof SHAPE_PRESETS) => {
    const newBlob: BlobShape = {
      id: Date.now(),
      points: preset ? SHAPE_PRESETS[preset].points : 6,
      radius: 150,
      randomness: preset ? SHAPE_PRESETS[preset].randomness : 0.5,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      gradient: {
        type: "linear",
        stops: [
          { offset: 0, color: "#ffffff" },
          { offset: 1, color: "#000000" },
        ],
        angle: 0,
      },
      path: "",
      isAnimated: false,
      animationDuration: 3,
      animationType: "morph",
      animationDirection: "normal",
      blur: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      zIndex: blobs.length,
    };

    newBlob.path = generateBlobPath(generatePoints(newBlob.points, newBlob.radius, newBlob.randomness));
    updateState([...blobs, newBlob], texts, newBlob.id, selectedText);
  };

  const updateBlob = (id: number, updates: Partial<BlobShape>) => {
    const newBlobs = blobs.map((blob) => {
      if (blob.id === id) {
        const updatedBlob = { ...blob, ...updates };
        if ("points" in updates || "radius" in updates || "randomness" in updates) {
          updatedBlob.path = generateBlobPath(generatePoints(updatedBlob.points, updatedBlob.radius, updatedBlob.randomness));
        }
        return updatedBlob;
      }
      return blob;
    });
    updateState(newBlobs, texts, selectedBlob, selectedText);
  };

  // Функції для роботи з групами
  const createGroup = () => {
    if (selectedBlob) {
      const groupId = `group-${Date.now()}`;
      const newGroup: Group = {
        id: groupId,
        name: `Група ${Object.keys(groups).length + 1}`,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      };

      setGroups((prev) => ({
        ...prev,
        [groupId]: newGroup,
      }));
      updateBlob(selectedBlob, { groupId });
    }
  };
  // Додаємо функції для групових операцій
  const updateGroup = (groupId: string, updates: Partial<Group>) => {
    setGroups((prev) => ({
      ...prev,
      [groupId]: { ...prev[groupId], ...updates },
    }));

    // Оновлюємо всі блоби в групі
    const updatedBlobs = blobs.map((blob) => {
      if (blob.groupId === groupId) {
        const updates: Partial<BlobShape> = {};

        // Синхронізуємо анімацію групи
        if (groups[groupId].animation) {
          updates.isAnimated = groups[groupId].animation.isAnimated;
          updates.animationType = groups[groupId].animation.type;
          updates.animationDuration = groups[groupId].animation.duration;
          updates.animationDirection = groups[groupId].animation.direction;
        }

        // Синхронізуємо позицію відносно центру групи
        if (groups[groupId].position) {
          updates.x = groups[groupId].position.x;
          updates.y = groups[groupId].position.y;
          updates.rotation = groups[groupId].position.rotation;
        }

        return { ...blob, ...updates };
      }
      return blob;
    });

    updateState(updatedBlobs);
  };

  // Додаємо функції для групових трансформацій
  const moveGroup = (groupId: string, dx: number, dy: number) => {
    setGroups((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        position: {
          ...prev[groupId].position,
          x: (prev[groupId].position?.x || 0) + dx,
          y: (prev[groupId].position?.y || 0) + dy,
        },
      },
    }));

    const updatedBlobs = blobs.map((blob) => {
      if (blob.groupId === groupId) {
        return { ...blob, x: blob.x + dx, y: blob.y + dy };
      }
      return blob;
    });

    updateState(updatedBlobs);
  };

  const rotateGroup = (groupId: string, angle: number) => {
    setGroups((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        position: {
          ...prev[groupId].position,
          rotation: angle,
        },
      },
    }));

    const updatedBlobs = blobs.map((blob) => {
      if (blob.groupId === groupId) {
        return { ...blob, rotation: angle };
      }
      return blob;
    });

    updateState(updatedBlobs);
  };

  // Компонент для групових налаштувань
  const GroupControls = ({ groupId }: { groupId: string }) => {
    const group = groups[groupId];
    const groupBlobs = blobs.filter((blob) => blob.groupId === groupId);

    return (
      <div className="space-y-4 mt-4 p-4 border rounded-md">
        <h3 className="font-medium">Налаштування групи: {group.name}</h3>

        {/* Групова анімація */}
        <div>
          <Label>Групова анімація</Label>
          <div className="space-y-2">
            <input
              type="checkbox"
              checked={!!group.animation?.isAnimated}
              onChange={(e) => {
                updateGroup(groupId, {
                  animation: {
                    ...group.animation,
                    isAnimated: e.target.checked,
                    type: "morph",
                    duration: 3,
                    direction: "alternate",
                  },
                });
              }}
            />
            <span className="ml-2">Синхронізована анімація</span>
          </div>

          {group.animation?.isAnimated && (
            <>
              <Select
                value={group.animation.type}
                onChange={(e) => {
                  updateGroup(groupId, {
                    animation: {
                      ...group.animation,
                      type: e.target.value as BlobShape["animationType"],
                    },
                  });
                }}
                options={[
                  { value: "morph", label: "Морф" },
                  { value: "rotate", label: "Обертання" },
                  { value: "pulse", label: "Пульсація" },
                  { value: "wave", label: "Хвиля" },
                  { value: "float", label: "Плавання" },
                  { value: "bounce", label: "Стрибки" },
                ]}
              />
            </>
          )}
        </div>

        {/* Групове переміщення */}
        <div>
          <Label>Групове переміщення</Label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => moveGroup(groupId, 0, -10)} className="p-2 bg-gray-100 rounded">
              Вгору
            </button>
            <button onClick={() => moveGroup(groupId, 0, 10)} className="p-2 bg-gray-100 rounded">
              Вниз
            </button>
            <button onClick={() => moveGroup(groupId, -10, 0)} className="p-2 bg-gray-100 rounded">
              Вліво
            </button>
            <button onClick={() => moveGroup(groupId, 10, 0)} className="p-2 bg-gray-100 rounded">
              Вправо
            </button>
          </div>
        </div>

        {/* Групове обертання */}
        <div>
          <Label>Групове обертання</Label>
          <Input type="range" min={0} max={360} value={group.position?.rotation || 0} onChange={(e) => rotateGroup(groupId, parseInt(e.target.value))} />
        </div>

        {/* Статистика групи */}
        <div className="text-sm text-gray-500">Елементів у групі: {groupBlobs.length}</div>
      </div>
    );
  };
  const addToGroup = (blobId: number, groupId: string) => {
    if (groups[groupId]) {
      updateBlob(blobId, { groupId });
    }
  };

  const removeFromGroup = (blobId: number) => {
    updateBlob(blobId, { groupId: undefined });
  };

  const GroupManager = () => {
    if (!selectedBlobData) return null;

    return (
      <div className="space-y-4">
        <Label>Група</Label>
        <div className="flex flex-col space-y-2">
          <Select
            value={selectedBlobData.groupId || ""}
            onChange={(e) => {
              const groupId = e.target.value;
              if (groupId === "new") {
                createGroup();
              } else if (groupId === "") {
                removeFromGroup(selectedBlob!);
              } else {
                addToGroup(selectedBlob!, groupId);
              }
            }}
            options={[
              { value: "", label: "Без групи" },
              ...Object.values(groups).map((group) => ({
                value: group.id,
                label: group.name,
              })),
              { value: "new", label: "+ Створити нову групу" },
            ]}
          />

          {selectedBlobData.groupId && groups[selectedBlobData.groupId] && (
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={groups[selectedBlobData.groupId].name}
                onChange={(e) => {
                  const groupId = selectedBlobData.groupId!;
                  setGroups((prev) => ({
                    ...prev,
                    [groupId]: {
                      ...prev[groupId],
                      name: e.target.value,
                    },
                  }));
                }}
                placeholder="Назва групи"
              />
              <button onClick={() => removeFromGroup(selectedBlob!)} className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded">
                Видалити з групи
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const selectedBlobData = blobs.find((b) => b.id === selectedBlob);

  const exportSettings = () => {
    const settings = {
      blobs,
      texts,
      backgroundColor,
    };
    const blob = new Blob([JSON.stringify(settings)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blob-settings.json";
    a.click();
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string);
          setBlobs(settings.blobs || []);
          setTexts(settings.texts || []);
          setBackgroundColor(settings.backgroundColor || "#FFFFFF");
          setSelectedBlob(null);
          setSelectedText(null);
        } catch (error) {
          console.error("Error importing settings:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const generateExportCode = () => {
    // Generate animation keyframes for each animated blob
    const generateAnimationStyles = () => {
      const blobAnimations = blobs
        .filter((blob) => blob.isAnimated)
        .map((blob) => {
          switch (blob.animationType) {
            case "morph":
              return `
                @keyframes morph${blob.id} {
                  0% { d: path('${blob.path}'); transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                  50% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius, blob.randomness))}'); 
                        transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 180}deg) scale(${blob.scale * 1.1}); }
                  100% { d: path('${blob.path}'); transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 360}deg) scale(${blob.scale}); }
                }`;
            case "rotate":
              return `
                @keyframes rotate${blob.id} {
                  0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                  100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation + 360}deg) scale(${blob.scale}); }
                }`;
            case "pulse":
              return `
                @keyframes pulse${blob.id} {
                  0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                  50% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale * 1.2}); }
                  100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                }`;
            case "wave":
              return `
                @keyframes wave${blob.id} {
                  0% { d: path('${blob.path}'); }
                  25% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 1.1, blob.randomness))}'); }
                  50% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 0.9, blob.randomness))}'); }
                  75% { d: path('${generateBlobPath(generatePoints(blob.points, blob.radius * 1.1, blob.randomness))}'); }
                  100% { d: path('${blob.path}'); }
                }`;
            case "float":
              return `
                @keyframes float${blob.id} {
                  0% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                  33% { transform: translate(${blob.x + 10}px, ${blob.y - 15}px) rotate(${blob.rotation + 5}deg) scale(${blob.scale * 1.05}); }
                  66% { transform: translate(${blob.x - 10}px, ${blob.y + 15}px) rotate(${blob.rotation - 5}deg) scale(${blob.scale * 0.95}); }
                  100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                }`;
            case "bounce":
              return `
                @keyframes bounce${blob.id} {
                  0%, 100% { transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale}); }
                  50% { transform: translate(${blob.x}px, ${blob.y - 30}px) rotate(${blob.rotation}deg) scale(${blob.scale * 0.95}); }
                }`;
            default:
              return "";
          }
        });

      const textAnimations = texts
        .filter((text) => text.isAnimated)
        .map((text) => {
          switch (text.animationType) {
            case "fade":
              return `
                @keyframes text${text.animationType}${text.id} {
                  0% { opacity: ${text.opacity}; }
                  50% { opacity: ${text.opacity * 0.5}; }
                  100% { opacity: ${text.opacity}; }
                }`;
            case "scale":
              return `
                @keyframes text${text.animationType}${text.id} {
                  0% { transform: rotate(${text.rotation}deg) scale(1); }
                  50% { transform: rotate(${text.rotation}deg) scale(1.2); }
                  100% { transform: rotate(${text.rotation}deg) scale(1); }
                }`;
            case "bounce":
              return `
                @keyframes text${text.animationType}${text.id} {
                  0% { transform: rotate(${text.rotation}deg) translateY(0); }
                  50% { transform: rotate(${text.rotation}deg) translateY(-10px); }
                  100% { transform: rotate(${text.rotation}deg) translateY(0); }
                }`;
            case "wave":
              return `
                @keyframes text${text.animationType}${text.id} {
                  0% { transform: rotate(${text.rotation}deg); }
                  25% { transform: rotate(${text.rotation + 5}deg); }
                  75% { transform: rotate(${text.rotation - 5}deg); }
                  100% { transform: rotate(${text.rotation}deg); }
                }`;
            default:
              return "";
          }
        })
        .join("\n");
      return `${blobAnimations}\n${textAnimations}`;
    };
    // Generate gradient definitions
    const generateGradients = () => {
      return blobs
        .filter((blob) => blob.gradient)
        .map((blob) => {
          const gradientId = `gradient-${blob.id}`;
          if (blob.gradient?.type === "linear") {
            return `
              <linearGradient id="${gradientId}" gradientTransform="rotate(${blob.gradient.angle || 0})">
                ${blob.gradient.stops.map((stop) => `<stop offset="${stop.offset * 100}%" stop-color="${stop.color}" />`).join("\n              ")}
              </linearGradient>`;
          } else if (blob.gradient?.type === "radial") {
            return `
              <radialGradient id="${gradientId}" 
                cx="${blob.gradient.center?.x || "50%"}" 
                cy="${blob.gradient.center?.y || "50%"}" 
                r="50%">
                ${blob.gradient.stops.map((stop) => `<stop offset="${stop.offset * 100}%" stop-color="${stop.color}" />`).join("\n              ")}
              </radialGradient>`;
          }
          return "";
        })
        .join("\n");
    };

    // Generate path elements with all attributes
    const generatePaths = () => {
      return [...blobs]
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(
          (blob) => `
      <path
        d="${blob.path}"
        fill="${blob.gradient ? `url(#gradient-${blob.id})` : blob.color}"
        style="
          opacity: ${blob.opacity};
          filter: blur(${blob.blur}px);
          transform: translate(${blob.x}px, ${blob.y}px) rotate(${blob.rotation}deg) scale(${blob.scale});
          ${blob.isAnimated ? `animation: ${blob.animationType}${blob.id} ${blob.animationDuration}s ${blob.animationDirection} infinite;` : ""}
        "
      />`
        )
        .join("\n");
    };

    const generateTexts = () => {
      return [...texts]
        .sort((a, b) => a.zIndex - b.zIndex)
        .map(
          (text) => `
          <text
          x="${text.x}"
          y="${text.y}"
          style="
            font-size: ${text.fontSize}px;
            font-family: ${text.fontFamily};
            fill: ${text.color};
            opacity: ${text.opacity};
            text-anchor: middle;
            dominant-baseline: middle;
            transform: rotate(${text.rotation}deg);
            transform-origin: center center;
            transform-box: fill-box;
            ${text.isAnimated ? `animation: text${text.animationType}${text.id} ${text.animationDuration}s ${text.animationDirection} infinite;` : ""}
          "
        >${text.content}</text>`
        )
        .join("\n");
    };

    return `<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="background-color: ${backgroundColor}">
    <defs>
      ${generateGradients()}
    </defs>
    <style>
      ${generateAnimationStyles()}
    </style> 
    ${generatePaths()}
    ${generateTexts()}
  </svg>`;
  };

  const moveLayerForward = (blobId: number) => {
    const currentBlob = blobs.find((b) => b.id === blobId);
    if (!currentBlob) return;

    const maxZIndex = Math.max(...blobs.map((b) => b.zIndex));
    if (currentBlob.zIndex < maxZIndex) {
      const newBlobs = blobs.map((blob) => {
        if (blob.id === blobId) {
          return { ...blob, zIndex: blob.zIndex + 1 };
        } else if (blob.zIndex === currentBlob.zIndex + 1) {
          return { ...blob, zIndex: blob.zIndex - 1 };
        }
        return blob;
      });
      updateState(newBlobs);
    }
  };

  const moveLayerBackward = (blobId: number) => {
    const currentBlob = blobs.find((b) => b.id === blobId);
    if (!currentBlob) return;

    const minZIndex = Math.min(...blobs.map((b) => b.zIndex));
    if (currentBlob.zIndex > minZIndex) {
      const newBlobs = blobs.map((blob) => {
        if (blob.id === blobId) {
          return { ...blob, zIndex: blob.zIndex - 1 };
        } else if (blob.zIndex === currentBlob.zIndex - 1) {
          return { ...blob, zIndex: blob.zIndex + 1 };
        }
        return blob;
      });
      updateState(newBlobs);
    }
  };

  const moveLayerToFront = (blobId: number) => {
    const maxZIndex = Math.max(...blobs.map((b) => b.zIndex));
    const newBlobs = blobs.map((blob) => {
      if (blob.id === blobId) {
        return { ...blob, zIndex: maxZIndex + 1 };
      }
      return blob;
    });
    updateState(newBlobs);
  };

  const moveLayerToBack = (blobId: number) => {
    const minZIndex = Math.min(...blobs.map((b) => b.zIndex));
    const newBlobs = blobs.map((blob) => {
      if (blob.id === blobId) {
        return { ...blob, zIndex: minZIndex - 1 };
      }
      return blob;
    });
    updateState(newBlobs);
  };
  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      {/* Верхня панель інструментів */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button onClick={handleUndo} disabled={!canUndo} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">
            Відмінити
          </button>
          <button onClick={handleRedo} disabled={!canRedo} className="px-3 py-1 bg-gray-100 rounded disabled:opacity-50">
            Повторити
          </button>
        </div>
        <div className="flex space-x-2">
          <button onClick={exportSettings} className="px-3 py-1 bg-blue-500 text-white rounded">
            Експорт
          </button>
          <label className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer">
            Імпорт
            <input type="file" accept=".json" onChange={importSettings} className="hidden" />
          </label>
        </div>
      </div>

      {/* Попередній перегляд */}
      <Card>
        <CardContent>
          <div className="aspect-video w-full relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              style={{ backgroundColor }}
              // Додаємо обробник для припинення перетягування при виході за межі SVG
              onMouseLeave={() => {
                const svg = document.querySelector("svg");
                if (svg) {
                  const event = new MouseEvent("mouseup", {
                    bubbles: true,
                    cancelable: true,
                  });
                  svg.dispatchEvent(event);
                }
              }}
            >
              {showGrid && (
                <g>
                  <defs>
                    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                      <rect width="100" height="100" fill="url(#smallGrid)" />
                      <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </g>
              )}
              {/* Рендеримо блоби */}
              {[...blobs]
                .sort((a, b) => a.zIndex - b.zIndex)
                .map((blob) => (
                  <BlobShape key={blob.id} blob={blob} />
                ))}
              {/* Рендеримо текстові елементи */}
              {[...texts]
                .sort((a, b) => a.zIndex - b.zIndex)
                .map((text) => (
                  <DraggableText
                    key={text.id}
                    text={text}
                    onUpdate={handleTextUpdate}
                    isSelected={selectedText === text.id}
                    onSelect={() => setSelectedText(text.id)}
                  />
                ))}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Панель керування */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ліва панель */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Фігури</h3>
                <div className="flex space-x-2">
                  <button onClick={() => setShowGrid(!showGrid)} className="px-2 py-1 bg-gray-100 rounded">
                    {showGrid ? "Сховати сітку" : "Показати сітку"}
                  </button>
                  <button onClick={() => addNewBlob()} className="px-3 py-1 bg-blue-500 text-white rounded">
                    Додати фігуру
                  </button>
                </div>
              </div>

              {/* Пресети форм */}
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(SHAPE_PRESETS).map(([name, preset]) => (
                  <button key={name} onClick={() => addNewBlob(name as keyof typeof SHAPE_PRESETS)} className="p-2 border rounded-md hover:bg-gray-50">
                    {name}
                  </button>
                ))}
              </div>

              {/* Список блобів */}
              <div className="space-y-2">
                {blobs.map((blob) => (
                  <div
                    key={blob.id}
                    className={`flex items-center justify-between p-2 rounded-md border ${selectedBlob === blob.id ? "border-blue-500" : "border-gray-200"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor: blob.groupId && groups[blob.groupId] ? groups[blob.groupId].color : blob.color,
                        }}
                      />
                      <span>{blob.groupId && groups[blob.groupId] ? groups[blob.groupId].name : "Без групи"}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => setSelectedBlob(blob.id)} className="px-2 py-1 text-sm bg-gray-100 rounded">
                        Редагувати
                      </button>
                      <button
                        onClick={() => {
                          const newBlobs = blobs.filter((b) => b.id !== blob.id);
                          updateState(newBlobs, texts, null, selectedText);
                        }}
                        className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded"
                      >
                        Видалити
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Права панель (редагування) */}
        {selectedBlobData && (
          <Card>
            <CardContent>
              <div className="space-y-4">
                {/* Вкладки */}
                <div className="flex space-x-2 border-b">
                  {["shape", "style", "gradient", "animation", "text", "position"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setCurrentTab(tab as typeof currentTab)}
                      className={`px-4 py-2 ${currentTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    >
                      {tab === "text"
                        ? "Текст"
                        : tab === "shape"
                        ? "Форма"
                        : tab === "style"
                        ? "Стиль"
                        : tab === "gradient"
                        ? "Градієнт"
                        : tab === "animation"
                        ? "Анімація"
                        : "Позиція"}
                    </button>
                  ))}
                </div>

                {/* Вміст вкладок */}
                {currentTab === "text" && (
                  <div className="space-y-4">
                    <button onClick={addNewText} className="px-3 py-1 bg-blue-500 text-white rounded">
                      Додати текст
                    </button>

                    {/* Список текстів */}
                    <div className="space-y-2">
                      {texts.map((text) => (
                        <div
                          key={text.id}
                          className={`flex items-center justify-between p-2 rounded-md border ${
                            selectedText === text.id ? "border-blue-500" : "border-gray-200"
                          }`}
                        >
                          <span>{text.content}</span>
                          <div className="flex space-x-2">
                            <button onClick={() => setSelectedText(text.id)} className="px-2 py-1 text-sm bg-gray-100 rounded">
                              Редагувати
                            </button>
                            <button onClick={() => deleteText(text.id)} className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded">
                              Видалити
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Редактор тексту */}
                    {selectedText && <TextEditor text={texts.find((t) => t.id === selectedText)!} onUpdate={(updates) => updateText(selectedText, updates)} />}
                  </div>
                )}
                {currentTab === "shape" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Кількість точок</Label>
                      <Input
                        type="number"
                        min={3}
                        max={36}
                        value={selectedBlobData.points}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            points: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Радіус</Label>
                      <Input
                        type="number"
                        min={50}
                        max={200}
                        value={selectedBlobData.radius}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            radius: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Випадковість</Label>
                      <Input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={selectedBlobData.randomness}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            randomness: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Пресети</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(SHAPE_PRESETS).map(([name, preset]) => (
                          <button
                            key={name}
                            onClick={() =>
                              updateBlob(selectedBlob, {
                                points: preset.points,
                                randomness: preset.randomness,
                              })
                            }
                            className="p-2 border rounded-md hover:bg-gray-50"
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {currentTab === "style" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Колір</Label>
                      <Input
                        type="color"
                        value={selectedBlobData.color}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            color: e.target.value,
                            gradient: undefined, // вимикаємо градієнт при зміні кольору
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={!!selectedBlobData.gradient}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Вмикаємо градієнт
                            updateBlob(selectedBlob, {
                              gradient: {
                                type: "linear",
                                stops: [
                                  { offset: 0, color: selectedBlobData.color },
                                  { offset: 1, color: "#ffffff" },
                                ],
                                angle: 0,
                              },
                            });
                          } else {
                            // Вимикаємо градієнт
                            updateBlob(selectedBlob, {
                              gradient: undefined,
                            });
                          }
                        }}
                        className="w-4 h-4"
                      />
                      <Label>Увімкнути градієнт</Label>
                    </div>
                    <div>
                      <Label>Прозорість</Label>
                      <Input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={selectedBlobData.opacity}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            opacity: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Розмиття</Label>
                      <Input
                        type="range"
                        min={0}
                        max={20}
                        value={selectedBlobData.blur}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            blur: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Масштаб</Label>
                      <Input
                        type="range"
                        min={0.1}
                        max={2}
                        step={0.1}
                        value={selectedBlobData.scale}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            scale: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {currentTab === "gradient" && (
                  <GradientEditor gradient={selectedBlobData.gradient} onChange={(gradient) => updateBlob(selectedBlob, { gradient })} />
                )}

                {currentTab === "animation" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBlobData.isAnimated}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            isAnimated: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <Label>Анімація увімкнена</Label>
                    </div>

                    {selectedBlobData.isAnimated && (
                      <>
                        <div>
                          <Label>Тип анімації</Label>
                          <Select
                            value={selectedBlobData.animationType}
                            onChange={(e) =>
                              updateBlob(selectedBlob, {
                                animationType: e.target.value as BlobShape["animationType"],
                              })
                            }
                            options={[
                              { value: "morph", label: "Морф" },
                              { value: "rotate", label: "Обертання" },
                              { value: "pulse", label: "Пульсація" },
                              { value: "float", label: "Плавання" },
                              { value: "bounce", label: "Стрибки" },
                              { value: "wave", label: "Хвиля" },
                            ]}
                          />
                        </div>

                        <div>
                          <Label>Тривалість (секунди)</Label>
                          <Input
                            type="number"
                            min={0.1}
                            step={0.1}
                            value={selectedBlobData.animationDuration}
                            onChange={(e) =>
                              updateBlob(selectedBlob, {
                                animationDuration: parseFloat(e.target.value),
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label>Напрямок</Label>
                          <Select
                            value={selectedBlobData.animationDirection}
                            onChange={(e) =>
                              updateBlob(selectedBlob, {
                                animationDirection: e.target.value as BlobShape["animationDirection"],
                              })
                            }
                            options={[
                              { value: "normal", label: "Нормальний" },
                              { value: "reverse", label: "Реверс" },
                              { value: "alternate", label: "Чергування" },
                            ]}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {currentTab === "position" && (
                  <div className="space-y-4">
                    <GroupManager />
                    <div>
                      <Label>Позиція X</Label>
                      <Input
                        type="range"
                        min={-200}
                        max={200}
                        value={selectedBlobData.x}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            x: parseInt(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        value={selectedBlobData.x}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            x: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Позиція Y</Label>
                      <Input
                        type="range"
                        min={-200}
                        max={200}
                        value={selectedBlobData.y}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            y: parseInt(e.target.value),
                          })
                        }
                      />
                      <Input
                        type="number"
                        value={selectedBlobData.y}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            y: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Поворот (градуси)</Label>
                      <Input
                        type="range"
                        min={0}
                        max={360}
                        value={selectedBlobData.rotation}
                        onChange={(e) =>
                          updateBlob(selectedBlob, {
                            rotation: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    // Додаємо групові контроли до панелі налаштувань
                    {selectedBlobData?.groupId && <GroupControls groupId={selectedBlobData.groupId} />}
                    <div>
                      <Label>Порядок відображення</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => moveLayerToFront(selectedBlob)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                          На передній план
                        </button>
                        <button onClick={() => moveLayerToBack(selectedBlob)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                          На задній план
                        </button>
                        <button onClick={() => moveLayerForward(selectedBlob)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                          Вперед
                        </button>
                        <button onClick={() => moveLayerBackward(selectedBlob)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                          Назад
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Export */}
      <Card>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">SVG код</h3>
              <button
                onClick={() => navigator.clipboard.writeText(generateExportCode())}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Копіювати SVG
              </button>
            </div>
            <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
              <code className="text-sm">{generateExportCode()}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SvgBlobGenerator;
