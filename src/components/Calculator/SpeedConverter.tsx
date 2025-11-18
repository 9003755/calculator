import React, { useState } from 'react';
import { convertSpeed } from '../../utils/calculations';
import { validatePositiveNumber } from '../../utils/validations';

const speedUnits = [
  { id: 'kmh', name: 'km/h', fullName: '千米每小时' },
  { id: 'ms', name: 'm/s', fullName: '米每秒' },
  { id: 'mph', name: 'mph', fullName: '英里每小时' },
  { id: 'knots', name: '节', fullName: '节（海里每小时）' }
];

export const SpeedConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('kmh');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setResults(null);

    if (!validatePositiveNumber(inputValue)) {
      setError('请输入有效的正数');
      return;
    }

    const value = Number(inputValue);
    const conversions: any = {};

    try {
      speedUnits.forEach(unit => {
        if (unit.id !== fromUnit) {
          conversions[unit.id] = convertSpeed(value, fromUnit, unit.id);
        } else {
          conversions[unit.id] = value;
        }
      });
      setResults(conversions);
    } catch (err) {
      setError(err instanceof Error ? err.message : '换算错误');
    }
  };

  const clear = () => {
    setInputValue('');
    setResults(null);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            输入数值
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入速度值"
            step="any"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            源单位
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {speedUnits.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name} - {unit.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={convert}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          换算
        </button>
        <button
          onClick={clear}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          清除
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {results && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <h3 className="font-semibold mb-2">换算结果：</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {speedUnits.map(unit => (
              <div key={unit.id} className="flex justify-between">
                <span>{unit.fullName} ({unit.name}):</span>
                <span className="font-mono">
                  {results[unit.id]} {unit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};