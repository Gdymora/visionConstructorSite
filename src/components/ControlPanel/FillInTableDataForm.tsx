import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";


const FillInTheTableDataForm = ({ tableData, selectSecondOrFirst, onUpdateTable }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState("");

  const { sendRequest, data, error } = useAxios("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  useEffect(() => {
    if (data) {
      toast.success(`Success ${tableData.table_name}`); 
      tableData.table_data[0] = data;
      onUpdateTable(tableData);
      setFormData({});
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(`Error ${error.message}`);
    }
  }, [error]);

  const handleChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectSecondOrFirst === "second") {
      const jsonData = JSON.parse(tableData.table_data[0].data);
      jsonData.push(formData);
      const data = { project_id: tableData.project_id, user_tables_id: tableData.id, data: jsonData };
      sendRequest("patch", data, {
        url: `${apiUrl}/data-tables/${tableData.table_data[0].id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else if (selectSecondOrFirst === "first") {
      const jsonData = [];
      jsonData.push(formData);
      const data = { project_id: tableData.project_id, user_tables_id: tableData.id, data: jsonData };
      sendRequest("post", data, {
        url: `${apiUrl}/data-tables`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  return (
    <div>
      <h2>Fill In The Table Data Form</h2>
      <form onSubmit={handleSubmit}>
        {tableData &&
          tableData.table_structure &&
          JSON.parse(tableData.table_structure).map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.name}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.name}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {field.type === "number" && (
                <input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {field.type === "date" && (
                <input
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {/* інші типи за необхідності */}
            </div>
          ))}
        <div className="flex justify-start  mt-2">
          <button
            style={{ backgroundColor: "#6565e5" }}
            className="inline-flex justify-left mt-2 px-4 py-2 text-white rounded-md appearance-none"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default FillInTheTableDataForm;
