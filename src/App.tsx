import React, { useState } from 'react';
import { ModeSelector } from './components/common/ModeSelector';
import { BasicCalculator } from './components/Calculator/BasicCalculator';
import { TriangleCalculator } from './components/Calculator/TriangleCalculator';
import { CoordinateCalculator } from './components/Calculator/CoordinateCalculator';
import { SpeedConverter } from './components/Calculator/SpeedConverter';
import { CalculatorMode } from './types/calculator';

function App() {
  const [currentMode, setCurrentMode] = useState<CalculatorMode>('basic');

  const renderCalculator = () => {
    switch (currentMode) {
      case 'basic':
        return <BasicCalculator />;
      case 'advanced':
        return <BasicCalculator showAdvanced={true} />;
      case 'triangle':
        return <TriangleCalculator />;
      case 'coordinate':
        return <CoordinateCalculator />;
      case 'speed':
        return <SpeedConverter />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 头部 */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">简约计算器</h1>
            <div className="text-xs opacity-90">
              海边的飞行器VX18520403199
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="p-4">
          <ModeSelector currentMode={currentMode} onModeChange={setCurrentMode} />
          {renderCalculator()}
        </div>

        {/* 底部作者信息 */}
        <div className="bg-gray-50 px-4 py-2 text-center">
          <div className="text-xs text-gray-600">
            作者：海边的飞行器VX18520403199
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
