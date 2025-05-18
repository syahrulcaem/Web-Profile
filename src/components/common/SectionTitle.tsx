import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '' }) => {
  return (
    <div className={twMerge('mb-10 relative', className)}>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;