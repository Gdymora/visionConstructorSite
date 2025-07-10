import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export interface FieldsUpdate {
  id: number;
  table_name: string;
  table_structure: {
    name: string;
    type: string;
    tag: string;
    filter: string;
  }[];
  table_data: [];
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  onUpdateTable?: (fields, id) => void;
  tableStructure: FieldsUpdate;
}

const TableStructureFormUpdate = ({ onUpdateTable, tableStructure }: Props) => {
  const [fields, setFields] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tableStructure) {
      const struct =
        typeof tableStructure.table_structure === "string"
          ? JSON.parse(tableStructure.table_structure)
          : tableStructure.table_structure;
      const newTableStructure = { ...tableStructure, table_structure: struct };
      setFields(newTableStructure);
    }
  }, [tableStructure]);

  const handleAddField = () => {
    setFields({
      ...fields,
      table_structure: [
        ...fields.table_structure,
        { name: "", type: "", tag: "", filter: null },
      ],
    });
  };

  const handleRemoveField = (index) => {
    const newFields = { ...fields };
    newFields.table_structure.splice(index, 1);
    setFields(newFields);
  };

  const handleChange = (index, key, value) => {
    setErrors({});
    const newFields = { ...fields };
    newFields.table_structure[index][key] = value;
    setFields(newFields);
  };

  const handleTableNameChange = (value) => {
    setFields({ ...fields, table_name: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    fields.table_structure.forEach((field, index) => {
      if (!field.name && !field.type) {
        newErrors[index] = `Name is required and Type is required`;
      } else if (!field.type) {
        newErrors[index] = `Type is required`;
      } else if (!field.type) {
        newErrors[index] = `Type is required`;
      }
    });

    if (!fields.table_name) {
      newErrors["table_name"] = `Table name is required`;
    }
    if (Object.keys(newErrors).length === 0) {
      tableStructure = {
        ...tableStructure,
        table_structure: JSON.stringify(fields.table_structure) as any,
      };
      onUpdateTable(fields, fields.id);
    } else {
      // Є помилки, встановлюємо їх у стані
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-full min-w-3xl max-w-3xl p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Update Table</h2>

      {fields && (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Table name"
              value={fields.table_name}
              onChange={(e) => handleTableNameChange(e.target.value)}
              className="w-full min-w-3xl max-w-3xl px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {errors["table_name"] && (
            <div className="flex text-red-500">
              <span>{errors["table_name"]}</span>
            </div>
          )}
          {fields.table_structure.map((field, index) => (
            <div key={index} className="mb-4">
              <h3 className="my-4">Section {index + 1}</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="mt-2 w-full max-w-98 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={handleAddField}
                  style={{ backgroundColor: "#abcd89" }}
                  className="inline-block mt-2 ml-1 inline-block px-3 py-1 text-white rounded-md "
                >
                  Add
                </button>
              </div>
              <div className="mb-4 flex">
                <select
                  value={field.type}
                  onChange={(e) => handleChange(index, "type", e.target.value)}
                  className="mt-2 w-full max-w-98 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="markdown">Markdown</option>
                  <option value="array">Array</option>
                  {/* Add more types as needed */}
                </select>
                <button
                  type="button"
                  onClick={() => handleRemoveField(index)}
                  style={{ backgroundColor: "#d69292" }}
                  className="bg-none mt-2 ml-1 inline-block px-4 py-1 text-white rounded-md"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
              <div className="mb-4 flex">
                <select
                  value={field.tag}
                  onChange={(e) => handleChange(index, "tag", e.target.value)}
                  className="mt-2 w-full max-w-98 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select tag</option>
                  <option value="img">image</option>
                  <option value="p">text</option>
                  <option value="div">div</option>
                  {/* Add more types as needed */}
                </select>
              </div>
              <div
                className="flex justify-start"
                style={{ display: index > 0 ? "none" : "block" }}
              >
                <label htmlFor="filter">#filter</label>
                <input
                  id="filter"
                  type="checkbox"
                  value={field.filter}
                  onChange={(e) =>
                    handleChange(index, "filter", e.target.value)
                  }
                  className="m-2 px-3 justify-left py-2 "
                />
              </div>

              {errors[index] && (
                <div className="flex text-red-500">
                  <span>{errors[index]}</span>
                </div>
              )}
            </div>
          ))}
          <div className="flex flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: "#6565e5" }}
              className="inline-flex justify-right  px-4 py-2 text-white rounded-md appearance-none"
            >
              Submit
            </button>{" "}
          </div>
        </form>
      )}
    </div>
  );
};

export default TableStructureFormUpdate;
