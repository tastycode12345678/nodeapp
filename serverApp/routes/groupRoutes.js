var groupModel = require('../model/groupModel').GroupModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/creategroup', function(req, res){
		groupModel.createGroup(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.post('/getgroupbyid', function(req, res){
		groupModel.getGroupById(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.get('/getallgroups', function(req, res){
		groupModel.getAllGroups().then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});
};
