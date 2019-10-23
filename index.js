'use strict';

require('dotenv').config({path: __dirname + '/.env'});

const server = require('./lib/server.js');
const process = require('process');

server.start(process.env.PORT);
