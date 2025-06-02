import { Project } from '../components/home/ProjectCard';

export const projects: Project[] = [

  {
    id: "asave",
    title: "ASave - Budget App",
    description: "Brutal budgeting app that helps users track expenses, save money, and achieve financial goals. Features expense tracking, visualization, and financial goal setting.",
    image: "/images/projects/asave.png", // Pastikan gambar sudah disimpan di folder ini
    link: "https://www.asave.my.id/",
    tags: ["React Native", "Mobile App", "Financial", "Expense Tracking", "Data Visualization"]
  },
  {
    id: "selin-backend",
    title: "Polines Attendance System (SELIN)",
    description: "A mobile application for Politeknik Negeri Semarang's student attendance system with face recognition technology to prevent attendance fraud.",
    image: "/images/projects/selin.jpeg",
    link: "https://github.com/syahrulcaem/selin-backend",
    tags: ["Laravel", "MySQL", "Flutter", "Face Recognition", "Mobile App"]
  },
  {
    id: "aplikasi-ujian-online",
    title: "Online Exam Monitoring System",
    description: "An online examination platform developed to prevent cheating during remote exams, featuring real-time monitoring and automated suspicious behavior detection.",
    image: "/images/projects/monitoring.png",
    link: "https://github.com/syahrulcaem/aplikasi-ujian-online",
    tags: ["Laravel", "React", "TypeScript", "MySQL", "REST API"]
  },
  {
    id: "ignitor",
    title: "Ignitor - Code Editor",
    description: "A lightweight, browser-based code editor with syntax highlighting, auto-completion, and live preview features designed specifically for web development.",
    image: "/images/projects/ignitor.jpeg",
    link: "https://ignitor.codewithwan.tech/",
    tags: ["JavaScript", "CodeMirror", "Monaco Editor", "PWA", "Browser API"]
  },
  {
    id: "hajifund",
    title: "HajiFund - Saving Platform",
    description: "Financial platform designed to help Muslims save for their Hajj or Umrah pilgrimage, offering Sharia-compliant investment options and goal tracking.",
    image: "/images/projects/hajifund.png",
    link: "https://github.com/syahrulcaem/hajifund",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Payment Gateway", "Authentication"]
  },{
    id: "anon-chat",
    title: "Anon Chat",
    description: "Secure anonymous messaging platform with encrypted communication channels. Built with end-to-end encryption and zero chat history for maximum privacy and security.",
    image: "/images/projects/anon.png", // Pastikan gambar sudah disimpan di folder ini
    link: "https://anon-chat-ten.vercel.app/",
    tags: ["Next.js", "Firebase", "Encryption", "Real-time", "Authentication"]
  }
];

export default projects;