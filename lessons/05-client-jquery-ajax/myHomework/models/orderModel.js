var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
	// ingredients: [mongoose.Schema.ObjectId]
	ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]
});

module.exports = mongoose.model("order", orderSchema);