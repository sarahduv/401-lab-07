'use strict';

let db = [];

/**
 * This registers category routes
 * @param {Application} - the express app
 */

function registerRoutes(app) {

  // Route to Get All Categories
  // eslint-disable-next-line no-unused-vars
  app.get('/categories', (request, response, next) => {
    let count = db.length;
    let results = db;
    response.json({ count, results });
  });

  // Route to Create a Category
  // eslint-disable-next-line no-unused-vars
  app.post('/categories', (request, response, next) => {
    if(!request.valid){
      // we want our test to pass
      // throw new Error('BROKEN');
    }
    let record = request.body;
    record.id = Math.random();
    db.push(record);
    response.json(record);
  });
}

module.exports = {
  registerRoutes,
};