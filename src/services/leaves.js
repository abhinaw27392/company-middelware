'use strict';

var Promise = require('bluebird');
var moment = require('moment');
var _ = require('underscore');
var db = require('../models');
var leaveMapper = require('../mappers/leaveMapper');

function getLeaves(empId, startDate, endDate) {

    var whereClause = {};
    whereClause.empId = empId;
    if (startDate) {
        whereClause.leaveStartDate = { gt: startDate };
    }
    if (endDate) {
        whereClause.leaveEndDate = { lt: endDate };
    }

    return Promise.all([
        db.employees_leaves.findAll({
            where: whereClause
        }),
        db.leave_type.findAll()
    ])
        .spread(function (leaves, leaveTypes) {
            return leaveMapper.mapLeaves(leaves, leaveTypes);
        })
        .catch(function (error) {
            console.log(error.message);
            return {};
        });
}

function applyLeave(id, leavePayload) {
    var startDate = moment(leavePayload.From);
    var endDate = moment(leavePayload.To);

    var promises = [];

    promises.push(db.leave_type.find({
        where:
        {
            leaveType: leavePayload.leaveType
        }
    }));
    promises.push(db.leave_status.find({
        where: {
            statusName: 'Applied'
        }
    }));

    return Promise.all(promises).spread(function (type, status) {
        console.log('helo' + type.typeId);
        console.log('helo' + status.statusId);

        return db.employees_leaves.create({
            empId: id,
            comments: leavePayload.Reason || '',
            leaveStartDate: leavePayload.From,
            leaveEndDate: leavePayload.To,
            leaveDays: endDate.diff(startDate, 'days') + 1,
            leaveType: type.typeId,
            leaveStatus: status.statusId,
            emergencyContact: leavePayload.Contact
        });
    });
}

function leaveTypes() {
    return db.leave_type.findAll()
        .then(function (types) {
            if (types) {
                return leaveMapper.mapTypes(types);
            } else {
                return [];
            }

        }).catch(function (error) {
            console.log(error.message);
        });
}

function publicHolidays() {
    return db.public_holidays.findAll()
        .then(function (pubHolidays) {
            if (pubHolidays) {
                return leaveMapper.mapHolidays(pubHolidays);
            } else {
                return [];
            }

        }).catch(function (error) {
            console.log(error.message);
        });
}

function cancelLeave(empId, leaveId) {
    return db.employees_leaves.find({
        where: {
            empId: empId,
            id: leaveId
        }
    })
        .then(function (leave) {
            if (leave) {
                db.leave_status.find({
                    where: {
                        statusName: 'Cancelled'
                    }
                })
                    .then(function (status) {
                        leave.leaveStatus = status.statusId;
                        return leave.save()
                            .then(function (leaveUpdate) {
                                return leaveUpdate;
                            })
                    }).catch(function (err) {
                        console.log(err.message);
                    });

            } else {
                console.log('Leave not found');
            }
        }).catch(function (err) {
            console.log(err.message);
        });
}

function leaveApproval(empId, leaveId, body) {
    return Promise.all([
        db.employees_leaves.find({
            where: {
                empId: empId,
                id: leaveId
            }
        }),
        db.leave_status.findAll(),
        db.leave_type.findAll()
    ])
        .spread(function (leave, statuses, types) {
            if (body.approve && body.approve === true) {
                var approved = _.findWhere(statuses, { statusName: 'Approved' });
                leave.leaveStatus = approved.statusId;

                var leaveYear = moment(leave.leaveStartDate).format('YYYY');
                var empId = leave.empId;
                var leaveType = _.findWhere(types, { typeId: leave.leaveType });
                var noOfDays = leave.leaveDays;

                return db.employees_leave_balance.find({
                    where: {
                        $and: [
                            db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('financialYear')), leaveYear),
                            { empId: empId }
                        ]
                    }
                })
                    .then(function (balances) {
                        if (leaveType.leaveType === 'Annual Leave' && (balances.annualBalance - noOfDays) > 0) {
                            balances.annualBalance -= noOfDays;
                        } else if (leaveType.leaveType === 'Optional Leave' && (balances.optionBalance - noOfDays) > 0) {
                            balances.optionalBalance -= noOfDays;
                        } else if (leaveType.leaveType === 'Sick Leave' && (balances.sickBalance - noOfDays) > 0) {
                            balances.sickBalance -= noOfDays;
                        }
                        balances.save()
                            .then(function () {
                                leave.save();
                            }).catch(function (err) {
                                console.log(err.message);
                            })
                    })
            } else if (body.reject && body.reject === true) {
                var rejected = _.findWhere(statuses, { statusName: 'Rejected' });
                leave.leaveStatus = rejected.statusId;
                leave.save();
            }
        }).catch(function (err) {
            console.log(err.message);
        });
}

function approvalPending() {
    return db.leave_status.find({
        where: {
            statusName: 'Applied'
        }
    })
        .then(function (appliedStatus) {
            return Promise.all([
                db.employees_leaves.findAll({
                    where: {
                        leaveStatus: appliedStatus.statusId
                    }
                }),
                db.leave_type.findAll()
            ])
                .spread(function (approvalPending, leaveTypes) {
                    return leaveMapper.mapLeaves(approvalPending, leaveTypes);
                })
        }).catch(function (err) {
            console.log(err.message);
        });
}

function getStatictics(empId, year) {

    var promisess = [];
    promisess.push(db.employees_leave_balance.find({
        where: {
            financialYear: year,
            empId: empId
        }
    }));
    promisess.push(db.employees_leaves.findAll({
        where: {
            leaveStartDate: db.sequelize.where(db.sequelize.fn('YEAR', db.sequelize.col('leaveStartDate')), year),
            empId: empId
        }
    }));
    promisess.push(db.leave_type.findAll(
        {
     
    }));
    
    promisess.push(db.leave_status.findAll());

    return Promise.all(promisess).spread(function (leaveBalances, leavesAvailed, leaveTypes, leaveStatuses) {
        // console.log('leddddd' + JSON.stringify(leaveBalances));
      // console.log('leddddd' + JSON.stringify(leavesAvailed));
       // console.log('leddddd' + JSON.stringify(leaveTypes));

       return leaveMapper.getStatictics(leaveBalances, leavesAvailed, leaveTypes, leaveStatuses, year);
    });
}

function getBalance(empid, data) {
    return db.employees_leave_balance.findAll({
        where: {
            empId: empid
        }
    }).then(function (res) {
        console.log(res);
        return res;
    });
}

///login check.................................start
function logme(data) {
    return db.employee.find({
        where: {
            userName: data.username,
            password:data.password
        }
    }).then(function (res) {
        return res;
    });
}

module.exports = {
    "getLeaves": Promise.method(getLeaves),
    "applyLeave": Promise.method(applyLeave),
    "leaveTypes": Promise.method(leaveTypes),
    "publicHolidays": Promise.method(publicHolidays),
    "cancelLeave": Promise.method(cancelLeave),
    "leaveApproval": Promise.method(leaveApproval),
    "approvalPending": Promise.method(approvalPending),
    "getStatictics": Promise.method(getStatictics),
    "getBalance": Promise.method(getBalance),
    "logme": Promise.method(logme)
};