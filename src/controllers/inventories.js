'use strict';

var Promise = require('Bluebird');
var inventoryService = require('../services/inventories');

function getAssets(req, res) {
    return inventoryService.getAssets(req.params.id)
        .then(function (assets) {
            res.setHeader('content-type', 'application/json');
            res.send(assets);
        }).catch(function (error) {
            res.status(500);
            res.send(error.message);
        });
}

function createAsset(req, res) {

    return inventoryService.createAsset(req.params.id, req.body)
        .then(function (inventory) {
            res.setHeader('content-type', 'application/json');
                 res.send(inventory);
        }).catch(function (error) {
            res.status(500);
            res.send(error.message);
        });
}

function transferAsset(req, res) {
    return inventoryService.transferAsset(req.params.id, req.params.inventoryNo, req.body)
        .then(function (inventory) {
            res.setHeader('content-type', 'application/json');
            res.send(inventory);
        }).catch(function (error) {
            res.status(500);
            res.send(error.message);
        });
}
function getcat(req, res)
{
    inventoryService.getcat().then(function(data)
    {
            res.status(200);
            res.send(data);
    });
 }

module.exports = {
    "getAssets": Promise.method(getAssets),
    "createAsset": Promise.method(createAsset),
    "transferAsset": Promise.method(transferAsset),
    "getcat":Promise.method(getcat)
     };