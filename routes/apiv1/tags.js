"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');


//muestro los tags
router.get('/', (req, res) => {
    res.json({ ok: true, losTags: Anuncio.losTags() });
});


module.exports = router;