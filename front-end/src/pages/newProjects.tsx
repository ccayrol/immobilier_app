import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Home, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import des images depuis le dossier assets
import coliving1 from '../assets/coliving3.png';
import coliving2 from '../assets/coliving2.png';
import coliving3 from '../assets/coliving1.png';
import coliving4 from '../assets/coliving4.png';
import renovation1 from '../assets/renov3.jpg';
import renovation2 from '../assets/renov4.jpg';
import renovation3 from '../assets/renov1.jpg';
import renovation4 from '../assets/renov2.jpg';

function RecentProjects() {
  const [currentSlides, setCurrentSlides] = useState<{ [key: number]: number }>({ 1: 0, 2: 0 });
  const navigate = useNavigate();

  // Images pour le carrousel
  const coLivingImages = [
    coliving1,
    coliving2,
    coliving3,
    coliving4
  ];

  const renovationImages = [
    renovation1,
    renovation2,
    renovation3,
    renovation4
  ];

  const projects = [
    {
      id: 1,
      title: "Co-Living de Talence",
      subtitle: "Résidence étudiante moderne",
      description: "Situé à quelques mètres seulement de la barrière de Toulouse, cet immeuble idéalement placé bénéficie d'un cadre privilégié, proche de toutes commodités et des transports en commun. Le projet consiste en la transformation d'une maison individuelle avec garage et atelier au rez-de-chaussée, et logement principal à l'étage, en une colocation de standing comprenant 11 studios entièrement équipés et meublés, ainsi qu'un séjour commun convivial et fonctionnel. D'un espace délaissé et dans son jus, en ressort un projet moderne, en phase avec son temps. ",
      images: coLivingImages,
      details: {
        superficie: "233,85 m²",
        logements: "11 studios",
        livraison: "Mars 2024",
        localisation: "4 rue d'Alsace, 33400 Talence"
      },
      features: ["Espaces communs", "Coworking", "Terrasse"]
    },
    {
      id: 2,
      title: "Immeuble Rénové Chartrons",
      subtitle: "Rénovation complète d'un immeuble historique",
      description: "Transformation complète d'un immeuble du 19ème siècle en 8 appartements de standing, alliant charme de l'ancien et confort moderne au cœur du quartier des Chartrons.",
      images: renovationImages,
      details: {
        superficie: "420 m²",
        logements: "8 appartements",
        livraison: "Janvier 2024",
        localisation: "Bordeaux Chartrons"
      },
      features: ["Matériaux nobles", "Isolation thermique", "Ascenseur", "Parkings"]
    }
  ];

  const nextSlide = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project && project.images.length > 0) {
      setCurrentSlides(prev => ({
        ...prev,
        [projectId]: (prev[projectId] + 1) % project.images.length
      }));
    }
  };

  const prevSlide = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    if (project && project.images.length > 0) {
      setCurrentSlides(prev => ({
        ...prev,
        [projectId]: (prev[projectId] - 1 + project.images.length) % project.images.length
      }));
    }
  };

  const goToSlide = (projectId: number, slideIndex: number) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: slideIndex
    }));
  };

  const handleContactClick = () => {
    navigate('/sendmail');
  };

  // Suppression du useEffect pour le défilement automatique

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundColor: 'white' }}
    >
      <div className="backdrop-blur-md bg-white/10 min-h-screen w-full px-6 sm:px-12 py-12">
        {/* Section Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">Nos Réalisations Récentes</h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Découvrez nos derniers projets immobiliers, témoins de notre expertise et de notre engagement envers l'excellence.
          </p>
        </motion.div>

        {/* Projets */}
        <div className="space-y-20">
          {projects.map((project, projectIndex) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: projectIndex * 0.3 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${projectIndex % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Carrousel d'images ou placeholder */}
                <div className={`relative h-96 lg:h-full ${projectIndex % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  {project.images.length > 0 ? (
                    <div className="relative h-full overflow-hidden">
                      {project.images.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentSlides[project.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <img 
                            src={image} 
                            alt={`${project.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      
                      {/* Contrôles du carrousel */}
                      <button
                        onClick={() => prevSlide(project.id)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => nextSlide(project.id)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Indicateurs */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {project.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(project.id, index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === currentSlides[project.id] ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Placeholder pour les projets sans images
                    <div className="h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Home size={48} className="mx-auto mb-4" />
                        <p className="text-lg font-medium">Photos à venir</p>
                        <p className="text-sm">Images en cours de préparation</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contenu du projet */}
                <div className={`p-8 lg:p-12 ${projectIndex % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="h-full flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-black mb-2">{project.title}</h2>
                    <p className="text-xl text-gray-600 mb-6">{project.subtitle}</p>
                    <p className="text-gray-700 mb-8 leading-relaxed">{project.description}</p>

                    {/* Détails du projet */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center text-gray-600">
                        <Home className="mr-2 h-5 w-5" />
                        <span className="text-sm">{project.details.superficie}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="mr-2 h-5 w-5" />
                        <span className="text-sm">{project.details.logements}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="mr-2 h-5 w-5" />
                        <span className="text-sm">{project.details.livraison}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="mr-2 h-5 w-5" />
                        <span className="text-sm">{project.details.localisation}</span>
                      </div>
                    </div>

                    {/* Caractéristiques */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-black mb-4">Caractéristiques</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="bg-black text-white px-3 py-1 rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bouton En savoir plus */}
                    <div className="mt-auto">
                      <button
                        onClick={handleContactClick}
                        className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
                      >
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section Chiffres */}
        {/*<motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 px-4"
        >
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Nos Projets en Chiffres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { chiffre: "32", texte: "Logements créés" },
              { chiffre: "2M€", texte: "Investissement total" },
              { chiffre: "100%", texte: "Taux d'occupation" },
              { chiffre: "6", texte: "Mois de commercialisation" }
            ].map((item, index) => (
              <motion.div
                key={item.chiffre}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 bg-white shadow-lg rounded-lg"
              >
                <div className="text-4xl font-bold text-black mb-2">{item.chiffre}</div>
                <div className="text-base text-gray-600">{item.texte}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>*/}
      </div>
    </div>
  );
}

export default RecentProjects;