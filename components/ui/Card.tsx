import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
}) => {
  return (
    <div
      className={`bg-konekt-white rounded-xl border-2 border-konekt-black/10 p-6
        ${hover ? 'hover:shadow-lg hover:border-konekt-green/30 transition-all duration-200 cursor-pointer' : ''}
        ${className}`}
    >
      {children}
    </div>
  );
};
