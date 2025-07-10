import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useProjectJson from "../../Hooks/useProjectJson";

const apiUrl = process.env.REACT_APP_API_URL;
const generateUrl = process.env.REACT_APP_GENERATE_URL;

const TemplatesPanel = () => {
  const editor = (window as any).editor;
  const { sendRequest, data, error } = useAxios(`${apiUrl}/templates`);
  const { sendRequest: sendRequestDelete, data: dataDelete, loading: loadingDelete, error: errorDelete } = useAxios(null);

  const [token, setToken] = useState("");
  const [templates, setTemplates] = useState(null);
  const [templateIdDelete, setTemplateIdDelete] = useState(null);
  const [projectNow, setProjectNow] = useState(null);

  const { setProjectJson } = useProjectJson(setProjectNow);

  useEffect(()=>{
    console.log('TemplatesPanel');
  }, []);

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
    if (data) {
      setTemplates(data);
    }
  }, [data]);

  useEffect(() => {
    if (dataDelete) {
      //видаляємо проект з масиву проектів
      const updatedTemplates = templates.filter((template) => template.id !== templateIdDelete);
      setTemplates(updatedTemplates);
    }
  }, [dataDelete]);

  useEffect(() => {
    // Якщо сталася помилка
    if (error) {
    }
  }, [error, errorDelete]);

  function viewTemplate(id, template) {
    const json = typeof template.json === "string" ? JSON.parse(template.json) : template.json;
    const url = `${generateUrl}/${id}${json[0].name}?templates=${id}`;
    window.open(url, "_blank");
  }

  const deleteTemplateClick = (templateId) => {
    if (templateId) {
      setTemplateIdDelete(templateId);
      const url = `${apiUrl}/templates/${templateId}`;
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

  const setTemplate = (selectedProject) => {
    const jsonData = typeof selectedProject.json === "string" ? JSON.parse(selectedProject.json) : selectedProject.json;
    setProjectJson(editor, jsonData);
  };

  return (
    <div className="flex">
      <main>
        <div className="">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template Data
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ...
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates && templates.length > 0 ? (
                templates.map((template) => (
                  <tr key={template.id} className="text-black">
                    <td className="px-6 py-4 whitespace-nowrap">{template.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{template.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{/* {template.template_data} */}data</td>
                    <td className="px-6 py-4 whitespace-nowrap">{template.created_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{template.updated_at}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={() => viewTemplate(template.id, template.template_data)}>
                        View
                      </button>
                      <button className="px-2 py-1 bg-blue-500 text-white rounded-md" onClick={() => setTemplate(template.template_data)}>
                        Set
                      </button>
                      <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => deleteTemplateClick(template.id)}>
                        Delete
                      </button>
                      <button className="px-2 py-1 bg-yellow-500 text-white rounded-md">Update</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-white">
                  <td colSpan={8} className="px-6 py-4 whitespace-nowrap">
                    No templates available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default TemplatesPanel;
