var express = require('express');
var router = express.Router();
var Ingredient = require('../models/ingredientModel.js');
var Order = require('../models/orderModel.js');

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/ingredients', function(req, res, next) {
	Ingredient.find({}, function(err, ings) {
		res.render('ingredients', {ingredients: ings});
	});
});

router.get('/order', function(req, res, next) {
	Ingredient.find({}, function(err, ings) {
		res.render('order', {ingredients: ings});
	});
});

module.exports = router;
