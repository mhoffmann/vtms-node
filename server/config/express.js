var express = require('express'),
    sequelize = require('./sequelize.js'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    shortid = require('shortid');

var RedisStore = require('connect-redis')(session);

var sessionConf = config.session;
sessionConf.store = new RedisStore(config.redis);
sessionConf.genid = function (req) {
    return shortid.generate();
};

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.path + 'server/views/');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(sessionConf(sessionConf));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.path + 'public'));
};
