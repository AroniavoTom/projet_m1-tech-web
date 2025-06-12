const mongoose = require("mongoose");
const dotenv = require("dotenv")
// Charger les variables d'environnement depuis le fichier .env
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_ATLAS_NEW);
    console.log(" ✅ 🖕 Connected to DB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};
 module.exports= connectDB;