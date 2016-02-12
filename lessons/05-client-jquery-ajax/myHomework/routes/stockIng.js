var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.stockIngPOST = function(req, res) {
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