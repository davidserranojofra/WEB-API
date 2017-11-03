'use strict';

const cote = require('cote');
const Jimp = require('jimp');
const responder = new cote.Responder({ name: 'Resize Image Service' });



responder.on('resizeImg', function(req, done) {
    let url = req.url;
    let nombre = req.nombre;

    Jimp.read(url).then(function (image) {
        image.resize(100, 100)
             .write('./thumbs/' + nombre + '.jpg');
    }).catch(function (err) {
        console.error(err);
    })
});