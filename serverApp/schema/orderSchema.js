var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;

var orderSchema = mongoose.Schema({
	description: {
		type:String,
		required: true
	},
	source: {
		lat: {
			type:String,
			required: false
		},
		lng: {
			type:String,
			required: false
		}
	},
	destination: {
		lat: {
			type:String,
			required: false
		},
		lng: {
			type:String,
			required: false
		}
	},
	estimated_time: {
		type:String,
		required: false
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.ORDER, orderSchema);
