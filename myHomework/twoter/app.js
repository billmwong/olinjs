var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var Account = require('./models/accountModel');
var User = require('./models/userModel');
var fbAuth = require('./fbAuth.js');
var localAuth = require('./localAuth.js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost/twoter');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.session({ secret: 'secret' }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false ,
  cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

// passport.serializeUser(function(user, done) { 
//   // please read the Passport documentation on how to implement this. We're now
//   // just serializing the entire 'user' object. It would be more sane to serialize
//   // just the unique user-id, so you can retrieve the user object from the database
//   // in .deserializeUser().
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) { 
//   // Again, read the documentation.
//   // done(null, user);
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });

// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// // serialize and deserialize
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = app;
