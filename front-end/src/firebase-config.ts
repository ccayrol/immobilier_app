import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDmeiz7cHtwNXMXEhu8KY9GSorX1GgKxEg",
  authDomain: "soubeste-investissement.firebaseapp.com",
  projectId: "soubeste-investissement",
  storageBucket: "soubeste-investissement.firebasestorage.app",
  messagingSenderId: "1087159206153",
  appId: "1:1087159206153:web:a892cbf3d36b2a81fb53d8",
  measurementId: "G-Q3DZST74TM",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Authentication
const auth = getAuth(app);

// Exporter un objet contenant app et auth
export { app, auth };