var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var passport = require('passport');
//var Strategy = require('passport-twitter').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var tweet = require('./apps/tweet');
var db = require('./apps/db');

//tweet('ｆｊｌｓｆｊぁｓｆｊ');
//db.register('0114C42F3214F004', '@tsunosekai');
//db.register('0114B42FAC126A18', '@rauzii');
//  .then(()=>console.log('OK'));

//passport.use(new Strategy({
//    consumerKey: process.env.CONSUMER_KEY,
//    consumerSecret: process.env.CONSUMER_SECRET,
//    callbackURL: 'http://127.0.0.1:3000/login/twitter/return'
//  },
//  function(token, tokenSecret, profile, cb) {
//    return cb(null, profile);
//  }));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//app.get('/login/twitter',
//        passport.authenticate('twitter'));
//
//app.get('/login/twitter/return', 
//  passport.authenticate('twitter', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/');
//});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);

module.exports = app;
