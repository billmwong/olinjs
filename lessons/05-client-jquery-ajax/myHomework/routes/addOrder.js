var Order = require('../models/orderModel.js');
var mongoose = require('mongoose');

var routes = {};

routes.addOrderPOST = function(req, res) {
	// JS passes the ingredients as a string instead of an array
	// if there's only one ingredient for some reason...
	var IDs = req.body['ingredients[]'];
	if (typeof IDs === 'string') {
		IDs = [IDs];
	}
	var castedIDs = [];
	for (var i=0; i<IDs.length; i++) {
		castedIDs.push(mongoose.Types.ObjectId(IDs[i]));
	}

	var thisOrder = new Order({
		ingredients: castedIDs
	});
	thisOrder.save();
	res.send(thisOrder);
};

module.exports = routes;