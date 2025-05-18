import type { Skill } from '../components/home/SkillItem';
import { 
  FaReact, FaAngular, FaVuejs, FaJs, FaHtml5, FaCss3Alt, 
  FaNodeJs, FaPhp, FaPython, FaDocker, FaLaravel, FaShieldAlt, 
  FaBug, FaLock, FaFlag, FaTools
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb,
  SiPostgresql, SiMysql, SiFirebase, SiCodeigniter
} from 'react-icons/si';

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      {
        id: 'react',
        name: 'React',
        icon: FaReact,
        color: '#61DAFB'
      },
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: SiNextdotjs,
        color: '#000000'
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        icon: SiTypescript,
        color: '#3178C6'
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: FaJs,
        color: '#F7DF1E'
      },
      {
        id: 'html',
        name: 'HTML5',
        icon: FaHtml5,
        color: '#E34F26'
      },
      {
        id: 'css',
        name: 'CSS3',
        icon: FaCss3Alt,
        color: '#1572B6'
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        icon: SiTailwindcss,
        color: '#06B6D4'
      },
      {
        id: 'angular',
        name: 'Angular',
        icon: FaAngular,
        color: '#DD0031'
      },
      {
        id: 'vue',
        name: 'Vue.js',
        icon: FaVuejs,
        color: '#4FC08D'
      }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      {
        id: 'laravel',
        name: 'Laravel',
        icon: FaLaravel,
        color: '#FF2D20'
      },
      {
        id: 'php',
        name: 'PHP',
        icon: FaPhp,
        color: '#777BB4'
      },
      {
        id: 'codeigniter',
        name: 'CodeIgniter',
        icon: SiCodeigniter,
        color: '#EE4623'
      },
      {
        id: 'nodejs',
        name: 'Node.js',
        icon: FaNodeJs,
        color: '#339933'
      },
      {
        id: 'python',
        name: 'Python',
        icon: FaPython,
        color: '#3776AB'
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: SiMongodb,
        color: '#47A248'
      },
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: SiPostgresql,
        color: '#336791'
      },
      {
        id: 'mysql',
        name: 'MySQL',
        icon: SiMysql,
        color: '#4479A1'
      },
      {
        id: 'firebase',
        name: 'Firebase',
        icon: SiFirebase,
        color: '#FFCA28'
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: FaDocker,
        color: '#2496ED'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    skills: [
      {
        id: 'network-security',
        name: 'Network Security',
        icon: FaShieldAlt,
        color: '#205375'
      },
      {
        id: 'penetration-testing',
        name: 'Penetration Testing',
        icon: FaBug,
        color: '#D61C4E'
      },
      {
        id: 'secure-coding',
        name: 'Secure Coding',
        icon: FaLock,
        color: '#4B5D67'
      },
      {
        id: 'ctf',
        name: 'CTF Competitions',
        icon: FaFlag,
        color: '#F0A500'
      },
      {
        id: 'security-tools',
        name: 'Security Tools',
        icon: FaTools,
        color: '#1A374D'
      }
    ]
  }
];

// Export a flattened array of all skills if needed
export const allSkills: Skill[] = skillCategories.flatMap(category => category.skills);

export default skillCategories;