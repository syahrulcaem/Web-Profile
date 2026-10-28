import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import Button from './Button';
import { useLanguage } from '../../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="py-6 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} M SYAHRUL ROMADHON. {t.footer.rights}
          </p>
          <p className="text-gray-500 text-xs mt-1">
            {t.footer.builtWith}
          </p>
          
          <div className="mt-4">
            <Button 
              variant="primary"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs py-1"
            >
              <FiArrowUp /> {t.footer.backToTop}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;