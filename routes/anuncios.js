"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

//Ruta donde mostrara los anuncios
router.get('/', (req, res, next) => {
    Anuncio.list( (err, list) => {
        if (err) {
            next(err);
            return;
        }
        // res.json({ list: list });
        res.render('anuncio-lista', {list: list});
    });
});

module.exports = router;