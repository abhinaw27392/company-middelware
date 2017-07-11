'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var PublicHolidays = connection.define('public_holidays', {
    holidayDate: {
        type: Sequelize.DATEONLY,
        primaryKey: true
    },
    optional: {
        type: Sequelize.BOOLEAN,
    },
    holiday: {
        type: Sequelize.STRING,
    }
},
    {
        timestamps: false,
        tableName: 'public_holidays'
    });

module.exports = PublicHolidays