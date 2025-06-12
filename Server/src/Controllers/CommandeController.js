const Commande = require("../Models/Commande");
const Client = require("../Models/Client");

exports.addCommande = async (req, res) => {
    const { panier, client, paiement, receivedFacture } = req.body;

    console.log("Les données reçues depuis le front :", req.body);

    // ✅ Correction de la condition de validation (ton `if` était mal structuré)
    if (!panier || !client || !paiement || receivedFacture === undefined) {
        return res.status(400).json({ message: "Toutes les données sont requises avant de soumettre !" });
    }

    try {
        // ✅ Enregistrement du client dans la base de données
        const newClient = new Client(client);
        await newClient.save();

        // ✅ Formatage du panier selon ton PanierSchema
        const panierFormatte = [
            {
                contenu: panier.map(item => ({
                    produitId: item.produitId,
                    quantity: item.quantity
                }))
            }
        ];

        // ✅ Création de la commande avec le panier, client ID, paiement et facture
        const newCommande = new Commande({
            panier: panierFormatte,
            client: newClient._id,
            paiement,
            receivedFacture
        });

        // ✅ Enregistrement de la commande
        await newCommande.save();

        return res.status(201).json({ message: "Commande ajoutée avec succès", commande: newCommande });

    } catch (error) {
        console.error("Erreur dans addCommande:", error);
        return res.status(500).json({
            message: "Erreur serveur lors de l'ajout de la commande",
            error: error.message
        });
    }
};
// Obtenir toutes les commandes
exports.getAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find().populate('client'); // Populer le champ client pour obtenir les détails du client
        res.status(200).json({ message: "Commandes récupérées avec succès", commandes });
    } catch (error) {
        console.error("Erreur dans getAllCommandes:", error);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des commandes", error: error.message });
    }
};