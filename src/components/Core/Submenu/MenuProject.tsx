import { useState } from "react";
import noimage from "../../../assets/images/noimage.gif";
import { addProjectNameToUrl } from "../../../utils/getHashUrl";

const MenuProject = ({ projects, projectNow, onProjectSelect, onOpenModalYes, saveProjectClick, viewProject }) => {
  const [viewType, setViewType] = useState("list");

  const toggleViewType = () => {
    setViewType(viewType === "list" ? "card" : "list");
  };

  return (
    <div className="gjs-block-categories text-left w-full">
      <div className="flex justify-between items-center">
        <div>List Projects</div>
        <button onClick={toggleViewType} className="mr-4">
          Switch to {viewType === "list" ? "Card" : "List"} View
        </button>
      </div>

      <div className={viewType === "card" ? "card-grid" : ""}>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project.id}
              className={`mb-2 text-white flex items-center ${viewType === "card" ? "flex-col bg-gray-800 p-4 rounded-lg card-item" : ""} ${
                project.id === projectNow?.id && viewType === "card" ? "border-b border-black" : ""
              }`}
              style={{
                backgroundImage: viewType === "card" ? `url(${project.imageUrl || noimage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => onProjectSelect(project.id)}
            >
              <a
                className={`flex-1 px-2 py-2 text-base leading-6 font-medium rounded-md text-black outline-none transition ease-in-out duration-150 ${
                  project.id === projectNow?.id && "bg-gray-0"
                }`}
                onClick={(event) => addProjectNameToUrl(project.name, event)}
                href="#"
              >
                Name: {project.name} id:{project.id}
              </a>
              <div className="flex">
                <button
                  className="px-2 py-2 text-base leading-6 font-medium rounded-md text-black transition ease-in-out duration-150"
                  type="button"
                  onClick={() => saveProjectClick(project)}
                  disabled={projectNow?.id !== project.id}
                >
                  <i className="fa fa-save" style={{ color: projectNow?.id !== project.id ? "#ffffff" : "#656c6a" }} aria-hidden="true"></i>
                </button>
                <button
                  className="px-2 py-2 text-base leading-6 font-medium rounded-md text-black transition ease-in-out duration-150"
                  type="button"
                  onClick={() => viewProject(project)}
                  disabled={projectNow?.id !== project.id}
                >
                  <i className="fa fa-eye" style={{ color: projectNow?.id !== project.id ? "#ffffff" : "#656c6a" }} aria-hidden="true"></i>
                </button>
                <button
                  className="px-2 py-2 text-base leading-6 font-medium rounded-md text-black transition ease-in-out duration-150"
                  type="button"
                  onClick={() => onOpenModalYes(project.id)}
                  disabled={projectNow?.id !== project.id}
                >
                  <i className="fa fa-trash" style={{ color: projectNow?.id !== project.id ? "#ffffff" : "#656c6a" }} aria-hidden="true"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-black px-2 py-2">No projects available</div>
        )}
        {viewType === "card" && (
          <div className={`mb-2 text-black  flex items-center ${viewType === "card" ? "flex-col p-4 justify-center align-center rounded-lg card-item" : ""}`}>
            +
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuProject;
