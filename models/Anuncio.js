"use strict";

const mongoose = require('mongoose');

//creo esquema
const anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },
    venta: {
        type: Boolean,
        index: true
    },
    precio: {
        type: Number,
        index: true
    },
    foto: String,
    tags: {
        type: [String],
        index: true 
    } 
});


//metodo estatico
anuncioSchema.statics.list = (filtro, limit, skip, callback) => {
    const query = Anuncio.find(filtro);
    query.sort({precio: 1});
    query.limit(limit);
    query.skip(skip);
    query.exec(callback);
}

//creo modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);