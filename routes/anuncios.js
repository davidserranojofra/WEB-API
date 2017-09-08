"use strict";

const express = require('express');
const router = express.Router();

//Ruta donde mostrara los anuncios
router.get('/', (req, res, next) => {
    res.send('mostrando anuncios');
});

module.exports = router;