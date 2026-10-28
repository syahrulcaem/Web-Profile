import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';

const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navLinks = [
    { name: t.nav.home, path: '#home' },
    { name: t.nav.about, path: '#about' },
    { name: t.nav.skills, path: '#skills' },
    { name: t.nav.projects, path: '#projects' },
    { name: t.nav.contact, path: '#contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if scrolled past threshold
      setScrolled(currentScrollY > 30);
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white shadow-md ${
        scrolled ? 'py-3' : 'py-4'
      }`}
      initial={{ y: 0 }}
      animate={{ 
        y: hidden ? -120 : 0, // Increased height for hiding
        opacity: hidden ? 0 : 1,
        boxShadow: scrolled ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo - Increased size */}
          <a href="#home" className="text-2xl md:text-3xl font-bold text-gray-800">
            Syahrul<span className="text-blue-500">.dev</span>
          </a>
          
          {/* Desktop Navigation - Increased size and spacing */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="text-lg text-gray-700 hover:text-blue-500 transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.path)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1 rounded-full bg-gray-100 p-1 ml-4" aria-label="Language">
            {(['en', 'id'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
                  language === option ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'
                }`}
                aria-pressed={language === option}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button - Increased size */}
          <button
            className="md:hidden text-gray-700 focus:outline-none p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="text-3xl" />
            ) : (
              <FiMenu className="text-3xl" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation - Increased text size */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg py-5 md:hidden"
            >
              <nav className="flex flex-col space-y-4 px-5">
                {navLinks.map((link) => (
                  <a
                    key={link.path}
                    href={link.path}
                    className="text-lg text-gray-700 hover:text-blue-500 transition-colors py-2 font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.path)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                      setIsOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="flex gap-1 px-5 pt-4">
                {(['en', 'id'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      language === option ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;