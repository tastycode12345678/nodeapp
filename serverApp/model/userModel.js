var userSchema = require('../schema/userSchema');
var Promise = require('promise');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');
var nodemailer = require('nodemailer');
var deleteKey = require('key-del')

function UserModel(){

}

UserModel.prototype.createUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.create(userObject, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					serverResponse.success = 1;
					serverResponse.response = { _id: response._id };
					resolve(serverResponse);
				}
			});
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.getAllUsers = function(){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.find({ role_id: { $ne: '56f1067c4c1108dc2926a5bd' } }, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response.length > 0){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'No users found.'};
						resolve(serverResponse);
					}
				}
			});
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.updateUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.update({'_id': userObject._id}, userObject, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					serverResponse.success = 1;
					serverResponse.response = { _id: userObject._id };
					resolve(serverResponse);
				}
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.deleteUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.remove({'_id': userObject.userid}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'No such user found.'};
						reject(serverResponse);
					}
				}
			});
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.validateUser = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.find({'phone_number': userObject.phone_number}, {name: 1, email: 1, phone_number: 1, role_id: 1}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response.length > 0){
						serverResponse.success = 1;
						serverResponse.response = response[0];
						resolve(serverResponse);
					} else {
						serverResponse.error = 1;
						serverResponse.response = {errmsg: 'Invalid Credentials Provided.'};
						reject(serverResponse);
					}
				}
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.validateEmail = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.findOne({'email': userObject.email }, {firstName: 1, lastName: 1, isNewLogin: 1, number: 1, username: 1}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response){
						console.log(userObject.username + ' ' + response.username);
						if(userObject.username == response.username){
							resolve(response);
						} else{
							serverResponse.error = 1;
							serverResponse.response = {'errmsg': 'Invalid username provided.'};
							reject(serverResponse);
						}
					} else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'Invalid email provided.'};
						reject(serverResponse);
					}
				}
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.resetPassword = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	var that = this;
	return new Promise(function(resolve, reject){
		try{
			that.validateEmail(userObject).then(function(userObj){
				if(userObj){
					userObj.password = password_generator(CONSTANT.RESET_PASSWORD_LENGTH);
					var refPassword = userObj.password;
					userObj.isNewLogin = 1;
					userObj.save(function(err, response){
						if(err){
							console.log(err);
							serverResponse.error = 1;
							serverResponse.response = err;
							reject(serverResponse);
						}
						else{
							var transporter = nodemailer.createTransport({
						        service: 'Gmail',
						        auth: {
						            user: 'encotechtest@gmail.com', // Your email id
						            pass: '#encotechtest123' // Your password
						        }
						    });
						    var mailOptions = {
							    from: 'encotechsolutions@gmail.com', // sender address
							    to: 'abdi786007@gmail.com', // list of receivers
							    subject: 'Hey! Your password is changed', // Subject line
							    text:  'Greetings from the Encotech Team. Your new password is: ' + refPassword//, // plaintext body
							    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
							};
							transporter.sendMail(mailOptions, function(error, info){
							    if(error){
							        console.log(error);
									serverResponse.error = 1;
									serverResponse.response = error;
							        reject(serverResponse);
							    }else{
							    	response = deleteKey(response,['password']);
							        console.log('Message sent: ' + info.response);
									serverResponse.success = 1;
									serverResponse.response = response;
							        resolve(serverResponse);
							    };
							});
						}
					});
				} else{
					serverResponse.error = 1;
					serverResponse.response = userObj;
					reject(serverResponse);
				}
			}, function(err){
				console.log(err);
				serverResponse.error = 1;
				serverResponse.response = err.response;
				reject(serverResponse);
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

UserModel.prototype.changePassword = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			var oldPassword = crypto.createHmac('sha256', CONSTANT.SECRET).update(userObject.oldpassword).digest('hex');
			userSchema.findOne({'email': userObject.email, 'password': oldPassword}, function(err, userObj){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				} else {
					if(userObj){
						userObj.password = userObject.password;
						userObj.isNewLogin = 0;
						userObj.save(function(err, response){
							if(err){
								console.log(err);
								serverResponse.error = 1;
								serverResponse.response = err;
								reject(serverResponse);
							}
							else{
								response = deleteKey(response,['password']);
								serverResponse.success = 1;
								serverResponse.response = response;
								resolve(serverResponse);
							}
						});
					} else {
						serverResponse.error = 1;
						serverResponse.response = userObj;
						reject(serverResponse);
					}
				}
			});
		} catch(e){
			console.log(e);
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
}

function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz";
    var numeric = '0123456789';
    var punctuation = '!@#$%';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    return password;
}

UserModel.prototype.getUserById = function(userObject){
	var serverResponse = {
		'success': 0,
		'error': 0,
		'response': {}
	}
	return new Promise(function(resolve, reject){
		try{
			userSchema.findOne({'_id': userObject.userid}, function(err, response){
				if(err){
					console.log(err);
					serverResponse.error = 1;
					serverResponse.response = err;
					reject(serverResponse);
				}
				else{
					if(response){
						serverResponse.success = 1;
						serverResponse.response = response;
						resolve(serverResponse);
					}else{
						serverResponse.error = 1;
						serverResponse.response = {'errmsg': 'User not found.'};
						reject(serverResponse);
					}
				}
			});
		} catch(e){
			serverResponse.error = 1;
			serverResponse.response = e;
			reject(serverResponse);
		}
	});
};

module.exports.UserModel = new UserModel();