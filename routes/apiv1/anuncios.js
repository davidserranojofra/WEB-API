"use strict";

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');

const cote = require('cote');



//Listar anuncions
router.get('/', (req, res, next) => {

    //filtrar anuncios
    const nombre = req.query.nombre;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;
    const limit = parseInt(req.query.limit) || null;
    const skip = parseInt(req.query.skip) || null;
    let filtro = {};

    //filtro por nombre
    if(nombre) {
        filtro.nombre = new RegExp('^' + req.query.nombre, "i");
    }
    //filtro por venta o busqueda
    if(venta) {
        filtro.venta = venta;
    }
    //filtro por precio
    if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
        if (req.query.precio.indexOf('-') !== -1) {
            filtro.precio = {};
            let rango = req.query.precio.split('-');
            if (rango[0] !== '') {
                filtro.precio.$gte = rango[0];
            }
    
            if (rango[1] !== '') {
                filtro.precio.$lte = rango[1];
            }

        } else {
            filtro.precio = req.query.precio;
        }
    }
    //filtro por tag
    if(tags) {  
         filtro.tags = {$in: [tags]};
    }

    //muestro los anuncios
    Anuncio.list(filtro, limit, skip, (err, list) => {
        if (err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ ok: true, list: list });
    });
});

//Crear anuncio
router.post('/', (req, res, next) => {

    const anuncio = new Anuncio(req.body);
    const requester = new cote.Requester({ name: 'Resize Image Client' });

    requester.send({ 
        type: 'resizeImg',
        nombre: req.body.nombre,
        url: req.body.foto
     }); 

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
    Anuncio.findOneAndUpdate({_id: id}, req.body, {new: true}, (err, anuncioActualizado) => {
        if(err) {
            next(err);
            return;
        }
        res.json({ ok: true, anuncio: anuncioActualizado });
    });
});

//Borrar anuncio
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;

    Anuncio.remove({_id: id}, (err) => {
        if(err) {
            err.message = customError.errorMessage('findNOone');
            next(err);
            return;
        }
        res.json({ ok: true });
    });
});

module.exports = router;