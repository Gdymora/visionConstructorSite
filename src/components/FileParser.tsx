import React, { useEffect, useState, useCallback } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import useAxios from "../Hooks/useAxios";
import { toast } from "react-toastify";

interface TableStructure {
  name: string;
  type: string;
}

interface TableData {
  id: string;
  project_id: string;
  table_name: string;
  table_structure: string;
  table_data: Array<{ data: string }>;
}

interface FileParserProps {
  tableData: TableData;
  onUpdateTable: (tableData: TableData) => void;
}

const FileParser: React.FC<FileParserProps> = ({ tableData, onUpdateTable }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [rawData, setRawData] = useState<any[]>([]);
  const [token, setToken] = useState("");
  const [ignoreFormat, setIgnoreFormat] = useState(false);
  const { sendRequest, data: responseData, error } = useAxios("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (responseData) {
      displayImportResults(responseData);
      const updatedTableData = {
        ...tableData,
        table_data: [{ data: JSON.stringify(responseData.data) }],
      };
      onUpdateTable(updatedTableData);
    }
  }, [responseData, onUpdateTable, tableData]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [error]);

  const displayImportResults = useCallback(
    (response: any) => {
      if (response.results.errors && response.results.errors.length > 0) {
        toast.info(
          `Warning ${tableData.table_name} Success: ${response.results.success} Failed: ${response.results.failed} Errors: ${response.results.errors.length}`
        );
        console.error(response.results.errors);
      } else {
        toast.success(`Success ${tableData.table_name}: ${response.results.success} rows imported`);
      }
    },
    [tableData.table_name]
  );

  const handleSubmit = useCallback(() => {
    const formattedData = formatData(rawData);
    const data = { project_id: tableData.project_id, user_tables_id: tableData.id, data: formattedData };

    sendRequest("post", data, {
      url: `${apiUrl}/data-tables/import-excel`,
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [rawData, tableData, sendRequest, apiUrl, token]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }

    const fileType = file.type;
    if (fileType === "text/csv") {
      parseCSV(file);
    } else if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileType === "application/vnd.ms-excel") {
      parseExcel(file);
    } else {
      toast.error("Please upload a valid CSV or Excel file.");
    }
  }, []);

  const parseCSV = useCallback((file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        setRawData(result.data);
        processData(result.data);
      },
      error: (error) => {
        toast.error(`Error parsing CSV: ${error.message}`);
      },
    });
  }, []);

  const parseExcel = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setRawData(jsonData);
      processData(jsonData);
    };
    reader.onerror = (error) => {
      toast.error(`Error reading Excel file: ${error}`);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const processData = useCallback((data: any[]) => {
    if (!data || data.length === 0) {
      toast.error("No data found in the file");
      return;
    }
    const formattedData = formatData(data);
    setParsedData(formattedData);
  }, []);

  const formatData = useCallback(
    (data: any[]) => {
      const tableStructure: TableStructure[] = JSON.parse(tableData.table_structure);

      if (ignoreFormat) {
        if (data[0].length < tableStructure.length) {
          toast.error("File format is incorrect: too few columns");
          return [];
        }
        return data.slice(1).map((row) => {
          const formattedRow: Record<string, any> = {};
          tableStructure.forEach((column, index) => {
            formattedRow[column.name] = row[index] || "";
          });
          return formattedRow;
        });
      } else {
        const headers = data[0];
        if (headers.length !== tableStructure.length) {
          toast.error("File format is incorrect: column count mismatch");
          return [];
        }
        return data.slice(1).map((row) => {
          const formattedRow: Record<string, any> = {};
          tableStructure.forEach((column, index) => {
            formattedRow[column.name] = row[index] || "";
          });
          return formattedRow;
        });
      }
    },
    [ignoreFormat, tableData.table_structure]
  );

  return (
    <div className="flex flex-col h-full overflow-auto">
      <input type="file" onChange={handleFileUpload} accept=".csv,.xlsx,.xls" className="mb-2" />
      <div className="mb-2">
        <input type="checkbox" checked={ignoreFormat} onChange={() => setIgnoreFormat(!ignoreFormat)} id="ignoreFormat" className="mr-2" />
        <label htmlFor="ignoreFormat">Ignore format</label>
      </div>
      {parsedData.length > 0 && (
        <>
          <button onClick={handleSubmit} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" type="button">
            Import Data
          </button>
          <div className="overflow-auto" style={{ maxHeight: "60vh" }}>
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {JSON.parse(tableData.table_structure).map((column: TableStructure) => (
                    <th
                      key={column.name}
                      className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                      style={{ minWidth: "150px", maxWidth: "150px" }}
                    >
                      {column.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {parsedData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {JSON.parse(tableData.table_structure).map((column: TableStructure) => (
                      <td
                        key={`${rowIndex}-${column.name}`}
                        className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ minWidth: "150px", maxWidth: "150px" }}
                      >
                        <div className="overflow-hidden text-ellipsis">{String(row[column.name] || "")}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FileParser;
