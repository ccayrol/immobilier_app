import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom"

interface Bien {
  id: string;
  titre: string;
  prix: number;
  superficie: number;
  nombrePieces: number;
  images: string[];
  description: string;
}

const BienCard = React.memo(({ bien }: { bien: Bien }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = bien.images;

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden group">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={`${bien.titre} - photo ${currentIndex + 1}`}
            className="w-full h-full object-cover transition duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            Pas d'image
          </div>
        )}

        {/* Flèches petites et discrètes */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-70 text-gray-700 rounded-full p-1.5 shadow-md transition-opacity duration-300 opacity-80 hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-40 hover:bg-opacity-70 text-gray-700 rounded-full p-1.5 shadow-md transition-opacity duration-300 opacity-80 hover:opacity-100"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{bien.titre}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{bien.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 space-y-1">
            <div>
              <span className="font-medium">{bien.superficie}</span> m²
            </div>
            <div>
              <span className="font-medium">{bien.nombrePieces}</span> pièces
            </div>
          </div>
          <div className="text-xl font-bold text-black">
            {new Intl.NumberFormat('fr-FR').format(Number(bien.prix))} €
          </div>
        </div>
        <Link
            to="/sendmail" className="block w-full">
        <button className="w-full bg-black text-white px-4 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200">
          Demander plus d'informations
        </button>
        </Link>
      </div>
    </div>
  );
});

BienCard.displayName = 'BienCard';

const Sales = () => {
  const [biens, setBiens] = useState<Bien[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBiens = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:3000/biens?type=vente");
      if (!response.ok) throw new Error('Erreur de chargement');

      const rawData = await response.json();

      const biensNormalisés: Bien[] = rawData.map((bien: any) => ({
        id: bien.id,
        titre: bien.titre,
        description: bien.description,
        prix: Number(bien.prix),
        superficie: Number(bien.superficie),
        nombrePieces: Number(bien.nombrePieces),
        images: Array.isArray(bien.imageUrl)
          ? bien.imageUrl
          : bien.imageUrl
          ? [bien.imageUrl]
          : [],
      }));

      // Précharger les images
      await Promise.all(
        biensNormalisés.flatMap((bien) =>
          bien.images.map((url) => {
            const img = new Image();
            img.src = url;
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        )
      );

      setBiens(biensNormalisés);
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
            Nos Biens à Vendre
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez notre sélection de biens d'exception
          </p>
        </div>

        {biens.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biens.map((bien) => (
              <BienCard key={bien.id} bien={bien} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun bien disponible actuellement</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
