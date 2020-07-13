const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/FormaShop', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify:false });

module.exports = { mongoose };