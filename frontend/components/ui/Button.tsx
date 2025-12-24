import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-[#008080] text-white hover:bg-[#006666] focus:ring-[#008080] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white text-[#008080] border-2 border-[#008080] hover:bg-[#008080] hover:text-white focus:ring-[#008080] disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'bg-transparent text-[#008080] hover:bg-[#008080]/10 focus:ring-[#008080] disabled:opacity-50 disabled:cursor-not-allowed',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

