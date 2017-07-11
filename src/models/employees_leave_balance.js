'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var ArticleLeaveBalance = connection.define('employees_leave_balance', {
	empId: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	openingBalance: {
		type: Sequelize.FLOAT
	},
	sickBalance: {
	    type: Sequelize.FLOAT
	},
	leavesLapsed: {
	    type: Sequelize.FLOAT
	},
	annualBalance: {
	    type: Sequelize.FLOAT
	},
	financialYear: {
        type: Sequelize.DATEONLY,
        primaryKey: true
    },
    optionalBalance: {
        type: Sequelize.FLOAT
    }
},
{
	timestamps: false,
	tableName: 'employees_leave_balance'
});

module.exports = ArticleLeaveBalance;