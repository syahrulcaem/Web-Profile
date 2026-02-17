import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { FiMail } from 'react-icons/fi';
import { getAboutContent, AboutContent } from '../../lib/supabase';

const About: React.FC = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await getAboutContent();
      setContent(data);
    } catch (error) {
      console.error('Error loading about content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      </section>
    );
  }

  if (!content) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="About Me" className="mb-12" />
          <p className="text-gray-600">Content not available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="About Me" className="mb-12" />
        
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
              src={content.image_url || '/images/syahrul1.jpeg'}
              alt="Profile"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/800x300";
                e.currentTarget.alt = "Profile Photo Placeholder";
              }}
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
              {content.subtitle}
            </h3>
            
            <div className="space-y-4">
              <p style={{ color: '#4B5563' }}>
                {content.bio_paragraph_1}
              </p>
              
              {content.bio_paragraph_2 && (
                <p style={{ color: '#4B5563' }}>
                  {content.bio_paragraph_2}
                </p>
              )}
              
              {content.bio_paragraph_3 && (
                <p style={{ color: '#4B5563' }}>
                  {content.bio_paragraph_3}
                </p>
              )}
            </div>
            
            {/* Expertise Tags */}
            {content.expertise && content.expertise.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Expertise in:</h4>
                <div className="flex flex-wrap gap-2">
                  {content.expertise.map((skill, index) => (
                    <span 
                      key={index}
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
                <FiMail className="text-lg" /> Contact Me
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
