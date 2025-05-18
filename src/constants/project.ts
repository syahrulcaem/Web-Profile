import type { Project } from '../components/home/ProjectCard';

export const projects: Project[] = [
  {
    id: "selin-backend",
    title: "Polines Attendance System (SELIN)",
    description: "A mobile application for face recognition-based attendance at Semarang State Polytechnic. Built with Laravel for the backend and Flutter for the mobile app, this system enhances security and efficiency of student attendance processes.",
    image: "/images/projects/selin.jpeg",
    link: "https://github.com/syahrulcaem/selin-backend",
    tags: ["Laravel", "MySQL", "Flutter", "Face Recognition", "Mobile App"]
  },
  {
    id: "aplikasi-ujian-online",
    title: "Online Exam Monitoring System",
    description: "An online examination platform with integrated monitoring features. This application makes it easier for exam organizers to monitor the examination process in real-time, manage question banks, and analyze exam results.",
    image: "/images/projects/monitoring.png",
    link: "https://github.com/syahrulcaem/aplikasi-ujian-online",
    tags: ["Laravel", "React", "TypeScript", "MySQL", "REST API"]
  },
  {
    id: "ignitor-electron",
    title: "IGNITOR - Educational Game Launcher",
    description: "A modern desktop application for managing and playing educational games. IGNITOR provides an elegant and user-friendly interface, designed to facilitate access to various educational games.",
    image: "/images/projects/ignitor.jpeg",
    link: "https://github.com/codewithwan/ignitor-electron",
    tags: ["Electron", "React", "JavaScript", "Desktop App", "Education"]
  },
  {
    id: "hajifund",
    title: "HajiFund - Hajj Alumni Mobile App",
    description: "A mobile application for the Hajj pilgrimage alumni community that facilitates fund management, communication between members, and activity management. Built with Laravel for the backend and Flutter for the mobile application.",
    image: "/images/projects/hajifund.png",
    link: "https://github.com/syahrulcaem/hajifund",
    tags: ["Laravel", "Flutter", "MySQL", "Mobile App", "Community Platform"]
  }
];

export default projects;