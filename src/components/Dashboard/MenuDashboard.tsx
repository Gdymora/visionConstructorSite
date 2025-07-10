import { useEffect, useState } from "react";
import SaveProjectDialog from "./SaveProjectDialog";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import JsonProjectService from "../../services/JsonProjectService";
import ModalYesOrNot from "../partial/ModalYesOrNot";
import { useNavigate } from "react-router-dom";
import LinkWithIcon from "../partial/LinkWithIcon";
import { faFileWord, faImage } from "@fortawesome/free-regular-svg-icons";

const apiUrl = process.env.REACT_APP_API_URL;
const generateUrl = process.env.REACT_APP_GENERATE_URL;

const MenuDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest, data, error } = useAxios(`${apiUrl}/projects`);
  const { sendRequest: sendRequestSave, data: dataSave, loading: loadingSave, error: errorSave } = useAxios(null);
  const { sendRequest: sendRequestDelete, data: dataDelete, loading: loadingDelete, error: errorDelete } = useAxios(null);
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState(null);
  const [projectNow, setProjectNow] = useState(null);
  const [projectIdDelete, setProjectIdDelete] = useState(null);
  const editor = (window as any).editor;
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleProjects = () => {
    setIsProjectsOpen(!isProjectsOpen);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const setNewProjectAsNowProject = (project) => {
    const jsonData = JSON.parse(project.project_data).json;
    if (jsonData) {
      setProjectNow({ id: project.id, name: project.name, json: jsonData });
      setProjects((prevProjects) => [...prevProjects, project]);
    } else {
      console.error("error save project", project, "and", projects);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    sendRequest(
      "get",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }, []);

  useEffect(() => {
    if (dataSave) {
      Swal.fire({
        icon: "success",
        title: "Project Save",
        text: "Your project has been successfully save!",
      }).then(() => {});
    }

    if (dataDelete) {
      Swal.fire({
        icon: "success",
        title: "Project Delete",
        text: "Your project has been successfully delete!",
      });
      //видаляємо проект з масиву проектів
      const updatedProjects = projects.filter((project) => project.id !== projectIdDelete);
      setProjects(updatedProjects);
    }
  }, [dataSave, dataDelete]);

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data]);

  useEffect(() => {
    // Якщо сталася помилка
    const status = error?.response.status || errorSave?.response.status || errorDelete?.response.status;
    if (
      (error?.response && error.response.status === 401) ||
      (errorSave?.response && errorSave.response.status === 401) ||
      (errorDelete?.response && errorDelete.response.status === 401)
    ) {
      navigate("/login");
    }

    if ((error || errorSave || errorDelete) && status !== 401) {
      Swal.fire({
        icon: "error",
        title: "Error " + error?.response.status || errorSave?.response.status || errorDelete?.response.status,
        text: error?.response.statusText || errorSave?.response.statusText || errorDelete?.response.statusText,
      });
    }
  }, [error, errorSave, errorDelete]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function viewProject() {
    if (typeof projectNow.json === "string") {
      try {
        projectNow.json = JSON.parse(projectNow.json);
      } catch (error) {
        console.error("Ошибка при парсинге строки в JSON:", error);
      }
    }
    const url = `${generateUrl}/${projectNow.id}${projectNow.json[0].name}`;
    window.open(url, "_blank");
  }

  const deleteProjectClick = (projectId) => {
    if (projectId) {
      setProjectIdDelete(projectId);
      const url = `${apiUrl}/projects/${projectId}`;
      sendRequestDelete(
        "delete",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        url
      );
    }
  };

  const saveProjectClick = () => {
    const projectdataSave = JsonProjectService.getProjectJson((window as any).editor);
    const updatedProjects = projects.map((project) => {
      if (project.id === projectNow.id) {
        return { ...project, project_data: JSON.stringify(projectdataSave, null, 0) };
      } else {
        return project;
      }
    });

    setProjects(updatedProjects);
    const url = `${apiUrl}/projects/${projectNow.id}`;
    if (projectdataSave && projectNow) {
      sendRequestSave(
        "patch",
        { name: projectNow.name, project_data: projectdataSave },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        url
      );
    }
  };

  const handleProjectClick = (projectId) => {
    const selectedProject = projects.find((project) => project.id === projectId);
    try {
      const jsonData = JSON.parse(selectedProject.project_data).json;
      const project = setProjectJson(editor, jsonData);

      if (project) {
        setProjectNow((prevProjectNow) => ({
          ...prevProjectNow,
          id: selectedProject.id,
          name: selectedProject.name,
        }));

        console.log("project:", projectNow);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    console.log("Дані проекту:", selectedProject);
  };

  const setProjectJson = (editor, value) => {
    try {
      const jsonInput = JSON.parse(value);
      setProjectNow((prevProjectNow) => ({ ...prevProjectNow, json: jsonInput }));
      const pages = editor.Pages.getAll();
      pages.map((page) => editor.Pages.remove(page.id));
      editor.Pages.clear();
      jsonInput.forEach((pageData) => {
        const page = editor.Pages.add({ name: pageData.name }, true);
        editor.Pages.select(page);
        editor.setComponents(pageData.pages.components); // Встановлення компонентів сторінки
        editor.setStyle(pageData.css); // Встановлення CSS для сторінки
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

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
    <>
      <div className="flex-1 overflow-y-auto bg-slate-900">
        <nav className="space-y-1">
          {/* 
          <div className="border-b border-white"></div> */}
          <div className="items-center min-h-[48px] border-slate-500 border-b border-white" onClick={togglePanel}>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
            >
              <svg
                className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          {isPanelOpen && (
            <ul>
              <li className={`${projectNow?.id ? "text-white" : ""} px-2 py-2`}>
                <button
                  type="button"
                  onClick={() => saveProjectClick()}
                  className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  disabled={!projectNow?.id}
                >
                  Save
                </button>
              </li>{" "}
              <li className={`${projectNow?.id ? "text-white" : ""} px-2 py-2`}>
                <button
                  type="button"
                  onClick={viewProject}
                  className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                  disabled={!projectNow?.id}
                >
                  View
                </button>
              </li>{" "}
              <li className="text-white px-2 py-2 ">
                <a
                  type="button"
                  onClick={openModal}
                  className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                  New project
                </a>
              </li>
            </ul>
          )}
          <>
            <LinkWithIcon href="/control-panel" icon={faFileWord} text="ControlPanel" />
          </>

          <>
            <LinkWithIcon href="/templates-panel" icon={faImage} text=" TemplatesPanel" />
            <div className="border-b border-white"></div>
          </>
          <>
            <LinkWithIcon href="/media-panel" icon={faImage} text="MediaPanel" />
            <div className="border-b border-white"></div>
          </>
          <div className="items-center min-h-[48px] border-slate-500 border-b border-white" onClick={toggleProjects}>
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
            >
              <svg
                className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              Projects
            </a>
          </div>
          {isProjectsOpen && (
            <ul>
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <li key={project.id} className="mb-2 text-white flex items-center border-b border-white">
                    <a
                      className={`flex-1 px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150  ${
                        project.id === projectNow?.id && "bg-gray-700"
                      }`}
                      href={`#${encodeURIComponent(project.name)}`}
                      onClick={() => handleProjectClick(project.id)}
                    >
                      {project.name}
                    </a>
                    <button
                      className="px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                      type="button"
                      onClick={() => saveProjectClick()}
                      disabled={projectNow?.id != project.id}
                    >
                      <i className="fa fa-save" style={{ color: projectNow?.id !== project.id ? "#656c6a" : "#ffffff" }} aria-hidden="true"></i>
                    </button>
                    <button
                      className="px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                      type="button"
                      onClick={viewProject}
                      disabled={projectNow?.id != project.id}
                    >
                      <i className="fa fa-eye" style={{ color: projectNow?.id !== project.id ? "#656c6a" : "#ffffff" }} aria-hidden="true"></i>
                    </button>
                    <button
                      className="px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
                      type="button"
                      onClick={() => openModalYes(project.id)}
                      disabled={projectNow?.id != project.id}
                    >
                      <i className="fa fa-trash" style={{ color: projectNow?.id !== project.id ? "#656c6a" : "#ffffff" }} aria-hidden="true"></i>
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-white px-2 py-2 ">No projects available</li>
              )}
            </ul>
          )}
        </nav>
      </div>

      {isOpen && <SaveProjectDialog closeModal={closeModal} setNowProject={setNewProjectAsNowProject} />}
      {isOpenYes && <ModalYesOrNot closeModal={closeModalYes} handleButtonClick={handleDeleteProject} text={{ head: "Delete a project", title: "Do you want to delete a project?" }} />}
    </>
  );
};

export default MenuDashboard;
