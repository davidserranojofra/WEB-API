"use strict"

const mongoose = require('mongoose');

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.list = (filtro, limit, callback) => {
    const query = Anuncio.find(filtro);
    query.limit(limit);
    query.exec(callback);
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);