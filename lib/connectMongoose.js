"use strict";

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on('error', (err) => {
    console.log('Error de conexión', err);
    process.exit(1);
});

db.once('open', () => {
    console.info('Connectado a mongodb en la base de datos: ', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true
  });

module.exports = db; 