import React, { useState } from 'react';

const PulseButton = ({
  text = "Pulse",
  width = 200,
  height = 60,
  color = "#4ade80",
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonId = React.useId();

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
        {/* Фільтр для світіння */}
        <filter id={`glow-${buttonId}`}>
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite operator="over" in="blur" in2="SourceGraphic"/>
        </filter>

        {/* Маска для частинок */}
        <mask id={`buttonMask-${buttonId}`}>
          <rect x="0" y="0" width={width} height={height} fill="white"/>
        </mask>
      </defs>

      <g transform={isPressed ? 'scale(0.98)' : 'scale(1)'}>
        {/* Пульсуюче кільце */}
        {isHovered && (
          <rect
            x="2" y="2"
            width={width-4}
            height={height-4}
            rx={height/4}
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity="0.5"
          >
            <animate
              attributeName="stroke-width"
              values="2;4;2"
              dur="1s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.5;0;0.5"
              dur="1s"
              repeatCount="indefinite"
            />
          </rect>
        )}

        {/* Основна кнопка */}
        <rect
          x="2" y="2"
          width={width-4}
          height={height-4}
          rx={height/4}
          fill={`${color}22`}
          stroke={color}
          strokeWidth="2"
          filter={`url(#glow-${buttonId})`}
        >
          {isHovered && (
            <animate
              attributeName="stroke-width"
              values="2;3;2"
              dur="0.5s"
              repeatCount="indefinite"
            />
          )}
        </rect>

        {/* Частинки */}
        {isHovered && (
          <g mask={`url(#buttonMask-${buttonId})`}>
            {[...Array(12)].map((_, i) => (
              <circle
                key={i}
                cx={width/2}
                cy={height/2}
                r="2"
                fill={color}
                opacity="0.6"
              >
                <animate
                  attributeName="cx"
                  values={`${width/2};${width/2 + (Math.random() - 0.5) * width/2}`}
                  dur={`${0.5 + Math.random()}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${height/2};${height/2 + (Math.random() - 0.5) * height/2}`}
                  dur={`${0.5 + Math.random()}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur={`${0.5 + Math.random()}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
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
      </g>
    </svg>
  );
};

// Демонстрація
const PulseButtonDemo = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl text-white text-center mb-8">
          Pulse Buttons
        </h1>
        
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <PulseButton 
            text="Energy" 
            color="#4ade80"
          />
          
          <PulseButton 
            text="Magic" 
            color="#a78bfa"
          />
          
          <PulseButton 
            text="Fire" 
            color="#f87171"
          />
        </div>

        <div className="flex flex-wrap gap-8 justify-center items-center">
          <PulseButton 
            text="★" 
            width={80}
            height={80}
            color="#facc15"
          />
        </div>
      </div>
    </div>
  );
};

export default PulseButtonDemo;