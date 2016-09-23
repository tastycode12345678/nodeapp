var orderModel = require('../model/orderModel').OrderModel;
var CONSTANT = require('../config/constant').CONSTANT;

module.exports = function(app) {

	app.post('/createorder', function(req, res){
		orderModel.createOrder(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.post('/getorderbyid', function(req, res){
		orderModel.getOrderById(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.get('/getallorders', function(req, res){
		orderModel.getAllOrders().then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});
};
