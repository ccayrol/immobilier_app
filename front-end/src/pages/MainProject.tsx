import React, { useState } from 'react';
import { motion } from "framer-motion";
import { MapPin, Users, Home, Euro, TrendingUp, Building, Mail } from 'lucide-react';

// Import des images (à remplacer par vos vraies images)
import chateauExterior from '../assets/terrefort2.jpg';
import chateauInterior from '../assets/terrefort2.jpg';
import domainView from '../assets/terrefort1.jpg';
import renovationPlan from '../assets/terrefort1.jpg';

function TerrefortProject() {
  const [activeTab, setActiveTab] = useState('overview');

  const projectImages = [
    chateauExterior,
    chateauInterior,
    domainView,
    renovationPlan
  ];

  const timelineData = [
    {
      year: "2024",
      title: "Acquisition du domaine",
      description: "Achat sur fonds propres sans concours bancaire",
      status: "completed"
    },
    {
      year: "2025",
      title: "Début des travaux",
      description: "Rénovation du château et aménagement des chambres",
      status: "upcoming"
    },
    {
      year: "2026",
      title: "Ouverture chambres d'hôtes",
      description: "7 chambres + espace SPA et séminaires",
      status: "upcoming"
    },
    {
      year: "2027",
      title: "Salle de réception",
      description: "Ouverture salle mariage 200 personnes",
      status: "upcoming"
    }
  ];

  const financialData = [
    { label: "Investissement total", value: "4,5M€", icon: Euro },
    { label: "Surface totale", value: "4 500m²", icon: Building },
    { label: "Domaine", value: "70 hectares", icon: MapPin },
    { label: "CA prévisionnel", value: "700K€/an", icon: TrendingUp }
  ];

  const handleContactClick = () => {
    window.location.href = '/sendmail';
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="backdrop-blur-md bg-white/10 min-h-screen w-full px-6 sm:px-12 py-12">
        
        {/* Header avec image de fond */}
        <div className="relative h-96 mb-16 rounded-2xl overflow-hidden">
          <img 
            src={chateauExterior} 
            alt="Château de Terrefort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-white px-12"
            >
              <h1 className="text-5xl font-bold mb-4">Château de Terrefort</h1>
              <p className="text-xl mb-6">Opportunité d'investissement aux portes de Bordeaux</p>
              <div className="flex items-center text-lg">
                <MapPin className="mr-2" size={20} />
                <span>Cubzac-les-Ponts - 20km de Bordeaux</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-2 flex space-x-2">
            {[
              { id: 'overview', label: 'Vue d\'ensemble' },
              { id: 'history', label: 'Histoire' },
              { id: 'project', label: 'Le Projet' },
              { id: 'financial', label: 'Financier' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu selon l'onglet actif */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-16">
              {/* Chiffres clés */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {financialData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg text-center"
                  >
                    <item.icon className="mx-auto mb-4 text-black" size={32} />
                    <div className="text-2xl font-bold text-black mb-2">{item.value}</div>
                    <div className="text-gray-600 text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Description du lieu */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">Le Domaine</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Domaine d'environ 70 hectares situé en zone agricole, avec une transformation 
                      en cours vers l'activité hôtelière. Ensemble de 4 500 m² de planchers répartis 
                      sur 4 bâtis distincts.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <Home className="mr-3 text-black" size={16} />
                        Château de 950 m² - 21 pièces dont 14 chambres
                      </li>
                      <li className="flex items-center">
                        <Building className="mr-3 text-black" size={16} />
                        2 400 m² d'activité viticole et chais
                      </li>
                      <li className="flex items-center">
                        <Users className="mr-3 text-black" size={16} />
                        Capacité d'accueil jusqu'à 250 personnes
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <div className="aspect-w-16 aspect-h-9">
                      <img 
                        src={domainView} 
                        alt="Vue du domaine"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-black mb-2">Localisation stratégique</h3>
                      <p className="text-sm text-gray-600">
                        TER toutes les heures - 22 minutes de Bordeaux<br/>
                        Gare de Cubzac-les-Ponts à 900m du domaine
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Galerie photos */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">Galerie Photos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectImages.map((image, index) => (
                    <div key={index} className="aspect-w-16 aspect-h-10">
                      <img 
                        src={image} 
                        alt={`Château de Terrefort - Photo ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">L'Histoire du Château</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="prose max-w-none text-gray-700 leading-relaxed">
                      <p className="mb-6">
                        Le château de Terrefort est un lieu d'histoire et de patrimoine situé sur la commune 
                        de Cubzac-les-Ponts, à environ 20 kilomètres au nord de Bordeaux. Son nom évoque 
                        l'idée d'un « fort » ou d'une « terre forte », suggérant qu'il s'agissait à l'origine 
                        d'une forteresse destinée à protéger cette région stratégique.
                      </p>
                      <p className="mb-6">
                        L'édifice a été construit sur une colline, offrant ainsi une position dominante sur 
                        les alentours et un contrôle sur les rives de la Garonne, voie commerciale et militaire 
                        importante de l'époque.
                      </p>
                      <p className="mb-6">
                        Au XVIIe et au XVIIIe siècle, Terrefort devient un lieu de résidence plus que de défense. 
                        Il est embelli et modernisé par les familles nobles de la région, qui y ajoutent des 
                        jardins, des dépendances et des aménagements intérieurs de confort.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <img 
                      src={chateauInterior} 
                      alt="Intérieur historique du château"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <img 
                      src={chateauExterior} 
                      alt="Façade du château"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg mt-8">
                  <h3 className="text-xl font-semibold mb-4">Architecture Renaissance</h3>
                  <p className="text-gray-700">
                    C'est durant cette époque que le château prend une forme plus « classique », 
                    avec des éléments architecturaux qui témoignent de l'influence du style français 
                    de l'époque, notamment les cheminées datant de la Renaissance.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'project' && (
            <div className="space-y-12">
              {/* Timeline */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-8">Planning du Projet</h2>
                <div className="space-y-8">
                  {timelineData.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full mt-2 mr-6 ${
                        item.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concept du projet */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">Le Concept</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Users size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Mariages & Événements</h3>
                    <p className="text-gray-600">Jusqu'à 250 personnes pour mariages, anniversaires et réceptions</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Building size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Séminaires</h3>
                    <p className="text-gray-600">Espaces dédiés aux formations et séminaires d'entreprise</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-black text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Home size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Chambres d'Hôtes</h3>
                    <p className="text-gray-600">7 chambres de charme avec espace SPA et bien-être</p>
                  </div>
                </div>
                
                {/* Images du projet */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img 
                    src={renovationPlan} 
                    alt="Plans de rénovation"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <img 
                    src={domainView} 
                    alt="Vue d'ensemble du projet"
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div className="space-y-12">
              {/* Investissement */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">Structure Financière</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Investissement</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Prix d'acquisition</span>
                        <span className="font-medium">1,5M€</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Travaux de rénovation</span>
                        <span className="font-medium">3,3M€</span>
                      </div>
                      <div className="flex justify-between py-2 border-b-2 border-black">
                        <span className="font-semibold">Total investissement</span>
                        <span className="font-bold text-lg">4,5M€</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Soit environ 1 000€/m² - Acquisition sur fonds propres
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Rentabilité Prévisionnelle</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">CA annuel (rythme croisière)</span>
                        <span className="font-medium">700K€</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Charges d'exploitation</span>
                        <span className="font-medium">180K€</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Remboursement emprunt</span>
                        <span className="font-medium">182K€</span>
                      </div>
                      <div className="flex justify-between py-2 border-b-2 border-green-600">
                        <span className="font-semibold">Résultat net prévisionnel</span>
                        <span className="font-bold text-lg text-green-600">338K€</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market study */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl font-bold text-black mb-6">Étude de Marché</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Marché Local</h3>
                    <ul className="space-y-3 text-gray-700 mb-6">
                      <li className="flex items-start">
                        <TrendingUp className="mr-3 mt-1 text-green-600" size={16} />
                        <span>Bordeaux : 8 millions de touristes annuels</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="mr-3 mt-1 text-green-600" size={16} />
                        <span>Taux de remplissage mariages : 90% (avril-octobre)</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="mr-3 mt-1 text-green-600" size={16} />
                        <span>Prix moyen weekend : 20 000€</span>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="mr-3 mt-1 text-green-600" size={16} />
                        <span>Point d'équilibre : 400K€ CA annuel</span>
                      </li>
                    </ul>
                    
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold mb-4">Référence : Chalet Baron</h3>
                      <p className="text-gray-700 mb-4">
                        Projet similaire réalisé à Lormont, à 20 min de Bordeaux centre. 
                        Capacité 15 personnes en hébergement, 49 pour événements.
                      </p>
                      <div className="text-sm text-gray-600">
                        <div className="flex justify-between mb-2">
                          <span>Agenda réservé :</span>
                          <span className="font-medium">6-8 mois à l'avance</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Performance :</span>
                          <span className="font-medium text-green-600">Objectifs dépassés</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <img 
                      src={chateauExterior} 
                      alt="Potentiel du château"
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                    <img 
                      src={chateauInterior} 
                      alt="Espaces intérieurs"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contact section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-black text-white rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Intéressé par ce projet ?</h2>
          <p className="text-lg mb-6">Contactez-nous pour plus d'informations</p>
          
          <button
            onClick={handleContactClick}
            className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 mb-6 flex items-center justify-center mx-auto"
          >
            <Mail className="mr-2" size={20} />
            Nous contacter
          </button>
          
          <div className="space-y-2">
            <p className="font-medium">Partenaire Investissement</p>
            <p>+33 5 24 60 24 60</p>
            <p>partenaireinvestissement@gmail.com </p>
            <p className="text-sm text-gray-300 mt-4">
              54 rue de la croix de seguey, 33000 Bordeaux
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TerrefortProject;