const PaiementSchema  = require("./Paiement");
const  PanierSchema  = require("./Panier");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({
    panier:[PanierSchema],
    client: {
        type: mongoose.Schema.Types.ObjectId, // Référence à un client
        ref: 'Client',
        required: true
    },
    paiement: PaiementSchema,

    receivedFacture: {
        default: true,
        type: Boolean,// 
        required: true
    }
}, {
    timestamps: true,
});
const Commande = mongoose.model("Commande", CommandeSchema);
module.exports = Commande;