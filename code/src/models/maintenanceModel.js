const {ObjectId} = require("bson");
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var MaintenanceSchema = new Schema({
        garden: { type : ObjectId, ref: 'Garden' },
        startTime: Date,
        duration: Number,
        done: Boolean,
		gardener: { type : ObjectId, ref: 'Gardener' }
    });
    return mongoose.model('Maintenance', MaintenanceSchema);
};
