var Order = require('../models/orderModel.js');
// var mongoose = require('mongoose');

var routes = {};

routes.addOrderPOST = function(req, res) {
	var IDs = req.body['ingredients[]'];
	// JS passes the ingredients as a string instead of an array
	// if there's only one ingredient for some reason...
	if (typeof IDs === 'string') {
		IDs = [IDs];
	}
	// var castedIDs = [];
	// for (var i=0; i<IDs.length; i++) {
	// 	castedIDs.push(mongoose.Types.ObjectId(IDs[i]));
	// }

	var thisOrder = new Order({
		ingredients: IDs
	});
	// thisOrder.save();
	console.log('saving...')
	thisOrder.save(function (err) {
		if (err) return handleError(err);
		console.log('saved')
		res.send(thisOrder);
	});
};

module.exports = routes;