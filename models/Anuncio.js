"use strict"

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = (filtro, callback) => {
    const query = Anuncio.find(filtro);
    query.exec(callback);
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);