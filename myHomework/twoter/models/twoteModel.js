var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//interesting choice to have the twote reference the user instead of having the user reference the twote. 
var Twote = new Schema({
	text: String,
	creator: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Twote', Twote);
