var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;
const crypto = require('crypto');

var userSchema = mongoose.Schema({
	name: {
		type:String,
		required: true
	},
	email:{
		type: String,
		required: false
	},
	password: {
		type:String,
		required: false,
		validate:[function(password){
			return password.length >= 8;
		}, 'Password should be minimum 8 characters in length.']
	},
	phone_number: {
		type: Number,
		required: false
	},
	role_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: CONSTANT.SCHEMA.ROLES,
		required: true
	},
	group_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: CONSTANT.SCHEMA.GROUP,
		required: true
	}
});

// userSchema.pre('save', function(next){
// 	if(this.password){
// 		this.password = crypto.createHmac('sha256', CONSTANT.SECRET).update(this.password).digest('hex');
// 	}
// 	if(this.isNew){
// 		console.log('User added successfully.');
// 	} else {
// 		console.log('User updated successfully.');
// 	}
// 	next();
// });

module.exports = mongoose.model(CONSTANT.SCHEMA.USER, userSchema);
