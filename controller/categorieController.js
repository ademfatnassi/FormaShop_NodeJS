const express = require('express');
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');
const { Categorie } = require('./../models/categorie');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to categorieController! you re still cool');
});

app.post('/add', (req, res) => {
    let data = req.body;

    let categorie = new Categorie({
        nom: data.nom
    });

    categorie.save().then((categorieFromdb) => {
        //res.status(200).send(userFromdb)
        res.status(200).send({ message: "Ajout: Ajout avec succes!" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });

});

app.get('/all', (req, res) => {
    Categorie.find().then((CategoriesFromDB) => {

        let categories = [];

        for (let index = 0; index < CategoriesFromDB.length; index++) {
            categories.push(CategoriesFromDB[index]);
        }

        res.status(200).json({ categories })

    }).catch((error) => { res.status(400).send(error) });
});

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Categorie.findByIdAndDelete({ _id: id }).then((CategorieFromdb) => {
        res.status(200).send({ message: "Suppression avec succes" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });
});

app.put('/update', (req, res) => {
    let data = req.body;

    Categorie.findOneAndUpdate(data._id, {
        nom: data.nom
    }).then((categorieFromdb) => {
        res.status(200).send();
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });
});



module.exports = app;