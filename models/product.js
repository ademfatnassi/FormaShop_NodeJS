const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    categorie: {
        type: String,
        required: true
    }

});

const Product = mongoose.model('produit', ProductSchema);

module.exports = { Product }