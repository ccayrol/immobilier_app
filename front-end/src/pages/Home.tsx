import React from 'react';
import backgroundImage from '../assets/bureauVide.jpg';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

function Home() {
  return (
    <div>
      <section className="relative min-h-[90vh] flex items-center">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{ opacity: 0, y: 50}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/70" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-full py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <motion.div
              className="text-white max-w-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}  
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Votre Expert Immobilier à Bordeaux
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Découvrez notre sélection de biens d'exception et bénéficiez de notre expertise pour tous vos projets immobiliers.
              </p>
              <Link
                to="/newprojects"
                className="inline-flex items-center bg-black text-white px-6 py-3 rounded-md text-lg font-medium transition-transform duration-300 hover:scale-105"
              >
                Découvrir nos projets
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div
              className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}  
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Nous Contacter</h2>
              <div className="space-y-4">
                <div className="flex items-start text-gray-700">
                  <MapPin className="h-5 w-5 mr-3 text-black flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base">54 rue de Seguey, 33000 Bordeaux</p>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="h-5 w-5 mr-3 text-black flex-shrink-0" />
                  <a href="tel:+33556000000" className="hover:text-black text-sm md:text-base">+33 5 56 00 00 00</a>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mail className="h-5 w-5 mr-3 text-black flex-shrink-0" />
                  <a href="mailto:contact@partenaire-investissement.fr" className="hover:text-black text-sm md:text-base break-words">
                    contact@partenaire-investissement.fr
                  </a>
                </div>
                <div className="pt-4">
                  <Link to="/sendmail">
                    <button className="w-full bg-black text-white px-6 py-3 rounded-md text-base md:text-lg font-medium transition-transform duration-300 hover:scale-105">
                      Prendre rendez-vous
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}  
        >
          Nos Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            className="bg-gray-50 p-6 md:p-8 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}  
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4">Vente Immobilière</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Des biens d'exception sélectionnés avec soin dans les quartiers les plus prisés de Bordeaux.
            </p>
            <a
              href="https://www.leboncoin.fr/boutique/3228512/partenaire_investissement.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium transition-transform duration-300 hover:scale-105 inline-flex items-center"
            >
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>

          <motion.div
            className="bg-gray-50 p-6 md:p-8 rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}  
          >
            <h3 className="text-lg md:text-xl font-semibold mb-4">Location</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Un accompagnement personnalisé pour trouver le bien qui correspond à vos attentes.
            </p>
            <a
              href="https://www.leboncoin.fr/boutique/3228512/partenaire_investissement.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium transition-transform duration-300 hover:scale-105 inline-flex items-center"
            >
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;