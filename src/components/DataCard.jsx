import React from 'react';

const DataCard = ({ title, count, icon, color }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg flex flex-col justify-center items-start p-6 border-l-8 ${color}`}>
      <div className="flex justify-between items-center w-full">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      <div className="mt-4 text-4xl font-bold text-gray-900">
        {count}
      </div>
    </div>
  );
};

export default DataCard;