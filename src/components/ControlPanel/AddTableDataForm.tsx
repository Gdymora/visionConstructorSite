import { useEffect, useState } from "react";

const AddTableDataForm = ({ onAddTable, tableData }) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const handleChange = (fieldName, value, rowIndex) => {
    setErrors({});
    setData((prevState) => ({
      ...prevState,
      row: prevState.row.map((row, idx) => (idx === rowIndex ? { ...row, [fieldName]: value } : row)),
    }));
  };
  
  const handleChangeTableName = (value) => {
    setErrors({});
    setData((prevState) => ({
      ...prevState,
      dataTable: {
        ...prevState.dataTable,
        table_name: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    JSON.parse(data.dataTable.table_structure).forEach((field) => {
      data.row.forEach((row) => {
        if (!row[field.name]) {
          newErrors[field.name] = `${field.name} is required`;
        }
      });
    });

    if (Object.keys(newErrors).length === 0) {
      onAddTable(data.row, data.rowIndex);
      console.log("Form submitted:", data);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      <h2>Update Table Data - {data ? data.dataTable.table_name : "Loading..."}</h2>

      {data && (
        <input
          type="text"
          name="table_name"
          onChange={(e) => handleChangeTableName(e.target.value)}
          value={data.dataTable.table_name || ""}
          className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      )}
      <form onSubmit={handleSubmit}>
        {data ? (
          data.row.map((row, rowIndex) => (
            <div key={rowIndex}>
              {data.dataTable.table_structure.map((field, fieldIndex) => (
                <div key={fieldIndex}>
                  <label htmlFor={`${field.name}-${rowIndex}`}>{field.name}</label>
                  <input
                    type="text"
                    placeholder={field.name}
                    id={`${field.name}-${rowIndex}`}
                    name={field.name}
                    value={row[field.name] || ""}
                    onChange={(e) => handleChange(field.name, e.target.value, rowIndex)}
                    className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    tabIndex={0}
                    autoFocus={fieldIndex === 0 && rowIndex === 0}
                  />
                  {errors[field.name] && (
                    <div className="text-red-500">
                      <span>{errors[field.name]}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          // Додаємо прихований інпут для забезпечення фокусованого елемента
          <input type="text" style={{ display: "none" }} />
        )}
        <div className="flex flex justify-end mt-2">
          <button
            style={{ backgroundColor: "#6565e5" }}
            className="inline-flex justify-right mt-2 px-4 py-2 text-white rounded-md appearance-none"
            type="submit"
            tabIndex={0}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTableDataForm;
