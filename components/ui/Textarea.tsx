import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
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
      <textarea
        className={`w-full px-4 py-3 bg-konekt-white border-2 border-konekt-black/10 rounded-lg
          focus:outline-none focus:border-konekt-green transition-colors resize-none
          placeholder:text-konekt-black/40 ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
