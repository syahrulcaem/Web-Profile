import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import SkillItem from './SkillItem';
import { getSkillCategories } from '../../lib/supabase';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as FiIcons from 'react-icons/fi';
import type { IconType } from 'react-icons';

const Skills: React.FC = () => {
  const [skillCategories, setSkillCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await getSkillCategories();
      setSkillCategories(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get icon from icon name string
  const getIcon = (iconName: string): IconType => {
    const allIcons = { ...FaIcons, ...SiIcons, ...FiIcons };
    return (allIcons as any)[iconName] || FiIcons.FiCode;
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="My Skills" className="mb-12" />
        
        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.id} className="mb-8">
              <motion.h3
                className="text-2xl font-bold text-gray-800 mb-6 relative inline-block"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {category.title}
                <div className="h-1 w-full bg-primary/70 absolute bottom-0 left-0 -mb-1 rounded-full"></div>
              </motion.h3>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  staggerChildren: 0.1
                }}
              >
                {category.skills.map((skill: any) => (
                  <SkillItem 
                    key={skill.id}
                    skill={{
                      id: skill.id,
                      name: skill.name,
                      icon: getIcon(skill.icon_name),
                      color: skill.color
                    }}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {skillCategories.length === 0 && (
          <p className="text-center text-gray-600 py-12">No skills available</p>
        )}
      </div>
    </section>
  );
};

export default Skills;