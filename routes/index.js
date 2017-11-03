"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.get('/', (req, res, next) => {
    res.render('index', {ltags: Anuncio.losTags()});
});

router.get('/lang/:locale', (req, res, next) => {
    const locale = req.params.locale;
    //Creo cookie
    res.cookie('cookie-idioma', locale, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
});
    

module.exports = router;