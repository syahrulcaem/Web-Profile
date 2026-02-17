import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiFolder, FiTool, FiEdit } from 'react-icons/fi';
import { getProjects, getSkillCategories } from '../../lib/supabase';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    skillCategories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [projects, skillCategories] = await Promise.all([
        getProjects(true),
        getSkillCategories(),
      ]);

      const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

      setStats({
        projects: projects.length,
        skills: totalSkills,
        skillCategories: skillCategories.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Hero Section',
      description: 'Manage your hero content',
      icon: FiUser,
      link: '/admin/hero',
      color: 'bg-blue-500',
    },
    {
      title: 'About Section',
      description: 'Update your about information',
      icon: FiUser,
      link: '/admin/about',
      color: 'bg-green-500',
    },
    {
      title: 'Projects',
      description: `${stats.projects} projects`,
      icon: FiFolder,
      link: '/admin/projects',
      color: 'bg-purple-500',
    },
    {
      title: 'Skills',
      description: `${stats.skills} skills in ${stats.skillCategories} categories`,
      icon: FiTool,
      link: '/admin/skills',
      color: 'bg-orange-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your portfolio content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.link}
              to={card.link}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 group"
            >
              <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{card.description}</p>
              <div className="flex items-center text-blue-500 text-sm font-medium">
                <span>Manage</span>
                <FiEdit className="ml-2" size={16} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/projects"
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <FiFolder className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm font-medium text-gray-700">Add New Project</p>
          </Link>
          <Link
            to="/admin/skills"
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <FiTool className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm font-medium text-gray-700">Add New Skill</p>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
          >
            <FiEdit className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm font-medium text-gray-700">Preview Site</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
