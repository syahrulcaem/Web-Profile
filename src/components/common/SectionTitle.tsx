import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useLanguage } from '../../context/LanguageContext';

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className = '' }) => {
  const { language } = useLanguage();
  return (
    <div className={twMerge('mb-10 relative', className)} lang={language}>
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <div className="h-1 w-20 bg-primary mt-2 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;