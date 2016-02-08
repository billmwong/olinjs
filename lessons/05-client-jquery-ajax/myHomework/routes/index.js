var express = require('express');
var router = express.Router();
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/ingredientModel.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ingredients', function(req, res, next) {
  res.render('ingredients', { ingredients: [{name:'poop',price:4.75},{name:'David',price:0.10}] });
});

module.exports = router;
