const express = require('express');
const router = new express.Router();
const Referral = require('mongoose').model('Referral');
const User = require('mongoose').model('User');
const validator = require('validator');

router.get('/dashboard', (req, res) => {
	res.status(200).json({
		email: req.user.email,
		name: req.user.name,
		referrals: req.user.referrals
	});
});

router.put('/referrals', (req, res) => {
	
	Referral.findOne(req.body)
	.then(referral => {
		if(!validator.isEmail(req.body.email)) {
			const error = new Error();
			error.message = 'Is not a valid email';
			throw error;
		}
		if(!referral) {
			return Referral.create(req.body);
		} else {
			const error = new Error();
			error.message = 'The user has been already referred';
			throw error;
		}
	})
	.then(referral => {
		return referral.addToUser(req.user);
	})
	.then(user => {
		return User.populate(user, 'referrals');
	})
	.then(popUser => {
		res.status(200).json({
			referrals: popUser.referrals
		})
	})
	.catch(err => {
		console.log('Error: ', err.message);
		res.status(401).json({
			errors: {
				message: err.message
			}
		})
	})
})

router.get('/referrals', (req, res) => {
	User.populate(req.user, 'referrals')
	.then(popUser => {
		return res.status(200).json({
			referrals: popUser.referrals
		});
	})
	.catch(err => {
		console.log(err.message);
	})
})


router.get('/users', (req, res) => {
	User.find({})
	.then( users => {
		users = users.sort((a, b) => {
			return a.referrals.length < b.referrals.length;
		})
		.map(user => {
			return user.name;
		})
		res.status(200).json({
			users
		})
	})
	.catch(err => {
		console.log(err);
	})
})

module.exports = router;