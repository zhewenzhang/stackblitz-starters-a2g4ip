import React, { useState, useRef, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const AdminUPP = () => {
  const [rows, setRows] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedRows = localStorage.getItem('uppData');
    if (savedRows) {
      setRows(JSON.parse(savedRows));
    } else {
      const defaultRows = [
        { id: 1, sizeX: 10, sizeY: 10, upp: 100 },
        { id: 2, sizeX: 20, sizeY: 20, upp: 400 },
      ];
      setRows(defaultRows);
      localStorage.setItem('uppData', JSON.stringify(defaultRows));
    }
  }, []);

  const columns = [
    { key: 'sizeX', name: '尺寸 X', editor: 'number', editable: true },
    { key: 'sizeY', name: '尺寸 Y', editor: 'number', editable: true },
    { key: 'upp', name: 'UPP', editor: 'number', editable: true },
  ];

  const handleRowsChange = (newRows) => {
    setRows(newRows);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        const newRows = json.map((row, index) => ({ id: index + 1, ...row }));
        setRows(newRows);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UPP Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'upp_data.xlsx');
  };

  const handleUpdate = () => {
    localStorage.setItem('uppData', JSON.stringify(rows));
    alert('UPP 数据已更新并保存');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">后台管理 - UPP</h2>
      <div className="mb-4 flex items-center flex-wrap">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileSelect}
          className="mb-2 text-gray-200"
          ref={fileInputRef}
        />
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2 mb-2"
        >
          下载 Excel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2 mb-2"
        >
          更新
        </button>
      </div>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowsChange={handleRowsChange}
        className="rdg-light"
      />
    </div>
  );
};

export default AdminUPP;