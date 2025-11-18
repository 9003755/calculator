import React, { useState } from 'react';
import { Display } from '../common/Display';
import { calculateTriangle } from '../../utils/calculations';
import { validateAngle, validatePositiveNumber } from '../../utils/validations';

export const TriangleCalculator: React.FC = () => {
  const [angleA, setAngleA] = useState('');
  const [angleB, setAngleB] = useState('');
  const [knownSide, setKnownSide] = useState('');
  const [knownSideType, setKnownSideType] = useState<'a' | 'b' | 'c'>('a');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    // 验证输入
    if (!validateAngle(angleA)) {
      setError('角度A输入无效（0-180°）');
      return;
    }
    if (!validateAngle(angleB)) {
      setError('角度B输入无效（0-180°）');
      return;
    }
    if (!validatePositiveNumber(knownSide)) {
      setError('边长必须大于0');
      return;
    }

    const a = Number(angleA);
    const b = Number(angleB);
    const side = Number(knownSide);

    if (a + b >= 180) {
      setError('两角之和必须小于180°');
      return;
    }

    try {
      const triangleResult = calculateTriangle(a, b, side, knownSideType);
      setResult(triangleResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算错误');
    }
  };

  const clear = () => {
    setAngleA('');
    setAngleB('');
    setKnownSide('');
    setResult(null);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            角度A (°)
          </label>
          <input
            type="number"
            value={angleA}
            onChange={(e) => setAngleA(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入角度A"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            角度B (°)
          </label>
          <input
            type="number"
            value={angleB}
            onChange={(e) => setAngleB(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入角度B"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            已知边长
          </label>
          <input
            type="number"
            value={knownSide}
            onChange={(e) => setKnownSide(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入边长"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            已知边对应
          </label>
          <select
            value={knownSideType}
            onChange={(e) => setKnownSideType(e.target.value as 'a' | 'b' | 'c')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="a">角A</option>
            <option value="b">角B</option>
            <option value="c">角C</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={calculate}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          计算
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

      {result && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          <h3 className="font-semibold mb-2">计算结果：</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>角度A: {result.angleA}°</div>
            <div>角度B: {result.angleB}°</div>
            <div>角度C: {result.angleC}°</div>
            <div>边长a: {result.sideA}</div>
            <div>边长b: {result.sideB}</div>
            <div>边长c: {result.sideC}</div>
          </div>
        </div>
      )}
    </div>
  );
};