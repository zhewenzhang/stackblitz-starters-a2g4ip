import React, { useState, useEffect } from 'react';

const Calculator = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    sizeX: '',
    sizeY: '',
    layers: '',
    customerType: '',
    coreMaterial: '',
    coreThickness: '',
    abfType: '',
    surfaceTreatment: '',
    fcst: ''
  });

  const [options, setOptions] = useState({
    customerTypes: [],
    coreMaterials: [],
    coreThicknesses: [],
    abfTypes: [],
    surfaceTreatments: [],
    fcstLevels: [],
  });

  useEffect(() => {
    const savedOptions = localStorage.getItem('adminOptions');
    if (savedOptions) {
      setOptions(JSON.parse(savedOptions));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const renderInput = (name, label, type = "text") => (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
        id={name}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
      />
    </div>
  );

  const renderSelect = (name, label, optionsArray) => (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600"
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
      >
        <option value="">选择{label}</option>
        {optionsArray.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="glass-morphism rounded px-8 pt-6 pb-8 mb-4">
      {renderInput('sizeX', '输入尺寸 X', 'number')}
      {renderInput('sizeY', '输入尺寸 Y', 'number')}
      {renderInput('layers', '输入Layer层数', 'number')}
      
      {renderSelect('customerType', '客户类别', options.customerTypes)}
      {renderSelect('coreMaterial', 'Core 材料', options.coreMaterials)}
      {renderSelect('coreThickness', 'Core 厚度', options.coreThicknesses)}
      {renderSelect('abfType', 'ABF 种类', options.abfTypes)}
      {renderSelect('surfaceTreatment', '表面处理方式', options.surfaceTreatments)}
      {renderSelect('fcst', 'FCST', options.fcstLevels)}

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          快速计算
        </button>
      </div>
    </form>
  );
};

export default Calculator;