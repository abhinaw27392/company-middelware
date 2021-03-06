'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var LeaveStatus = connection.define('status_type', {
    statusId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    statusName: {
        type: Sequelize.STRING,
    }
},
    {
        timestamps: false,
        tableName: 'leave_status'
    });

module.exports = LeaveStatus