const mongoose = require('mongoose');
Gardener = require("../models/gardenerModel.js")(mongoose);
Garden = require("../models/gardenModel.js")(mongoose);
Sensor = require("../models/sensorModel.js")(mongoose);
Maintenance = require("../models/maintenanceModel.js")(mongoose);

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

exports.sensors_of_garden = function(req, res) {
	Sensor.find({garden: req.params.id.toObjectId()})
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

//, startTime: {$gte: new Date()}

exports.calendar_of_garden = function(req, res) {
	Maintenance.find({garden: req.params.id.toObjectId()}, function(err, maint) {
		if (err || maint == null)
			res.send(err);
		res.json(maint);
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

