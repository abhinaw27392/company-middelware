'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var EmployeeLeaves = connection.define('employees_leaves', {
    empId: {
        type: Sequelize.INTEGER
    },
    comments: {
        type: Sequelize.TEXT
    },
    leaveStartDate: {
        type: Sequelize.DATEONLY
    },
    leaveEndDate: {
        type: Sequelize.DATEONLY
    },
    leaveDays: {
        type: Sequelize.INTEGER
    },
    leaveType: {
        type: Sequelize.INTEGER
    },
    leaveStatus: {
        type: Sequelize.INTEGER
    },
    emergencyContact: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        tableName: 'employees_leaves'
    });

module.exports = EmployeeLeaves;