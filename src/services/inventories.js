'use strict';
var inventory = require('../models/inventory');
var Promise = require('bluebird');
var moment = require('moment');
var _ = require('underscore');
var db = require('../models');
var inventoryMapper = require('../mappers/inventories');

function getAssets(empId) {
	var whereClause = {};
	whereClause.empId = empId;
	return db.inventory_employee.findAll({
		where: whereClause
	})
		.then(function (inventories) {
			var inventoryIdsList = [];

			_.each(inventories, function (inventory) {
				inventoryIdsList.push(inventory.inventoryNo);
			});

			return db.inventory.findAll({
				where: {
					inventoryNo: inventoryIdsList
				}
			})
				.then(function (assets) {
					return inventoryMapper.mapAssets(assets, inventories);
				})
		})
		.catch(function (error) {
			console.log(error.message);
			return {};
		});
}

//adding asset
function createAsset(empId, asset) {
	var k = db.location.findAll({
		where:
		{
			cubicalNo: asset.cubicalnumber
		}
	}).then(function (res) {
		var j = [];
		_.each(res, function (singledata) {
			j.push(singledata.locationId);
		});

		return j;
	}).then(function (dat) {
		if (dat == '') {
			return db.location.create({
				cubicalNo: asset.cubicalnumber
			});
		}

	}).then(function (rres) {
		db.location.findAll({
			where:
			{
				cubicalNo: asset.cubicalnumber
			}
		}).then(function (res) {
			var j = [];
			_.each(res, function (singledata) {
				j.push(singledata.locationId);
			});

			return j;
		}).then(function (res) {
			db.inventory.create({
				category: asset.category,
				item: asset.item,
				model: asset.model,
				brand: asset.brand,
				serialNo: asset.serialNo,
				description: asset.description,
				status: asset.status,
				location: res
			}, { isNewRecord: true })
				.then(function (inventory) {
					return db.inventory_employee.create({
						empId: empId,
						inventoryNo: inventory.inventoryNo,
						primaryUser: asset.primaryUser
					});
				})
				.catch(function (error) {
					console.log(error.message);
					return {};
				});
		});

	});
}

function transferAsset(empId, inventoryNo, body) {
	return db.inventory_employee.find({
		where: {
			inventoryNo: inventoryNo
		}
	})
		.then(function (inventory) {
			inventory.empId = body.empId;
			return inventory.save();
		})
		.catch(function (error) {
			console.log(error.message);
			return {};
		})
}

function getcat() {
	return db.categories.findAll().then(function (res) {
		var t = JSON.stringify(res);
		var y = JSON.parse(t);
		return y;
	});
}


module.exports = {
	"getAssets": Promise.method(getAssets),
	"createAsset": Promise.method(createAsset),
	"transferAsset": Promise.method(transferAsset),
	"getcat": Promise.method(getcat),
};