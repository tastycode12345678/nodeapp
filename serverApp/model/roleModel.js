var roleSchema = require('../schema/roleSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;

function RoleModel(){
	this.serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
}

RoleModel.prototype.createRole = function(roleObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			roleSchema.create(roleObject, function(err, response){
				if(err){
					console.log(err);
					that.serverResponse.error = 1;
					that.serverResponse.response = err;
					reject(that.serverResponse);
				}
				else{
					that.serverResponse.success = 1;
					that.serverResponse.response = { successmsg: 'Role Created Successfully.' };
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

RoleModel.prototype.getAllRoles = function(){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			roleSchema.find({}, function(err, response){
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
						that.serverResponse.response = {'errmsg': 'No roles found.'};
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

RoleModel.prototype.getRoleById = function(roleObject){
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			roleSchema.findOne({'_id': roleObject.roleId}, function(err, response){
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

module.exports.RoleModel = new RoleModel();