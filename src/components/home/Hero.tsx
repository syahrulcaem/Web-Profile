import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { heroContent } from '../../constants/content';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="min-h-screen flex items-center bg-gray-50 py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            Hello, I'm <br className="sm:hidden" />
            <span className="text-blue-500 block sm:inline">{heroContent.name}</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            {heroContent.title}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            {heroContent.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-600"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects <FiArrowRight />
            </motion.button>
            
            {heroContent.cvLink && (
              <motion.a 
                href={heroContent.cvLink} 
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV <FiDownload />
              </motion.a>
            )}
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
            <a 
              href={`mailto:${heroContent.email}`} 
              className="text-gray-600 hover:text-blue-500 transition-colors break-all"
            >
              {heroContent.email}
            </a>
            {heroContent.linkedinUrl && (
              <>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a 
                  href={heroContent.linkedinUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  LinkedIn
                </a>
              </>
            )}
            {heroContent.githubUrl && (
              <>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a 
                  href={heroContent.githubUrl}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-500 transition-colors"
                >
                  GitHub
                </a>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
