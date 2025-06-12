const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ClientSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: String,
        required: true,
    },
    adress: {
        codePostal: {
            type: String,
            required: true
        },
        rue: {
            type: String,
            required: true,
        },
        ville: {
            type: String,
            required: true
        },
        pays: {
            type: String,
            required: true
        }
    },
})

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;