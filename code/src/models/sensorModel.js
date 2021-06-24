module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var SensorSchema = new Schema({
        fieldname: String,
        value: Number,
		flagOn: Boolean,
        API: Number,
        APIfield: String,
        where: String,
        garden: { type : mongoose.Types.ObjectId, ref: 'Garden' },
    });
    return mongoose.model('Sensor', SensorSchema);
    //note: all fields are optional by default
};
