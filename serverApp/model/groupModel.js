var groupSchema = require('../schema/groupSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;

function GroupModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

GroupModel.prototype.createGroup = function(groupObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			groupSchema.create(groupObject, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					that.serverResponse.success = 1;
					that.serverResponse.response = { successmsg: 'Group Created Successfully.' };
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

GroupModel.prototype.getAllGroups = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			groupSchema.find({}, function(err, response){
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
						that.serverResponse.response = {'errmsg': 'No group found.'};
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

GroupModel.prototype.getGroupById = function(groupObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			groupSchema.findOne({'_id': groupObject.roleId}, function(err, response){
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

module.exports.GroupModel = new GroupModel();