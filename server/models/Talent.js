'use strict';
let db = require('../config/sequelize.js'),
    Sequelize = require('sequelize');

let Talent = db.define('talent', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nameFirst: {
        type: Sequelize.STRING
    },
    nameLast: {
        type: Sequelize.STRING
    },
    isMale: {
        type: Sequelize.BOOLEAN
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Talent;
