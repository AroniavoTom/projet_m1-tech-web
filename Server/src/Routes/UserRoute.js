const express = require("express");
const UserController = require("../Controllers/UserController");
const ProtectedRoute = require("../Middleware/ProtectedRoute");
const multer = require("multer")

const Route = express.Router();
// Configuration du stockage en mémoire (utile pour envoyer vers Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Utilisateurs
 *   description: Gestion des utilisateurs et authentification
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username 
 *         - profile 
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "MotDePasse123!"
 *         username:
 *           type: string
 *           example: "Dupont"
 *         profile:
 *           type: string
 *           format: uri
 *           example: "http://example.com/image.jpg"
 *     AuthToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/add:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Créer un nouveau compte utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur enregistré"
 *       400:
 *         description: Données invalides ou email déjà utilisé
 */
Route.post("/add", upload.single("profile"), UserController.addUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Connexion utilisateur
 *     description: Authentifie un utilisateur et retourne un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "MotDePasse123!"
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthToken'
 *       401:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur serveur
 */
Route.post("/login", UserController.loginUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Utilisateurs]
 *     summary: Déconnexion utilisateur
 *     description: Invalide le token JWT de l'utilisateur
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Déconnexion réussie"
 *       401:
 *         description: Non autorisé (token invalide ou manquant)
 */
Route.post("/logout", [ProtectedRoute.protectedRoute], UserController.logoutUser);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Utilisateurs]
 *     summary: Récupérer les informations de l'utilisateur connecté
 *     description: Retourne les informations de l'utilisateur authentifié via les cookies JWT
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Non autorisé (token invalide, expiré ou manquant)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
Route.get("/me", ProtectedRoute.protectedRoute, UserController.getLoggedInUser);

module.exports = Route;