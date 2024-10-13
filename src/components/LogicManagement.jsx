import React, { useState, useRef, useEffect } from 'react';
import DataGrid from 'react-data-grid';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const LogicManagement = () => {
  const [rows, setRows] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedRows = localStorage.getItem('logicManagementData');
    if (savedRows) {
      setRows(JSON.parse(savedRows).map(formatRow));
    } else {
      const defaultRows = [
        { id: 1, coreMaterial: 'E705G', coreThickness: '0.4', priceFactor: '1.00' },
      ];
      setRows(defaultRows.map(formatRow));
      localStorage.setItem('logicManagementData', JSON.stringify(defaultRows));
    }
  }, []);

  const formatPriceFactor = (value) => {
    const number = parseFloat(value);
    return isNaN(number) ? '0.00' : number.toFixed(2);
  };

  const formatRow = (row) => ({
    ...row,
    priceFactor: formatPriceFactor(row.priceFactor)
  });

  const columns = [
    { key: 'coreMaterial', name: 'Core材料', editor: 'text', editable: true },
    { key: 'coreThickness', name: 'Core厚度', editor: 'text', editable: true },
    { 
      key: 'priceFactor', 
      name: '加价系数', 
      editor: 'text',
      editable: true,
      formatter: ({ row }) => row.priceFactor
    },
  ];

  const handleRowsChange = (newRows) => {
    const formattedRows = newRows.map(formatRow);
    setRows(formattedRows);
    localStorage.setItem('logicManagementData', JSON.stringify(formattedRows));
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
        const newRows = json.map((row, index) => ({ 
          id: index + 1, 
          coreMaterial: row['Core材料'] || '',
          coreThickness: row['Core厚度'] || '',
          priceFactor: row['加价系数'] || '0.00'
        }));
        const formattedRows = newRows.map(formatRow);
        setRows(formattedRows);
        localStorage.setItem('logicManagementData', JSON.stringify(formattedRows));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows.map(row => ({
      'Core材料': row.coreMaterial,
      'Core厚度': row.coreThickness,
      '加价系数': row.priceFactor
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logic Management Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, 'logic_management_data.xlsx');
  };

  const handleUpdate = () => {
    localStorage.setItem('logicManagementData', JSON.stringify(rows));
    alert('逻辑管理数据已成功更新！');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">逻辑管理</h2>
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

export default LogicManagement;