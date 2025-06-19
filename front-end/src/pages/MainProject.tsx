import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

function MainProject() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: ''
  });

  // Images pour les carrousels
  const heroImages = [
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop", // Bâtiment résidentiel moderne
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", // Architecture française traditionnelle
    "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop"  // Résidence moderne
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop", // Appartement moderne
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&h=300&fit=crop", // Cuisine moderne
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", // Salon lumineux
    "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=400&h=300&fit=crop", // Chambre moderne
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop", // Salle de bain
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop", // Balcon avec vue
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop", // Façade moderne
    "https://images.unsplash.com/photo-1520637836862-4d197d17c66a?w=400&h=300&fit=crop"  // Espace commun
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Carrousel automatique pour l'image principale
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Carrousel automatique pour la galerie
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % (galleryImages.length - 3));
    }, 3000);
    return () => clearInterval(interval);
  }, [galleryImages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ici vous pourrez ajouter la logique d'envoi
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundColor: 'white' }}>
    
      <div className="backdrop-blur-md bg-white/10 min-h-screen w-full px-6 sm:px-12 py-12">
        {/* Section Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Projet Jonzac</h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Découvrez cette opportunité d'investissement exceptionnelle au cœur de Jonzac, 
            ville thermale unique avec ses thermes troglodytiques, classée Station verte et fleurie.
          </p>
        </motion.div>

        {/* Présentation du Projet */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 px-4"
        >
          <h2 className="text-3xl font-bold text-black mb-6">Présentation du Projet</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Situé en plein centre-ville de Jonzac, ce programme immobilier neuf offre 
                un cadre de vie exceptionnel à proximité des thermes troglodytiques uniques 
                et des commodités de cette Station verte et fleurie.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Avec ses 24 appartements du T2 au T4, ce projet s'adresse aux investisseurs 
                recherchant une rentabilité optimale dans une ville thermale en pleine expansion, 
                accueillant plus de 11 000 curistes par an.
              </p>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <img 
                src={heroImages[currentHeroImage]} 
                alt={`Vue du projet - ${currentHeroImage + 1}`}
                className="h-full w-full object-cover transition-opacity duration-1000"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentHeroImage ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caractéristiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
          {[
            { titre: 'Localisation', description: 'Centre-ville de Jonzac, proche des thermes troglodytiques uniques' },
            { titre: 'Types de biens', description: '24 appartements neufs du T2 au T4 avec finitions haut de gamme' },
            { titre: 'Rentabilité', description: 'Rendement locatif estimé à 6-8% grâce au thermalisme' }
          ].map((item, index) => (
            <motion.div
              key={item.titre}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black p-8 rounded-lg text-white shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">{item.titre}</h3>
              <p className="text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Galerie Visuels avec Carrousel */}
        <div className="mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-6">Visuels du Projet</h2>
          <div className="relative overflow-hidden rounded-lg">
            <motion.div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentGalleryIndex * 33.333}%)` }}
            >
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                  className="flex-shrink-0 w-1/3 px-2"
                >
                  <img 
                    src={image}
                    alt={`Intérieur ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: galleryImages.length - 2 }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentGalleryIndex ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Planning */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-16 px-4"
        >
          <h2 className="text-3xl font-bold text-black mb-6">Planning du Projet</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              {[
                { phase: 'Obtention du permis de construire', date: 'Mars 2025', statut: 'Terminé' },
                { phase: 'Début des travaux', date: 'Juin 2025', statut: 'En cours' },
                { phase: 'Gros œuvre', date: 'Septembre 2025', statut: 'À venir' },
                { phase: 'Second œuvre', date: 'Février 2026', statut: 'À venir' },
                { phase: 'Livraison', date: 'Juin 2026', statut: 'À venir' }
              ].map((etape, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{etape.phase}</h4>
                    <p className="text-gray-600">{etape.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    etape.statut === 'Terminé' ? 'bg-green-100 text-green-800' :
                    etape.statut === 'En cours' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {etape.statut}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Formulaire de Contact Spécifique */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.7 }}
          className="px-4"
        >
          <h2 className="text-3xl font-bold text-black mb-6">Intéressé par le Projet Jonzac ?</h2>
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Précisez votre profil d'investisseur, vos attentes, le type de bien recherché..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-semibold"
              >
                Demander des Informations
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Un conseiller vous recontactera sous 24h pour vous présenter en détail 
              les opportunités du projet Jonzac.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MainProject;