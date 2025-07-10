import { useState } from 'react';

const SVGButton = ({ 
  text, 
  variant = 'primary',
  width = 200,
  height = 60,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Визначаємо кольори для різних варіантів
  const variants = {
    primary: {
      flame: ['#4d9fff', '#338fff', '#1a75ff'],
      text: '#ffffff'
    },
    success: {
      flame: ['#4dff4d', '#33ff33', '#1aff1a'],
      text: '#ffffff'
    },
    danger: {
      flame: ['#ff4d4d', '#ff9933', '#ffff66'],
      text: '#ffffff'
    }
  };

  const colors = variants[variant];
  const buttonId = `btn-${variant}`;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width={width} 
      height={height}
      className="transform transition-transform duration-200 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <defs>
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
          <feGaussianBlur stdDeviation={isHovered ? "2" : "1"} result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <g filter={`url(#glow-${buttonId})`}>
        <rect 
          x="5" 
          y="5" 
          width={width - 10} 
          height={height - 10} 
          rx={height / 2} 
          fill="#2a2a2a"
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
            dur="2s"
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
        {/* Заголовок */}
        <h1 className="text-2xl text-white text-center mb-8">SVG Button Examples</h1>
        
        {/* Базові варіанти */}
        <div className="flex flex-wrap gap-4 justify-center">
          <SVGButton 
            text="Primary" 
            variant="primary" 
            onClick={() => console.log('Primary clicked')}
          />
          <SVGButton 
            text="Success" 
            variant="success"
            onClick={() => console.log('Success clicked')}
          />
          <SVGButton 
            text="Danger" 
            variant="danger"
            onClick={() => console.log('Danger clicked')}
          />
        </div>
        
        {/* Різні розміри */}
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <SVGButton 
            text="Small" 
            width={150} 
            height={40}
            variant="primary"
          />
          <SVGButton 
            text="Large" 
            width={250} 
            height={80}
            variant="primary"
          />
        </div>
        
        {/* Інтерактивний приклад */}
        <div className="text-center">
          <SVGButton 
            text="Click Me!" 
            variant="danger"
            width={300}
            height={70}
            onClick={() => alert('Button clicked!')}
          />
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;