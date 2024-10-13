import React from 'react';

const VersionHistory = () => {
  const versions = [
    {
      version: '1010-9',
      description: '更新版本号以验证部署流程。修复了一些小问题并优化了性能。'
    },
    {
      version: '1010-8',
      description: '新增了基础价格功能，并可以完成更新。用户现在可以设置和管理不同客户类型的基础价格。'
    },
    {
      version: '1010-7',
      description: '优化了基础价格设定和UPP管理页面，确保数据能够正确保存和加载。修复了一些界面和功能问题。'
    },
    {
      version: '1010-6',
      description: '新增了UPP识别功能。当输入的尺寸X和尺寸Y与UPP管理表中的数据匹配时，计算结果会显示对应的UPP值。'
    },
    // 在这里可以添加更多的版本历史
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-200">版本历史</h2>
      <div className="space-y-4">
        {versions.map((v, index) => (
          <div key={index} className="glass-morphism rounded p-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-400">版本 {v.version}</h3>
            <p className="text-gray-300">{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;