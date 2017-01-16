const mongoose = require('mongoose');
const crypto = require('crypto'); 

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		index: {unique: true}
	},
	password: String,
	name: String,
	salt: String,
	referrals: {
		type: [{type: mongoose.Schema.ObjectId, ref: 'Referral'}],
		default:[]
	}
});

var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

UserSchema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

UserSchema.statics.generateSalt = generateSalt;
UserSchema.statics.encryptPassword = encryptPassword;

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	const isMatch = encryptPassword(candidatePassword, this.salt) === this.password;
	return callback(null, isMatch);
}

module.exports = mongoose.model('User', UserSchema);
