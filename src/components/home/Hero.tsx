import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Hello, I'm <span className="text-blue-500">M. SYAHRUL ROMADHON</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            Informatics Engineering Student
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            I am passionate about web development, covering both Backend and Frontend aspects, 
            as well as deeply interested in cybersecurity and system security. My journey has been 
            shaped through various academic projects and continuous self-learning, driving me to build 
            secure, efficient, and scalable digital solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Custom Primary Button Implementation */}
            <motion.button 
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-600"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects <FiArrowRight />
            </motion.button>
            
            {/* Custom Outline Button Implementation */}
            <motion.a 
              href="https://drive.google.com/uc?export=download&id=1mRAYhuL-pywJjBrA6D3SJHGt8XSKoG0-" 
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download CV <FiDownload />
            </motion.a>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <a href="mailto:syahrulromadhonmuhammad@gmail.com" className="text-gray-600 hover:text-blue-500 transition-colors">
              syahrulromadhonmuhammad@gmail.com
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://www.linkedin.com/in/m-syahrul-romadhon-73238128a/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
              LinkedIn
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://github.com/syahrulcaem" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;