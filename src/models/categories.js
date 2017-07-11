'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var Categories = connection.define('categories', {
    categoryId: {
        type: Sequelize.INTEGER,
         primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        tableName: 'categories'
    });

module.exports = Categories