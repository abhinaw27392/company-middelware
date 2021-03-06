'use strict';

var Promise = require('bluebird');
var _ = require('underscore');
var moment = require('moment');

function mapLeaves(leaves, leaveTypes) {
    var response = {
        leaves: []
    };

    _.each(leaves, function (item) {
        var typeMatch = _.findWhere(leaveTypes, { typeId: item.leaveType });

        var obj = {
            "startDate": moment(item.leaveStartDate).format('Do MMMM YYYY, (dddd)'),
            "endDate": moment(item.leaveEndDate).format('Do MMMM YYYY, (dddd)'),
            "no_of_days": item.leaveDays,
            "type": typeMatch.leaveType,
            "status": item.leaveStatus,//---------------------------------------added
            "empid": item.empId,//---------------------------------------added
            "leaveid": item.id//---------------------------------------added 
        };
        response.leaves.push(obj);
    });

    return response;
}

function mapTypes(mapTypes) {
    var response = [];

    _.each(mapTypes, function (item) {
        var obj = {
            "id": item.typeId,
            "type": item.leaveType
        };
        response.push(obj);
    });

    return response;
}

function mapHolidays(holidays) {
    var response = [];

    _.each(holidays, function (item) {
        var obj = {
            "holiday": item.holiday,
            "date": moment(item.holidayDate).format('Do MMMM YYYY, (dddd)'),
            "optional": item.optional ? true : false
        };
        response.push(obj);
    });

    return response;
}

function getStatictics(leaveBalances, leavesAvailed, leaveTypes, leaveStatuses, year) {

    var curDate = new Date();
    var response = {
        "openBalance": Math.floor(leaveBalances.openingBalance),
        "leavesEarned": Math.floor(curDate.getFullYear() == year ? 1.75 * (curDate.getMonth() + 1) : 1.75 * 12),
        "leavesLapsed": Math.floor(leaveBalances.leavesLapsed),
        "sickBalance": Math.floor(leaveBalances.sickBalance),
        "totalLeaves": 22
    };

    var annualLeave = _.findWhere(leaveTypes, { leaveType: 'Annual Leave' });

    var annualLeavesAvailed = _.filter(leavesAvailed, { leaveType: 1 });

    var annualCount = 0;
    _.each(annualLeavesAvailed, function (item) {
        annualCount += item.leaveDays;
    });

    response.leavesAvailed = Math.floor(annualCount);

    response.leavesBalance = Math.floor(response.totalLeaves - response.leavesAvailed);

    return response;
}

module.exports = {
    "mapLeaves": Promise.method(mapLeaves),
    "mapTypes": Promise.method(mapTypes),
    "mapHolidays": Promise.method(mapHolidays),
    "getStatictics": Promise.method(getStatictics)
}