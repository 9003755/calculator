import React from 'react';
import { CalculatorMode, ModeOption } from '../../types/calculator';

interface ModeSelectorProps {
  currentMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

const modes: ModeOption[] = [
  { id: 'basic', name: '基础计算', icon: '🧮' },
  { id: 'advanced', name: '高级数学', icon: '📐' },
  { id: 'triangle', name: '三角形', icon: '🔺' },
  { id: 'coordinate', name: '经纬度', icon: '🌍' },
  { id: 'speed', name: '速度换算', icon: '⚡' }
];

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentMode === mode.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <span className="mr-1">{mode.icon}</span>
          {mode.name}
        </button>
      ))}
    </div>
  );
};