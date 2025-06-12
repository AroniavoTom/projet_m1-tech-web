const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ContenuSchema = new Schema({
    produitId: {
        type: Schema.Types.ObjectId, // Référence à un produit
        ref: 'Produit',
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        min: 1
    }
})
const PanierSchema = new Schema({

    contenu: [ContenuSchema]

})
module.exports= PanierSchema;

