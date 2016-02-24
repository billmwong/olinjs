// Setup our assertion library
var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../app.js');
var index = require('./../../routes/index');
var User = require('../../models/userModel.js');
var Twote = require('../../models/twoteModel.js');
var user = request.agent('http://localhost:3000');

describe("index", function() {
	// Randomly-generated fields in hopes that
	// they don't already exist in the database
	var usertemp = "hhk5z6r5a1v9tujhwxlb";
	var passtemp = "vw90dlktq35dwj1a2srh";
	var twotetemp = "8uypai1kyf8tcatif6fq";

	it('should return 404 on GET /notaroute', function(done) {
	  request(app)
	    .get('/notaroute')
	    .expect(404, done);
	});

	it('should return 200 OK on GET /', function(done) {
	  request(app)
	    .get('/')
	    .expect(200, done);
	});

	it('should return 200 OK on GET /login', function(done) {
	  request(app)
	    .get('/login')
	    .expect(200, done);
	});

	it('should return 302 redirect when registering a user', function(done) {
		user.post('/register')
			.send({username: usertemp, password: passtemp})
			.expect(302, done);
	})

	it('should return 500 trying to register user that already exists', function(done) {
		user.post('/register')
			.send({username: usertemp, password: passtemp})
			.expect(500, done);
	})

	it('should return 302 redirect when logging in', function(done) {
		user.post('/login')
			.send({username: usertemp, password: passtemp})
			.expect(302, done);
	})

	it('should return 200 OK when posting a twote', function(done) {
		user.post('/newTwote')
			.send({twoteText: twotetemp})
			.expect(200, done);
	})

	it('should return 302 redirect when logging out', function(done) {
		user.get('/logout')
			.expect(302, done);
	})

	it('should return 403 forbidden when posting a twote when logged out', function(done) {
		user.post('/newTwote')
			.send({twoteText: twotetemp})
			.expect(403)
			.end(function(err, res) {
				User.find({username: usertemp})
					.remove(function(err, thisUser) {
						Twote.find({text: twotetemp})
							.remove(function(err, twote) { });
					});
				done();
			});
	})

	// User.remove({username: usertemp})
	// User.findOne({username: usertemp}, function(err, thisUser) {
	// 	thisUser.remove(function(err) {});
	// })
	// User.find({username: usertemp})
	// 	.remove(function(err, thisUser) { });
});

// describe("The app", function() {
// 	it('should return 200 OK on POST /newTwote', function(done) {
// 	  request(app)
// 	    .post('/newTwote')
// 	    .send({twoteText: "blah"})
// 	    .expect(200, done);
// 	});

// 	it('should return 200 OK on POST /delTwote', function(done) {
// 	  request(app)
// 	    .post('/delTwote')
// 	    .send({id: "idman"})
// 	    .expect(200, done);
// 	});
// })
