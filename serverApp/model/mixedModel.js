var orderModel = require('../model/orderModel').OrderModel;
var userModel = require('../model/userModel').UserModel;
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;

function MixedModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

MixedModel.prototype.alexahandler = function(obj){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			userModel.getUserById(obj).then(function(resp){
        		resolve(resp);
        	}, function(err){
				reject(err);
        	});
		} catch(err){
			reject(err);
		}
	});
};

module.exports.MixedModel = new MixedModel();