var orderSchema = require('../schema/orderSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;

function OrderModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

OrderModel.prototype.createOrder = function(orderObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			orderSchema.create(orderObject, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					that.serverResponse.success = 1;
					that.serverResponse.response = { successmsg: 'Order Created Successfully.' };
					resolve(that.serverResponse);
				}
			});
		} catch(err){
			that.serverResponse.error = 1;
			that.serverResponse.response = err;
			reject(that.serverResponse);
		}
	});
};

OrderModel.prototype.getAllOrders = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			orderSchema.find({}, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}
				else{
					if(response.length > 0){
						that.serverResponse.success = 1;
						that.serverResponse.response = response;
						resolve(that.serverResponse);
					}else{
						that.serverResponse.error = 1;
						that.serverResponse.response = {'errmsg': 'No order found.'};
						resolve(that.serverResponse);
					}
				}
			});
		} catch(e){
			that.serverResponse.error = 1;
			that.serverResponse.response = e;
			reject(that.serverResponse);
		}
	});
};

OrderModel.prototype.getOrderById = function(orderObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			orderSchema.findOne({'_id': orderObject.orderId}, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}
				else{
					if(response){
						that.serverResponse.success = 1;
						that.serverResponse.response = response;
						resolve(that.serverResponse);
					}else{
						that.serverResponse.error = 1;
						that.serverResponse.response = response;
						reject(that.serverResponse);
					}
				}
			});
		} catch(e){
			that.serverResponse.error = 1;
			that.serverResponse.response = e;
			reject(that.serverResponse);
		}
	});
};

module.exports.OrderModel = new OrderModel();