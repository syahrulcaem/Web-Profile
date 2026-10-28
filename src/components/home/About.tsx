import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { FiMail } from 'react-icons/fi';
import { aboutContent } from '../../constants/content';
import { useLanguage } from '../../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto">
        <SectionTitle title={t.sections.about} className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden aspect-square max-w-md mx-auto md:mx-0"
          >
            <img
              src={aboutContent.image}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </motion.div>
          
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              {t.about.subtitle}
            </h3>
            
            <div className="space-y-4">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph} style={{ color: '#4B5563' }}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            {/* Expertise Tags */}
            {aboutContent.expertise.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t.about.expertise}</h4>
                <div className="flex flex-wrap gap-2">
                  {aboutContent.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.button
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail className="text-lg" /> {t.about.contactMe}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
