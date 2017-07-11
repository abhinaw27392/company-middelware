'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var Location = connection.define('location', {
    locationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cubicalNo: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        tableName: 'location'
    });

module.exports = Location;