import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import ProjectCard from '../home/ProjectCard';
import Button from '../common/Button';
import projects from '../../constants/project';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  // Extract unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags || []))
  );
  
  // Filter projects based on selected tag
  const filteredProjects = filter 
    ? projects.filter(project => project.tags?.includes(filter))
    : projects;

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="My Projects" className="mb-12" />
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button 
            variant={filter === null ? "primary" : "default"}
            onClick={() => setFilter(null)}
          >
            All
          </Button>
          
          {allTags.map(tag => (
            <Button 
              key={tag}
              variant={filter === tag ? "primary" : "default"}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
        
        {/* "View More" Button */}
        {projects.length > 4 && (
          <div className="mt-12 text-center">
            <Button variant="outline">
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;