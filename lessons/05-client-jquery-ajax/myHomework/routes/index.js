var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Ingredient = require('./../models/ingredientModel.js');
var Order = require('./../models/orderModel.js');

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

router.get('/kitchen', function(req, res, next) {
	// Find all the orders and ingredients in the db
	Order.find({})
		.populate('ingredients')
		.exec(function(err, orders) {
			res.render('kitchen', {orders: orders});
		});
});

module.exports = router;
