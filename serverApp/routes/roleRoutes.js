var roleModel = require('../model/roleModel').RoleModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/createrole', function(req, res){
		roleModel.createRole(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.post('/getrolebyid', function(req, res){
		roleModel.getRoleById(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.get('/getallroles', function(req, res){
		roleModel.getAllRoles().then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});
};
