'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const connection = require('./connection');

    let db = {};

    fs
        .readdirSync(__dirname)
        .filter(function (file) {
            return file.indexOf('.') !== 0 && file !== 'connection.js' &&
                file !== 'index.js' && file.slice(-3) === '.js';
        })
        .forEach(function (file) {
            var name = file.replace('.js', '');
            db[name] = require('./' + file);
        });

    db.connection = connection;
    db.sequelize = Sequelize;

//Start association of models here.
//db['employees_leave_balance'].belongsTo(db['employee'], { foreignKey: 'empId' });


module.exports = db;