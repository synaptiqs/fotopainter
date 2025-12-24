import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-sm p-6';
  const hoverStyles = hover ? 'transition-shadow duration-200 hover:shadow-md' : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}

