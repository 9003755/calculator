// 输入验证函数
export const validateNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};

export const validatePositiveNumber = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num > 0;
};

export const validateAngle = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num > 0 && num < 180;
};

export const validateCoordinate = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= -180 && num <= 180;
};

export const validateLatitude = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= -90 && num <= 90;
};

export const validateLongitude = (value: string): boolean => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= -180 && num <= 180;
};

// 格式化函数
export const formatNumber = (value: number, decimals: number = 6): string => {
  return Number(value.toFixed(decimals)).toString();
};

export const formatAngle = (value: number): string => {
  return Number(value.toFixed(2)).toString();
};

export const formatDistance = (value: number): string => {
  if (value < 1000) {
    return `${Number(value.toFixed(2))} m`;
  } else {
    return `${Number((value / 1000).toFixed(3))} km`;
  }
};

// 错误消息
export const ERROR_MESSAGES = {
  INVALID_NUMBER: '请输入有效的数字',
  INVALID_POSITIVE: '请输入大于0的数字',
  INVALID_ANGLE: '请输入有效的角度（0-180°）',
  INVALID_LATITUDE: '请输入有效的纬度（-90°到90°）',
  INVALID_LONGITUDE: '请输入有效的经度（-180°到180°）',
  NEGATIVE_SQUARE_ROOT: '负数不能开平方根',
  INVALID_TRIANGLE_ANGLES: '三角形角度之和必须小于180°',
  INVALID_EXPRESSION: '计算表达式无效',
  UNSUPPORTED_UNIT: '不支持的速度单位'
};