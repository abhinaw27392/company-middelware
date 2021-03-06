var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./src/index');

var app = express();
var passport = require('./src/lib/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var allowCrossDomain = function (req, res, next) {
       res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   

    next();
}


app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '25mb',
    // type(req) {
    //     return !!(is(req, ['application/json', 'application/vnd.api+json']));
    // },
}));
app.use(bodyParser.urlencoded({ limit: '25mb', extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// check authentication


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).end();
});

module.exports = app;
