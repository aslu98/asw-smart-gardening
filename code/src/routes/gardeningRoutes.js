module.exports = function(app) {
	var controller = require('../controllers/gardeningController');

	app.route('/api/gardens')
		.get(controller.list_gardens)

	app.route('/api/gardeners')
		.get(controller.list_gardeners)

	app.route('/api/sensors')
		.get(controller.list_sensors)

	app.route('/api/maintenances')
		.get(controller.list_maintenances)

	app.use(controller.show_index);
};

/*
EXAMPLE from LAB
app.route('/api/movies/:id')
.get(controller.read_movie)
.put(controller.update_movie)
.delete(controller.delete_movie);*/