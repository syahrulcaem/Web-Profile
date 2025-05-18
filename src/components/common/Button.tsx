import React from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'outline' | 'default';

interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  // Pilih style berdasarkan variant
  let buttonStyle = '';
  
  switch(variant) {
    case 'primary':
      buttonStyle = 'bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'outline':
      buttonStyle = 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50';
      break;
    default:
      buttonStyle = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      break;
  }
  
  const baseStyle = 'px-4 py-2 rounded-md font-medium transition-all duration-300';
  
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${buttonStyle} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;