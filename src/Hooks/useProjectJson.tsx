import { useCallback } from "react";
import ResourcesService from "../services/ResourcesService";

const useProjectJson = (setProjectNow) => {
  const setProjectJson = useCallback(
    async (editor, value, projectId) => {
      try {
        const jsonInput = typeof value === "string" ? JSON.parse(value) : value;
        setProjectNow((prevProjectNow) => ({
          ...prevProjectNow,
          json: jsonInput,
        }));
        const pages = editor.Pages.getAll();
        pages.forEach((page) => editor.Pages.remove(page.id));
        editor.Pages.clear();

        // Додаємо сторінки
        jsonInput.forEach((pageData) => {
          const page = editor.Pages.add(
            { name: pageData.name, id: pageData.id },
            { silent: true }
          );
          editor.Pages.select(page);
          const wrapper = editor.DomComponents.getWrapper();

          if (pageData.pages && pageData.pages.attributes) {
            wrapper.setAttributes(pageData.pages.attributes);
          }

          if (pageData.pages && pageData.pages.components) {
            wrapper.append(pageData.pages.components);
            // Додаємо скрипт до wrapper'а
            if (pageData.pages.script) {
              wrapper.set("script", pageData.pages.script);
              console.log(`Script added to wrapper for page ${pageData.name}`);
            }
          } else {
            console.warn("No components found for page:", pageData.name);
          }

          if (pageData.css) {
            editor.setStyle(pageData.css);
          }
        });
        /*  */
        // Чекаємо на ініціалізацію фрейму
        const waitForFrame = () => {
          return new Promise((resolve) => {
            const checkFrame = () => {
              const frame = editor.Canvas.getFrame();
              if (frame && frame.view && frame.view.el.contentDocument) {
                resolve(true);
              } else {
                setTimeout(checkFrame, 100);
              }
            };
            checkFrame();
          });
        };

        await waitForFrame();
        // Тепер завантажуємо ресурси
        const apiUrl = process.env.REACT_APP_API_URL;

        try {
          const response = await fetch(
            `${apiUrl}/projects/${projectId}/resources`
          );
          const resources = await response.json();
          console.log("Loaded resources:", resources);

          if (Array.isArray(resources)) {
            resources.forEach((resource) => {
              if (resource.is_active) {
                ResourcesService.addResource(editor, {
                  type: resource.type,
                  url: resource.url,
                  is_active: true,
                });
              }
            });
          }
        } catch (error) {
          console.error("Error loading resources:", error);
        }

        /*  */
        const firstPage = editor.Pages.getAll()[0];
        if (firstPage) {
          editor.Pages.select(firstPage.id);
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },
    [setProjectNow]
  );

  return { setProjectJson };
};

export default useProjectJson;
