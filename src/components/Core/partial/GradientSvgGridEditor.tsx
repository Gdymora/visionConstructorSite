import { useState } from "react";

// Custom Components
const Card = ({ children, className = "" }) => <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>;

const CardContent = ({ children, className = "" }) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;

const Label = ({ children, className = "" }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>{children}</label>
);

const Input = ({ type = "text", value, onChange, className = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

const GradientSvgGridEditor = () => {
  const [gridParams, setGridParams] = useState({
    smallGrid: {
      width: 100,
      height: 100,
      path1: "M 0 0 H 100 V 100",
      path2: "M 0 0 V 100 H 100",
      strokeWidth: 1
    },
    mediumGrid: {
      width: 200,
      height: 200,
      path1: "M 0 0 H 200 V 200",
      path2: "M 0 0 V 200 H 200",
      strokeWidth: 1
    },
    largeGrid: {
      width: 400,
      height: 400,
      path1: "M 0 0 H 400 V 400",
      path2: "M 0 0 V 400 H 400",
      strokeWidth: 1
    },
    gradient: {
      verticalStart: "#000000",
      verticalEnd: "#ffffff",
      horizontalStart: "#000000",
      horizontalEnd: "#ffffff"
    },
    pattern: {
      repeat: 1,
      backgroundColor: "#ffffff"
    }
  });

  const handleInputChange = (section, param, value) => {
    setGridParams(prev => {
      const newState = {
        ...prev,
        [section]: {
          ...prev[section],
          [param]: value
        }
      };

      if (param === 'width' || param === 'height') {
        const width = newState[section].width;
        const height = newState[section].height;
        newState[section].path1 = `M 0 0 H ${width} V ${height}`;
        newState[section].path2 = `M 0 0 V ${height} H ${width}`;
      }

      return newState;
    });
  };

  const generatePattern = () => {
    const pattern = [];
    const repeat = gridParams.pattern.repeat;
    
    for(let i = 0; i < repeat; i++) {
      for(let j = 0; j < repeat; j++) {
        pattern.push(
          <g key={`${i}-${j}`} transform={`translate(${i * 400} ${j * 400})`}>
            {/* Small Grid */}
            <g>
              <path 
                d={gridParams.smallGrid.path1} 
                stroke="url(#verticalGradient)" 
                strokeWidth={gridParams.smallGrid.strokeWidth}
                fill="none" 
              />
              <path 
                d={gridParams.smallGrid.path2} 
                stroke="url(#horizontalGradient)" 
                strokeWidth={gridParams.smallGrid.strokeWidth}
                fill="none" 
              />
            </g>

            {/* Medium Grid */}
            <g>
              <path 
                d={gridParams.mediumGrid.path1} 
                stroke="url(#verticalGradient)" 
                strokeWidth={gridParams.mediumGrid.strokeWidth}
                fill="none" 
              />
              <path 
                d={gridParams.mediumGrid.path2} 
                stroke="url(#horizontalGradient)" 
                strokeWidth={gridParams.mediumGrid.strokeWidth}
                fill="none" 
              />
            </g>

            {/* Large Grid */}
            <g>
              <path 
                d={gridParams.largeGrid.path1} 
                stroke="url(#verticalGradient)" 
                strokeWidth={gridParams.largeGrid.strokeWidth}
                fill="none" 
              />
              <path 
                d={gridParams.largeGrid.path2} 
                stroke="url(#horizontalGradient)" 
                strokeWidth={gridParams.largeGrid.strokeWidth}
                fill="none" 
              />
            </g>
          </g>
        );
      }
    }
    return pattern;
  }; 

  // Функція для генерації готового SVG коду
  const generateSvgCode = () => {
    return `<svg width="100%" height="400" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color: ${gridParams.gradient.verticalStart}" />
      <stop offset="100%" style="stop-color: ${gridParams.gradient.verticalEnd}" />
    </linearGradient>
    <linearGradient id="horizontalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color: ${gridParams.gradient.horizontalStart}" />
      <stop offset="100%" style="stop-color: ${gridParams.gradient.horizontalEnd}" />
    </linearGradient>
  </defs>

  <!-- Small Grid -->
  <g>
    <path d="${gridParams.smallGrid.path1}" stroke="url(#verticalGradient)" fill="none" />
    <path d="${gridParams.smallGrid.path2}" stroke="url(#horizontalGradient)" fill="none" />
  </g>

  <!-- Medium Grid -->
  <g>
    <path d="${gridParams.mediumGrid.path1}" stroke="url(#verticalGradient)" fill="none" />
    <path d="${gridParams.mediumGrid.path2}" stroke="url(#horizontalGradient)" fill="none" />
  </g>

  <!-- Large Grid -->
  <g>
    <path d="${gridParams.largeGrid.path1}" stroke="url(#verticalGradient)" fill="none" />
    <path d="${gridParams.largeGrid.path2}" stroke="url(#horizontalGradient)" fill="none" />
  </g>
</svg>`;
  };

  return (
    <div className="w-full max-w-6xl p-4 space-y-4">
   {/* SVG Preview */}
   <Card className="w-full p-4">
        <svg 
          width="100%" 
          height="400" 
          viewBox={`0 0 ${400 * gridParams.pattern.repeat} ${400 * gridParams.pattern.repeat}`}
          style={{ backgroundColor: gridParams.pattern.backgroundColor }}
        >
          <defs>
            <linearGradient id="verticalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{stopColor: gridParams.gradient.verticalStart}} />
              <stop offset="100%" style={{stopColor: gridParams.gradient.verticalEnd}} />
            </linearGradient>
            <linearGradient id="horizontalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: gridParams.gradient.horizontalStart}} />
              <stop offset="100%" style={{stopColor: gridParams.gradient.horizontalEnd}} />
            </linearGradient>
          </defs>

          {generatePattern()}
        </svg>
      </Card>

      {/* Controls */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Small Grid Controls */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Мала сітка</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Ширина</Label>
                  <Input 
                    type="number" 
                    value={gridParams.smallGrid.width}
                    onChange={(e) => handleInputChange('smallGrid', 'width', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Висота</Label>
                  <Input 
                    type="number"
                    value={gridParams.smallGrid.height}
                    onChange={(e) => handleInputChange('smallGrid', 'height', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Товщина</Label>
                  <Input 
                    type="number"
                    value={gridParams.smallGrid.strokeWidth}
                    onChange={(e) => handleInputChange('smallGrid', 'strokeWidth', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Шлях 1</Label>
                  <Input 
                    value={gridParams.smallGrid.path1}
                    onChange={(e) => handleInputChange('smallGrid', 'path1', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Шлях 2</Label>
                  <Input 
                    value={gridParams.smallGrid.path2}
                    onChange={(e) => handleInputChange('smallGrid', 'path2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Medium Grid Controls */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Середня сітка</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Ширина</Label>
                  <Input 
                    type="number"
                    value={gridParams.mediumGrid.width}
                    onChange={(e) => handleInputChange('mediumGrid', 'width', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Висота</Label>
                  <Input 
                    type="number"
                    value={gridParams.mediumGrid.height}
                    onChange={(e) => handleInputChange('mediumGrid', 'height', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Товщина</Label>
                  <Input 
                    type="number"
                    value={gridParams.mediumGrid.strokeWidth}
                    onChange={(e) => handleInputChange('mediumGrid', 'strokeWidth', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Шлях 1</Label>
                  <Input 
                    value={gridParams.mediumGrid.path1}
                    onChange={(e) => handleInputChange('mediumGrid', 'path1', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Шлях 2</Label>
                  <Input 
                    value={gridParams.mediumGrid.path2}
                    onChange={(e) => handleInputChange('mediumGrid', 'path2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Large Grid Controls */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Велика сітка</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Ширина</Label>
                  <Input 
                    type="number"
                    value={gridParams.largeGrid.width}
                    onChange={(e) => handleInputChange('largeGrid', 'width', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Висота</Label>
                  <Input 
                    type="number"
                    value={gridParams.largeGrid.height}
                    onChange={(e) => handleInputChange('largeGrid', 'height', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Товщина</Label>
                  <Input 
                    type="number"
                    value={gridParams.largeGrid.strokeWidth}
                    onChange={(e) => handleInputChange('largeGrid', 'strokeWidth', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Шлях 1</Label>
                  <Input 
                    value={gridParams.largeGrid.path1}
                    onChange={(e) => handleInputChange('largeGrid', 'path1', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Шлях 2</Label>
                  <Input 
                    value={gridParams.largeGrid.path2}
                    onChange={(e) => handleInputChange('largeGrid', 'path2', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Gradient Controls */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Градієнти</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Верт. поч.</Label>
                  <Input 
                    type="color"
                    value={gridParams.gradient.verticalStart}
                    onChange={(e) => handleInputChange('gradient', 'verticalStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Верт. кін.</Label>
                  <Input 
                    type="color"
                    value={gridParams.gradient.verticalEnd}
                    onChange={(e) => handleInputChange('gradient', 'verticalEnd', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Гориз. поч.</Label>
                  <Input 
                    type="color"
                    value={gridParams.gradient.horizontalStart}
                    onChange={(e) => handleInputChange('gradient', 'horizontalStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Гориз. кін.</Label>
                  <Input 
                    type="color"
                    value={gridParams.gradient.horizontalEnd}
                    onChange={(e) => handleInputChange('gradient', 'horizontalEnd', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Pattern Controls */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Патерн</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label>Повторення</Label>
                  <Input 
                    type="number"
                    min="1"
                    value={gridParams.pattern.repeat}
                    onChange={(e) => handleInputChange('pattern', 'repeat', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Колір фону</Label>
                  <Input 
                    type="color"
                    value={gridParams.pattern.backgroundColor}
                    onChange={(e) => handleInputChange('pattern', 'backgroundColor', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Export Section */}
      <Card>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Готовий SVG код</h3>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generateSvgCode());
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Копіювати
              </button>
            </div>
            <div className="relative">
              <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                <code className="text-sm">
                  {generateSvgCode()}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 

export default GradientSvgGridEditor;
