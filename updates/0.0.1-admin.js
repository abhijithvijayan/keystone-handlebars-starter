const keystone = require('keystone');
const User = keystone.list('User');

exports = module.exports = function (done) {
	new User.model({
		name: { first: 'abhijith', last: 'vijayan' },
		email: 'admin@abhijithvijayan.in',
		password: 'abhijithvijayan',
		canAccessKeystone: true,
	}).save(done);

};