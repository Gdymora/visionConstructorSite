import TableStructureForm, { Fields } from "./TableStructureForm";
import ViewTable from "./ViewTable";
import useAxios from "../../Hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import FillInTableDataForm from "./FillInTableDataForm";
import ModalCustom from "../partial/ModalCustom";

import { toast } from "react-toastify";
import TableStructureFormUpdate, { FieldsUpdate } from "./TableStructureFormUpdate";
import FileParser from "../FileParser";
import ModalYesOrNot from "../partial/ModalYesOrNot";
import { useSelector } from "react-redux";
import { RootState } from "@/types";
import { formatDate } from "../../utils/formatDate";

// Додайте нові інтерфейси та імпорти...

const apiUrl = process.env.REACT_APP_API_URL;
interface Props {
  dataFetchProduct?: Fields;
  createData?: (tableData: FieldsUpdate) => void;
}

const ControlPanel = ({ dataFetchProduct, createData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenExcel, setIsOpenExcel] = useState(false);
  const { data, loading, error, sendRequest } = useAxios(`${apiUrl}/user-tables`);
  const { data: tablesCreate, error: errorCreate, sendRequest: sendRequestCreate } = useAxios(`${apiUrl}/user-tables`);
  const { data: tablesUpdate, error: errorUpdate, sendRequest: sendRequestUpdate } = useAxios("");
  const { data: tablesDelete, error: errorDelete, sendRequest: sendRequestDelete } = useAxios("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [secondOrFirst, setSecondOrFirst] = useState(null);
  const [token, setToken] = useState("");
  const [showFillInTableForm, setShowFillInTableForm] = useState(false);
  const [dataTables, setDataTables] = useState(null);
  const [handleTableStructure, setHandleTableStructure] = useState(null);
  const [isOpenYes, setIsOpenYes] = useState(false);
  const [structureTableIdDelete, setStructureTableIdDelete] = useState(null);
  const [isOpenCloneStructureTable, setIsOpenCloneStructureTable] = useState(null);
  const [newTableName, setNewTableName] = useState(null);
  const [errorInputChange, setErrorInputChange] = useState("");
  const currentProject = useSelector((state: RootState) => state.project);
  const { projects } = useSelector((state: RootState) => state.projects);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(currentProject?.id || null);

  useEffect(() => {
    console.log("ControlPanel");
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    // Модифікуємо запит щоб враховувати вибраний проект
    const params = selectedProjectId ? { project_id: selectedProjectId } : {};
    sendRequest("get", params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("selectedProjectId", selectedProjectId);
  }, [selectedProjectId]);

  useEffect(() => {
    if (dataFetchProduct && token) {
      const struct = typeof dataFetchProduct.table_structure === "string" ? JSON.parse(dataFetchProduct.table_structure) : dataFetchProduct.table_structure;
      const newTableStructure = { ...dataFetchProduct, table_structure: struct };
      handleCreateTable(newTableStructure);
    }
  }, [dataFetchProduct, token]);

  useEffect(() => {
    if (data) {
      setDataTables(data);
    }

    if (tablesCreate) {
      setDataTables([...dataTables, tablesCreate]);
      toast.success(`Success create table ${tablesCreate.table_name}`);
      // setSelectedTable(dataTables);
    }

    if (dataFetchProduct) {
      createData(tablesCreate);
    }
  }, [data, tablesCreate]);

  useEffect(() => {
    if (tablesUpdate) {
      setDataTables([...dataTables, tablesUpdate]);
      toast.success(`Success update table ${tablesUpdate.table_name}`);
    }
  }, [tablesUpdate]);

  useEffect(() => {
    if (tablesDelete) {
      toast.success("Success delete");
    }
  }, [tablesDelete]);

  useEffect(() => {
    const errorNow = error || errorCreate || errorUpdate || errorDelete;
    if (errorNow) {
      toast.error("Error:", errorNow.message);
    }
  }, [error, errorCreate, errorUpdate, errorDelete]);

  const handleCreateTable = (tableStructure) => {
    sendRequestCreate("post", tableStructure, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleUpdateTable = (tableStructure, id) => {
    sendRequestUpdate("patch", tableStructure, {
      url: `${apiUrl}/user-tables/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleDeleteTable = (id, index) => {
    sendRequestDelete(
      "delete",
      {},
      {
        url: `${apiUrl}/user-tables/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dataTables.splice(index, 1);
    setDataTables([...dataTables]);
    if (dataTables.length === 0) {
      setSelectedTable(null);
    }
  };

  const handleViewTable = (tableData) => {
    setSelectedTable(tableData);
  };

  const handleFillInTable = (tableData, createOrUpdate) => {
    setSelectedTable(tableData);
    setSecondOrFirst(createOrUpdate);
    setShowFillInTableForm(true);
  };

  const onUpdateFillInTableForm = useCallback((updatedTableData) => {
    setSelectedTable({ ...updatedTableData });
    setDataTables((prevDataTables) => prevDataTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)));
    setIsOpenExcel(false); // Закриваємо модальне вікно після оновлення даних
  }, []);

  function closeShowFillInTableForm() {
    setShowFillInTableForm(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModalUpdate() {
    setIsOpenUpdate(false);
  }

  function openModalUpdate(table) {
    setIsOpenUpdate(true);
    setHandleTableStructure(table);
  }

  function closeModalExcel() {
    setIsOpenExcel(false);
  }

  function openModalExcel(tableData, createOrUpdate) {
    setIsOpenExcel(true);
    setSelectedTable(tableData);
    setSecondOrFirst(createOrUpdate);
  }

  const openModalYesDelete = (id, index) => {
    setStructureTableIdDelete({ id, index });
    setIsOpenYes(true);
  };

  const closeModalYes = () => {
    setIsOpenYes(false);
  };

  const openModalCloneStructureTable = (table) => {
    const struct = typeof table.table_structure === "string" ? JSON.parse(table.table_structure) : table.table_structure;
    const newTableStructure = { ...table, table_structure: struct };
    setHandleTableStructure(newTableStructure);
    setNewTableName(table.table_name);
    setIsOpenCloneStructureTable(true);
  };

  const closeModalCloneStructureTable = () => {
    setIsOpenCloneStructureTable(false);
  };

  const handleDeleteStructureTable = () => {
    if (structureTableIdDelete) {
      handleDeleteTable(structureTableIdDelete.id, structureTableIdDelete.index);
    }
    setIsOpenYes(false);
  };

  const handleInputChange = (e) => {
    setNewTableName(e.target.value);
    if (e.target.value.trim() === "") {
      setErrorInputChange("Table name cannot be empty.");
    } else {
      setErrorInputChange("");
    }
  };

  const handleSave = () => {
    if (newTableName.trim() === "") {
      setErrorInputChange("Table name cannot be empty.");
      return;
    }
    handleTableStructure.table_name = newTableName;
    handleCreateTable(handleTableStructure);
    closeModalCloneStructureTable();
  };

  const ProjectSelector = () => (
    <div className="mb-4">
      <select
        className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        value={selectedProjectId || ""}
        onChange={(e) => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">All Projects</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex h-screen overflow-y-auto">
      <main className="">
        <div className="m-4 overflow-auto">
          <div className="min-w-full mx-auto p-4 bg-white shadow-md rounded-md">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {errorCreate && <p>Error: {errorCreate.message}</p>}
            {errorUpdate && <p>Error: {errorUpdate.message}</p>}
            {errorDelete && <p>Error: {errorDelete.message}</p>}
            <div className="m-4 flex justify-start">
              <h2 className="text-lg justify-right  font-semibold">User Tables</h2>
              <button type="button" className="m-2" onClick={() => openModal()}>
                <i className="fa-regular fa-square-plus fa-xl" style={{ color: "#3e1e9f" }}></i>
              </button>
            </div>
            <ProjectSelector />
            <table className="min-w-full divide-y divide-gray-200 overflow-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    №
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id number
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
                    <i className="fa-solid fa-wrench"></i>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataTables && dataTables.length > 0 ? (
                  dataTables.map((table, index) => (
                    <tr key={index} className="text-black">
                      <td className="px-6 py-4 whitespace-nowrap">${index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{table.project_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{table.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{table.table_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{/* {template.template_data} */}data</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatDate(table.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatDate(table.updated_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {table.table_data && table.table_data.length > 0 && table.table_data[0].data.length > 0 ? (
                          <>
                            <button onClick={() => handleViewTable(table)} className="p-2 bg-blue-500 text-white rounded-md mr-2">
                              <i className="fa-regular fa-eye"></i>
                            </button>
                            <button onClick={() => handleFillInTable(table, "first")} className="px-2 py-3 bg-yellow-500 text-white rounded-md mr-2">
                              <i className="fa-regular fa-square-plus fa-lg"></i>
                            </button>
                            {/*     <button
                                                            onClick={() => handleFillInTable(table, 'second')}
                                                            className="px-2 py-3 bg-yellow-500 text-white rounded-md mr-2"
                                                        >
                                                            <i className="fa-regular fa-square-plus fa-lg"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => openModalExcel(table, 'second')}
                                                            className="px-2 py-3 bg-yellow-500 text-white rounded-md mr-2"
                                                        >
                                                            <i className="fa-solid fa-file-excel fa-lg"></i>
                                                        </button> */}
                            <button onClick={() => openModalExcel(table, "first")} className="px-2 py-3 bg-yellow-500 text-white rounded-md mr-2">
                              <i className="fa-solid fa-file-excel fa-lg"></i>
                            </button>
                            <button onClick={() => openModalCloneStructureTable(table)} className="bg-none rounded-md mx-2">
                              clone
                            </button>
                            <button onClick={() => openModalUpdate(table)} className="bg-none rounded-md mx-2">
                              <i className="fa-solid fa-pencil" style={{ color: "#429424" }}></i>
                            </button>
                            <button onClick={() => openModalYesDelete(table.id, index)} className="bg-none rounded-md mx-2">
                              <i className="fa-regular fa-trash-can" style={{ color: "#ea3f06" }}></i>
                            </button>
                          </>
                        ) : (
                          <>
                            <button disabled onClick={() => handleViewTable(table)} className="p-2 bg-gray-500 text-white rounded-md mr-2">
                              <i className="fa-regular fa-eye"></i>
                            </button>
                            <button onClick={() => handleFillInTable(table, "first")} className="px-2 py-3 bg-green-500 text-white rounded-md mr-2">
                              <i className="fa-regular fa-square-plus fa-lg"></i>
                            </button>
                            <button onClick={() => openModalExcel(table, "first")} className="px-2 py-3 bg-yellow-500 text-white rounded-md mr-2">
                              <i className="fa-solid fa-file-excel fa-lg"></i>
                            </button>
                            <button onClick={() => openModalCloneStructureTable(table)} className="bg-none rounded-md mx-2">
                              clone
                            </button>
                            <button onClick={() => openModalUpdate(table)} className="bg-none rounded-md mx-2">
                              <i className="fa-solid fa-pencil" style={{ color: "#429424" }}></i>
                            </button>
                            <button onClick={() => openModalYesDelete(table.id, index)} className="bg-none rounded-md mx-2">
                              <i className="fa-regular fa-trash-can" style={{ color: "#ea3f06" }}></i>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-white">
                    <td colSpan={8} className="px-6 py-4 whitespace-nowrap">
                      <p>No tables created yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isOpenYes && (
          <ModalYesOrNot
            closeModal={closeModalYes}
            handleButtonClick={handleDeleteStructureTable}
            text={{ head: "Delete a structure Table", title: "Do you want to delete a structure Table?" }}
          />
        )}
        {isOpenCloneStructureTable && (
          <ModalCustom isOpen={isOpenCloneStructureTable} closeModal={closeModalCloneStructureTable} text={{ title: "Create New Structure Table for data" }}>
            <div>
              <label htmlFor="tableNameInput" className="block text-sm font-medium text-gray-700">
                Table Name
              </label>
              <input
                id="tableNameInput"
                type="text"
                value={newTableName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errorInputChange && <p className="mt-2 text-sm text-red-600">{errorInputChange}</p>}
            </div>
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="inline-flex justify-center px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </ModalCustom>
        )}
        {showFillInTableForm && (
          <ModalCustom isOpen={showFillInTableForm} closeModal={closeShowFillInTableForm} text={{ title: "Add data for Table" }}>
            <FillInTableDataForm tableData={selectedTable} selectSecondOrFirst={secondOrFirst} onUpdateTable={onUpdateFillInTableForm} />
          </ModalCustom>
        )}
        {isOpen && (
          <ModalCustom isOpen={isOpen} closeModal={closeModal} text={{ title: "Create New Structure Table for data" }}>
            <TableStructureForm onCreateTable={handleCreateTable} />
          </ModalCustom>
        )}
        {isOpenUpdate && (
          <ModalCustom isOpen={isOpenUpdate} closeModal={closeModalUpdate} text={{ title: "Update Structure Table for data" }}>
            <TableStructureFormUpdate onUpdateTable={handleUpdateTable} tableStructure={handleTableStructure} />
          </ModalCustom>
        )}

        {isOpenExcel && (
          <ModalCustom isOpen={isOpenExcel} closeModal={closeModalExcel} text={{ title: "Excel Structure Table for data" }} maxW={"max-w-7xl"}>
            <FileParser tableData={selectedTable} onUpdateTable={onUpdateFillInTableForm} />
          </ModalCustom>
        )}
        {selectedTable && (
          <div className="m-4">
            <div className="min-w-full mx-auto p-4 bg-white shadow-md rounded-md">
              <div className="m-4 flex justify-start">
                <h2 className="text-lg justify-right  font-semibold">View Table {selectedTable?.table_name}</h2>
                <button type="button" className="m-2" onClick={() => handleFillInTable(selectedTable, "first")}>
                  <i className="fa-regular fa-square-plus fa-xl" style={{ color: "#3e1e9f" }}></i>
                </button>
              </div>
              <ViewTable tableData={selectedTable} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ControlPanel;
