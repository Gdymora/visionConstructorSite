import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalCustom = ({ isOpen, closeModal, text, children, zIndex = 10, maxW = "max-w-3xl" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} as="div" className={`fixed inset-0 overflow-y-auto z-[${zIndex}]`} onClose={() => false}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`inline-block w-full min-w-3xl  p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ${maxW}`}
            >
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {text.title}
                </Dialog.Title>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-700 focus:outline-none">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex justify-center">{children}</div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-right px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCustom;

/* 
import { useState } from 'react';
import ModalYesOrNot from './ModalYesOrNot'; // Шлях до вашого Modal компонента

const ParentComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateProject = () => {
    // Ваша логіка для створення проекту тут
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
       {isOpenYes && <ModalYesOrNot isOpen={isOpenYes} closeModal={closeModalYes} handleButtonClick={handleDeleteProject} />} 
    </div>
  );
};

export default ParentComponent;
*/
