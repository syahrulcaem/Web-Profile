import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import SkillItem from './SkillItem';
import skillCategories from '../../constants/skills';

const Skills: React.FC = () => {
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
                {category.skills.map((skill) => (
                  <SkillItem 
                    key={skill.id}
                    skill={skill}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;