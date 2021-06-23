const mongoose = require('mongoose');
Gardener = require("../models/gardenerModel.js")(mongoose);
Garden = require("../models/gardenModel.js")(mongoose);
Sensor = require("../models/sensorModel.js")(mongoose);
Maintenance = require("../models/maintenanceModel.js")(mongoose);

const bcrypt = require('bcrypt');
const PRIVATE_SECRET_KEY = '4972DD665B421C97CDE1A933E54AAC067464593A1773A6C9A8B378F5CFCBBAD68B5023307F65AAEF858A6CA70D2D979A0CF3DE487359B366EAB20F3C7BDBFDA4';
const jwt = require('jsonwebtoken');

exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.list_gardens = function(req, res) {
	Garden.find({}, function(err, gardens) {
		if (err)
			res.send(err);
		res.json(gardens);
	});
};

exports.list_gardeners = function(req, res) {
	Gardener.find({}, function(err, gardeners) {
		if (err)
			res.send(err);
		res.json(gardeners);
	});
};

exports.list_sensors = function(req, res) {
	Sensor.find({}, function(err, sensors) {
		if (err)
			res.send(err);
		res.json(sensors);
	});
};

exports.list_maintenances = function(req, res) {
	Maintenance.find({}, function(err, maintenances) {
		if (err)
			res.send(err);
		res.json(maintenances);
	});
};

exports.gardens_in_need = function(req, res) {
	Garden.find({})
		.sort({'flagsOn': -1})
		.limit(parseInt(req.params.max))
		.exec(function(err, gardens) {
			if (err || gardens == null)
				res.send(err);
			res.json(gardens);
		});
};

exports.sensors_of_garden = function(req, res) {
	if (req.params.id != "undefined") {
		Sensor.find({garden: req.params.id.toObjectId()})
			.sort({'flagOn': -1, 'API': 1})
			.exec(function (err, sensor) {
				if (err || sensor == null)
					res.send(err);
				res.json(sensor);
			});
	}
};

exports.on_sensors_of_garden = function(req, res) {
	if (req.params.id != "undefined") {
		Sensor.find({garden: req.params.id.toObjectId(), flagOn: true})
			.sort({'flagOn': -1, 'API': 1})
			.exec(function (err, sensor) {
				if (err || sensor == null)
					res.send(err);
				res.json(sensor);
			});
	}
};

exports.next_on_garden = function(req, res) {
	if (req.params.id != "undefined") {
		Maintenance.find({garden: req.params.id.toObjectId(), startTime: {$gte: new Date()}})
			.sort({'startTime': 1})
			.limit(parseInt(req.params.n))
			.exec( function(err, maint) {
			if (err || maint == null) {
				res.send(err);
			}
			else {
				res.json(maint);
			}
		});
	}
};

exports.calendar_of_garden = function(req, res) {
	if (req.params.id != "undefined") {
		Maintenance.find({garden: req.params.id.toObjectId()}, function (err, maint) {
			if (err || maint == null)
				res.send(err);
			res.json(maint);
		});
	}
};

exports.calendar_of_gardener = function(req, res) {
	if (req.params.id != "undefined"){
		Maintenance.find({gardener: req.params.id.toObjectId()}, function(err, maints) {
			if (err || maints == null)
				res.send(err);
			res.json(maints);
		});
	}
};

exports.calendar_of_garden_and_gardener = function(req, res) {
	if (req.params.gardenerid != "undefined" && req.params.gardenid != "undefined"){
		Maintenance.find({gardener: req.params.gardenerid.toObjectId(), garden: req.params.gardenid.toObjectId()}, function(err, maints) {
			if (err || maints == null)
				res.send(err);
			res.json(maints);
		});
	}
};

exports.garden_info = function(req, res) {
	Garden.findById({_id: req.params.id}, function(err, garden) {
		if (err)
			res.send(err);
		res.json(garden);
	});
};

exports.maintenance_done = function(req, res) {
	Maintenance.findOneAndUpdate({_id: req.params.id}, {done:true}, {new: true}, function(err, maint) {
		if (err)
			res.send(err);
		else{
			if(maint==null){
				res.status(404).send({
					description: 'Maintenance not found'
				});
			}
			else{
				res.json(maint);
			}
		}
	});
};

exports.change_maintenance_state = function(req, res) {
	Maintenance.findOneAndUpdate({_id: req.params.id}, { done: req.params.state }, {new: true}, function(err, maint) {
		if (err)
			res.send(err);
		else{
			if(maint==null){
				res.status(404).send({
					description: 'Maintenance not found'
				});
			}
			else{
				res.json(maint);
			}
		}
	});
};

exports.create_maintenance = function(req, res) {
	var new_maintenance = new Maintenance(req.body);
	new_maintenance.save(function(err, maint) {
		if (err)
			res.send(err);
		res.status(201).json(maint);
	});
};

exports.update_sensor = function(req, res) {
	Sensors.findOneAndUpdate(
		{API: req.params.API, fieldname: req.params.fieldname},
		{value:req.params.value},
		{new: true},
		function(err, sensor) {
			if (err)
				res.send(err);
			else{
				if(sensor==null){
					res.status(404).send({
						description: 'Sensor not found'
					});
				}
				else{
					res.json(sensor);
				}
			}
		});
};

exports.gardener_info = function(req, res) {
	let userId = req.params.id;
	let authResult = auth(req, userId);
	if(authResult.isValidToken) {
		let token = authResult.token;
		Gardener.findOne({user_id: token.user}, function(err, gardener) {
			if (err) {
				res.status(500).send(err);
			}
			res.json(gardener);
		});
	} else {
		res.status(401).send("Accesso non autorizzato");
	}
};

exports.registration = function(req, res) {
	let newGardenerTmp = req.body.params;
	newGardenerTmp.salt = bcrypt.genSaltSync(10);
	newGardenerTmp.password = bcrypt.hashSync(newGardenerTmp.password, newGardenerTmp.salt);

	let newGardener = new Gardener(newGardenerTmp);
	newGardener.save(function(err, gardener) {
		if (err)
			res.send(false);
		res.status(201).send(true);
	});
}

exports.login = function(req, res) {
	let userId = req.body.params.userId;
	let password = req.body.params.password;
	Gardener.findOne({user_id: userId}, 'user_id password salt', function(err, gardener) {
		if(err || gardener == null){
			res.send({
				result: false
			});
		} else {
			if(bcrypt.compareSync(password ,gardener.password)) {
				let token = jwt.sign({user: gardener.user_id, id: gardener._id}, PRIVATE_SECRET_KEY, {
					algorithm: 'HS512',
					expiresIn: '2d'
				});
				res.send({
					result: true,
					token: token,
					id: gardener._id
				});
			} else {
				res.send({
					result: false
				});
			}
		}
	});
}

exports.checkUsername = function(req, res) {
	let requestUser = req.query.userId;
	Gardener.exists({user_id: requestUser }, function(err, result) {
		res.send(result);
	});
}

function auth(req, user) {
	const token = req.headers['authorization'];
	let res;

	if(token == null) {
		res = {
			isValidToken: false
		};
	}

	try {
		const decodedToken = jwt.verify(token, PRIVATE_SECRET_KEY);
		if(decodedToken.user === user) {
			res = {
				isValidToken: true,
				token: decodedToken
			}
		} else {
			res = {
				isValidToken: false
			}
		}
	} catch (e) {
		res = {
			isValidToken: false
		};
	}

	return res;
}