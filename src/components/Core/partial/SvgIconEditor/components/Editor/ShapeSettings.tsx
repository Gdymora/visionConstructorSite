import { PathType, ShapeData } from "@/components/Core/partial/SvgIconEditor/utils/types";

interface ShapeSettingsProps {
  type: PathType;
  data: ShapeData | null;
  onUpdate: (updates: Partial<ShapeData>) => void;
}

export const ShapeSettings: React.FC<ShapeSettingsProps> = ({ type, data, onUpdate }) => {
  if (!data) return null;
  console.log("ShapeSettings:", { type, data });
  switch (type) {
    case "polygon":
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Кількість сторін
              <input
                type="number"
                min={3}
                max={12}
                value={data.sides}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3;
                  onUpdate({ sides: Math.max(3, Math.min(12, value)) });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>
          </div>
        </div>
      );

    case "star":
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Кількість променів
              <input
                type="number"
                min={3}
                max={12}
                value={data.starPoints || 5}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3;
                  onUpdate({
                    ...data,
                    starPoints: Math.max(3, Math.min(12, value)),
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </label>

            <label className="block text-sm font-medium">
              Внутрішній радіус: {((data.innerRadius || 0.4) * 100).toFixed(0)}%
              <input
                type="range"
                min={10}
                max={90}
                value={(data.innerRadius || 0.4) * 100}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  onUpdate({
                    ...data,
                    innerRadius: value / 100,
                  });
                }}
                className="mt-1 block w-full"
              />
            </label>

            <label className="block text-sm font-medium">
              Зовнішній радіус: {((data.outerRadius || 0.9) * 100).toFixed(0)}%
              <input
                type="range"
                min={10}
                max={90}
                value={(data.outerRadius || 0.9) * 100}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  onUpdate({
                    ...data,
                    outerRadius: value / 100,
                  });
                }}
                className="mt-1 block w-full"
              />
            </label>
          </div>
        </div>
      );

    case "curve":
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Натяг кривої: {data.tension.toFixed(1)}
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min={-1}
                  max={1}
                  step={0.1}
                  value={data.tension}
                  onChange={(e) => onUpdate({ tension: parseFloat(e.target.value) })}
                  className="mt-1 block w-full"
                />
                <svg width="60" height="30" className="border">
                  <path d={`M 10 15 Q ${30 + data.tension * 20} ${5 + data.tension * 20} 50 15`} stroke="black" fill="none" />
                </svg>
              </div>
            </label>
            <div className="text-xs text-gray-500 mt-1">0 = пряміша лінія, 1 = більший вигин</div>
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={data.closed} onChange={(e) => onUpdate({ closed: e.target.checked })} />
              <span className="text-sm font-medium">Замкнута крива</span>
            </label>
          </div>
        </div>
      );

    case "roundedRect":
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Радіус кутів
              <input
                type="range"
                min={0}
                max={50}
                value={data.cornerRadius || 10}
                onChange={(e) => onUpdate({ cornerRadius: parseInt(e.target.value) })}
                className="mt-1 block w-full"
              />
            </label>
          </div>
        </div>
      );

      case "arc_left":
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Початковий кут
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={data.startAngle || 0}
                  onChange={(e) => onUpdate({ startAngle: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </label>
              <label className="block text-sm font-medium">
                Кінцевий кут
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={data.endAngle || 90}
                  onChange={(e) => onUpdate({ endAngle: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </label>
            </div>
          </div>
        );
      
      case "arc_right":
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Початковий кут
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={data.startAngle || 0}
                  onChange={(e) => onUpdate({ startAngle: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </label>
              <label className="block text-sm font-medium">
                Кінцевий кут
                <input
                  type="number"
                  min={0}
                  max={360}
                  value={data.endAngle || 90}
                  onChange={(e) => onUpdate({ endAngle: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </label>
            </div>
          </div>
        );

    default:
      return null;
  }
};
