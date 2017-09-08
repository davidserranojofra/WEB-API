"use strict";

const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.info('Conectado a mongodb');
});

mongoose.connect('mongodb://localhost/nodepop');