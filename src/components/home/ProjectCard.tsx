import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from 'react-icons/fi';
import { useLanguage } from '../../context/LanguageContext';


export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string | null;
  tags?: string[];
  images?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useLanguage();
  const { title, description, image, link, tags } = project;
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const gallery = project.images && project.images.length >= 3
    ? project.images
    : [image, image, image];

  React.useEffect(() => {
    if (!isDetailsOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDetailsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDetailsOpen]);

  const showPreviousImage = () => {
    setSelectedImage((current) => (current - 1 + gallery.length) % gallery.length);
  };

  const showNextImage = () => {
    setSelectedImage((current) => (current + 1) % gallery.length);
  };

  return (
    <>
      <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={image}
            alt={`${title} project`}
            className="object-cover w-full h-full"
          />
        </motion.div>
      </div>
      
      {/* Project Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag) => (
              <span 
                key={tag} 
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <motion.button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSelectedImage(0);
            setIsDetailsOpen(true);
          }}
        >
          {t.projects.viewDetails}
        </motion.button>
      </div>
      </motion.div>

      {isDetailsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-title-${project.id}`}
          onClick={() => setIsDetailsOpen(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200"
              onClick={() => setIsDetailsOpen(false)}
              aria-label={t.projects.closeDetails}
            >
              <FiX size={20} />
            </button>

            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
              <div>
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={gallery[selectedImage]}
                    alt={`${title} screenshot ${selectedImage + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow transition-colors hover:bg-white"
                    onClick={showPreviousImage}
                    aria-label={t.projects.previousImage}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-700 shadow transition-colors hover:bg-white"
                    onClick={showNextImage}
                    aria-label={t.projects.nextImage}
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {gallery.map((galleryImage, index) => (
                    <button
                      type="button"
                      key={`${galleryImage}-${index}`}
                      className={`aspect-video overflow-hidden rounded-lg border-2 ${
                        selectedImage === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                      aria-label={`${t.projects.selectImage} ${index + 1}`}
                    >
                      <img
                        src={galleryImage}
                        alt={`${title} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-500">
                  {t.projects.details}
                </p>
                <h2 id={`project-title-${project.id}`} className="mb-4 pr-8 text-2xl font-bold text-gray-900">
                  {title}
                </h2>
                <p className="mb-5 text-gray-600">{description}</p>
                {tags && tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    {t.projects.viewProject}
                    <FiExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;