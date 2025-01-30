import React from 'react';
import persoImage from "../assets/perso.webp";
import { motion } from "framer-motion";

function About() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">À Propos de Soubeste Investissement</h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4">
            Depuis plus de 20 ans, nous accompagnons nos clients dans leurs projets immobiliers à Bordeaux et sa région.
          </p>
        </motion.div>

        {/* Notre Histoire */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 px-4"
        >
          <h2 className="text-3xl font-bold text-black mb-6">Notre Histoire</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Fondée en 2000 par Jean Soubeste, notre agence s'est construite sur des valeurs fortes :
            l'excellence, la confiance et la proximité avec nos clients. Grâce à notre expertise,
            nous sélectionnons les meilleures opportunités immobilières à Bordeaux.
          </p>
        </motion.div>

        {/* Nos Valeurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
          {['Excellence', 'Expertise', 'Engagement'].map((valeur, index) => (
            <motion.div
              key={valeur}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black p-8 rounded-lg text-white shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-4">{valeur}</h3>
              <p className="text-base">
                {valeur === 'Excellence' && "Nous sélectionnons les meilleures propriétés pour nos clients."}
                {valeur === 'Expertise' && "Notre connaissance approfondie du marché nous distingue."}
                {valeur === 'Engagement' && "Nous accompagnons nos clients tout au long de leur projet."}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Notre Équipe */}
        <div className="mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-6">Notre Équipe</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Jean Soubeste", "Marie Laurent", "Pierre Dubois", "Sophie Martin"].map((name, index) => (
              <motion.div 
                key={name}
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="h-32 w-32 lg:h-40 lg:w-40 mx-auto rounded-full overflow-hidden shadow-lg">
                  <img src={persoImage} alt={name} className="h-full w-full object-cover" />
                </div>
                <h3 className="font-semibold text-black text-lg mt-3">{name}</h3>
                <p className="text-gray-600 text-sm">
                  {index === 0 ? "Fondateur & Directeur" : 
                   index === 1 ? "Responsable des Ventes" : 
                   index === 2 ? "Expert en Investissement" : "Gestionnaire Location"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chiffres Clés */}
        <div className="px-4">
          <h2 className="text-3xl font-bold text-black mb-6">Nos Chiffres Clés</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { chiffre: "20+", texte: "Années d'expérience" },
              { chiffre: "500+", texte: "Transactions réalisées" },
              { chiffre: "98%", texte: "Clients satisfaits" },
              { chiffre: "4", texte: "Agences en Gironde" }
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
        </div>
      </div>
    </div>
  );
}

export default About;
