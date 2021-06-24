var express = require('express');
const app = express();
const { fork } = require("child_process");
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;
mongoose.connect('mongodb://localhost/smart-gardening', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

app.use(cors())

app.use(express.json());

app.use('/static', express.static(__dirname + '/public'));

var routes = require('./src/routes/gardeningRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(PORT, function () {
  console.log('Node API server started on port '+PORT);
});

//processo esterno per l'aggiornamento dei sensori sul db
const forked = fork('update_sensors.js');
forked.on('message', (msg) => {
  console.log('Message from child: ', msg);
});

