import React, { useState } from 'react';
import tapcoin from "../../assets/tapcoin.png";

const NeedHome: React.FC = () => {
  // Add state to track the main value
  const [mainValue, setMainValue] = useState(0);

  // Function to increment the main value
  const handleImageClick = () => {
    setMainValue(prevValue => prevValue + 1); // Increment the value by 1
  };

  return (
    <div className="bg-black text-white min-h-screen p-2">
      {/* Header */}
      <div className="flex items-center justify-between p-2">
        <h1 className="text-lg font-bold">Need Coin</h1>
        <span className="text-xs">(profession)</span>
      </div>

      {/* Progress bar and stats */}
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center">
          <span style={{ fontSize: '0.5rem' }} className="mr-2">Level</span>
          <div className="bg-gray-700 h-2 w-24 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: '0%' }}></div>
          </div>
          <span style={{ fontSize: '0.5rem' }} className="ml-2">0 / 10</span>
        </div>
        <div className="flex flex-col items-center">
          <span style={{ fontSize: '0.5rem' }} className="ml-2">Profit per hour</span>
          <span className="text-yellow-300 text-sm font-bold">0</span>
        </div>
      </div>

      {/* Cards for Daily rewards */}
      <div className="grid grid-cols-3 gap-4 p-2">
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div style={{ fontSize: '0.5rem' }} className="text">Daily reward</div>
          <div style={{ fontSize: '0.6rem' }} className="text text-gray-400">00:00:00</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div style={{ fontSize: '0.5rem' }} className="text">Daily cipher</div>
          <div style={{ fontSize: '0.6rem' }} className="text-sm text-gray-400">00:00:00</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <div style={{ fontSize: '0.5rem' }} className="text">Daily combo</div>
          <div style={{ fontSize: '0.6rem' }} className="text-sm text-gray-400">00:00:00</div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="flex flex-col items-center p-2">
        <h2 className="text-3xl font-bold text-yellow-300">{mainValue}</h2> {/* Display mainValue */}
        <div className="w-32 h-32 bg-blue-900 rounded-full flex items-center justify-center">
          <img
            src={tapcoin} 
            alt="Need"
            className="rounded-full cursor-pointer"
            onClick={handleImageClick} // Add onClick handler
          />
        </div>
      </div>

      {/* Energy and Boost */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-yellow-300">⚡</span>
          <span className="ml-2">500 / 500</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-400">🚀</span>
          <span className="ml-2">Boost</span>
        </div>
      </div>
    </div>
  );
};

export default NeedHome;
