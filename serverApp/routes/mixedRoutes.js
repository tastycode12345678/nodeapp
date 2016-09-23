var mixedModel = require('../model/mixedModel').MixedModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/alexadata', function(req, res){
		res.send("currently available in Magarpatta");
		// mixedModel.alexahandler(req.body).then(function(response){
		// 	res.send(response);
		// }, function(err){
		// 	res.status(500);
		// 	res.send(err);
		// });
	});

	app.get('/alexalocation', function(req, res){
		res.send("John is currently in the vicinity of Danny");
		//Send notification
	});
};
