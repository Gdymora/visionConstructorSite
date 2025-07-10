import { useRef, useState } from "react";
import { PathElement } from "./SvgIconEditor/utils";
// Базові компоненти
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

interface Point {
  x: number;
  y: number;
}

/* interface PathElement {
  id: string;
  type: "line" | "curve" | "rect" | "circle"| "star";
  points: Point[];
  color: string;
  strokeWidth: number;
  fill?: string;
} */

const SvgIconEditor = () => {
  const [paths, setPaths] = useState<PathElement[]>([]);
  const [currentPath, setCurrentPath] = useState<PathElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedTool, setSelectedTool] = useState<PathElement["type"]>("line");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [fillColor, setFillColor] = useState("none");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const getMousePosition = (event: React.MouseEvent): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };

    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };

    return {
      x: (event.clientX - CTM.e) / CTM.a,
      y: (event.clientY - CTM.f) / CTM.d,
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    const point = getMousePosition(e);
    const newPath: PathElement = {
      id: Date.now().toString(),
      type: selectedTool,
      points: [point],
      color: selectedColor,
      strokeWidth,
      fill: fillColor,
    };
    setCurrentPath(newPath);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !currentPath) return;

    const point = getMousePosition(e);

    switch (selectedTool) {
      case "line":
      case "rect":
        setCurrentPath({
          ...currentPath,
          points: [currentPath.points[0], point],
        });
        break;
      case "circle":
        const radius = Math.sqrt(Math.pow(point.x - currentPath.points[0].x, 2) + Math.pow(point.y - currentPath.points[0].y, 2));
        setCurrentPath({
          ...currentPath,
          points: [currentPath.points[0], { x: radius, y: radius }],
        });
        break;
      case "curve":
        setCurrentPath({
          ...currentPath,
          points: [...currentPath.points, point],
        });
        break;
    }
  };

  const endDrawing = () => {
    if (currentPath) {
      setPaths([...paths, currentPath]);
      setCurrentPath(null);
    }
    setIsDrawing(false);
  };

  const generatePathData = (element: PathElement): string => {
    switch (element.type) {
      case "line":
        return `M ${element.points[0].x} ${element.points[0].y} L ${element.points[1]?.x || element.points[0].x} ${
          element.points[1]?.y || element.points[0].y
        }`;
      case "rect":
        const [start, end] = element.points;
        const width = end ? Math.abs(end.x - start.x) : 0;
        const height = end ? Math.abs(end.y - start.y) : 0;
        const x = end ? Math.min(start.x, end.x) : start.x;
        const y = end ? Math.min(start.y, end.y) : start.y;
        return `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
      case "circle":
        const radius = element.points[1]?.x || 0;
        return `M ${element.points[0].x - radius} ${element.points[0].y} 
                  a ${radius} ${radius} 0 1 0 ${radius * 2} 0 
                  a ${radius} ${radius} 0 1 0 ${-radius * 2} 0`;
      case "curve":
        return `M ${element.points[0].x} ${element.points[0].y} 
                  ${element.points
                    .slice(1)
                    .map((p) => `L ${p.x} ${p.y}`)
                    .join(" ")}`;
                    case 'star': {
                      const points_count = element.data?.starPoints || 5;
                      const center = element.points[0];
                      // Розраховуємо зовнішній радіус від другої точки
                      const outerRadius = element.points[1] 
                        ? Math.hypot(element.points[1].x - center.x, element.points[1].y - center.y) 
                        : 0;
                      
                      // Використовуємо element.data.innerRadius якщо він є
                      const innerRadiusRatio = element.data?.innerRadius || 0.4;
                      const innerRadius = outerRadius * innerRadiusRatio;
                    
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
      default:
        return "";
    }
  };

  const deleteSelected = () => {
    if (selectedElement) {
      setPaths(paths.filter((p) => p.id !== selectedElement));
      setSelectedElement(null);
    }
  };

  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
      <Card>
        <CardContent>
          {/* Панель інструментів */}
          <div className="flex space-x-4 mb-4">
            <div className="space-y-2">
              <Label>Інструмент</Label>
              <div className="flex space-x-2">
                {(["line", "curve", "rect", "circle"] as const).map((tool) => (
                  <button
                    key={tool}
                    onClick={() => setSelectedTool(tool)}
                    className={`p-2 rounded ${selectedTool === tool ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                  >
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Колір лінії</Label>
              <Input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Товщина лінії</Label>
              <Input type="number" min={1} max={20} value={strokeWidth} onChange={(e) => setStrokeWidth(parseInt(e.target.value))} />
            </div>

            <div className="space-y-2">
              <Label>Колір заливки</Label>
              <Input type="color" value={fillColor === "none" ? "#ffffff" : fillColor} onChange={(e) => setFillColor(e.target.value)} />
              <button onClick={() => setFillColor(fillColor === "none" ? "#ffffff" : "none")} className="px-2 py-1 text-sm bg-gray-100 rounded">
                {fillColor === "none" ? "Увімкнути заливку" : "Вимкнути заливку"}
              </button>
            </div>

            {selectedElement && (
              <button onClick={deleteSelected} className="px-4 py-2 bg-red-500 text-white rounded">
                Видалити
              </button>
            )}
          </div>

          {/* Область малювання */}
          <div className="border rounded-lg overflow-hidden">
            <svg
              ref={svgRef}
              width="100%"
              height="400"
              viewBox="0 0 800 400"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              className="bg-white"
            >
              {/* Сітка */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Намальовані елементи */}
              {paths.map((path) => (
                <path
                  key={path.id}
                  d={generatePathData(path)}
                  stroke={path.color}
                  strokeWidth={path.strokeWidth}
                  fill={path.fill}
                  onClick={() => setSelectedElement(path.id)}
                  className={`cursor-pointer ${selectedElement === path.id ? "stroke-dasharray: 5,5" : ""}`}
                />
              ))}

              {/* Поточний елемент */}
              {currentPath && (
                <path d={generatePathData(currentPath)} stroke={currentPath.color} strokeWidth={currentPath.strokeWidth} fill={currentPath.fill} />
              )}
            </svg>
          </div>
        </CardContent>
      </Card>

      {/* Експорт */}
      <Card>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">SVG код</h3>
              <button
                onClick={() => {
                  const svgCode = `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                      ${paths
                        .map(
                          (path) => `
                        <path
                          d="${generatePathData(path)}"
                          stroke="${path.color}"
                          stroke-width="${path.strokeWidth}"
                          fill="${path.fill}"
                        />`
                        )
                        .join("\n")}
                    </svg>`;
                  navigator.clipboard.writeText(svgCode);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Копіювати SVG
              </button>
            </div>
            <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
              <code className="text-sm">
                {`<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    ${paths
                      .map(
                        (path) => `
                      <path
                        d="${generatePathData(path)}"
                        stroke="${path.color}"
                        stroke-width="${path.strokeWidth}"
                        fill="${path.fill}"
                      />`
                      )
                      .join("\n")}
                  </svg>`}
              </code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SvgIconEditor;
