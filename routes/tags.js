"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

router.get('/tags', (req, res, next) => {
    res.render('tags', {ltags: Anuncio.losTags()});
});
    

module.exports = router;