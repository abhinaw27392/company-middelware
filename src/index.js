'use strict';

const express = require('express');
var router = express.Router();
var passport = require('./lib/passport');
var leaveObj = require('./controllers/leaves');
var inventoryObj = require('./controllers/inventories');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.status(403).end();
};


//router.get('/:id/leaves', ensureAuthenticated,  leaveObj.getLeaves);
router.get('/:id/leaves', leaveObj.getLeaves);
router.post('/:id/leaves', leaveObj.applyLeave);
router.get('/leaveTypes', leaveObj.leaveTypes);
router.get('/publicHolidays', leaveObj.publicHolidays);
router.get('/leaves/pending', leaveObj.approvalPending);
router.delete('/:id/leaves/:leaveId', leaveObj.cancelLeave);
router.post('/:id/leaves/:leaveId', leaveObj.leaveApproval);
router.get('/:id/leaves/statistics', leaveObj.getStatictics);
router.get('/auth/openid',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        log.info('Authentication was called in the Portal');
        res.redirect('/');
    });
router.get('/auth/openid/return',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    });
router.post('/auth/openid/return',
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }),
    function (req, res) {
        log.info('We received a return from AzureAD.');
        res.redirect('/');
    });

router.get('/:id/assets', inventoryObj.getAssets);

router.get('/getCategory', inventoryObj.getcat);


router.post('/:id/assets', inventoryObj.createAsset);

router.patch('/:id/assets/:inventoryNo', inventoryObj.transferAsset);

//router.post('/assets',inventoryObj.createAsset); 
router.post('/:id/getBalance', leaveObj.getBalance);

router.post('/login', leaveObj.logme);

module.exports = router;