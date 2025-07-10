import React, { useState } from 'react';

const SVGButtonGradientTouch = ({ 
  text, 
  variant = 'primary',
  width = 200,
  height = 60,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
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

  // Об'єднані обробники для mouse та touch подій
  const handlePressStart = (e) => {
    // Запобігаємо подвійній обробці для деяких браузерів
    e.preventDefault();
    setIsPressed(true);
  };

  const handlePressEnd = (e) => {
    e.preventDefault();
    setIsPressed(false);
    if (onClick) onClick(e);
  };

  const handlePressCancel = (e) => {
    e.preventDefault();
    setIsPressed(false);
    setIsHovered(false);
  };

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width={width} 
      height={height}
      className="cursor-pointer touch-manipulation"
      // Mouse події
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      // Touch події
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressCancel}
      style={{
        WebkitTapHighlightColor: 'transparent', // Прибираємо стандартне підсвічування на iOS
        userSelect: 'none' // Запобігаємо виділенню тексту
      }}
    >
      <defs>
        <linearGradient 
          id={`buttonGradient-${buttonId}`} 
          x1="0%" 
          y1="0%" 
          x2="0%" 
          y2="100%"
        >
          <stop 
            offset="0%" 
            stopColor={isHovered || isPressed ? colors.gradient.hover[0] : colors.gradient.default[0]}
          >
            <animate 
              attributeName="stop-color"
              values={`${colors.gradient.default[0]};${colors.gradient.hover[0]};${colors.gradient.default[0]}`}
              dur="0.2s"
              begin={isHovered || isPressed ? "0s" : "indefinite"}
              fill="freeze"
            />
          </stop>
          <stop 
            offset="100%" 
            stopColor={isHovered || isPressed ? colors.gradient.hover[1] : colors.gradient.default[1]}
          >
            <animate 
              attributeName="stop-color"
              values={`${colors.gradient.default[1]};${colors.gradient.hover[1]};${colors.gradient.default[1]}`}
              dur="0.2s"
              begin={isHovered || isPressed ? "0s" : "indefinite"}
              fill="freeze"
            />
          </stop>
        </linearGradient>

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
        
        <filter id={`glow-${buttonId}`}>
          <feGaussianBlur 
            stdDeviation={isPressed ? "1" : (isHovered ? "2" : "1")} 
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
        style={{ 
          transition: 'transform 0.1s ease',
          transformOrigin: 'center' 
        }}
      >
        <rect 
          x="5" 
          y="5" 
          width={width - 10} 
          height={height - 10} 
          rx={height / 2} 
          fill={`url(#buttonGradient-${buttonId})`}
        />
        
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
            dur={isHovered || isPressed ? "1s" : "2s"}
            repeatCount="indefinite"
          />
        </rect>
        
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
            transform: isPressed ? 'scale(0.95)' : 'scale(1)',
            transformOrigin: 'center'
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
          Touch-enabled SVG Buttons
        </h1>
        
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <SVGButtonGradientTouch 
            text="Primary" 
            variant="primary" 
            onClick={() => console.log('Primary clicked')}
          />
          <SVGButtonGradientTouch 
            text="Success" 
            variant="success"
            onClick={() => console.log('Success clicked')}
          />
          <SVGButtonGradientTouch 
            text="Danger" 
            variant="danger"
            onClick={() => console.log('Danger clicked')}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <SVGButtonGradientTouch 
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