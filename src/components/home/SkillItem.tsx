import React from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  color?: string;
}

interface SkillItemProps {
  skill: Skill;
  className?: string;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, className = '' }) => {
  const { name, icon: Icon, color = '#4B5563' } = skill;

  return (
    <motion.div
      className={twMerge(
        'flex flex-col items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300',
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div
        className="w-16 h-16 flex items-center justify-center rounded-full mb-3"
        style={{ backgroundColor: `${color}20` }} // Using color with 20% opacity
      >
        <Icon 
          className="text-3xl" 
          style={{ color }}
        />
      </div>
      <h3 className="text-gray-800 font-medium text-center">{name}</h3>
    </motion.div>
  );
};

export default SkillItem;