var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.editIngPOST = function(req, res) {
	Ingredient.findById(req.body.id, function (err, ing) {
		if (err) return handleError(err);

		// Edit Item in database
		ing.name = req.body.name;
		ing.price = req.body.price;
		ing.save(function (err) {
			if (err) return handleError(err);
			res.send(ing);
		});
	});
};

module.exports = routes;