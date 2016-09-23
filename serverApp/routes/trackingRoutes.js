var trackingModel = require('../model/trackingModel').TrackingModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/createtracking', function(req, res){
		trackingModel.createTracking(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.post('/gettrackingbyid', function(req, res){
		trackingModel.getTrackingById(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.get('/getalltrackings', function(req, res){
		trackingModel.getAllTrackings().then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});
};
