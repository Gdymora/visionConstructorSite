const ProjectService = {
    // Збереження поточного проекту в локальному сховищі
    saveCurrentProject: (project) => {
      try {
        localStorage.setItem("currentProject", JSON.stringify(project));
        return true;  
      } catch (error) {
        console.error("Error saving current project:", error);
        return false;  
      }
    },  
    // Отримання поточного проекту з локального сховища
    getCurrentProject: () => {
      try {
        const project = JSON.parse(localStorage.getItem("currentProject"));
        return project;
      } catch (error) {
        console.error("Error getting current project:", error);
        return null; 
      }
    },  
    // Видалення поточного проекту з локального сховища
    clearCurrentProject: () => {
      localStorage.removeItem("currentProject");
    }
  };
  
  export default ProjectService;
  