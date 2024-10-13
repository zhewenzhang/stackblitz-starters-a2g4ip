import React from 'react';

const Results = ({ results, formData }) => {
  const { pcsPrice, pnlPrice, upp } = results;

  const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: currency }).format(value);
  };

  return (
    <div className="glass-morphism rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4 text-blue-400">计算结果</h2>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-300">产品特性</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-4">
          <tbody>
            <tr>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">尺寸 X</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">尺寸 Y</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">Layer 层数</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">客户类别</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">Core 材料</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">Core 厚度</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">ABF 种类</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">表面处理方式</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">FCST</th>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-300">{formData.sizeX}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.sizeY}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.layers}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.customerType}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.coreMaterial}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.coreThickness}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.abfType}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.surfaceTreatment}</td>
              <td className="border px-4 py-2 text-gray-300">{formData.fcst}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-gray-300">价格信息</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">价格</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">人民币</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">美金</th>
              <th className="border px-4 py-2 bg-gray-700 text-gray-300">台币</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-semibold text-gray-300">PCS Price</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pcsPrice, 'CNY')}</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pcsPrice / 7, 'USD')}</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pcsPrice * 4.5, 'TWD')}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 font-semibold text-gray-300">PNL Price</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pnlPrice, 'CNY')}</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pnlPrice / 7, 'USD')}</td>
              <td className="border px-4 py-2 text-gray-300">{formatCurrency(pnlPrice * 4.5, 'TWD')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="font-bold text-blue-400">UPP: {upp}</p>
      </div>
    </div>
  );
};

export default Results;