require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { db, bucket } = require("./firebase-config");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Configurez multer pour stocker les fichiers temporairement en local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Spécifie le dossier temporaire
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nomme le fichier avec un timestamp unique
    },
});

const upload = multer({ storage: storage });

// Route pour télécharger l'image sur Firebase Storage
app.post("/upload", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("Aucun fichier téléchargé.");
    }

    // Récupère le fichier téléchargé
    const filePath = path.join(__dirname, "uploads", req.file.filename);

    // Télécharge l'image sur Firebase Storage
    const destination = `biens/images/${req.file.filename}`;
    try {
        await bucket.upload(filePath, {
            destination,
            public: true,  // Rendre l'image accessible publiquement
        });

        // Supprime le fichier local après l'upload
        fs.unlinkSync(filePath);

        // Récupérer l'URL de l'image téléchargée
        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;

        res.json({ imageUrl: fileUrl }); // Renvoie l'URL de l'image téléchargée
    } catch (error) {
        res.status(500).send("Erreur lors de l'upload de l'image.");
    }
});

app.post("/biens", async (req, res) => {
    try {
        const { titre, description, type, superficie, nombrePieces, prix, imageUrl } = req.body;

        if (!titre || !type || !prix) {
            return res.status(400).json({ error: "Champs obligatoires manquants" });
        }

        const newBien = {
            titre,
            description,
            type, // "vente" ou "location"
            superficie: Number(superficie),
            nombrePieces: Number(nombrePieces),
            prix: Number(prix),
            imageUrl,  // Utiliser l'URL de l'image envoyée dans le JSON
            dateAjout: new Date(),
        };

        const docRef = await db.collection("biens").add(newBien);
        res.status(201).json({ id: docRef.id, ...newBien });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour modifier un bien
app.put("/biens/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        await db.collection("biens").doc(id).update(data);
        res.json({ message: "Bien mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer un bien
app.delete("/biens/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("biens").doc(id).delete();
        res.json({ message: "Bien supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer tous les biens
app.get("/biens", async (req, res) => {
    try {
        const { type } = req.query; // Récupérer le paramètre "type"
        const snapshot = await db.collection("biens").get();
        let biens = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            // Vérifier si le bien a le type demandé (ex: "vente")
            if (!type || data.type === type) {
                biens.push({ id: doc.id, ...data });
            }
        });

        res.json(biens);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour récupérer un bien spécifique
app.get("/biens/:id", async (req, res) => {
    try {
        const { id } = req.params; // Récupère l'ID depuis l'URL
        const bienRef = db.collection("biens").doc(id);
        const bienDoc = await bienRef.get();

        if (!bienDoc.exists) {
            return res.status(404).json({ error: "Bien non trouvé" });
        }

        res.json({ id: bienDoc.id, ...bienDoc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour créer une annonce à partir d'un bien
app.post("/annonces", async (req, res) => {
    try {
        const { bienId } = req.body;

        if (!bienId) {
            return res.status(400).json({ error: "ID du bien obligatoire" });
        }

        const bienDoc = await db.collection("biens").doc(bienId).get();

        if (!bienDoc.exists) {
            return res.status(404).json({ error: "Bien non trouvé" });
        }

        const newAnnonce = {
            bienId,
            datePublication: new Date(),
            statut: "publiée",
        };

        const docRef = await db.collection("annonces").add(newAnnonce);
        res.status(201).json({ id: docRef.id, ...newAnnonce });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route pour supprimer une annonce
app.delete("/annonces/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection("annonces").doc(id).delete();
        res.json({ message: "Annonce supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
