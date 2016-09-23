var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;

var roleSchema = mongoose.Schema({
	name: {
		type:String, 
		required: true
	},
	description: {
		type:String, 
		required: true
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.ROLES, roleSchema);
