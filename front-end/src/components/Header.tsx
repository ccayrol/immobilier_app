import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X } from 'lucide-react';
import Image from '../assets/verrou-removebg-preview.png'

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-gradient-to-b from-black via-black to-neutral-900 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center whitespace-nowrap">
              <Building2 className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-semibold text-white tracking-wide">
                Soubeste Investissement
              </span>
            </Link>
          </div>

          {/* Menu burger pour mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            <Link
              to="/vente"
              className={`${
                isActive('/vente') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-300`}
            >
              Vente Immobilière
            </Link>
            <Link
              to="/location"
              className={`${
                isActive('/location') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-300`}
            >
              Location
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-300`}
            >
              À Propos
            </Link>
            <Link
              to="/sendMail"
              className={`${
                isActive('/about') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-300`}
            >
              Contactez-nous
            </Link>
            <Link
              to="/login"
              className={`${
              isActive('/login') ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-white'
              } px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center`}
            >
                <img 
                  src={Image} 
                  alt="Connexion" 
                  className="h-8 w-8 mr-2" // Ajuste la taille de l'image et l'espacement
                />
            </Link>
            {/* Connexion avec un style différent */}
            
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300 ease-in-out bg-neutral-900 opacity-95">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/vente"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Vente Immobilière
              </Link>
              <Link
                to="/location"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Location
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
              <Link
                to="/sendMail"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Contactez-nous
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Connexion   
            </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
