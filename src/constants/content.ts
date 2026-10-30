import type { IconType } from 'react-icons';
import {
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaLaravel,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa';
import { SiJavascript, SiNextdotjs, SiTypescript } from 'react-icons/si';

export const heroContent = {
  name: 'Syahrul',
  title: 'Full Stack Developer',
  description:
    'I build reliable web and mobile applications with a focus on useful experiences, maintainable code, and thoughtful design.',
  cvLink: '/CV/Cv.pdf',
  email: 'syahrulromadhonmuhammad@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/m-syahrul-romadhon-73238128a/',
  githubUrl: 'https://github.com/syahrulcaem',
};

export const aboutContent = {
  subtitle: 'Building digital products that solve real problems',
  paragraphs: [
    'I am a full stack developer who enjoys turning ideas into practical and accessible digital products.',
    'My experience spans frontend, backend, mobile applications, and system integrations. I value clear communication, simple architecture, and continuous improvement.',
  ],
  image: '/images/syahrul1.jpeg',
  expertise: ['Web Development', 'Mobile Development', 'Backend Systems', 'UI Implementation'],
};

export interface SkillCategory {
  id: string;
  title: string;
  skills: {
    id: string;
    name: string;
    icon: IconType;
    color: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { id: 'react', name: 'React', icon: FaReact, color: '#61DAFB' },
      { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#111827' },
      { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { id: 'html', name: 'HTML', icon: FaHtml5, color: '#E34F26' },
      { id: 'css', name: 'CSS', icon: FaCss3Alt, color: '#1572B6' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Tools',
    skills: [
      { id: 'laravel', name: 'Laravel', icon: FaLaravel, color: '#FF2D20' },
      { id: 'nodejs', name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { id: 'database', name: 'Databases', icon: FaDatabase, color: '#336791' },
      { id: 'git', name: 'Git', icon: FaGitAlt, color: '#F05032' },
    ],
  },
];
