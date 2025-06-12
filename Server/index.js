//Importaion de l'express
const app = require("./app");
const connectDB = require("./Config/Db");
const dotenv= require("dotenv");

//Importation des variable d'environnement 
dotenv.config();


// Démarrer le serveur après la connexion à la base de données
const PORT = process.env.PORT;


app.listen(PORT, () => {
  console.log(`✅ 🖕 Server is running on port ${PORT}`);
  // Connexion à la base de données
  connectDB();
});


