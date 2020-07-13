const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');
const { Product } = require('./../models/product');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to productController! you re still cool');
});

app.post('/add', (req, res) => {
    let data = req.body;

    let procuct = new Product({
        nom: data.nom,
        description: data.description,
        image: data.image,
        prix: data.prix,
        quantite: data.quantite,
        categorie: data.categorie
    });

    procuct.save().then((produitFromdb) => {
        res.status(200).send({ message: "Ajout: Ajout avec succes!" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });

});

app.get('/all', (req, res) => {
    Product.find().then((ProductsFromDB) => {

        let products = [];

        for (let index = 0; index < ProductsFromDB.length; index++) {
            products.push(ProductsFromDB[index]);
        }

        res.status(200).json({ products })

    }).catch((error) => { res.status(400).send(error) });
});

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Product.findByIdAndDelete({ _id: id }).then((ProductFromdb) => {
        res.status(200).send({ message: "Suppression avec succes" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });
});

app.put('/update', (req, res) => {
    let data = req.body;

    Product.findOneAndUpdate(data._id, {
        nom: data.nom,
        description: data.description,
        image: data.image,
        prix: data.prix,
        quantite: data.quantite,
        categorie: data.categorie
    }).then((ProductFromdb) => {
        res.status(200).send();
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });
});

app.get('/find/:id', (req, res) => {

    let id = req.params.id;

    Product.find({ categorie: id }).then((productsFromDB) => {

        let products = [];

        for (let index = 0; index < productsFromDB.length; index++) {
            products.push(productsFromDB[index]);
        }

        res.status(200).json({ products })

    }).catch((error) => { res.status(400).send(error) });
});

app.get('/One/:id', (req, res) => {

    let id = req.params.id;

    Product.findOne({ _id: id }).then((productFromDB) => {

        console.log(productFromDB);


        res.status(200).json({ productFromDB })

    }).catch((error) => { res.status(400).send(error) });
});

module.exports = app;