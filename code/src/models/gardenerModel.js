module.exports = function(mongoose) {
    var Schema = mongoose.Schema;
    var GardenerSchema = new Schema({
        name:  String,
        surname: String,
		telephone: String,
		address: String,
        fiscal_code: String,
		user_id: String,
		password: String,
        salt: String
    }, {
        versionKey: false
    });
    return mongoose.model('Gardener', GardenerSchema);
    //note on 'Gardener' -> 'gardeners'
	//Mongoose automatically looks for the plural, lowercased version of your model name to search the right collection.
};
