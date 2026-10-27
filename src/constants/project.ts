
import { Project } from '../components/home/ProjectCard';

type ProjectWithImage = Project & {
  image: string;
};

export const projects: ProjectWithImage[] = [
  {
    id: "asave",
    title: "ASave - Budget App",
    description:
      "A budgeting application that helps users track expenses, manage savings, visualize financial data, and achieve financial goals.",
    image: "/images/projects/asave.png",
    link: "https://www.asave.my.id/",
    tags: [
      "React Native",
      "Mobile App",
      "Financial",
      "Expense Tracking",
      "Data Visualization",
    ],
  },
  {
    id: "selin-backend",
    title: "Polines Attendance System (SELIN)",
    description:
      "A student attendance system for Politeknik Negeri Semarang featuring face recognition technology to help prevent attendance fraud.",
    image: "/images/projects/selin.jpeg",
    link: "https://github.com/syahrulcaem/selin-backend",
    tags: [
      "Laravel",
      "MySQL",
      "Flutter",
      "Face Recognition",
      "Mobile App",
    ],
  },
  {
    id: "aplikasi-ujian-online",
    title: "Online Exam Monitoring System",
    description:
      "An online examination platform designed to support exam integrity through monitoring and suspicious behavior detection.",
    image: "/images/projects/monitoring.png",
    link: "https://github.com/syahrulcaem/aplikasi-ujian-online",
    tags: [
      "Laravel",
      "React",
      "TypeScript",
      "MySQL",
      "REST API",
    ],
  },
  {
    id: "ignitor",
    title: "Ignitor - Code Editor",
    description:
      "A lightweight browser-based code editor featuring syntax highlighting, code completion, and live preview for web development.",
    image: "/images/projects/ignitor.jpeg",
    link: "https://ignitor.codewithwan.tech/",
    tags: [
      "JavaScript",
      "CodeMirror",
      "Monaco Editor",
      "PWA",
      "Browser API",
    ],
  },
  {
    id: "hajifund",
    title: "HajiFund - Saving Platform",
    description:
      "A savings platform for Hajj and Umrah planning, featuring financial goal tracking and pilgrimage savings management.",
    image: "/images/projects/hajifund.png",
    link: "https://github.com/syahrulcaem/hajifund",
    tags: [
      "Next.js",
      "MongoDB",
      "Tailwind CSS",
      "Payment Gateway",
      "Authentication",
    ],
  },
  {
    id: "anon-chat",
    title: "Anon Chat",
    description:
      "An anonymous messaging platform designed to support private conversations with real-time messaging and privacy-focused features.",
    image: "/images/projects/anon.png",
    link: "https://anon-chat-ten.vercel.app/",
    tags: [
      "Next.js",
      "Firebase",
      "Encryption",
      "Real-time",
      "Authentication",
    ],
  },
  {
    id: "libas",
    title: "LIBAS - Public Reporting Application",
    description:
      "Developed and maintained a public reporting application under the supervision of Polrestabes Semarang, including application maintenance, bug fixes, and technical issue resolution.",
    image: "/images/projects/libas.png",
    link: "",
    tags: [
      "Laravel",
      "PostgreSQL",
      "Web Application",
      "Application Maintenance",
    ],
  },
  {
    id: "fomi",
    title: "FOMI - QR Ownership Identification System",
    description:
      "A QR code-based ownership identification system with product management, structured data management, and subscription-based services.",
    image: "/images/projects/fomi.png",
    link: "",
    tags: [
      "Laravel",
      "QR Code",
      "Database Management",
      "Subscription System",
    ],
  },
  {
    id: "gbm-bangun-renovasi",
    title: "GBM Bangun dan Renovasi",
    description:
      "A company profile website built with Next.js to showcase company information, construction and renovation services, and business offerings.",
    image: "/images/projects/gbm.png",
    link: "https://gbmbangundanrenovasi.com/",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Responsive Web Design",
      "Company Profile",
    ],
  },
  {
    id: "phri",
    title: "PHRI - Web Systems Development",
    description:
      "Developed backend systems for PHRI, covering the organization company profile website, career website, and SKKA hotel assessment system.",
    image: "/images/projects/phri.png",
    link: "",
    tags: [
      "Backend Development",
      "PHP",
      "MySQL",
      "REST API",
      "Web Application",
    ],
  },
  {
    id: "erp-asaba",
    title: "ASABA - Enterprise Resource Planning",
    description:
      "Developed the backend of an ERP system for ASABA to support business operations, data processing, and integration between system features.",
    image: "/images/projects/asaba.png",
    link: "",
    tags: [
      "Backend Development",
      "Laravel",
      "PostgreSQL",
      "ERP",
      "Database Management",
    ],
  },
  {
    id: "savepoint",
    title: "SavePoint - Emergency Response System",
    description:
      "A mobile and web application integrated with IoT technology to connect users with nearby emergency responders during emergency situations.",
    image: "/images/projects/savepoint.png",
    link: "",
    tags: [
      "Mobile App",
      "Web Application",
      "IoT",
      "Emergency Response",
    ],
  },
];

export default projects;
