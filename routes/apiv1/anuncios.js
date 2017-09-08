"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

//Listar anuncions

router.get('/', (req, res, next) => {
    //filtro anuncion por nombre
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;

    const limit = parseInt(req.query.limit) || null;
    let filtro = {};
    
    if(nombre) {
        filtro.nombre = nombre;    
    }
    if(venta) {
        filtro.venta = venta;
    }
    if(precio) {
        filtro.precio = precio;
    }
    if(tags) {
        filtro.tags = tags;
    }
    
    //muestro los anuncios
    Anuncio.list(filtro, limit, (err, list) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ ok: true, list: list });
    });
});

//Crear anuncio
router.post('/', (req, res, next) => {
    const anuncio = new Anuncio(req.body);
    
    anuncio.save((err, anuncioGuardado) => {
        if(err) {
            next(err);
            return;
        }
        res.json({ ok: true, anuncio: anuncioGuardado });
    });
});

//Actualizar anuncio
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    Anuncio.update({_id: id}, req.body, (err, anuncio) => {
        if(err) {
            next(err);
            return;
        }
        res.json({ ok: true, anuncio: anuncio });
    });
});
//Borrar anuncio
///////////////////////////////////////////////// ojo funciona pero no bien -->> borrar en la base de datos pero peta
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Anuncio.remove({_id: id}, req.body, (err, result) => {
        if(err) {
            next(err);
            return;
        }
        res.json({ ok: true, result: result});
    });
});


module.exports = router;