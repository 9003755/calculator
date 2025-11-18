// 计算器类型定义
export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: string | null;
  waitingForNewValue: boolean;
}

export interface TriangleResult {
  angleA: number;
  angleB: number;
  angleC: number;
  sideA: number;
  sideB: number;
  sideC: number;
}

export interface CoordinateResult {
  distance: number;
  bearingAB: number;
  bearingBA: number;
}

export interface SpeedConversionResult {
  kmh: number;
  ms: number;
  mph: number;
  knots: number;
}

export type CalculatorMode = 
  | 'basic'
  | 'advanced'
  | 'triangle'
  | 'coordinate'
  | 'speed';

export interface ModeOption {
  id: CalculatorMode;
  name: string;
  icon: string;
}