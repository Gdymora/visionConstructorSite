import React, { useState, useRef } from 'react';

const SVGDeformer = () => {
  const [points, setPoints] = useState([
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
  ]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const svgRef = useRef(null);
  
  const getMousePosition = (event) => {
    const svg = svgRef.current;
    const CTM = svg.getScreenCTM();
    let clientX, clientY;
    
    // Handle both mouse and touch events
    if (event.touches) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const mouseX = (clientX - CTM.e) / CTM.a;
    const mouseY = (clientY - CTM.f) / CTM.d;
    return { x: mouseX, y: mouseY };
  };
  
  const startDragging = (index, event) => {
    event.preventDefault();
    setIsDragging(true);
    setActivePoint(index);
  };
  
  const stopDragging = () => {
    setIsDragging(false);
    setActivePoint(null);
  };
  
  const drag = (event) => {
    if (!isDragging || activePoint === null) return;
    event.preventDefault(); // Prevent scrolling on mobile while dragging
    
    const mousePos = getMousePosition(event);
    const newPoints = [...points];
    newPoints[activePoint] = mousePos;
    setPoints(newPoints);
  };
  
  const addPoint = (event) => {
    // Check for Alt key on desktop or double tap on mobile
    if (event.altKey || (event.detail === 2)) {
      const mousePos = getMousePosition(event);
      let closestLineStart = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < points.length; i++) {
        const start = points[i];
        const end = points[(i + 1) % points.length];
        const distance = pointToLineDistance(mousePos, start, end);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestLineStart = i;
        }
      }
      
      const newPoints = [...points];
      newPoints.splice(closestLineStart + 1, 0, mousePos);
      setPoints(newPoints);
    }
  };
  
  const pointToLineDistance = (point, lineStart, lineEnd) => {
    const A = point.x - lineStart.x;
    const B = point.y - lineStart.y;
    const C = lineEnd.x - lineStart.x;
    const D = lineEnd.y - lineStart.y;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    const param = lenSq ? dot / lenSq : -1;
    
    let xx, yy;
    
    if (param < 0) {
      xx = lineStart.x;
      yy = lineStart.y;
    } else if (param > 1) {
      xx = lineEnd.x;
      yy = lineEnd.y;
    } else {
      xx = lineStart.x + param * C;
      yy = lineStart.y + param * D;
    }
    
    const dx = point.x - xx;
    const dy = point.y - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2 touch-none">
      <div className="bg-white rounded-lg shadow-lg p-2">
        <h2 className="text-lg font-semibold mb-2">SVG Shape Deformer</h2>
        <p className="text-sm text-gray-600 mb-2">
          • Перетягуйте точки пальцем або мишкою<br/>
          • Подвійний тап або Alt+клік щоб додати точку
        </p>
        <div className="border rounded">
          <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            className="w-full h-96 touch-none"
            onMouseMove={drag}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onClick={addPoint}
            onTouchMove={drag}
            onTouchEnd={stopDragging}
            onTouchCancel={stopDragging}
          >
            <polygon
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="lightblue"
              stroke="blue"
              strokeWidth="1"
            />
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="8"
                fill="white"
                stroke="blue"
                strokeWidth="2"
                cursor="move"
                onMouseDown={(e) => startDragging(index, e)}
                onTouchStart={(e) => startDragging(index, e)}
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SVGDeformer;