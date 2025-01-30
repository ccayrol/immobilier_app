import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from "framer-motion";
import Background from '../assets/bg.jpg';

const SendEmail: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    emailjs
      .sendForm(
        'service_9ya3d0a',
        'template_43ojtp6',
        e.target as HTMLFormElement,
        'QhaFSmyEDfs_O2rXg'
      )
      .then(
        (result) => {
          console.log(result.text);
          setIsSent(true);
          setIsSubmitting(false);
        },
        (error) => {
          console.log(error.text);
          setError("Erreur lors de l'envoi de l'email. Veuillez réessayer.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="relative w-full py-12">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <form
          onSubmit={sendEmail}
          className="w-full max-w-md mx-auto p-8 bg-white bg-opacity-90 rounded-xl shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">Contactez-nous</h2>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="name" className="block text-gray-700 font-medium">Nom</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Votre nom"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Votre email"
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Votre message"
              rows={4}
              required
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-black text-white font-medium rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:ring-4"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>
          </motion.div>

          {isSent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-green-600"
            >
              Email envoyé avec succès !
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-red-600"
            >
              {error}
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SendEmail;