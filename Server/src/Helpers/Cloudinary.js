const cloudinary = require("cloudinary").v2; // Utiliser v2 pour suivre les meilleures pratiques
const dotenv = require("dotenv");

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Vérifier si les variables d'environnement nécessaires sont définies
if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Veuillez définir les variables CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET dans votre fichier .env");
}

// Cloudinary initialisation
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, // Correction de l'erreur d'orthographe
  api_secret: process.env.CLOUDINARY_API_SECRET, // Correction de l'erreur d'orthographe
});

module.exports = cloudinary; // Exportation avec CommonJS pour cohérence
