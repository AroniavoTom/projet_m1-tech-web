const express = require("express");
const CommandeController = require("../Controllers/CommandeController");

const Route = express.Router();

/**
 * @swagger
 * tags:
 *   name: Commandes
 *   description: Gestion des commandes clients
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProduitCommande:
 *       type: object
 *       properties:
 *         produitId:
 *           type: string
 *           description: ID du produit
 *         quantity:
 *           type: integer
 *           description: Quantité commandée
 *     Paiement:
 *       type: object
 *       properties:
 *         mode:
 *           type: string
 *           example: paypal
 *         montant:
 *           type: string
 *           example: "2281.67"
 *     Commande:
 *       type: object
 *       required:
 *         - panier
 *         - client
 *         - paiement
 *       properties:
 *         panier:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProduitCommande'
 *         client:
 *           type: string
 *           description: ID du client
 *         paiement:
 *           $ref: '#/components/schemas/Paiement'
 *         receivedFacture:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/commande/add:
 *   post:
 *     tags: [Commandes]
 *     summary: Créer une nouvelle commande
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commande'
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Commande enregistrée"
 *       400:
 *         description: Données invalides
 */
Route.post("/add", CommandeController.addCommande);

/**
 * @swagger
 * /api/commande/all:
 *   get:
 *     tags: [Commandes]
 *     summary: Récupérer toutes les commandes
 *     responses:
 *       200:
 *         description: Liste des commandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commande'
 */
Route.get("/all", CommandeController.getAllCommandes);

module.exports = Route;
