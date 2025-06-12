// config/swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API E-Commerce',
      version: '1.0.0',
      description: 'Documentation pour les routes Produits et Utilisateurs',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./src/Routes/*.js'], // Adaptez selon votre structure
};

module.exports = swaggerJsdoc(options);
