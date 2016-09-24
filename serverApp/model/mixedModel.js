var orderModel = require('../model/orderModel').OrderModel;
var userModel = require('../model/userModel').UserModel;
var groupModel = require('../model/groupModel').GroupModel;
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
var apn = require('apn');

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

MixedModel.prototype.setDeviceId = function(obj){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			obj._id = "57e50fb5c6cd3c04ac29f5b0";
			groupModel.updateGroup(obj).then(function(resp){
        		resolve(resp);
        	}, function(err){
				reject(err);
        	});
		} catch(err){
			reject(err);
		}
	});
};

MixedModel.prototype.sendNotification = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			var obj = {};
			obj.groupId = "57e50fb5c6cd3c04ac29f5b0";
			groupModel.getGroupById(obj).then(function(resp){
				var options = {};
				var apnProvider = new apn.Provider(options);
				var note = new apn.Notification();
				//var deviceToken = "7c424d80e8ffbde00f1ca4a30bfcd9e06b3e277431aaac48741b5e8922668cb1";
				note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
				//note.badge = 3;
				note.sound = "ping.aiff";
				note.alert = "\uD83D\uDCE7 \u2709  Order #123456 has been delayed by John.";
				note.payload = {'messageFrom': 'John'};
				note.topic = "com.extentia.LostAndFound";
				console.log(">>>>>>>>>>"+ resp.response.deviceToken);
				apnProvider.send(note, resp.response.deviceToken).then(function(result){
				    that.serverResponse.success = 1;
				    that.serverResponse.response = result;
				    resolve(that.serverResponse);
				}, function(error) {
					that.serverResponse.error = 1;
				    that.serverResponse.response = error;
					reject(that.serverResponse);
				});
	    	}, function(err){
	    		console.log(">>>>>>>>>>");
				reject(err);
	    	});
		} catch(err){
			reject(err);
		}
	});
};

module.exports.MixedModel = new MixedModel();