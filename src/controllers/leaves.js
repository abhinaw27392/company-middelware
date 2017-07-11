'use strict';

var Promise = require('Bluebird');
var leaveService = require('../services/leaves');

function getLeaves(req, res) {
    return leaveService.getLeaves(req.params.id, req.query.startDate, req.query.endDate)
        .then(function (leaves) {
            res.setHeader('content-type', 'application/json');
            res.send(leaves);
        }).catch(function (error) {
            res.status(500);
            res.send(error.message);
        });
}

function applyLeave(req, res) {
    return leaveService.applyLeave(req.params.id, req.body)
        .then(function (response) {
            res.setHeader('content-type', 'application/json');
            res.send(response);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function leaveTypes(req, res) {
    return leaveService.leaveTypes()
        .then(function (leaveTypes) {
            res.setHeader('content-type', 'application/json');
            res.send(leaveTypes);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function publicHolidays(req, res) {
    return leaveService.publicHolidays()
        .then(function (publicHolidays) {
            res.setHeader('content-type', 'application/json');
            res.send(publicHolidays);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function cancelLeave(req, res) {
    return leaveService.cancelLeave(req.params.id, req.params.leaveId)
        .then(function (publicHolidays) {
            res.setHeader('content-type', 'application/json');
            res.send(publicHolidays);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function leaveApproval(req, res) {
    return leaveService.leaveApproval(req.params.id, req.params.leaveId, req.body)
        .then(function (approval) {
            res.setHeader('content-type', 'application/json');
            res.send(approval);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function approvalPending(req, res) {
    return leaveService.approvalPending()
        .then(function (leaves) {
            res.setHeader('content-type', 'application/json');
            res.send(leaves);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function getStatictics(req, res) {
    return leaveService.getStatictics(req.params.id, req.query.year)
        .then(function (statistics) {
            res.setHeader('content-type', 'application/json');
            res.send(statistics);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function getBalance(req, res) {
    return leaveService.getBalance(req.params.id, req.body)
        .then(function (statistics) {
            res.setHeader('content-type', 'application/json');
            res.send(statistics);
        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

function logme(req, res) {
    return leaveService.logme(req.body)
        .then(function (result) {
            res.setHeader('content-type', 'application/json');
            if (result == null) {
                res.send('fail');
            }
            else {
                console.log('id' + result.empId);
                var k=result.empId;
                console.log(k);
                res.send(JSON.stringify(k));
            }

        }).catch(function (err) {
            res.status(500);
            res.send(err.message);
        });
}

module.exports = {
    "getLeaves": Promise.method(getLeaves),
    "applyLeave": Promise.method(applyLeave),
    "leaveTypes": Promise.method(leaveTypes),
    "publicHolidays": Promise.method(publicHolidays),
    "cancelLeave": Promise.method(cancelLeave),
    "approvalPending": Promise.method(approvalPending),
    "leaveApproval": Promise.method(leaveApproval),
    "getStatictics": Promise.method(getStatictics),
    "getBalance": Promise.method(getBalance),
    "logme": Promise.method(logme)
};