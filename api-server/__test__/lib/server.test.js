'use strict';

const server = require('../../../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server.app);

describe('web server', () => {

  it('should respond properly on request to /categories', () => {

    return mockRequest
      .get('/categories')
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.count).toBe(0);
      }).catch(console.error);
  });

  it('should respond properly on post to /categories', () => {

    return mockRequest
      .post('/categories')
      .send({name:'Test', description:'test stuff'})
      .then(results => {
        expect(results.status).toBe(200);
        expect(results.body.name).toBe('Test');
      }).catch(console.error);

  });

  it('tests for the middleware', () => {

    return mockRequest
      .post('/badroute')
        expect(results.status).toBe(404);
  });

  it('tests for the data model', () => {

    return mockRequest
      .post('/error')
        expect(results.status).toBe(500);
  });

  it('this should post the object', () => {

    return mockRequest
      .post('/categories')
      .send({name:'Toothfairy', description:'giver of money'})
      .then(results => {
        expect(results.body.name).toBe('Toothfairy');
      }).catch(console.error);

  });
});

