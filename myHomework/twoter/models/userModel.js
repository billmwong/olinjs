var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

var User = mongoose.model('User', {
	oauthID: Number,
	name: String,
	created: Date
});

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);