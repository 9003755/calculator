import React, { useState } from 'react';
import { calculateDistanceAndBearing, dmsToDecimal } from '../../utils/calculations';
import { validateLatitude, validateLongitude } from '../../utils/validations';

export const CoordinateCalculator: React.FC = () => {
  const [inputFormat, setInputFormat] = useState<'decimal' | 'dms'>('decimal');
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  
  // DMS格式输入
  const [lat1DMS, setLat1DMS] = useState({ deg: '', min: '', sec: '' });
  const [lon1DMS, setLon1DMS] = useState({ deg: '', min: '', sec: '' });
  const [lat2DMS, setLat2DMS] = useState({ deg: '', min: '', sec: '' });
  const [lon2DMS, setLon2DMS] = useState({ deg: '', min: '', sec: '' });
  
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    let lat1Value, lon1Value, lat2Value, lon2Value;

    if (inputFormat === 'dms') {
      // 验证DMS输入
      const dmsInputs = [
        lat1DMS, lon1DMS, lat2DMS, lon2DMS
      ];
      
      for (let i = 0; i < dmsInputs.length; i++) {
        const input = dmsInputs[i];
        if (!input.deg || !input.min || !input.sec) {
          setError('请完整输入度分秒');
          return;
        }
      }
      
      lat1Value = dmsToDecimal(Number(lat1DMS.deg), Number(lat1DMS.min), Number(lat1DMS.sec));
      lon1Value = dmsToDecimal(Number(lon1DMS.deg), Number(lon1DMS.min), Number(lon1DMS.sec));
      lat2Value = dmsToDecimal(Number(lat2DMS.deg), Number(lat2DMS.min), Number(lat2DMS.sec));
      lon2Value = dmsToDecimal(Number(lon2DMS.deg), Number(lon2DMS.min), Number(lon2DMS.sec));
    } else {
      // 验证十进制度输入
      if (!validateLatitude(lat1)) {
        setError('纬度1输入无效（-90°到90°）');
        return;
      }
      if (!validateLongitude(lon1)) {
        setError('经度1输入无效（-180°到180°）');
        return;
      }
      if (!validateLatitude(lat2)) {
        setError('纬度2输入无效（-90°到90°）');
        return;
      }
      if (!validateLongitude(lon2)) {
        setError('经度2输入无效（-180°到180°）');
        return;
      }
      
      lat1Value = Number(lat1);
      lon1Value = Number(lon1);
      lat2Value = Number(lat2);
      lon2Value = Number(lon2);
    }

    try {
      const coordResult = calculateDistanceAndBearing(lat1Value, lon1Value, lat2Value, lon2Value);
      setResult(coordResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算错误');
    }
  };

  const clear = () => {
    setLat1('');
    setLon1('');
    setLat2('');
    setLon2('');
    setLat1DMS({ deg: '', min: '', sec: '' });
    setLon1DMS({ deg: '', min: '', sec: '' });
    setLat2DMS({ deg: '', min: '', sec: '' });
    setLon2DMS({ deg: '', min: '', sec: '' });
    setResult(null);
    setError('');
  };

  const DMSInput = ({ value, onChange, label }: any) => (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-600">{label}</label>
      <div className="flex gap-1">
        <input
          type="number"
          value={value.deg}
          onChange={(e) => onChange({ ...value, deg: e.target.value })}
          className="w-12 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="°"
        />
        <input
          type="number"
          value={value.min}
          onChange={(e) => onChange({ ...value, min: e.target.value })}
          className="w-12 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="'"
        />
        <input
          type="number"
          value={value.sec}
          onChange={(e) => onChange({ ...value, sec: e.target.value })}
          className="w-12 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="秒"
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="decimal"
            checked={inputFormat === 'decimal'}
            onChange={(e) => setInputFormat(e.target.value as 'decimal')}
            className="mr-2"
          />
          十进制度
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            value="dms"
            checked={inputFormat === 'dms'}
            onChange={(e) => setInputFormat(e.target.value as 'dms')}
            className="mr-2"
          />
          度分秒
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">点A</h3>
          {inputFormat === 'decimal' ? (
            <>
              <input
                type="number"
                value={lat1}
                onChange={(e) => setLat1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="纬度 (-90°到90°)"
                step="any"
              />
              <input
                type="number"
                value={lon1}
                onChange={(e) => setLon1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="经度 (-180°到180°)"
                step="any"
              />
            </>
          ) : (
            <>
              <DMSInput value={lat1DMS} onChange={setLat1DMS} label="纬度" />
              <DMSInput value={lon1DMS} onChange={setLon1DMS} label="经度" />
            </>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-700">点B</h3>
          {inputFormat === 'decimal' ? (
            <>
              <input
                type="number"
                value={lat2}
                onChange={(e) => setLat2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="纬度 (-90°到90°)"
                step="any"
              />
              <input
                type="number"
                value={lon2}
                onChange={(e) => setLon2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="经度 (-180°到180°)"
                step="any"
              />
            </>
          ) : (
            <>
              <DMSInput value={lat2DMS} onChange={setLat2DMS} label="纬度" />
              <DMSInput value={lon2DMS} onChange={setLon2DMS} label="经度" />
            </>
          )}
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
          <div className="space-y-1 text-sm">
            <div>距离: {result.distance} 米</div>
            <div>A→B航向角: {result.bearingAB}°</div>
            <div>B→A航向角: {result.bearingBA}°</div>
          </div>
        </div>
      )}
    </div>
  );
};