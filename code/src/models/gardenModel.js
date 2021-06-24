module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var gardenSchema = new Schema({
        name: String,
        city: String,
		position: String,
        lat: Number,
        lon: Number,
		sensors: [{ type : mongoose.Types.ObjectId, ref: 'Sensor' }],
        flagsOn: Number
    });
    return mongoose.model('Garden', gardenSchema, 'gardens');
};
