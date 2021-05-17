module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var MaintenanceSchema = new Schema({
        garden: { type : mongoose.Types.ObjectId, ref: 'Garden' },
        startTime: Date,
        duration: Number,
        done: Boolean,
		gardener: { type : mongoose.Types.ObjectId, ref: 'Gardener' }
    });
    return mongoose.model('Maintenance', MaintenanceSchema);
};
