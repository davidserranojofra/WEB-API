"use strict";

const fs = require('fs');
const path = require('path');
const async = require('async');
const client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/nodepop', function(err, db) {
    if (err) {
        throw err; 
    } 
    db.collection('anuncios').deleteMany({});  
});

//fichero de arraque 
function leerJson(leejson, callback) {

    //creo ruta
    const fichero = path.join('..', 'anuncios.json');

    fs.readFile(fichero, 'utf8',(err, data) => {
        if (err) {
            callback(err);
            return;
        }
        client.connect('mongodb://localhost:27017/nodepop', function(err, db) {
            const listaAnuncios = JSON.parse(data);
            callback(null, listaAnuncios);
            async.concat(listaAnuncios.list, function iterador(articulo, callbackIteracion) {
                db.collection('anuncios').insert(articulo);
                
                callbackIteracion(null, articulo);
            }, function callbackFinBucle(err, listaResult) {
                if(err) {
                    callback(err);
                    return;
                }
                callback(null, listaResult);
            }); 
            db.close();
        });
    });
}

leerJson('anuncios.json', (err, listar) => {
    if(err) {
        console.log('Errorrrrrr', err);
        return;
    }
});