var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/userModel');
var Twote = require('../models/twoteModel.js')


router.get('/', function (req, res) {
    Twote.find({})
        .sort({_id: -1})
        .populate('creator')
        .exec(function(err, twotes) {
            User.find({}, function(err, users) {
                res.render('index', {
                    user: req.user,
                    twotes: twotes,
                    users: users
                });
            })
        });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username, name : req.body.username}), req.body.password, function(err, account) {
        // if (err) {
        //     return res.render('register', {info: "Sorry. That username already exists. Try again."});
        // }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// router.get('/ping', function(req, res){
//     res.status(200).send("pong!");
// });

router.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res){}
);

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);


router.get('/account', ensureAuthenticated, function(req, res){
  // DEPRECATED
  User.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.render('account', { user: user});
    }
  });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
}

module.exports = router;
