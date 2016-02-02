var express = require('express');
var router = express.Router();
var Robot = require('../models/robotModel.js');
// var mongoose = require('mongoose');

// var Robot = mongoose.model('Robot', robotSchema);

// var myRobot = {name: 'bob', abilities:['jump','fly'], isEvil:true};
var myRobot = new Robot({name: 'bob', abilities:['jump','fly'], isEvil:true});

myRobot.save(function(err) {
	console.log('saved myRobot');
})

Robot.find({}, function(err, robots){
  console.log(JSON.stringify(robots, null, 4));
  console.log('length: ' + robots.length)
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
