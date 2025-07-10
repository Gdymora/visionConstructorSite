import React, { useState, useEffect } from 'react';

const PortalButton = ({
  text = "Portal",
  width = 200,
  height = 60,
  primaryColor = "#6b21a8",
  secondaryColor = "#d946ef" 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const buttonId = React.useId();

  // Анімація обертання порталу
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setRotation(prev => (prev + 1) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    
    if (isHovered) {
      animate();
    }
    
    return () => cancelAnimationFrame(animationFrame);
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
        {/* Градієнт для порталу */}
        <radialGradient id={`portalGradient-${buttonId}`}>
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        {/* Градієнт для сяйва */}
        <radialGradient id={`glowGradient-${buttonId}`}>
          <stop offset="0%" stopColor={`${secondaryColor}88`} />
          <stop offset="100%" stopColor={`${primaryColor}00`} />
        </radialGradient>

        {/* Фільтр для світіння */}
        <filter id={`glow-${buttonId}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite 
            operator="over" 
            in="blur" 
            in2="SourceGraphic"
          />
        </filter>

        {/* Фільтр для глибини порталу */}
        <filter id={`depth-${buttonId}`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="blur" 
            scale="20" 
            xChannelSelector="R" 
            yChannelSelector="G"
          />
        </filter>

        {/* Маска для обмеження порталу */}
        <mask id={`buttonMask-${buttonId}`}>
          <rect 
            x="2" y="2" 
            width={width-4} 
            height={height-4}
            rx={height/4}
            fill="white"
          />
        </mask>

        {/* Патерн для спіралі порталу */}
        <pattern 
          id={`spiralPattern-${buttonId}`} 
          width="100%" 
          height="100%"
          patternUnits="userSpaceOnUse"
        >
          {Array.from({length: 6}).map((_, i) => (
            <path
              key={i}
              d={`M ${width/2} ${height/2} 
                  a ${20 + i * 10} ${20 + i * 10} 0 0 1 0 0.01`}
              stroke={i % 2 ? primaryColor : secondaryColor}
              strokeWidth="2"
              fill="none"
              transform={`rotate(${rotation + i * 30} ${width/2} ${height/2})`}
            >
              <animate
                attributeName="stroke-dasharray"
                values="0 200;200 0"
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </pattern>
      </defs>

      <g transform={isPressed ? 'scale(0.98)' : 'scale(1)'}>
        {/* Фонове сяйво */}
        <rect
          x="0" y="0"
          width={width}
          height={height}
          fill={`url(#glowGradient-${buttonId})`}
          filter={`url(#glow-${buttonId})`}
        />

        {/* Основа кнопки */}
        <rect
          x="2" y="2"
          width={width-4}
          height={height-4}
          rx={height/4}
          fill="black"
          stroke={primaryColor}
          strokeWidth="1"
        />

        {/* Портал */}
        <g mask={`url(#buttonMask-${buttonId})`}>
          <circle
            cx={width/2}
            cy={height/2}
            r={isHovered ? height/2 : height/4}
            fill={`url(#portalGradient-${buttonId})`}
            filter={`url(#depth-${buttonId})`}
            style={{transition: 'r 0.3s ease'}}
          />
          
          <rect
            x="0" y="0"
            width={width}
            height={height}
            fill={`url(#spiralPattern-${buttonId})`}
            opacity={isHovered ? 0.8 : 0.4}
          />

          {/* Частинки порталу */}
          {isHovered && Array.from({length: 12}).map((_, i) => (
            <circle
              key={i}
              r="2"
              fill={secondaryColor}
              opacity="0.6"
              filter={`url(#glow-${buttonId})`}
            >
              <animateMotion
                dur={`${1 + Math.random()}s`}
                repeatCount="indefinite"
                path={`M ${width/2 + 40} ${height/2} a ${20 + i * 5} ${20 + i * 5} 0 1 1 0.01 0`}
              />
            </circle>
          ))}
        </g>

        {/* Текст */}
        <text
          x={width/2}
          y={height/2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={secondaryColor}
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
const PortalButtonDemo = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl text-white text-center mb-8">
          Portal Buttons
        </h1>
        
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <PortalButton 
            text="Enter" 
            primaryColor="#6b21a8"
            secondaryColor="#d946ef"
          />
          
          <PortalButton 
            text="Void" 
            primaryColor="#1d4ed8"
            secondaryColor="#60a5fa"
          />
          
          <PortalButton 
            text="Chaos" 
            primaryColor="#dc2626"
            secondaryColor="#f87171"
          />
        </div>

        <div className="flex flex-wrap gap-8 justify-center items-center">
          <PortalButton 
            text="↯" 
            width={80}
            height={80}
            primaryColor="#ca8a04"
            secondaryColor="#facc15"
          />
        </div>
      </div>
    </div>
  );
};

export default PortalButtonDemo;