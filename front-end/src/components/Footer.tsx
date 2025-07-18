import { MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-black to-neutral-900 w-full">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-12">
        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* À propos - Aligné à gauche */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-lg font-semibold  mb-4 text-white">Partenaire Investissement</h3>
            <p className="text-gray-400 text-sm sm:text-base text-center lg:text-left max-w-xs">
              Votre partenaire de confiance pour tous vos projets immobiliers à Bordeaux.
            </p>
          </div>
          
          {/* Services - Centré */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white ">Nos Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base text-center">
              <li>
                <a 
                  href="https://www.leboncoin.fr/boutique/3228512/partenaire_investissement.htm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Vente Immobilière
                </a>
              </li>
              <li>
                <a 
                  href="https://www.leboncoin.fr/boutique/3228512/partenaire_investissement.htm#online_ads" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Location de Biens
                </a>
              </li>
              <li>
                <a 
                  href="/newprojects" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Rénovation
                </a>
              </li>
              <li>
                <a 
                  href="/sendmail" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Conseil en Investissement
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact - Aligné à droite */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white lg:items-start">Contact</h3>
            <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                    <span>54 rue croix de seguey, 33000 Bordeaux</span>
                </div>
                <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 flex-shrink-0 mt-1" />
                    <span>+33 5 24 60 24 60</span>
                </div>
                <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 flex-shrink-0 mt-1" />
                    <span>partenaireinvestissement@gmail.com</span>
                </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Partenaire Investissement. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;