import React, { useState, useEffect } from 'react';

export default function SVGTextEffects() {
  const [hoveredText, setHoveredText] = useState(null);

  return (
    <div className="w-full h-screen bg-gray-900 p-8">
      <h2 className="text-white text-2xl mb-8">SVG Text Effects Demo</h2>
      
      <svg viewBox="0 0 800 600" className="w-full max-w-3xl mx-auto">
        <defs>
          {/* Градієнти */}
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#4ecdc4" />
          </linearGradient>
          
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a8e6cf" />
            <stop offset="100%" stopColor="#3d84a8" />
          </linearGradient>

          {/* Фільтри */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="blur">
            <feGaussianBlur stdDeviation={hoveredText === 'blur' ? '0' : '2'} />
          </filter>

          <filter id="shadow">
            <feDropShadow 
              dx="2" 
              dy="2" 
              stdDeviation="3" 
              floodColor="#64b5f6" 
              floodOpacity="0.8"
            />
          </filter>
        </defs>

        {/* Градієнтний текст */}
        <g 
          transform="translate(50, 100)"
          onMouseEnter={() => setHoveredText('gradient')}
          onMouseLeave={() => setHoveredText(null)}
          style={{ cursor: 'pointer' }}
        >
          <text 
            className="transform transition-all duration-300"
            x="0" 
            y="0" 
            fontSize="48"
            fill={hoveredText === 'gradient' ? 'url(#gradient2)' : 'url(#gradient1)'}
            style={{
              transform: hoveredText === 'gradient' ? 'translateX(20px)' : 'translateX(0)'
            }}
          >
            Gradient Text
          </text>
        </g>

        {/* Розмитий текст, що стає чітким при наведенні */}
        <g 
          transform="translate(50, 200)"
          onMouseEnter={() => setHoveredText('blur')}
          onMouseLeave={() => setHoveredText(null)}
          style={{ cursor: 'pointer' }}
        >
          <text 
            x="0" 
            y="0" 
            fontSize="48"
            fill="#64b5f6"
            filter="url(#blur)"
            className="transition-all duration-300"
          >
            Hover to Focus
          </text>
        </g>

        {/* Текст з обведенням, що анімується */}
        <g 
          transform="translate(50, 300)"
          onMouseEnter={() => setHoveredText('stroke')}
          onMouseLeave={() => setHoveredText(null)}
          style={{ cursor: 'pointer' }}
        >
          <text 
            x="0" 
            y="0" 
            fontSize="48"
            fill="none"
            stroke="#4ecdc4"
            strokeWidth={hoveredText === 'stroke' ? '3' : '1'}
            className="transition-all duration-300"
          >
            Stroke Animation
          </text>
        </g>

        {/* Текст з тінню та світінням */}
        <g 
          transform="translate(50, 400)"
          onMouseEnter={() => setHoveredText('glow')}
          onMouseLeave={() => setHoveredText(null)}
          style={{ cursor: 'pointer' }}
        >
          <text 
            x="0" 
            y="0" 
            fontSize="48"
            fill="#ff6b6b"
            filter={hoveredText === 'glow' ? 'url(#glow) url(#shadow)' : 'none'}
            className="transition-all duration-300"
          >
            Glow & Shadow
          </text>
        </g>

        {/* Текст з маскою */}
        <g 
          transform="translate(50, 500)"
          onMouseEnter={() => setHoveredText('mask')}
          onMouseLeave={() => setHoveredText(null)}
          style={{ cursor: 'pointer' }}
        >
          <text 
            x="0" 
            y="0" 
            fontSize="48"
            fill={hoveredText === 'mask' ? 'url(#gradient1)' : '#ffffff'}
            className="transition-all duration-300"
            style={{
              filter: hoveredText === 'mask' ? 'url(#shadow)' : 'none',
              transform: hoveredText === 'mask' ? 'scale(1.1)' : 'scale(1)',
              transformOrigin: 'left'
            }}
          >
            Hover Effects
          </text>
        </g>
      </svg>

      <div className="mt-8 text-white text-center">
        Наведіть курсор на текст для перегляду ефектів
      </div>
    </div>
  );
}