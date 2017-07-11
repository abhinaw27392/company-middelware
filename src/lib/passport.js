'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var assert = require('assert-plus');
var bunyan = require('bunyan');
var getopt = require('posix-getopt');
var restify = require('restify');
var passport = require('passport');
var passportAzureAd = require('passport-azure-ad');

var creds = {
    returnURL: 'https://localhost:3000/auth/openid/return',
    identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration', // For using Microsoft you should never need to change this.
    clientID: 'a81892e1-b3d2-4b72-a161-c285eb9d7e09',
    clientSecret: 'l07izfRJ0ZXPjXUKG48edQZbJWIIULsoACoGoJBQIm8=', // if you are doing code or id_token code
    skipUserProfile: true, // for AzureAD should be set to true.
    responseType: 'id_token code', // for login only flows use id_token. For accessing resources use `id_token code`
    responseMode: 'query', // For login only flows we should have token passed back to us in a POST
    //scope: ['email', 'profile'] // additional scopes you may wish to pass
};

var OIDCStrategy = passportAzureAd.OIDCStrategy;

// add a logger

var log = bunyan.createLogger({
    name: 'Portal API'
});

passport.use(new OIDCStrategy({
    callbackURL: creds.returnURL,
    //realm: creds.realm,
    clientID: creds.clientID,
    clientSecret: creds.clientSecret,
    //oidcIssuer: creds.issuer,
    identityMetadata: creds.identityMetadata,
    skipUserProfile: creds.skipUserProfile,
    responseType: creds.responseType,
    responseMode: creds.responseMode,
    redirectUrl: creds.returnURL
},
    function (iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.email) {
            return done(new Error("No email found"), null);
        }
        // asynchronous verification, for effect...
        process.nextTick(function () {
            findByEmail(profile.email, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // "Auto-registration"
                    users.push(profile);
                    return done(null, profile);
                }
                return done(null, user);
            });
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.email);
});

passport.deserializeUser(function (id, done) {
    findByEmail(id, function (err, user) {
        done(err, user);
    });
});

// array to hold signed-in users
var users = [];

var findByEmail = function (email, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        log.info('we are using user: ', user);
        if (user.email === email) {
            return fn(null, user);
        }
    }
    return fn(null, null);
};

module.exports = passport;