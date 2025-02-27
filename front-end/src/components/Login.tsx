import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { 
  signInWithEmailAndPassword, 
  AuthError, 
  AuthErrorCodes
} from "firebase/auth";
import { auth } from '../firebase-config';

interface IFormData {
  email: string;
  password: string;
}

interface ILoginFormProps {
  redirectPath?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  [AuthErrorCodes.INVALID_EMAIL]: "L'adresse e-mail est invalide. Veuillez réessayer.",
  [AuthErrorCodes.USER_DELETED]: "Aucun utilisateur trouvé avec cette adresse e-mail.",
  [AuthErrorCodes.INVALID_PASSWORD]: "Mot de passe incorrect. Veuillez réessayer.",
  [AuthErrorCodes.USER_DISABLED]: "Ce compte a été désactivé. Contactez l'administrateur.",
  'auth/invalid-credential': "Email ou mot de passe incorrect. Veuillez réessayer.",
  default: "Une erreur s'est produite. Veuillez réessayer."
};

const LoginForm: React.FC<ILoginFormProps> = ({ 
  redirectPath = '/' 
}): JSX.Element => {
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setErrorMessage('');
    };
  }, []);

  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage('');
    setIsLoading(true);

    try {
      console.log("entree");
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(true);
      console.log("connexion reussie.");
      console.log("token : "+ idToken);
      
      // Stockage sécurisé du token
      sessionStorage.setItem('authToken', idToken);
      
      navigate(redirectPath);

    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as AuthError;
        setErrorMessage(ERROR_MESSAGES[firebaseError.code] || ERROR_MESSAGES.default);
        console.error("Erreur de connexion:", firebaseError.code);
      } else {
        setErrorMessage(ERROR_MESSAGES.default);
        console.error("Erreur inattendue:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUpVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div 
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Connexion
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="email" className="block text-gray-600">
              Adresse e-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="password" className="block text-gray-600">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
          </motion.div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div
                variants={fadeInUpVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="p-3 bg-red-100 text-red-600 rounded-lg"
                role="alert"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            variants={fadeInUpVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ delay: 0.6 }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg 
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Connexion en cours...
              </span>
            ) : (
              "Se connecter"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;