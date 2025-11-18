// 基础计算函数
export const calculateBasic = (expression: string): number => {
  try {
    // 安全的数学表达式计算
    const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
    const result = Function('"use strict"; return (' + sanitized + ')')();
    return Number(result);
  } catch (error) {
    throw new Error('计算表达式无效');
  }
};

// 平方运算
export const calculateSquare = (value: number): number => {
  return value * value;
};

// 平方根运算
export const calculateSquareRoot = (value: number): number => {
  if (value < 0) {
    throw new Error('负数不能开平方根');
  }
  return Math.sqrt(value);
};

// 三角形计算（使用正弦定理）
export const calculateTriangle = (
  angleA: number,
  angleB: number,
  knownSide: number,
  knownSideType: 'a' | 'b' | 'c'
) => {
  // 验证角度
  if (angleA <= 0 || angleB <= 0 || angleA + angleB >= 180) {
    throw new Error('角度输入无效');
  }

  const angleC = 180 - angleA - angleB;
  const angleARad = (angleA * Math.PI) / 180;
  const angleBRad = (angleB * Math.PI) / 180;
  const angleCRad = (angleC * Math.PI) / 180;

  let sideA: number, sideB: number, sideC: number;

  // 根据已知边使用正弦定理计算其他边
  if (knownSideType === 'a') {
    sideA = knownSide;
    sideB = (sideA * Math.sin(angleBRad)) / Math.sin(angleARad);
    sideC = (sideA * Math.sin(angleCRad)) / Math.sin(angleARad);
  } else if (knownSideType === 'b') {
    sideB = knownSide;
    sideA = (sideB * Math.sin(angleARad)) / Math.sin(angleBRad);
    sideC = (sideB * Math.sin(angleCRad)) / Math.sin(angleBRad);
  } else {
    sideC = knownSide;
    sideA = (sideC * Math.sin(angleARad)) / Math.sin(angleCRad);
    sideB = (sideC * Math.sin(angleBRad)) / Math.sin(angleCRad);
  }

  return {
    angleA: Number(angleA.toFixed(2)),
    angleB: Number(angleB.toFixed(2)),
    angleC: Number(angleC.toFixed(2)),
    sideA: Number(sideA.toFixed(2)),
    sideB: Number(sideB.toFixed(2)),
    sideC: Number(sideC.toFixed(2))
  };
};

// 经纬度距离计算（Haversine公式）
export const calculateDistanceAndBearing = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371000; // 地球半径（米）
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // 计算航向角
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const bearingAB = (Math.atan2(y, x) * 180) / Math.PI;
  const bearingBA = (bearingAB + 180) % 360;

  return {
    distance: Number(distance.toFixed(2)),
    bearingAB: Number(bearingAB.toFixed(2)),
    bearingBA: Number(bearingBA.toFixed(2))
  };
};

// 度分秒转十进制度
export const dmsToDecimal = (degrees: number, minutes: number, seconds: number): number => {
  return degrees + minutes / 60 + seconds / 3600;
};

// 速度单位换算
export const convertSpeed = (value: number, fromUnit: string, toUnit: string): number => {
  // 转换为米/秒作为基准
  const toMs: { [key: string]: number } = {
    'kmh': 1 / 3.6,
    'ms': 1,
    'mph': 0.44704,
    'knots': 0.514444
  };

  // 从米/秒转换到目标单位
  const fromMs: { [key: string]: number } = {
    'kmh': 3.6,
    'ms': 1,
    'mph': 2.23694,
    'knots': 1.94384
  };

  if (!toMs[fromUnit] || !fromMs[toUnit]) {
    throw new Error('不支持的速度单位');
  }

  const ms = value * toMs[fromUnit];
  return Number((ms * fromMs[toUnit]).toFixed(3));
};