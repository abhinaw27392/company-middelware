'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var Employee = connection.define('employee', {
    empId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING
    },
    userName: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false
    });

module.exports = Employee;