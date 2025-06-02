import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = "h-10 rounded-[20px] font-['Plus_Jakarta_Sans'] text-[14px] font-bold flex items-center justify-center";
  
  const variantClasses = {
    primary: 'bg-[#b2d1e5] text-[#111416]',
    secondary: 'bg-[#f2f2f4] text-[#111416]'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;