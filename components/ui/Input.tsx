import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-konekt-black mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-konekt-white border-2 border-konekt-black/10 rounded-lg
          focus:outline-none focus:border-konekt-green transition-colors
          placeholder:text-konekt-black/40 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
