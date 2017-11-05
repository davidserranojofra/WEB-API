const request = require('supertest');
const expect = require('chai').expect;
// const fixtures = require('./fixtures');
//Inicializo mockgoose (base de datos falsa)
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures');
const jwt = require('jsonwebtoken');

const app = require('../app');

anuncio = {
  "nombre": "prueba",
  "venta": true,
  "precio": 10,
  "foto": "/imagenes/",
  "tags": ["lifestyle"]
}


describe('PRUEBA API /anuncios', function() {

    before(async function() {
      await mockgoose.prepareStorage();
      await mongoose.connect('mongodb://urlfalsa.com/testDB', {
        useMongoClient: true
      });
      //limpio definiciones de modelos y esquemas
      mongoose.models = {};
      mongoose.modelSchemas = {};
      await mongodbFixtures.initUsuarios();
    });

    //GET
    it('deberia GET responder con json', function(done) {
      request(app)
        .get('/apiv1/anuncios')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
          done(err);
          return;
          } 
          expect(res.body).to.be.a('object');
          done();
        });
    });

    it('deberia GET buscar por una query', function(done) {
      request(app)
        .get('/apiv1/anuncios?nombre=bicicleta')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
          done(err);
          return;
          } 
          expect(res.body).to.be.a('object');
          done();
        });
    });

    //POST
    it('deberia añadir un contacto por POST', function(done) {
      request(app)
        .post('/apiv1/anuncios')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(anuncio)
        .expect(200)
        .end(function(err, res) {
          if (err) {
          done(err);
          return;
          } 
          expect(res.body).to.be.a('object');
          done();
        });
    });

    //PUT
    it('deberia Actualizar un contacto por PUT', function(done) {
        request(app)
        .put('/apiv1/anuncios/59c126736679d357e9a4413a')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(anuncio)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    //DELETE
    it('deberia Borrar un contacto', function(done) {
      request(app)
      .delete('/apiv1/anuncios/59c126736679d357e9a4413a')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    //DELETE
    it('deberia Fallar por que intenta borrar un contacto inexistente', function(done) {
      request(app)
      .delete('/apiv1/anuncios/5numeroNoExiste')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

});