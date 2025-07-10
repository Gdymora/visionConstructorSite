import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalYesOrNot = ({ closeModal, handleButtonClick, text }) => { 

  const handleButtonClickWithInfo = (buttonName) => {
    handleButtonClick(buttonName);
    closeModal(); // Закриваємо модальне вікно після натискання кнопки
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {text.head}
              </Dialog.Title>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{text.title}</p>
              </div>
              {/* <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  id="saveAsTemplate"
                  name="saveAsTemplate"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={isTemplate}
                  onChange={handleIsTemplate}
                />
                <label htmlFor="saveAsTemplate" className="ml-2 block text-sm text-gray-900">
                  Save as Template
                </label>
              </div> */}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  No
                </button>
                <button
                  onClick={() => handleButtonClickWithInfo("New Project")}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Yes
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalYesOrNot;

/* 
import { useState } from 'react';
import ModalYesOrNot from './ModalYesOrNot'; // Шлях до вашого Modal компонента

const ParentComponent = () => {
   const [isOpenYes, setIsOpenYes] = useState(false);

  const openModalYes = (projectId) => {
    setProjectIdDelete(projectId);
    setIsOpenYes(true);
  };
  const closeModalYes = () => {
    setIsOpenYes(false);
  };
  const handleDeleteProject = () => {
    if (projectIdDelete) {
      deleteProjectClick(projectIdDelete);
      setProjectNow(null);
    }
    setIsOpenYes(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
        {isOpenYes && <ModalYesOrNot closeModal={closeModalYes} handleButtonClick={handleDeleteProject} text={{ title: "Do you want to delete a project?" }} />}
    </div>
  );
};

export default ParentComponent;
*/
