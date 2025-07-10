import React, { useState } from 'react';

const SVGButtonGradient = ({ 
  text, 
  variant = 'primary',
  width = 200,
  height = 60,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Розширені варіанти з внутрішніми градієнтами
  const variants = {
    primary: {
      flame: ['#4d9fff', '#338fff', '#1a75ff'],
      gradient: {
        default: ['#1a1a2e', '#2a2a4a'],
        hover: ['#2a2a4a', '#1a1a2e']
      },
      text: '#ffffff'
    },
    success: {
      flame: ['#4dff4d', '#33ff33', '#1aff1a'],
      gradient: {
        default: ['#1a2e1a', '#2a4a2a'],
        hover: ['#2a4a2a', '#1a2e1a']
      },
      text: '#ffffff'
    },
    danger: {
      flame: ['#ff4d4d', '#ff9933', '#ffff66'],
      gradient: {
        default: ['#2e1a1a', '#4a2a2a'],
        hover: ['#4a2a2a', '#2e1a1a']
      },
      text: '#ffffff'
    }
  };

  const colors = variants[variant];
  const buttonId = `btn-${variant}-${Math.random().toString(36).substr(2, 9)}`;

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

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
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onClick={onClick}
    >
      <defs>
        {/* Градієнт для фону кнопки */}
        <linearGradient 
          id={`buttonGradient-${buttonId}`} 
          x1="0%" 
          y1="0%" 
          x2="0%" 
          y2="100%"
        >
          <stop 
            offset="0%" 
            stopColor={isHovered ? colors.gradient.hover[0] : colors.gradient.default[0]}
          >
            <animate 
              attributeName="stop-color"
              values={`${colors.gradient.default[0]};${colors.gradient.hover[0]};${colors.gradient.default[0]}`}
              dur="0.2s"
              begin={isHovered ? "0s" : "indefinite"}
              fill="freeze"
            />
          </stop>
          <stop 
            offset="100%" 
            stopColor={isHovered ? colors.gradient.hover[1] : colors.gradient.default[1]}
          >
            <animate 
              attributeName="stop-color"
              values={`${colors.gradient.default[1]};${colors.gradient.hover[1]};${colors.gradient.default[1]}`}
              dur="0.2s"
              begin={isHovered ? "0s" : "indefinite"}
              fill="freeze"
            />
          </stop>
        </linearGradient>

        {/* Градієнт для полум'я */}
        <linearGradient id={`fireGradient-${buttonId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.flame[0]}>
            <animate 
              attributeName="stop-color" 
              values={`${colors.flame[0]};${colors.flame[1]};${colors.flame[0]}`}
              dur="0.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor={colors.flame[1]}>
            <animate 
              attributeName="stop-color" 
              values={`${colors.flame[1]};${colors.flame[2]};${colors.flame[1]}`}
              dur="0.5s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor={colors.flame[2]} />
        </linearGradient>
        
        {/* Фільтр світіння */}
        <filter id={`glow-${buttonId}`}>
          <feGaussianBlur 
            stdDeviation={isHovered ? (isPressed ? "1" : "2") : "1"} 
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g 
        filter={`url(#glow-${buttonId})`}
        transform={isPressed ? 'scale(0.98)' : 'scale(1)'}
        style={{ transition: 'transform 0.1s ease' }}
      >
        {/* Фон кнопки з градієнтом */}
        <rect 
          x="5" 
          y="5" 
          width={width - 10} 
          height={height - 10} 
          rx={height / 2} 
          fill={`url(#buttonGradient-${buttonId})`}
        />
        
        {/* Анімований бордер */}
        <rect 
          x="5" 
          y="5" 
          width={width - 10} 
          height={height - 10} 
          rx={height / 2} 
          fill="none" 
          stroke={`url(#fireGradient-${buttonId})`}
          strokeWidth="2"
          strokeDasharray={width * 2 + height * 2}
          strokeDashoffset="0"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            from="0" 
            to={-(width * 2 + height * 2)}
            dur={isHovered ? "1s" : "2s"}
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Текст */}
        <text 
          x={width / 2} 
          y={height / 2} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill={colors.text}
          fontFamily="Arial, sans-serif" 
          fontSize={height / 3}
          style={{
            transition: 'transform 0.1s ease',
            transform: isPressed ? 'scale(0.95)' : 'scale(1)'
          }}
        >
          {text}
        </text>
      </g>
    </svg>
  );
};

const ButtonDemo = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl text-white text-center mb-8">
          Interactive SVG Buttons
        </h1>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <SVGButtonGradient 
            text="Primary" 
            variant="primary" 
            onClick={() => console.log('Primary clicked')}
          />
          <SVGButtonGradient 
            text="Success" 
            variant="success"
            onClick={() => console.log('Success clicked')}
          />
          <SVGButtonGradient 
            text="Danger" 
            variant="danger"
            onClick={() => console.log('Danger clicked')}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <SVGButtonGradient 
            text="Large Button" 
            variant="primary"
            width={300}
            height={80}
            onClick={() => console.log('Large clicked')}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;