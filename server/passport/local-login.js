const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const passportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

module.exports = new passportLocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	session: false,
	passReqToCallback: true
}, (req, email, password, done) => {
	const userData = {
		email: email.trim(),
		password: password.trim()
	};
	return User.findOne({ email: userData.email }, (err, user) => {
		if(err) { return done(err); }

		if(!user) {
			const error = new Error('Incorrect email or password');
			error.name = 'IncorrectCredentialsError';

			return done(error);
		}

		return user.comparePassword(userData.password, (err, isMatch) => {
			if(err) { return done(err); }

			if(!isMatch) {
				const error = new Error('Incorrect email or password');
				error.name = 'IncorrectCredentialsError';

				return done(error);
			}

			const payload = {
				sub: user._id
			}

			const token = jwt.sign(payload, config.jwtSecret);
			const data = {
				name: user.name
			};

			return done(null, token, data);
		})
	})
})