const mongoose = require('mongoose');
Gardener = require("../models/gardenerModel.js")(mongoose);
Garden = require("../models/gardenModel.js")(mongoose);
Sensor = require("../models/sensorModel.js")(mongoose);
Maintenance = require("../models/maintenanceModel.js")(mongoose);

const bcrypt = require('bcrypt');

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
	Sensor.find({garden: req.params.id.toObjectId()})
		.sort({'flagOn': -1, 'API': 1})
		.exec(function(err, sensor) {
		if (err || sensor == null)
			res.send(err);
		res.json(sensor);
	});
};

exports.on_sensors_of_garden = function(req, res) {
	Sensor.find({garden: req.params.id.toObjectId(), flagOn: true})
		.sort({'flagOn': -1, 'API': 1})
		.exec(function(err, sensor) {
			if (err || sensor == null)
				res.send(err);
			res.json(sensor);
		});
};

exports.next_on_garden = function(req, res) {
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
};

exports.calendar_of_garden = function(req, res) {
	Maintenance.find({garden: req.params.id.toObjectId()}, function(err, maint) {
		if (err || maint == null)
			res.send(err);
		res.json(maint);
	});
};

exports.calendar_of_gardener = function(req, res) {
	Maintenance.find({gardener: req.params.id.toObjectId()}, function(err, maints) {
		if (err || maints == null)
			res.send(err);
		res.json(maints);
	});
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


exports.create_maintenance = function(req, res) {
	var new_maintenance = new Maintenance(req.body);
	new_maintenance.save(function(err, maint) {
		if (err)
			res.send(err);
		res.status(201).json(maint);
	});
};
/* EXAMPLE of post request for create_maintenance
axios.post("http://localhost:3000/api/maintenances", {
				garden: "609412d316b7f0346c54a093",
				startTime: new Date("2021-05-30T17:00:00.000"),
				duration: 60,
				done: false,
				gardener: "60944e8316b7f0346c54a49d"})
*/

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

exports.login = function(req, res) {

}

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

exports.checkUsername = function(req, res) {
	let requestUser = req.query.userId;
	Gardener.exists({user_id: requestUser }, function(err, result) {
		res.send(result);
	});
}

