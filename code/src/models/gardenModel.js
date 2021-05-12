const {ObjectId} = require("bson");
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var gardenSchema = new Schema({
        name: String,
        city: String,
		position: String,
		sensors: [{ type : ObjectId, ref: 'Sensor' }],
        flagsOn: Number,
		sensorsWithFlag: [{ type : ObjectId, ref: 'Sensor' }]
    });
    return mongoose.model('Garden', gardenSchema, 'gardens');
};
