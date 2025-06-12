const express = require("express");
const ProduitController = require("../Controllers/ProduitController");
const upload = require("../Helpers/Upload");

const Route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Produits
 *   description: Gestion des produits e-commerce
 */

/**
 * @swagger
 * /api/product/add:
 *   post:
 *     tags: [Produits]
 *     summary: Ajouter un nouveau produit
 *     description: Crée un produit avec ses caractéristiques
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image principale du produit
 *               marque:
 *                 type: string
 *                 example: "Nike"
 *               nom:
 *                 type: string
 *                 example: "Air Max 90"
 *               prix:
 *                 type: string
 *                 example: "120.00"
 *               description_generale:
 *                 type: string
 *                 example: "Chaussure de sport confortable"
 *               specification:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Semelle en caoutchouc", "Tige en mesh"]
 *               autreColor:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image:
 *                       type: string
 *                       format: binary
 *                     color:
 *                       type: string
 *                       example: "Rouge"
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       400:
 *         description: Données invalides
 */
Route.post("/add", upload.any(), ProduitController.addProduit);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     tags: [Produits]
 *     summary: Lister tous les produits
 *     description: Retourne un tableau de tous les produits disponibles
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
Route.get("/all", ProduitController.getAllProduits);

/**
 * @swagger
 * /api/product/one/{id}:
 *   get:
 *     tags: [Produits]
 *     summary: Obtenir un produit spécifique
 *     description: Retourne les détails d'un produit par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "60d5f9b31f9d9a2b3c7e8f5a"
 *     responses:
 *       200:
 *         description: Détails du produit
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produit non trouvé
 */
Route.get("/one/:id", ProduitController.getOneProduit);

/**
 * @swagger
 * /api/product/delete/{id}:
 *   post:
 *     tags: [Produits]
 *     summary: Supprimer un produit
 *     description: Supprime un produit par son ID (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produit supprimé
 *       404:
 *         description: Produit non trouvé
 *       401:
 *         description: Non autorisé (JWT requis)
 *     security:
 *       - bearerAuth: []
 */
Route.post("/delete/:id", ProduitController.deleteProduit);

/**
 * @swagger
 * components:
 *   schemas:
 *     AutreColor:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           format: uri
 *           example: "http://example.com/red-shoe.jpg"
 *         color:
 *           type: string
 *           example: "Rouge"
 * 
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "60d5f9b31f9d9a2b3c7e8f5a"
 *         image:
 *           type: string
 *           format: uri
 *           example: "http://example.com/main-image.jpg"
 *         marque:
 *           type: string
 *           example: "Nike"
 *         nom:
 *           type: string
 *           example: "Air Max 90"
 *         prix:
 *           type: string
 *           example: "120.00"
 *         description:
 *           type: object
 *           properties:
 *             generale:
 *               type: string
 *               example: "Chaussure de sport confortable"
 *             specification:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Semelle en caoutchouc", "Tige en mesh"]
 *         autreColor:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AutreColor'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T00:00:00Z"
 */

module.exports = Route;