import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import JsonProjectService from "../../../services/JsonProjectService";
import SaveProjectDialog from "../../Dashboard/SaveProjectDialog";
import ModalYesOrNot from "../../partial/ModalYesOrNot";
import ModalCustom from "../../partial/ModalCustom";
import MenuProject from "./MenuProject";
import { useDispatch } from "react-redux";
import { setProject } from "../../../store/slices/projectSlice";
import { setProjects as setProjectsAction } from "../../../store/slices/projectsSlice";
import { addProjectNameToUrl, getHashUrl } from "../../../utils/getHashUrl";
import useProjectJson from "../../../Hooks/useProjectJson";
import ProjectResourcesManager from "../../../components/ProjectResourcesManager";
import DeploymentPanel from "../../../components/DeploymentPanel";
const apiUrl = process.env.REACT_APP_API_URL;
const generateUrl = process.env.REACT_APP_GENERATE_URL;

const ProjectControls = () => {
  const editor = (window as any).editor;
  const [isOpen, setIsOpen] = useState(false);
  const { sendRequest, data, error } = useAxios(`${apiUrl}/projects`);
  const {
    sendRequest: sendRequestSave,
    data: dataSave,
    error: errorSave,
  } = useAxios(null);
  const {
    sendRequest: sendRequestDelete,
    data: dataDelete,
    error: errorDelete,
  } = useAxios(null);
  const [token, setToken] = useState("");
  const [projects, setProjects] = useState(null);
  const [projectNow, setProjectNow] = useState(null);
  const [projectIdDelete, setProjectIdDelete] = useState(null);
  const [isOpenYes, setIsOpenYes] = useState(false);
  const [showProject, setIshowProject] = useState(false);
  const [showSettings, setIshowSettings] = useState(false);
  const [showDeploy, setIshowDeploy] = useState(false);
  const dispatch = useDispatch();
  const { setProjectJson } = useProjectJson(setProjectNow);

  const setNewProjectAsNowProject = (project) => {
    const jsonData = JSON.parse(project.project_data).json;
    if (jsonData) {
      setProjectNow({ id: project.id, name: project.name, json: jsonData });
      setProjects((prevProjects) => [...prevProjects, project]);
      addProjectNameToUrl(project.name);
    } else {
      console.error("error save project", project, "and", projects);
    }
  };

  //const project = useSelector((state: any) => state.project);

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
    console.log("Project");
  }, []);

  useEffect(() => {
    if (projectNow) {
      if (projectNow) {
        dispatch(setProject(projectNow));
      }
    }
  }, [projectNow]);

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
      const updatedProjects = projects.filter(
        (project) => project.id !== projectIdDelete
      );
      setProjects(updatedProjects);
    }
  }, [dataSave, dataDelete]);

  useEffect(() => {
    if (data) {
      setProjects(data);
      dispatch(setProjectsAction(data));
      const projectNameUrl = getHashUrl();
      if (projectNameUrl && data) {
        const nowProjects = data.filter(
          (project) => project.name === projectNameUrl
        )[0];
        if (nowProjects) {
          const jsonData = JSON.parse(nowProjects.project_data).json;
          setProjectNow({
            id: nowProjects.id,
            name: nowProjects.name,
            json: jsonData,
          });
        }
      }
    }
  }, [data]);

  useEffect(() => {
    // Якщо сталася помилка
    const status =
      error?.response.status ||
      errorSave?.response.status ||
      errorDelete?.response.status;

    if ((error || errorSave || errorDelete) && status !== 401) {
      Swal.fire({
        icon: "error",
        title:
          "Error " + error?.response.status ||
          errorSave?.response.status ||
          errorDelete?.response.status,
        text:
          error?.response.statusText ||
          errorSave?.response.statusText ||
          errorDelete?.response.statusText,
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
    // console.log("project", project);
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
    const projectdataSave = JsonProjectService.getProjectJson(
      (window as any).editor
    );
    const updatedProjects = projects.map((project) => {
      if (project.id === projectNow.id) {
        return {
          ...project,
          project_data: JSON.stringify(projectdataSave, null, 0),
        };
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
    const selectedProject = projects.find(
      (project) => project.id === projectId
    );

    if (!selectedProject) {
      console.error("Project not found with id:", projectId);
      return;
    }

    try {
      let jsonData;

      const projectData = selectedProject.project_data;

      // Перевіряємо, чи є project_data рядком
      if (typeof projectData === "string") {
        jsonData = JSON.parse(projectData).json;
      } else {
        // Якщо це вже об'єкт, використовуємо його напряму
        jsonData = projectData.json;
      }

      const project = setProjectJson(editor, jsonData, projectId);
      if (project) {
        setProjectNow((prevProjectNow) => ({
          ...prevProjectNow,
          id: selectedProject.id,
          name: selectedProject.name,
        }));

        console.log("projectNow:", projectNow);
      }
    } catch (error) {
      console.error("Error handling project click:", error);
    }

    console.log("Дані проекту:", selectedProject);
  };

  // const setProjectJson = (editor, value) => {
  //     try {
  //         const jsonInput = JSON.parse(value);
  //         setProjectNow((prevProjectNow) => ({ ...prevProjectNow, json: jsonInput }));
  //         const pages = editor.Pages.getAll();
  //         pages.map((page) => editor.Pages.remove(page.id));
  //         editor.Pages.clear();
  //         jsonInput.forEach((pageData) => {
  //             const page = editor.Pages.add({ name: pageData.name }, true);
  //             editor.Pages.select(page);
  //             editor.setComponents(pageData.pages.components); // Встановлення компонентів сторінки
  //             editor.setStyle(pageData.css); // Встановлення CSS для сторінки
  //         });
  //         return true;
  //     } catch (e) {
  //         console.error(e);
  //         return false;
  //     }
  // };

  const openModalYes = (projectId) => {
    setProjectIdDelete(projectId);
    setIsOpenYes(true);
  };

  const closeModalYes = () => {
    setIsOpenYes(false);
  };
  const openShowProject = () => {
    setIshowProject(true);
  };

  const closeShowProject = () => {
    setIshowProject(false);
  };

  const closeShowSettings = () => {
    setIshowSettings(false);
  };

  const closeShowDeploy = () => {
    setIshowDeploy(false);
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
      <li className="px-2 py-2">
        <button onClick={openModal}>New</button>
      </li>
      <li className={`px-2 py-2`}>
        <button onClick={openShowProject}>Open</button>
      </li>
      <li className={`${!projectNow?.id ? "disabled" : ""} px-2 py-2`}>
        <button onClick={() => saveProjectClick()} disabled={!projectNow?.id}>
          Save
        </button>
      </li>
      <li className={`${!projectNow?.id ? "disabled" : ""} px-2 py-2`}>
        <button onClick={viewProject} disabled={!projectNow?.id}>
          View
        </button>
      </li>
      <li className={`${!projectNow?.id ? "disabled" : ""} px-2 py-2`}>
        <button
          onClick={() => openModalYes(projectNow.id)}
          disabled={!projectNow?.id}
        >
          Delete
        </button>
      </li>
      <li className={`${!projectNow?.id ? "disabled" : ""} px-2 py-2`}>
        <button
          onClick={() => setIshowSettings(true)}
          disabled={!projectNow?.id}
        >
          Setting
        </button>
      </li>
      <li className={`${!projectNow?.id ? "disabled" : ""} px-2 py-2`}>
        <button
          onClick={() => setIshowDeploy(true)}
          disabled={!projectNow?.id}
        >
          Deploy
        </button>
      </li>

      {showProject && (
        <ModalCustom
          isOpen={showProject}
          closeModal={closeShowProject}
          text={{ title: "Open Project" }}
        >
          <MenuProject
            projects={projects}
            projectNow={projectNow}
            onProjectSelect={handleProjectClick}
            onOpenModalYes={openModalYes}
            saveProjectClick={saveProjectClick}
            viewProject={viewProject}
          />
        </ModalCustom>
      )}

      {isOpen && (
        <SaveProjectDialog
          closeModal={closeModal}
          setNowProject={setNewProjectAsNowProject}
        />
      )}
      {isOpenYes && (
        <ModalYesOrNot
          closeModal={closeModalYes}
          handleButtonClick={handleDeleteProject}
          text={{
            head: "Delete a project",
            title: "Do you want to delete a project?",
          }}
        />
      )}
      {showSettings && (
        <ModalCustom
          isOpen={showSettings}
          closeModal={closeShowSettings}
          text={{ title: "Open Settings" }}
        >
          <ProjectResourcesManager projectId={projectNow?.id} />
        </ModalCustom>
      )}
       {showDeploy && (
        <ModalCustom
          isOpen={showDeploy}
          closeModal={closeShowDeploy}
          text={{ title: "Open Deploy" }}
        >
          <DeploymentPanel projectId={projectNow?.id} />
        </ModalCustom>
      )}
    </>
  );
};

export default ProjectControls;
