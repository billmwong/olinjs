var Order = require('../models/orderModel.js');

var routes = {};

routes.delOrderPOST = function(req, res) {
	Order.findById(req.body.id, function (err, order) {
		if (err) return handleError(err);

		// Delete entry
		order.remove(function(err) {
			if (err) return handleError(err);
			res.send(order);
		})
	});
};

module.exports = routes;