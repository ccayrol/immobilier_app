import React, { useEffect, useState, Suspense } from "react";

// Interface pour un bien immobilier
interface Bien {
  id: string;
  titre: string;
  prix: string;
  superficie: string;
  nombrePieces: string;
  imageUrl: string;
  description: string;
}

function Rentals() {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);



  const affichage_nombre = (nb:number) => {
    return nb.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

  // Fonction pour charger les biens avec gestion du cache
  useEffect(() => {
    const fetchBiens = async () => {
      try {
        const response = await fetch("http://localhost:3000/biens?type=location");
        const data = await response.json();
        setBiens(data);
        localStorage.setItem('biensCacheLocation', JSON.stringify(data)); // Mise en cache des biens
        setIsLoaded(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des biens en location:", error);
        setIsLoaded(true);
      }
    };

    fetchBiens();
  }, []);

  // Affichage d'un indicateur de chargement
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex items-center space-x-2">
          <span className="text-xl text-gray-600">Chargement</span>
          <div className="flex space-x-1">
            <span className="dot animate-ping text-blue-500">.</span>
            <span className="dot animate-ping text-blue-500">.</span>
            <span className="dot animate-ping text-blue-500">.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Biens à Louer
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre sélection de biens à louer
          </p>
        </div>

        {/* Grille des biens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {biens.map((bien) => (
            <div
              key={bien.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-[1.02] flex flex-col"
            >
              {/* Image du bien */}
              <div className="relative h-64">
                <img
                  src={bien.imageUrl}
                  alt={bien.titre}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Contenu de la carte */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{bien.titre}</h3>
                <p className="text-gray-600 mb-4">{bien.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <span className="block">{bien.superficie} m²</span>
                    <span className="block">{bien.nombrePieces} pièces</span>
                  </div>
                  <div className="text-xl font-bold text-black">
                    {affichage_nombre(Number(bien.prix))} €/mois
                  </div>
                </div>

                {/* Bouton aligné en bas */}
                <div className="mt-auto">
                  <button className="w-full bg-black text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-gray-800">
                    Demander plus d'informations
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Chargement différé de la page Rentals
const RentalsPage = () => {
  return (
    <Suspense fallback={<div>Chargement en cours...</div>}>
      <Rentals />
    </Suspense>
  );
}

export default RentalsPage;