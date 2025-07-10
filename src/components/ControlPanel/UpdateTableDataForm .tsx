import { useEffect, useState } from "react";

const UpdateTableDataForm = ({ onUpdateTable, tableData }) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const handleChange = (fieldName, value) => {
    setErrors({});
    setData((prevState) => ({
      ...prevState,
      row: {
        ...prevState.row,
        [fieldName]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    JSON.parse(data.dataTable.table_structure).forEach((field) => {
      if (!data.row[field.name]) {
        newErrors[field.name] = `${field.name} is required`;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      onUpdateTable(data.row, data.rowIndex);
      console.log("Form submitted:", data);
    } else {
      // Є помилки, встановлюємо їх у стані
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2>Update Table Data - {data && data.dataTable.table_name}</h2>
      <form onSubmit={handleSubmit}>
        {data &&
          JSON.parse(data.dataTable.table_structure).map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.name}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  placeholder={field.name}
                  id={field.name}
                  name={field.name}
                  value={data.row[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {field.type === "number" && (
                <input
                  type="number"
                  id={field.name}
                  name={field.name}
                  value={data.row[field.name] || null}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {field.type === "date" && (
                <input
                  type="date"
                  id={field.name}
                  name={field.name}
                  value={data.row[field.name] || null}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
                 {field.type === "markdown" && (
                <input
                  type="markdown"
                  id={field.name}
                  name={field.name}
                  value={data.row[field.name] || null}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
               {field.type === "array" && (
                <input
                  type="array"
                  id={field.name}
                  name={field.name}
                  value={data.row[field.name] || null}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              )}
              {errors[field.name] && (
                <div className="text-red-500">
                  <span>{errors[field.name]}</span>
                </div>
              )}
              {/* Додайте інші типи за необхідності */}
            </div>
          ))}
        <div className="flex flex justify-end  mt-2">
          <button
            style={{ backgroundColor: "#6565e5" }}
            className="inline-flex justify-right mt-2 px-4 py-2 text-white rounded-md appearance-none"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTableDataForm;
