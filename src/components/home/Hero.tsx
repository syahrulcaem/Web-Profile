import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiDownload, FiArrowRight } from 'react-icons/fi';
import { heroContent } from '../../constants/content';
import { useLanguage } from '../../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section 
      id="home"
      className="min-h-screen flex items-center bg-gray-50 py-20"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            {t.hero.greeting} <br className="sm:hidden" />
            <span className="text-blue-500 block sm:inline">{heroContent.name}</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
            {t.hero.title}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-600"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.viewProjects} <FiArrowRight />
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
                {t.hero.downloadCv} <FiDownload />
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

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto hidden w-full max-w-md lg:block"
          >
            <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-blue-100" />
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-blue-50" />
            <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-gray-900 p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <FiCode className="text-blue-400" size={22} />
              </div>
              <div className="space-y-4 font-mono text-sm">
                <p className="text-gray-500">// building digital solutions</p>
                <p>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-300">developer</span>{' '}
                  <span className="text-white">=</span>{' '}
                  <span className="text-green-300">'Syahrul'</span>
                </p>
                <p className="text-gray-400">
                  <span className="text-purple-400">return</span> reliableApps
                </p>
                <div className="h-px bg-gray-700" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-gray-800 p-3">
                    <p className="mb-2 font-mono text-lg text-blue-400">&lt;/&gt;</p>
                    <p className="font-sans text-xs text-gray-300">Full Stack</p>
                  </div>
                  <div className="rounded-xl bg-gray-800 p-3">
                    <span className="mb-2 block h-2 w-2 rounded-full bg-green-400" />
                    <p className="font-sans text-xs text-gray-300">Clean Code</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-blue-500/15 p-4">
                <p className="text-sm font-semibold text-blue-200">{t.hero.available}</p>
                <p className="mt-1 text-xs text-gray-400">{t.hero.availabilityDescription}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
