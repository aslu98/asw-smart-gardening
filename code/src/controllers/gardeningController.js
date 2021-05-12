var mongoose = require('mongoose');
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


/*EXAMPLES from LAB
exports.last_movie = function(req, res) {
	Movie.findOne({}, {}, {sort: {released: -1}}, function(err, movie) {
		if (err || movie == null)
			res.send(err);
		res.json(movie);
	});
};

exports.read_movie = function(req, res) {
	Movie.findById(req.params.id, function(err, movie) {
		if (err)
			res.send(err);
		else{
			if(movie==null){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json(movie);
			}
		}
	});
};

exports.create_movie = function(req, res) {
	var new_movie = new Movie(req.body);
	new_movie.save(function(err, movie) {
		if (err)
			res.send(err);
		res.status(201).json(movie);
	});
};

exports.update_movie = function(req, res) {
	Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, movie) {
		if (err)
			res.send(err);
		else{
			if(movie==null){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json(movie);
			}
		}
	});
};

exports.delete_movie = function(req, res) {
	Movie.deleteOne({_id: req.params.id}, function(err, result) {
		if (err)
			res.send(err);
		else{
			if(result.deletedCount==0){
				res.status(404).send({
					description: 'Movie not found'
				});
			}
			else{
				res.json({ message: 'Task successfully deleted' });
			}
		}
  });
};*/
