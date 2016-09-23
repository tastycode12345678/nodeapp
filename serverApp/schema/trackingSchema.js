var mongoose = require('mongoose');
var CONSTANT = require('../config/constant').CONSTANT;

var trackingSchema = mongoose.Schema({
	user_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: CONSTANT.SCHEMA.USER,
		required: true
	},
	order_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: CONSTANT.SCHEMA.ORDER,
		required: true
	},
	start_time: {
		type:String,
		required: false
	},
	end_time: {
		type:String,
		required: false
	},
	tracking : {
		type: Array
	}
});

module.exports = mongoose.model(CONSTANT.SCHEMA.TRACKING, trackingSchema);