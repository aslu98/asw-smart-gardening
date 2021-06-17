var express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

global.appRoot = path.resolve(__dirname);

const PORT = 3000;
mongoose.connect('mongodb://localhost/smart-gardening', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true });

String.prototype.toObjectId = function() {
  const ObjectId = mongoose.Types.ObjectId;
  return new ObjectId(this.toString());
};

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

app.use(cors())

//Per gestire i parametri passati nel corpo della richiesta http.
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
