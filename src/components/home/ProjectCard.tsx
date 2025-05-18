import React from 'react';
import { motion } from 'framer-motion';


export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, description, image, link, tags } = project;

  return (
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
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x300";
              e.currentTarget.alt = "Project image placeholder";
            }}
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
        
        {/* Use custom button implementation if Button component still has issues */}
        <motion.button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
        >
          View Project
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;