const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./controller/userController');
const admin = require('./controller/adminController');
const categorie = require('./controller/categorieController')
const product = require('./controller/productController');


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use('/user', user);
app.use('/admin', admin);
app.use('/categorie', categorie);
app.use('/product', product);


app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to the server! you re cool now</h2>');
});
app.listen(3000, function () {
    console.log('Forma-Shop API running on port 3000...');
});