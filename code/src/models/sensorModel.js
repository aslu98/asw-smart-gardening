module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        temperature: Number,
        humidity: Number,
		CO2: mongoose.Schema.Types.Decimal128,
		flagOn: Boolean,
        garden: { type : mongoose.Types.ObjectId, ref: 'Garden' },
    });
    return mongoose.model('Sensor', SensorSchema);
    //note: all fields are optional by default
};
