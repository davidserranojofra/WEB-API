const request = require('supertest');
//Inicializo mockgoose (base de datos falsa)
const Mockgoose = require('mockgoose').Mockgoose;
const mongoose = require('mongoose');
const mockgoose = new Mockgoose(mongoose);
const mongodbFixtures = require('./mongodb.fixtures.js');

const app = require('../app');

anuncio = {
  "nombre": "prueba",
  "venta": true,
  "precio": 10,
  "foto": "/imagenes/",
  "tags": ["lifestyle"]
}

describe('PRUEBA API /anuncios', function() {

    let agent;
    let token;
    before(async function() {
      await mockgoose.prepareStorage();
      await mongoose.connect('mongodb://urlfalsa.com/testDB', {
        useMongoClient: true
      });
      //limpio definiciones de modelos y esquemas
      mongoose.models = {};
      mongoose.modelSchemas = {};
      await mongodbFixtures.initUsuarios();
      const agent = request.agent(app)
    });

    it('deberia retornar un JWT', async function () {
      const response = await agent
        .post('/login')
        .send({ email: 'user@example.com', password: '1234' })
        .expect(200)
      // expect(response.body.ok).to.equal(true)
      // expect(response.body.token).to.be.not.undefined
      token = response.body.token
    })

    //GET
    it('deberia GET responder con json', function(done) {
      agent
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
      agent
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
      agent
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
        agent
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
      agent
      .delete('/apiv1/anuncios/59c126736679d357e9a4413a')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    //DELETE
    it('deberia Fallar por que no tiene el token', function(done) {
      request(app)
      .delete('/apiv1/anuncios/59c126736679d357e9a4413a')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

});