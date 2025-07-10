const ProjectService = {
    // Збереження проекту в локальному сховищі
    saveProject: (project) => {
      try {
        // Отримати існуючі проекти з локального сховища
        const existingProjects = JSON.parse(localStorage.getItem("projects")) || [];
        // Додати новий проект до списку
        const updatedProjects = [...existingProjects, project];
        // Зберегти оновлений список проектів в локальному сховищі
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        return true; // Повернути успішне завершення
      } catch (error) {
        console.error("Error saving project:", error);
        return false; // Повернути неуспішне завершення у разі помилки
      }
    },
  
    // Отримання всіх проектів з локального сховища
    getAllProjects: () => {
      try {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        return projects;
      } catch (error) {
        console.error("Error getting projects:", error);
        return []; // Повернути порожній масив у разі помилки
      }
    },
    
    // Очищення локального сховища проектів
    clearProjects: () => {
      localStorage.removeItem("projects");
    }
  };
  
  export default ProjectService;
  