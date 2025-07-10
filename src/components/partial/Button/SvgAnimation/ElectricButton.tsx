import React, { useState, useEffect } from 'react';

const ElectricButton = ({
  text = "Electric",
  width = 200,
  height = 60,
  color = "#00ff00",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sparkPath, setSparkPath] = useState("");
  const buttonId = React.useId();

  // Генерація випадкового шляху для іскри
  const generateSparkPath = () => {
    const points = [];
    const segments = 8;
    const variance = height / 4;
    
    for(let i = 0; i <= segments; i++) {
      const x = (width * i) / segments;
      const baseY = height / 2;
      const variance_y = i === 0 || i === segments ? 0 : 
        (Math.random() - 0.5) * variance;
      points.push(`${x},${baseY + variance_y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  // Оновлення шляху іскри кожні 150мс при ховері
  useEffect(() => {
    let interval;
    if (isHovered) {
      interval = setInterval(() => {
        setSparkPath(generateSparkPath());
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`}
      width={width} 
      height={height}
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <defs>
        {/* Фільтр для основного світіння */}
        <filter id={`glow-${buttonId}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Фільтр для електричних розрядів */}
        <filter id={`electric-${buttonId}`}>
          <feGaussianBlur stdDeviation="1" result="blur"/>
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 15 -5"
          />
        </filter>

        {/* Градієнт для фону */}
        <linearGradient id={`buttonGradient-${buttonId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`${color}33`}>
            <animate
              attributeName="stop-color"
              values={`${color}33;${color}66;${color}33`}
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={`${color}66`}>
            <animate
              attributeName="stop-color"
              values={`${color}66;${color}33;${color}66`}
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>

      <g transform={isPressed ? 'scale(0.98)' : 'scale(1)'}>
        {/* Фон кнопки */}
        <rect
          x="2" y="2"
          width={width-4}
          height={height-4}
          rx={height/4}
          fill="black"
          stroke={color}
          strokeWidth="1"
          filter={`url(#glow-${buttonId})`}
        />

        {/* Внутрішній градієнт */}
        <rect
          x="3" y="3"
          width={width-6}
          height={height-6}
          rx={height/4 - 1}
          fill={`url(#buttonGradient-${buttonId})`}
          opacity="0.1"
        />

        {/* Електричні розряди */}
        {isHovered && (
          <>
            <path
              d={sparkPath || generateSparkPath()}
              stroke={color}
              strokeWidth="2"
              fill="none"
              filter={`url(#electric-${buttonId})`}
              opacity="0.7"
            >
              <animate
                attributeName="opacity"
                values="0.7;0.3;0.7"
                dur="50ms"
                repeatCount="indefinite"
              />
            </path>
            {/* Додаткові розряди */}
            <path
              d={generateSparkPath()}
              stroke={color}
              strokeWidth="1"
              fill="none"
              filter={`url(#electric-${buttonId})`}
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.7;0.3"
                dur="100ms"
                repeatCount="indefinite"
              />
            </path>
          </>
        )}

        {/* Текст */}
        <text
          x={width/2}
          y={height/2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          fontFamily="Arial, sans-serif"
          fontSize={height/3}
          filter={`url(#glow-${buttonId})`}
        >
          {text}
        </text>

        {/* Частинки при натисканні */}
        {isPressed && Array.from({length: 8}).map((_, i) => (
          <circle
            key={i}
            cx={width/2}
            cy={height/2}
            r="2"
            fill={color}
            filter={`url(#glow-${buttonId})`}
          >
            <animate
              attributeName="cx"
              values={`${width/2};${width/2 + (Math.random() - 0.5) * width}`}
              dur="500ms"
              begin="0s"
              fill="freeze"
            />
            <animate
              attributeName="cy"
              values={`${height/2};${height/2 + (Math.random() - 0.5) * height}`}
              dur="500ms"
              begin="0s"
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="1;0"
              dur="500ms"
              begin="0s"
              fill="freeze"
            />
          </circle>
        ))}
      </g>
    </svg>
  );
};

// Демонстрація
const ElectricButtonDemo = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl text-white text-center mb-8">
          Electric Buttons
        </h1>
        
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <ElectricButton 
            text="Spark" 
            color="#00ff00"
            onClick={() => console.log('Green clicked')}
          />
          
          <ElectricButton 
            text="Power" 
            color="#ff00ff"
            onClick={() => console.log('Purple clicked')}
          />
          
          <ElectricButton 
            text="Energy" 
            color="#00ffff"
            onClick={() => console.log('Cyan clicked')}
          />
        </div>

        <div className="flex flex-wrap gap-8 justify-center items-center">
          <ElectricButton 
            text="⚡" 
            width={80}
            height={80}
            color="#ffff00"
          />
        </div>
      </div>
    </div>
  );
};

export default ElectricButtonDemo;