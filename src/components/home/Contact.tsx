import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../common/SectionTitle';
import { useLanguage } from '../../context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://www.linkedin.com/in/m-syahrul-romadhon-73238128a/',
    color: '#0A66C2'
  },
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/syahrulcaem',
    color: '#333333'
  },
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/muhsyahro27',
    color: '#E4405F'
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:syahrulromadhonmuhammad@gmail.com',
    color: '#D44638'
  }
];

const Contact: React.FC = () => {
  const { language, t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("https://formspree.io/f/xvganwed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Form submitted successfully
        setIsSubmitted(true);
        setSubmitError('');
        reset();
      } else {
        // Handle error
        const errorData = await response.json();
        setSubmitError(errorData.error || 'There was a problem submitting your form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error sending your message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <SectionTitle title={t.sections.contact} className="mb-12" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t.contact.sendMessage}</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                <h4 className="text-xl font-bold text-gray-800 mb-2">{t.contact.messageSent}</h4>
                <p className="text-gray-600 mb-6">{t.contact.thankYou}</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-500 hover:text-blue-700 font-medium"
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    {...register('name', { 
                      required: language === 'id' ? 'Nama wajib diisi' : 'Name is required',
                      minLength: { value: 2, message: language === 'id' ? 'Nama minimal 2 karakter' : 'Name must be at least 2 characters' }
                    })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
                
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    {...register('email', { 
                      required: language === 'id' ? 'Email wajib diisi' : 'Email is required',
                      pattern: { 
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: language === 'id' ? 'Alamat email tidak valid' : 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.subject}
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.subject ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Project Inquiry"
                    {...register('subject', { 
                      required: language === 'id' ? 'Subjek wajib diisi' : 'Subject is required',
                      minLength: { value: 5, message: language === 'id' ? 'Subjek minimal 5 karakter' : 'Subject must be at least 5 characters' }
                    })}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
                
                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Your message..."
                    {...register('message', { 
                      required: language === 'id' ? 'Pesan wajib diisi' : 'Message is required',
                      minLength: { value: 10, message: language === 'id' ? 'Pesan minimal 10 karakter' : 'Message must be at least 10 characters' }
                    })}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                {/* Error message */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}
                
                {/* Submit Button - Custom implementation */}
                <motion.button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-6">
                Feel free to reach out to me through the form or via any of the methods below.
                I'm always open to discussing new projects, opportunities, or partnerships.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                <a 
                  href="mailto:syahrulromadhonmuhammad@gmail.com" 
                  className="text-gray-700 hover:text-blue-500 transition-colors break-all"
                >
                  syahrulromadhonmuhammad@gmail.com
                </a>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a href="https://www.linkedin.com/in/m-syahrul-romadhon-73238128a/" className="text-gray-700 hover:text-blue-500">
                  LinkedIn
                </a>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a href="https://github.com/syahrulcaem" className="text-gray-700 hover:text-blue-500">
                  GitHub
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    whileHover={{ y: -5, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center"
                    style={{ color: social.color }}
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Office Hours</h3>
              <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;