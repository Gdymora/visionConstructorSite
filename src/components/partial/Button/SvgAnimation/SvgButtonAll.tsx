import React, { useState } from 'react';

// Типи форм кнопок
type ButtonShape = 'rounded' | 'circle' | 'square' | 'pill' | 'diamond' | 'hexagon';

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'success' | 'danger';
  width?: number;
  height?: number;
  shape?: ButtonShape;
  onClick?: () => void;
}

const SVGButton = ({ 
  text, 
  variant = 'primary',
  width = 200,
  height = 60,
  shape = 'rounded',
  onClick 
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Генеруємо форми для кнопок
  const getButtonShape = (shape: ButtonShape) => {
    const w = width - 10;
    const h = height - 10;
    const x = 5;
    const y = 5;

    switch (shape) {
      case 'circle':
        return {
          path: `M ${x + w/2} ${y} 
                 a ${h/2} ${h/2} 0 0 1 0 ${h} 
                 a ${h/2} ${h/2} 0 0 1 0 -${h}`,
          textY: height/2
        };
      
      case 'square':
        return {
          path: `M ${x} ${y} h ${w} v ${h} h -${w} Z`,
          textY: height/2
        };
      
      case 'pill':
        return {
          path: `M ${x + h/2} ${y} 
                 h ${w - h} 
                 a ${h/2} ${h/2} 0 0 1 0 ${h} 
                 h -${w - h} 
                 a ${h/2} ${h/2} 0 0 1 0 -${h}`,
          textY: height/2
        };
      
      case 'diamond':
        return {
          path: `M ${x + w/2} ${y} 
                 l ${w/2} ${h/2} 
                 l -${w/2} ${h/2} 
                 l -${w/2} -${h/2} 
                 Z`,
          textY: height/2
        };
      
      case 'hexagon':
        const side = h/2;
        return {
          path: `M ${x + side} ${y} 
                 h ${w - 2*side} 
                 l ${side} ${h/2} 
                 l -${side} ${h/2} 
                 h -${w - 2*side} 
                 l -${side} -${h/2} 
                 Z`,
          textY: height/2
        };
      
      case 'rounded':
      default:
        return {
          path: `M ${x} ${y + h/2} 
                 a ${h/2} ${h/2} 0 0 1 ${h/2} -${h/2} 
                 h ${w - h} 
                 a ${h/2} ${h/2} 0 0 1 ${h/2} ${h/2} 
                 v ${h/2} 
                 a ${h/2} ${h/2} 0 0 1 -${h/2} ${h/2} 
                 h -${w - h} 
                 a ${h/2} ${h/2} 0 0 1 -${h/2} -${h/2} 
                 Z`,
          textY: height/2
        };
    }
  };

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
  const buttonId = `btn-${variant}-${shape}`;
  const buttonShape = getButtonShape(shape);

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsPressed(true);
  };

  const handlePressEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsPressed(false);
    if (onClick) onClick();
  };

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width={width} 
      height={height}
      className="cursor-pointer touch-manipulation"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
    >
      <defs>
        <linearGradient 
          id={`buttonGradient-${buttonId}`} 
          x1="0%" y1="0%" x2="0%" y2="100%"
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
        <path
          d={buttonShape.path}
          fill={`url(#buttonGradient-${buttonId})`}
        />
        
        <path
          d={buttonShape.path}
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
        </path>
        
        <text 
          x={width / 2} 
          y={buttonShape.textY} 
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
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-2xl text-white text-center mb-8">
          Button Shapes Demo
        </h1>
        
        {/* Різні форми */}
        {(['rounded', 'circle', 'square', 'pill', 'diamond', 'hexagon'] as ButtonShape[]).map((shape) => (
          <div key={shape} className="space-y-2">
            <h2 className="text-white text-xl text-center capitalize">{shape}</h2>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <SVGButton 
                text={shape}
                shape={shape}
                variant="primary"
                onClick={() => console.log(`${shape} clicked`)}
              />
              <SVGButton 
                text={shape}
                shape={shape}
                variant="success"
                onClick={() => console.log(`${shape} clicked`)}
              />
              <SVGButton 
                text={shape}
                shape={shape}
                variant="danger"
                onClick={() => console.log(`${shape} clicked`)}
              />
            </div>
          </div>
        ))}

        {/* Круглі іконки */}
        <div className="space-y-2">
          <h2 className="text-white text-xl text-center">Circle Icons</h2>
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <SVGButton 
              text="+"
              shape="circle"
              variant="primary"
              width={60}
              height={60}
            />
            <SVGButton 
              text="✓"
              shape="circle"
              variant="success"
              width={60}
              height={60}
            />
            <SVGButton 
              text="×"
              shape="circle"
              variant="danger"
              width={60}
              height={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;