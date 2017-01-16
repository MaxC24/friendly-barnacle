const mongoose = require('mongoose');

const ReferralSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    SignedUp: Boolean
});

ReferralSchema.methods.addToUser = function(user) {
    user.referrals.push(this._id);
	return user.save();
}

module.exports = mongoose.model('Referral', ReferralSchema);