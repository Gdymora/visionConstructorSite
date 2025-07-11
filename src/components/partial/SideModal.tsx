import { Fragment, useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  resizable?: boolean;
}

const SidePanel = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  width = 'max-w-2xl',
  minWidth = 300,
  maxWidth = 800,
  resizable = true
}: SidePanelProps) => {
  const [panelWidth, setPanelWidth] = useState(600); // початкова ширина
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const slideDirection = {
    panel: position === 'right' ? {
      enterFrom: "translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "translate-x-full"
    } : {
      enterFrom: "-translate-x-full",
      enterTo: "translate-x-0",
      leaveFrom: "translate-x-0",
      leaveTo: "-translate-x-full"
    },
    title: {
      enterFrom: "-translate-y-full opacity-0",
      enterTo: "translate-y-0 opacity-100",
      leaveFrom: "translate-y-0 opacity-100",
      leaveTo: "-translate-y-full opacity-0"
    }
  };

  // Обробка початку зміни розміру
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!resizable) return;
    
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    
    document.body.style.cursor = position === 'right' ? 'w-resize' : 'e-resize';
    document.body.style.userSelect = 'none';
  };

  // Обробка зміни розміру
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !resizable) return;

      const deltaX = e.clientX - startXRef.current;
      let newWidth;

      if (position === 'right') {
        newWidth = startWidthRef.current - deltaX;
      } else {
        newWidth = startWidthRef.current + deltaX;
      }

      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, position, minWidth, maxWidth, resizable]);

  // Закриття при натисканні Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <Transition show={isOpen} as={Fragment}>
      <div className={`fixed inset-y-0 ${position}-0 flex pointer-events-auto z-[999]`}>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-300"
          enterFrom={slideDirection.panel.enterFrom}
          enterTo={slideDirection.panel.enterTo}
          leave="transform transition ease-in-out duration-300"
          leaveFrom={slideDirection.panel.leaveFrom}
          leaveTo={slideDirection.panel.leaveTo}
        >
          <div 
            ref={panelRef}
            className={resizable ? "relative" : `w-screen ${width}`}
            style={resizable ? { width: `${panelWidth}px` } : undefined}
          >


            <div className="h-full flex flex-col bg-white shadow-xl border-l border-gray-200">
              <Transition.Child
                as={Fragment}
                enter="transform transition-all ease-in-out duration-500 delay-200"
                enterFrom={slideDirection.title.enterFrom}
                enterTo={slideDirection.title.enterTo}
                leave="transform transition-all ease-in-out duration-300"
                leaveFrom={slideDirection.title.leaveFrom}
                leaveTo={slideDirection.title.leaveTo}
              >
                <div className="relative px-4 py-6 sm:px-6 border-b border-gray-200 bg-gray-50/50">
                  {/* Resize Handle в шапці */}
                  {resizable && (
                    <div
                      className={`absolute ${position === 'right' ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2 w-6 h-12 flex items-center justify-center cursor-${position === 'right' ? 'w' : 'e'}-resize z-10 group hover:bg-blue-500/10 rounded-r-lg transition-all duration-200`}
                      onMouseDown={handleMouseDown}
                      title="Перетягніть для зміни розміру"
                    >
                      {/* Кружечок-індикатор */}
                      <div className="w-3 h-3 bg-gray-400 group-hover:bg-blue-500 rounded-full transition-colors duration-200 shadow-sm border border-gray-300 group-hover:border-blue-400">
                        {/* Внутрішні крапки */}
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full opacity-80"></div>
                        </div>
                      </div>
                      
                      {/* Додаткові лінії для кращого UX */}
                      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="flex flex-col space-y-0.5">
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                          <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-gray-900">
                        {title}
                      </h2>
                      {resizable && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                          Ширина: {panelWidth}px • ESC для закриття
                        </p>
                      )}
                    </div>
                    <button
                      className="ml-4 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={onClose}
                      type="button"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Transition.Child>
              
              <div className="relative flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
                  {children}
                </div>
              </div>

              {/* Footer з підказками */}
              {resizable && (
                <div className="px-4 py-2 border-t border-gray-200 bg-gray-50/30">
                  <p className="text-xs text-gray-500 text-center flex items-center justify-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    💡 Використовуйте кружечок у шапці для зміни розміру
                  </p>
                </div>
              )}
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default SidePanel;