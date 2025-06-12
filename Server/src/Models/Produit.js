const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AutreColorSchema = new Schema({

    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

//Création du Schema Produit 
const ProduitSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    marque: {
        type: String,
        required: true,
    },
    nom: {
        type: String,
        required: true,
    },
    prix: {
        type: String,
        required: true
    },
    description: {
        generale: {
            type: String,
            required: true,
        },
        specification: [String], // Ex : ["Semelle en caoutchouc", "Résiste à l'eau"]
    },
    autreColor: [AutreColorSchema],
}, {
    timestamps: true
});
const Produit = mongoose.model("Produit", ProduitSchema);
module.exports = Produit;