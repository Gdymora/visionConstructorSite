// ViewTable.jsx
import { useState, useEffect } from "react";
import useAxios from "../../Hooks/useAxios";
import ModalCustom from "../partial/ModalCustom";
import UpdateTableDataForm from "./UpdateTableDataForm ";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const ViewTable = ({ tableData }) => {
  //  const { sendRequest, data, loading, error } = useAxios(`${apiUrl}/data-tables/view/${tableData.id}`);
  const { sendRequest: sendRequestUpdate, data: dataUpdate, error: errorUpdate } = useAxios("");
  const [token, setToken] = useState("");
  const [table_structure, setTableStructure] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataResetTable, setDataResetTable] = useState([]);
  const [showUpdateTableForm, setShowUpdateTableForm] = useState(false);
  const [showButtonSave, setShowButtonSave] = useState(false);
  const [handleTableStructure, setHandleTableStructure] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    reset();
    setData(tableData);
  }, [tableData]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0 && data.table_structure) {
      setTableStructure(JSON.parse(data.table_structure));
      if (data.table_data) {
        const dataparse = data.table_data.map((dataParse) => JSON.parse(dataParse.data)[0]);
        setDataTable(dataparse);
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataUpdate) {
      toast.success(`Success update row for table: ${tableData.table_name}`);
      setShowButtonSave(false);
    }
  }, [dataUpdate]);

  const reset = () => {
    setDataTable(dataResetTable);
    setShowButtonSave(false);
  };

  const handleUpdateTable = () => {
    const setDat = dataTable.length === 0 ? ["null"] : dataTable;
    const data = { project_id: tableData.project_id, user_tables_id: tableData.id, data: setDat };
    sendRequestUpdate("patch", data, {
      url: `${apiUrl}/data-tables/${tableData.table_data[0].id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const openModalUpdate = (row, rowIndex) => {
    setHandleTableStructure({ dataTable: data, row, rowIndex });
    setShowUpdateTableForm(true);
  };

  const handleUpdateRow = (row, rowIndex) => {
    setDataResetTable(dataTable);
    const updatedDataTable = [...dataTable];
    updatedDataTable[rowIndex] = row;
    setDataTable(updatedDataTable);
    setShowButtonSave(true);
    setShowUpdateTableForm(false);
  };

  const handleDeleteRow = (rowIndex) => {
    setDataResetTable(dataTable);
    dataTable.splice(rowIndex, 1);
    setShowButtonSave(true);
  };

  function closeShowUpdateTableForm() {
    setShowUpdateTableForm(false);
  }

  return (
    <div className="overflow-auto">
      {/*   {loading && <p>Loading...</p>}

      {error && <p>Error: {error.message}</p>} */}
      {errorUpdate && <p>Error: {errorUpdate.message}</p>}

      <div className="flex  justify-center">
        <h2 className="text-lg font-semibold m-4">
          {data && data.user_table?.table_name} {data && data.user_table?.id}
        </h2>
        {showButtonSave && (
          <>
            <button onClick={() => handleUpdateTable()} className="justify-right bg-none rounded-md mx-2">
              <i className="fa-regular fa-floppy-disk fa-beat fa-lg" style={{ color: "#96f3d7" }}></i>
            </button>
            <button onClick={() => reset()} className="justify-right bg-none rounded-md mx-2">
              Reset
            </button>
          </>
        )}
      </div>

      {data && Object.keys(data).length > 0 && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {table_structure.map((column) => (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={column.name}>
                  {column.name}
                </th>
              ))}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <i className="fa-solid fa-wrench"></i>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataTable.map((row, rowIndex) => (
              <tr className="text-black" key={rowIndex}>
                {table_structure.map((column, colIndex) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={colIndex}>
                    {row[column.name]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button disabled={showButtonSave} onClick={() => openModalUpdate(row, rowIndex)} className="bg-none rounded-md mx-2">
                    <i className="fa-solid fa-pencil" style={{ color: showButtonSave ? "#ccc" : "#429424" }}></i>
                  </button>
                  <button disabled={showButtonSave} onClick={() => handleDeleteRow(rowIndex)} className="bg-none rounded-md mx-2">
                    <i className="fa-regular fa-trash-can" style={{ color: showButtonSave ? "#ccc" : "#ea3f06" }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showUpdateTableForm && (
        <ModalCustom zIndex={1402} isOpen={showUpdateTableForm} closeModal={closeShowUpdateTableForm} text={{ title: "Add data for Table" }}>
          <UpdateTableDataForm onUpdateTable={handleUpdateRow} tableData={handleTableStructure} />
        </ModalCustom>
      )}
    </div>
  );
};

export default ViewTable;
