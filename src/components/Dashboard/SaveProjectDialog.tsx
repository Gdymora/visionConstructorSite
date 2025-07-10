import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import ProjectService from "../../services/ProjectService";
import JsonProjectService from "../../services/JsonProjectService";
import JsonUploader from "../JsonUploader";
const apiUrl = process.env.REACT_APP_API_URL;

function SaveProjectDialog({ closeModal, setNowProject }) {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [isTemplate, setIsTemplate] = useState(false);
  const url = isTemplate ? "templates" : "projects";
  const { sendRequest, data, error } = useAxios(`${apiUrl}/${url}`);
  const [jsonData, setJsonData] = useState(null);

  const handleIsTemplate = () => {
    setIsTemplate(!isTemplate);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleJsonDataLoaded = (data) => {
    setJsonData(data);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    // Якщо дані прийшли успішно
    if (data) {
      Swal.fire({
        icon: "success",
        title: "Project Created",
        text: "Your project has been successfully created!",
      }).then(() => {
        if (isTemplate) {
          closeModal();
          return;
        }
        const success = ProjectService.saveCurrentProject(data);
        if (success) {
          console.log("Поточний проект збережено успішно!", data);
          setNowProject(data);
        } else {
          console.error("Не вдалося зберегти поточний проект.");
        }
        closeModal();
      });
    }
  }, [data, closeModal]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error " + error.response.status,
        text: error.response.statusText,
      });
      closeModal();
    }
  }, [error, closeModal]);

  const handleCreateProject = () => {
    const project = JsonProjectService.getProjectJson((window as any).editor);
    const requestData = {
      name: name,
      [isTemplate ? "template_data" : "project_data"]: project,
      json_data: jsonData, // Додаємо завантажені JSON дані
    };

    sendRequest("post", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Create New Project
                </Dialog.Title>
                <div className="mt-4">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="mt-4">
                  <JsonUploader onDataLoaded={handleJsonDataLoaded} />
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Do you want to create a new project?</p>
                </div>

                <div className="mt-4 flex items-center">
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
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateProject} /* 
                      style={{ background: "#5353c2" }} */
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    New project
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SaveProjectDialog;
