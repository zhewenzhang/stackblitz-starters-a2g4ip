import React, { useState, useEffect } from 'react';

const BasePriceSettings = () => {
  const [rows, setRows] = useState([
    { id: 1, customerType: '2', basePrice: '' },
    { id: 2, customerType: '5', basePrice: '' },
    { id: 3, customerType: 'N', basePrice: '' },
  ]);

  useEffect(() => {
    const savedPrices = localStorage.getItem('basePrices');
    if (savedPrices) {
      setRows(JSON.parse(savedPrices));
    }
  }, []);

  const handlePriceChange = (id, value) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, basePrice: value } : row
    );
    setRows(updatedRows);
  };

  const handleUpdate = () => {
    const emptyPrices = rows.filter(row => row.basePrice === '');
    if (emptyPrices.length > 0) {
      alert('请填写所有的基础价格，不能留空。');
      return;
    }

    const updatedRows = rows.map(row => ({
      ...row,
      basePrice: parseFloat(row.basePrice) || 0
    }));

    localStorage.setItem('basePrices', JSON.stringify(updatedRows));
    setRows(updatedRows);
    alert('基础价格已更新并保存');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">基础价格设定</h2>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left p-2 bg-gray-700 text-gray-200">客户类型</th>
            <th className="text-left p-2 bg-gray-700 text-gray-200">基础价格</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} className="border-b border-gray-600">
              <td className="p-2 text-gray-300">{row.customerType}</td>
              <td className="p-2">
                <input
                  type="number"
                  value={row.basePrice}
                  onChange={(e) => handlePriceChange(row.id, e.target.value)}
                  className="w-full bg-gray-700 text-gray-200 border border-gray-600 rounded p-1"
                  placeholder="输入价格"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleUpdate}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        更新
      </button>
      <p className="mt-4 text-gray-300">注意：直接在表格中编辑价格，然后点击更新按钮保存修改。所有价格必须填写，不能留空。</p>
    </div>
  );
};

export default BasePriceSettings;