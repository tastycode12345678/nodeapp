var mixedModel = require('../model/mixedModel').MixedModel;
var CONSTANT = require('../config/constant').CONSTANT;
//var pushbots = require('pushbots');
var apn = require('apn');

module.exports = function(app) {

	app.post('/alexadata', function(req, res){
		res.send({response: "currently available in Magarpatta"});
		// mixedModel.alexahandler(req.body).then(function(response){
		// 	res.send(response);
		// }, function(err){
		// 	res.status(500);
		// 	res.send(err);
		// });
	});

	app.get('/alexalocation', function(req, res){
		res.send({response: "John is currently in the vicinity of Danny"});
		//Send notification
	});

	app.post('/setdeviceid', function(req, res){
		mixedModel.setDeviceId(req.body).then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});

	app.get('/sendnotification', function(req, res){
		mixedModel.sendNotification().then(function(response){
			res.send(response);
		}, function(err){
			res.status(500);
			res.send(err);
		});
	});




	// var Pushbots = new pushbots.api({
	//     id:'554b5b3017795901138b456a',
	//     secret:'25cd64e9034f4edbc80f600304ee7081'
	// });
	// Pushbots.setMessage("Hi from new nodeJS API!");//sending to (android and ios) platforms by default add optional paramater "0" for iOS, "1" for Android and "2" for Chrome.
	// Pushbots.customFields({"article_id":"1234"});
	// Pushbots.customNotificationTitle("CUSTOM TITLE");
	// //to send by tags
	// Pushbots.sendByTags(["myTag"]);

	// // //to push to all
	// // Pushbots.push(function(response){
	// //     console.log(response);
	// // });

	// //to push to one device
	// var token = "7c424d80e8ffbde00f1ca4a30bfcd9e06b3e277431aaac48741b5e8922668cb1";
	// Pushbots.pushOne(token, function(response){
	//     console.log(response);
	// });
};
