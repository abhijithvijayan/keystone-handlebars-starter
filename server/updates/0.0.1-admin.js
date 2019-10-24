/* eslint-disable no-multi-assign, new-cap */
const keystone = require('keystone');

// import env variables
require('dotenv').config({ path: 'variables.env' });

const User = keystone.list('User');

exports = module.exports = function(done) {
    new User.model({
        name: { first: process.env.DEFAULT_ADMIN_FNAME, last: process.env.DEFAULT_ADMIN_LNAME },
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
        canAccessKeystone: true,
    }).save(done);
};
