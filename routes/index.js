"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.get('/', (req, res, next) => {
    res.render('index', {ltags: Anuncio.losTags()});
});
    

module.exports = router;