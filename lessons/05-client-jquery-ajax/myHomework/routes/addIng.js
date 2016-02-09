var Ingredient = require('../models/ingredientModel.js');

var routes = {};

routes.addIngPOST = function(req, res) {
	var thisIng = new Ingredient({
		name: req.body.name,
		price: req.body.price,
		inStock: true
	});
	thisIng.save();
	console.log(JSON.stringify(thisIng));
	res.send(thisIng);
};

module.exports = routes;