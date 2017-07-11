'use strict';

var Sequelize = require('sequelize');
var connection = require('./connection');

var InventoryEmployee = connection.define('inventory_employee', {
    primaryUser: {
        type: Sequelize.BOOLEAN     
    },
    empId: {
        type: Sequelize.INTEGER
    },
    inventoryNo: {
        type: Sequelize.INTEGER ,
        primaryKey: true
    }
},
    {
        timestamps: false,
        tableName: 'inventory_employee'
    });

module.exports = InventoryEmployee;