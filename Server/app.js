const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const UseUserRoutes = require("./src/Routes/UserRoute");
const UseProductRoute = require("./src/Routes/ProduitRoute");
const UseCommandeRoute= require("./src/Routes/CommandeRoute");
const swaggerUi= require("swagger-ui-express");
const specs = require("./Config/SwaggerConfig");

//Création de l'application express
const app = express();
//Initialise le corps
const corsOptions = {
  origin: "http://localhost:5173", // Remplacez par l'URL de votre frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"], // En-têtes autorisés
  credentials: true,
};

// Middleware (doivent venir avant les routes)
app.use(cors(corsOptions));

//
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Intégration Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs, {
    customSiteTitle: "API Documentation",
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

/**
 * Utilisation des routes RestAPI
 */
//RestAPI pour l'utilisateur
app.use("/api/auth", UseUserRoutes);
//RestAPI pour les produits
app.use("/api/product", UseProductRoute);
// Middleware pour les routes non trouvées
app.use("/api/commande",UseCommandeRoute);
app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

module.exports = app;
