import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import { FiUser, FiMail } from 'react-icons/fi';


const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="About Me" className="mb-12" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden aspect-square max-w-md mx-auto md:mx-0"
          >
            <img
              src="/src/assets/images/syahrul1.jpeg"
              alt="Syahrul Romadhon"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/800x300";
                e.currentTarget.alt = "Profile Photo Placeholder";
              }}
            />
          </motion.div>
          
          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Informatics Engineering Student
            </h3>
            
            <div className="space-y-4">
              <p style={{ color: '#4B5563' }}> {/* Sesuai dengan warna text-gray-600 */}
                I am an enthusiastic Informatics Engineering student with a strong passion for Web Development 
                and Cybersecurity. My academic journey has equipped me with a solid foundation in computer science 
                principles, while my personal projects have allowed me to apply these concepts in practical scenarios.
              </p>
              
              <p style={{ color: '#4B5563' }}>
                I'm particularly interested in exploring system security and understanding the intricacies of 
                secure software development. My goal is to build solutions that are not only functional and 
                user-friendly, but also resilient against modern security threats.
              </p>
              
              <p style={{ color: '#4B5563' }}>
                When I'm not coding or studying, I enjoy participating in CTF competitions, contributing to open-source 
                security tools, and staying updated with the latest developments in technology through tech blogs 
                and online communities.
              </p>
            </div>
            
            {/* Skills or additional info */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Expertise in:</h4>
              <div className="flex flex-wrap gap-2">
                {['Web Development', 'Laravel', 'Cybersecurity', 'ReactJS', 'Node.js', 'Network Security', 'System Architecture', 'Penetration Testing', 'Secure Coding'].map(skill => (
                  <span 
                    key={skill}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Action Buttons - Custom implementation without Button component */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Primary Button */}
              <motion.button
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail className="text-lg" /> Contact Me
              </motion.button>
              
              {/* Outline Button */}
              <motion.button
                className="flex items-center gap-2 bg-transparent border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiUser className="text-lg" /> View Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;