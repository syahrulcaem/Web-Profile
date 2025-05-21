import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Skills', path: '#skills' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo - Increased size */}
          <a href="#home" className="text-2xl md:text-3xl font-bold text-gray-800">
            Syahrul<span className="text-blue-500">.dev</span>
          </a>
          
          {/* Desktop Navigation - Increased size and spacing */}
          <nav className="hidden md:flex items-center space-x-10">
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
          
          {/* Mobile Menu Button - Increased size */}
          <button
            className="md:hidden text-gray-700 focus:outline-none p-2" // Added padding
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX className="text-3xl" /> // Increased icon size
            ) : (
              <FiMenu className="text-3xl" /> // Increased icon size
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;