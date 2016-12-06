'use strict';
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let config = require('./server/config/config.js')[env];

let models = require('./server/models/models.js');

models.db.sync();