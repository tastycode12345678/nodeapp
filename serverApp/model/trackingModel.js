var trackingSchema = require('../schema/trackingSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;

function TrackingModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

TrackingModel.prototype.createTracking = function(trackingObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			trackingSchema.create(trackingObject, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					that.serverResponse.success = 1;
					that.serverResponse.response = { successmsg: 'Tacking Created Successfully.' };
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

TrackingModel.prototype.getAllTrackings = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			trackingSchema.find({}, function(err, response){
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
						that.serverResponse.response = {'errmsg': 'No tracking found.'};
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

TrackingModel.prototype.getTrackingById = function(trackingObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			trackingSchema.findOne({'_id': trackingObject.trackingId}, function(err, response){
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

module.exports.TrackingModel = new TrackingModel();