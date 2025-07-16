import React, { useState } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Mail, Phone, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import bureau1 from "../assets/bureau1.jpg";
import bureau2 from "../assets/bureau2.jpg";
import bureau3 from "../assets/bureau3.jpg";
import bureau4 from "../assets/bureau4.jpg";

function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const navigate = useNavigate();

  const bureauImages = [bureau1, bureau2, bureau3, bureau4];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bureauImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bureauImages.length) % bureauImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleContactClick = () => {
    navigate('/sendmail');
  };

  const agencyAddress = "54 rue de Seguey, 33000 Bordeaux";
  const agencyEmail = "contact@partenaireinvestissement.com";
  const agencyPhone = "05 24 60 24 60";
  const encodedAddress = encodeURIComponent(agencyAddress);
  const googleMapsUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const openingHours = [
    { day: "lundi", hours: "09:00–17:00" },
    { day: "mardi", hours: "09:00–17:00" },
    { day: "mercredi", hours: "09:00–17:00" },
    { day: "jeudi", hours: "09:00–17:00" },
    { day: "vendredi", hours: "09:00–17:00" },
    { day: "samedi", hours: "Fermé" },
    { day: "dimanche", hours: "Fermé" }
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="px-6 sm:px-12 py-12">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">À Propos de Partenaire Investissement</h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Partenaire Investissement, fort de 30 ans d'expérience à Bordeaux, offre des solutions de vente et de location sur mesure aux investisseurs particuliers et professionnels.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-6">Notre Histoire</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Fondée en 2000 par Eric Soubeste, notre agence s'est construite sur des valeurs fortes : l'excellence, la confiance et la proximité avec nos clients. Grâce à notre expertise, nous sélectionnons les meilleures opportunités immobilières à Bordeaux.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
          {['Excellence', 'Expertise', 'Engagement'].map((valeur, index) => (
            <motion.div key={valeur} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="bg-black p-8 rounded-lg text-white shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{valeur}</h3>
              <p className="text-base">
                {valeur === 'Excellence' && "Nous sélectionnons les meilleures propriétés pour nos clients."}
                {valeur === 'Expertise' && "Notre connaissance approfondie du marché nous distingue."}
                {valeur === 'Engagement' && "Nous accompagnons nos clients tout au long de leur projet."}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-6">Nos Chiffres Clés</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[{ chiffre: "20+", texte: "Années d'expérience" }, { chiffre: "500+", texte: "Transactions réalisées" }, { chiffre: "98%", texte: "Clients satisfaits" }, { chiffre: "4", texte: "Agences en Gironde" }].map((item, index) => (
              <motion.div key={item.chiffre} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }} className="p-6 bg-white shadow-lg rounded-lg">
                <div className="text-4xl font-bold text-black mb-2">{item.chiffre}</div>
                <div className="text-base text-gray-600">{item.texte}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-6 text-center">Nos Bureaux</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 overflow-hidden">
              {bureauImages.map((image, index) => (
                <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={image} alt={`Bureau - Image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bureauImages.map((_, index) => (
                  <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>

            {/* Infos & Carte */}
            <div className="p-8 bg-gray-50 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-semibold flex items-center text-black mb-2">
                      <MapPin className="mr-2 h-5 w-5 text-gray-700" /> Adresse
                    </h3>
                    <p className="text-gray-700 text-lg">{agencyAddress}</p>
                    <p className="text-gray-500 mt-2">Située au cœur de Bordeaux, accessible facilement en transport en commun.</p>
                    <button onClick={() => window.open(`https://www.google.com/maps/dir//${encodedAddress}`, '_blank')} className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                      Voir l'itinéraire
                    </button>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold flex items-center text-black mb-2">
                      <Mail className="mr-2 h-5 w-5 text-gray-700" /> Contact
                    </h3>
                    <p className="text-gray-700 text-lg">{agencyEmail}</p>
                    <p className="text-gray-700 text-lg mt-1">{agencyPhone}</p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold flex items-center text-black mb-2">
                      <Clock className="mr-2 h-5 w-5 text-gray-700" /> Horaires d'ouverture
                    </h3>
                    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                      {openingHours.map((item, index) => (
                        <li key={index} className="flex justify-between items-center px-4 py-2 bg-white hover:bg-gray-50 transition">
                          <span className="font-medium capitalize text-gray-800">{item.day}</span>
                          <span className="text-gray-600">{item.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`relative w-full h-96 rounded-xl overflow-hidden border border-gray-200 shadow`}>
                  <iframe title="Localisation de l'agence" width="100%" height="100%" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} src={googleMapsUrl} className="w-full h-full cursor-pointer" onClick={() => setIsMapExpanded(!isMapExpanded)} allowFullScreen></iframe>
                  {isMapExpanded && (
                    <div className="fixed inset-0 z-50 bg-white p-4 flex flex-col">
                      <button onClick={() => setIsMapExpanded(false)} className="self-end bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors mb-4">
                        <X size={24} />
                      </button>
                      <iframe title="Carte interactive" width="100%" height="100%" frameBorder="0" src={googleMapsUrl} className="rounded-xl border border-gray-300 flex-grow" allowFullScreen></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center px-4">
          <div className="bg-black rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Envie de nous contacter ?</h2>
            <p className="text-lg mb-6 text-gray-300">
              Nous serions ravis de discuter de votre projet immobilier avec vous.
            </p>
            <button onClick={handleContactClick} className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <Mail className="mr-2 h-5 w-5" /> Nous contacter
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
