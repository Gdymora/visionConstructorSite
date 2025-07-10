import { useState, useEffect, useRef } from 'react';

interface GradientInfo {
  angle: number;
  color1: string;
  color2: string;
}

const GradientRandomGenerator = () => {
  const [gradients, setGradients] = useState<GradientInfo[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Generate random color in hex format
  const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color.toLowerCase();
  };

  // Generate random gradient
  const generateGradient = (): GradientInfo => {
    return {
      angle: Math.floor(Math.random() * 360),
      color1: getRandomColor(),
      color2: getRandomColor()
    };
  };

  // Generate initial gradients
  useEffect(() => {
    const initialGradients = Array.from({ length: 15 }, () => generateGradient());
    setGradients(initialGradients);
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setGradients(prev => [...prev, ...Array(5).fill(0).map(() => generateGradient())]);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const copyGradient = (gradient: GradientInfo, index: number) => {
    // Create temporary textarea for copying
    const textarea = document.createElement('textarea');
    const gradientText = `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`;
    textarea.value = gradientText;
    document.body.appendChild(textarea);
    
    // Copy text
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    // Show success animation
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white">Random Gradients</h1>
        <p className="text-gray-400 mt-2">Don't see what you want? Keep scrolling.</p>
      </div>
      
      <div 
        ref={containerRef}
        className="h-[calc(100vh-120px)] overflow-y-auto px-4"
      >
        <div 
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gridAutoRows: 'minmax(250px, auto)'
          }}
        >
          {gradients.map((gradient, index) => {
            const gradientStyle = `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`;
            const isCopied = copiedIndex === index;

            return (
              <div
                key={index}
                className="rounded-lg overflow-hidden bg-gray-800 shadow-lg relative group cursor-pointer"
                onClick={() => copyGradient(gradient, index)}
              >
                <div
                  className="w-full h-full"
                  style={{ background: gradientStyle }}
                >
                  <div 
                    className={`
                      absolute top-4 right-4 px-4 py-1 rounded 
                      bg-white bg-opacity-20 text-white text-sm
                      transition-all duration-300 transform
                      ${isCopied ? 'scale-110' : 'scale-100'}
                      ${isCopied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                    `}
                  >
                    <span 
                      className={`
                        inline-block transition-all duration-300
                        ${isCopied ? 'scale-0 absolute' : 'scale-100'}
                      `}
                    >
                      Copy
                    </span>
                    <span 
                      className={`
                        inline-block transition-all duration-300
                        ${isCopied ? 'scale-100' : 'scale-0 absolute'}
                      `}
                    >
                      👍
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
                    <div className="text-white text-xs mb-2">
                      {gradientStyle}
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: gradient.color1 }}
                        />
                        <span className="text-white">{gradient.color1}</span>
                      </div>
                      <div className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: gradient.color2 }}
                        />
                        <span className="text-white">{gradient.color2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GradientRandomGenerator;