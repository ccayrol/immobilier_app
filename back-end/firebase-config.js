const admin = require("firebase-admin");

// Charge les credentials de Firebase (télécharge ton fichier JSON depuis Firebase)
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://soubeste-investissement.firebasestorage.app",  // Assure-toi de remplacer par le nom de ton bucket Firebase Storage
});

// Initialisation de Firestore
const db = admin.firestore();

// Initialisation de Firebase Storage (Bucket)
const bucket = admin.storage().bucket();

module.exports = { db, bucket };
