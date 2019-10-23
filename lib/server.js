'use strict';

const express = require('express');
const swagger = require('../api-server/swagger.js')

const app = express();

const categoryRoutes = require('../routes/category-routes.js')

app.use(express.json());

/**
 * This will set request.requestTime to be the current date and time
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
app.use(function (request, response, next) {
  request.requestTime = Date.now();
  next();
})

/**
 * This will send our console logs
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
app.use(function (request, response, next) {
  console.log('Time', request.requestTime);
  console.log('Path', request.path);
  console.log('Method', request.method);
  console.log('Message', request.query.message || request.body.message);
  next();
})

/**
 * This will change the value of request.valid
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
app.post('*', (request, response, next) => {
  request.valid = Math.random() > 0.5;
  next();
})

// this needs to be placed before any error handling functions
categoryRoutes.registerRoutes(app);

/**
 * This will send an error
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
app.get('/error', (request, response, next) => {
  throw new Error('BROKEN');
});

/**
 * This will send a status 500
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
// error handler --> 500
app.use(function (error, request, response, next) {
  console.log('An error happened', error);
  response.status(500).send('an error');
})

/**
 * This will send a status 404
 * @param {request} The request object
 * @param {response} The request object
 * @param {function} Call to continue processing 
 */
// nothing matched --? 404
app.use(function (request, response, next) {
  console.log('Nothing matched, I am returning 404');
  response.status(404).send('not found');
})



/**
 * This starts listening on the port
 * @param {port} - the port we are running the app on
 */
function start(port) {
  let PORT = port || 8080;
  swagger.start(PORT, app);
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

module.exports = {
  app,
  start
};