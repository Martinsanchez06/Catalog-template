import React from 'react';

const CardMainComponent: React.FC = () => {
  return (
    <div className="w-[305px] p-4 bg-white rounded-lg shadow-cardHomeShadow flex flex-col items-center">
      <div className="w-full h-96 bg-gray-300 rounded-md mb-4"></div>
      <h3 className="text-lg font-semibold mb-1">Lorem</h3>
      <p className="text-gray-500 mb-2">$00.000</p>
      <p className="text-gray-400 mb-4">Lorem ipsum</p>
      <button className="px-2.5 py-1.5 bg-gray-400 text-white rounded-md">
        Ver detalle
      </button>
    </div>
  );
};

export default CardMainComponent;
