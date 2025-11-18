import React from 'react';

interface DisplayProps {
  value: string;
  error?: string;
  className?: string;
}

export const Display: React.FC<DisplayProps> = ({ value, error, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 mb-4 ${className}`}>
      <div className="text-right">
        {error ? (
          <div className="text-red-400 text-sm mb-2">{error}</div>
        ) : null}
        <div className="text-white text-2xl font-mono overflow-hidden">
          {value || '0'}
        </div>
      </div>
    </div>
  );
};