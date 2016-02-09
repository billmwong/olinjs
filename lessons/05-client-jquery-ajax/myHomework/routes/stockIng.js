var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.stockIngPOST = function(req, res) {
	// Ingredient.find({id: req.body.id}, function(err, Ing) {
	// })
	// Ingredient.findByIdAndRemove(req.body.id, function() {
	// 	console.log('removed id '+req.body.id+' from the database');
	// });
	// thisIng.save();
	// console.log(JSON.stringify(thisIng));
	// res.send(thisIng);
	Ingredient.findById(req.body.id, function (err, ing) {
		if (err) return handleError(err);

		// Toggle the stock status
		ing.inStock = !ing.inStock;
		ing.save(function (err) {
			if (err) return handleError(err);
			res.send(ing);
		});
	});
};

module.exports = routes;