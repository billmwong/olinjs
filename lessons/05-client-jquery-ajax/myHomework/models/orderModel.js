var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	ingredients: [mongoose.Schema.ObjectId],
	
});

module.exports = mongoose.model("order", orderSchema);