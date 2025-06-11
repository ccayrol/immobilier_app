import React, { useEffect, useState, useCallback } from "react";

interface Bien {
  id: string;
  titre: string;
  prix: string;
  superficie: string;
  nombrePieces: string;
  imageUrl: string;
  description: string;
}

const BienCard = React.memo(({ bien }: { bien: Bien }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        <img
          src={bien.imageUrl}
          alt={bien.titre}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          {bien.titre}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {bien.description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 space-y-1">
            <div>
              <span className="font-medium">{bien.superficie}</span> m²
            </div>
            <div>
              <span className="font-medium">{bien.nombrePieces}</span> pièces
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-black">
              {new Intl.NumberFormat('fr-FR').format(Number(bien.prix))} €
            </div>
            <div className="text-sm text-gray-500">/mois</div>
          </div>
        </div>

        <button className="w-full bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200">
          Demander plus d'informations
        </button>
      </div>
    </div>
  );
});

BienCard.displayName = 'BienCard';

const Rentals = () => {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBiens = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulation API avec timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch("http://localhost:3000/biens?type=location");
      if (!response.ok) throw new Error('Erreur de chargement');
      
      const data = await response.json();
      
      // Préchargement de toutes les images avant d'afficher
      await Promise.all(
        data.map((bien: Bien) => {
          const img = new Image();
          img.src = bien.imageUrl;
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      setBiens(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBiens();
  }, [fetchBiens]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-6">
          <div className="text-red-500 mb-4 text-4xl">!</div>
          <h2 className="text-2xl font-bold mb-4">Erreur de chargement</h2>
          <button 
            onClick={fetchBiens}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Biens à Louer
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre sélection de biens en location
          </p>
          {biens.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {biens.length} bien{biens.length > 1 ? 's' : ''} disponible{biens.length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {biens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biens.map((bien) => (
              <BienCard key={bien.id} bien={bien} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Aucun bien disponible
            </h3>
            <p className="text-gray-500">
              Il n'y a actuellement aucun bien en location disponible.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rentals;