var routes = {};

routes.addIngPOST = function(req, res) {
	// console.log(req.body.name);
	res.send({
		name: 'poop',
		price: 99
	});
};

module.exports = routes;