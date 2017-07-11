'use strict';

var Sequelize = require('sequelize');

// var connection = new Sequelize('leave_admin', 'root', '');


var connection = new Sequelize('leave_admin', 'leaveplanner@ahleaveplanner-mysqldbserver', 'Abhinawshahi001@', {
host: "ahleaveplanner-mysqldbserver.mysql.database.azure.com",
dialect: "mysql",
port : 3306,
dialectOptions: {
encrypt : true // This is important if you are using Azure.
}
});
module.exports = connection;