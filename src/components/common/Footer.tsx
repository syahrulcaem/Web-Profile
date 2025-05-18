import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import Button from './Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="py-6 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} M SYAHRUL ROMADHON. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Built with React & Tailwind CSS
          </p>
          
          <div className="mt-4">
            <Button 
              variant="primary" // Ubah variant menjadi primary untuk melihat perubahan
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs py-1"
            >
              <FiArrowUp /> Back to top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;