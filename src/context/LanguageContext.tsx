/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'id';

type TranslationSet = {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    title: string;
    description: string;
    viewProjects: string;
    downloadCv: string;
  };
  sections: {
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  about: {
    subtitle: string;
    paragraphs: string[];
    expertise: string;
    contactMe: string;
  };
  projects: {
    all: string;
    noProjects: string;
    viewAll: string;
    viewProject: string;
  };
  contact: {
    sendMessage: string;
    messageSent: string;
    thankYou: string;
    sendAnother: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
  };
  footer: {
    rights: string;
    builtWith: string;
    backToTop: string;
  };
};

const translations: Record<Language, TranslationSet> = {
  en: {
    nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
    hero: {
      greeting: "Hello, I'm",
      title: 'Full Stack Developer',
      description: 'I build reliable web and mobile applications with a focus on useful experiences, maintainable code, and thoughtful design.',
      viewProjects: 'View Projects',
      downloadCv: 'Download CV',
    },
    sections: { about: 'About Me', skills: 'My Skills', projects: 'My Projects', contact: 'Get In Touch' },
    about: {
      subtitle: 'Building digital products that solve real problems',
      paragraphs: [
        'I am a full stack developer who enjoys turning ideas into practical and accessible digital products.',
        'My experience spans frontend, backend, mobile applications, and system integrations. I value clear communication, simple architecture, and continuous improvement.',
      ],
      expertise: 'Expertise in:',
      contactMe: 'Contact Me',
    },
    projects: { all: 'All', noProjects: 'No projects found', viewAll: 'View All Projects', viewProject: 'View Project' },
    contact: {
      sendMessage: 'Send Me a Message',
      messageSent: 'Message Sent!',
      thankYou: "Thank you for reaching out. I'll get back to you as soon as possible.",
      sendAnother: 'Send another message',
      name: 'Your Name',
      email: 'Your Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      sending: 'Sending...',
    },
    footer: { rights: 'All rights reserved.', builtWith: 'Built with React & Tailwind CSS', backToTop: 'Back to top' },
  },
  id: {
    nav: { home: 'Beranda', about: 'Tentang', skills: 'Keahlian', projects: 'Proyek', contact: 'Kontak' },
    hero: {
      greeting: 'Halo, saya',
      title: 'Pengembang Full Stack',
      description: 'Saya membangun aplikasi web dan mobile yang andal dengan fokus pada pengalaman yang bermanfaat, kode yang mudah dirawat, dan desain yang matang.',
      viewProjects: 'Lihat Proyek',
      downloadCv: 'Unduh CV',
    },
    sections: { about: 'Tentang Saya', skills: 'Keahlian Saya', projects: 'Proyek Saya', contact: 'Hubungi Saya' },
    about: {
      subtitle: 'Membangun produk digital yang menyelesaikan masalah nyata',
      paragraphs: [
        'Saya adalah pengembang full stack yang senang mengubah ide menjadi produk digital yang praktis dan mudah diakses.',
        'Pengalaman saya mencakup frontend, backend, aplikasi mobile, dan integrasi sistem. Saya mengutamakan komunikasi yang jelas, arsitektur sederhana, dan perbaikan berkelanjutan.',
      ],
      expertise: 'Keahlian:',
      contactMe: 'Hubungi Saya',
    },
    projects: { all: 'Semua', noProjects: 'Proyek tidak ditemukan', viewAll: 'Lihat Semua Proyek', viewProject: 'Lihat Proyek' },
    contact: {
      sendMessage: 'Kirim Pesan',
      messageSent: 'Pesan Terkirim!',
      thankYou: 'Terima kasih sudah menghubungi. Saya akan membalas sesegera mungkin.',
      sendAnother: 'Kirim pesan lain',
      name: 'Nama Anda',
      email: 'Email Anda',
      subject: 'Subjek',
      message: 'Pesan',
      send: 'Kirim Pesan',
      sending: 'Mengirim...',
    },
    footer: { rights: 'Hak cipta dilindungi.', builtWith: 'Dibuat dengan React & Tailwind CSS', backToTop: 'Kembali ke atas' },
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationSet;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = window.localStorage.getItem('language');
    return saved === 'id' ? 'id' : 'en';
  });

  useEffect(() => {
    window.localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
