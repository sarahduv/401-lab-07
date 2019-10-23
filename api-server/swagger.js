'use strict'; 

/**
 * @param {port} - the port we are running the app on
 */
function start(port, app) {
  const expressSwagger = require('express-swagger-generator')(app);

  let options = {
      swaggerDefinition: {
          info: {
              description: 'This is a sample server',
              title: 'Swagger',
              version: '1.0.0',
          },
          host: 'localhost:' + port,
          basePath: '/',
          produces: [
              "application/json",
              "application/xml"
          ],
          schemes: ['http', 'https'],
      },
      basedir: '..',
      files: ['lib/server.js'] 

  };
  console.log("running swagger express");
  expressSwagger(options)
}

module.exports = {
  start
};

  
