import React, { useState, useEffect } from 'react';

const AdminOptions = () => {
  const [options, setOptions] = useState({
    customerTypes: ['2', '5', 'N'],
    coreMaterials: ['E705G', 'E705G(LH)', 'E795G', 'E795(GLH)'],
    coreThicknesses: ['0.4', '0.8', '1.2'],
    abfTypes: ['GZ41', 'GXT31', 'GL102', 'GL107'],
    surfaceTreatments: ['ENEPIG', 'OSP', 'IT'],
    fcstLevels: ['10K/M', '50K/M', '100K/M', '500K/M', '1KK/M'],
  });

  useEffect(() => {
    const savedOptions = localStorage.getItem('adminOptions');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  const handleOptionChange = (category, index, value) => {
    const newOptions = { ...options };
    newOptions[category][index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = (category) => {
    const newOptions = { ...options };
    newOptions[category].push('');
    setOptions(newOptions);
  };

  const handleRemoveOption = (category, index) => {
    const newOptions = { ...options };
    newOptions[category].splice(index, 1);
    setOptions(newOptions);
  };

  const renderOptionInputs = (category, label) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2 text-gray-200">{label}</h3>
      {options[category].map((option, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(category, index, e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          />
          <button
            onClick={() => handleRemoveOption(category, index)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            删除
          </button>
        </div>
      ))}
      <button
        onClick={() => handleAddOption(category)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        添加选项
      </button>
    </div>
  );

  const handleSave = () => {
    localStorage.setItem('adminOptions', JSON.stringify(options));
    alert('选项已成功保存！');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">后台管理 - 选项</h2>
      {renderOptionInputs('customerTypes', '客户类别')}
      {renderOptionInputs('coreMaterials', 'Core 材料')}
      {renderOptionInputs('coreThicknesses', 'Core 厚度')}
      {renderOptionInputs('abfTypes', 'ABF 种类')}
      {renderOptionInputs('surfaceTreatments', '表面处理方式')}
      {renderOptionInputs('fcstLevels', 'FCST')}
      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        保存更改
      </button>
    </div>
  );
};

export default AdminOptions;