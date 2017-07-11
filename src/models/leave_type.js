'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var LeaveTypes = connection.define('leave_type', {
    typeId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
            autoIncrement: true
    },
    leaveType: {
        type: Sequelize.STRING,
    }
},
    {
        timestamps: false,
        tableName: 'leave_type'
    });

module.exports = LeaveTypes