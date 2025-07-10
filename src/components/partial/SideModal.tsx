import { Fragment } from "react";
import { Transition } from "@headlessui/react";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  width?: string;
}

const SidePanel = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'right',
  width = 'max-w-2xl'
}: SidePanelProps) => {
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
          <div className={`w-screen ${width}`}>
            <div className="h-full flex flex-col bg-white shadow-xl">
              <Transition.Child
                as={Fragment}
                enter="transform transition-all ease-in-out duration-500 delay-200"
                enterFrom={slideDirection.title.enterFrom}
                enterTo={slideDirection.title.enterTo}
                leave="transform transition-all ease-in-out duration-300"
                leaveFrom={slideDirection.title.leaveFrom}
                leaveTo={slideDirection.title.leaveTo}
              >
                <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      {title}
                    </h2>
                    <button
                      className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                      onClick={onClose}
                      type="button"
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Transition.Child>
              <div className="relative flex-1 px-4 py-6 sm:px-6 overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </Transition.Child>
      </div>
    </Transition>
  );
};

export default SidePanel;