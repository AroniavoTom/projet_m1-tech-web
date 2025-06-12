const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const PaiementSchema= new Schema({
    mode:{
        type:String,
        required:true,
    },
    montant:{
        type:String,
        required:true,
    },
    
})
module.exports= PaiementSchema;

