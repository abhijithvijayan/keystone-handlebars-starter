const keystone = require('keystone');
const exphbs = require('express-handlebars');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Set up our keystone instance
keystone.init({
    // The name of the KeystoneJS application
    name: process.env.NAME || 'Dashboard | Sample Site',
    // Paths to our application static files
    static: ['../client/build/'],

    port: process.env.PORT || 5000,

    views: '../client/views',

    'signin logo': [
        'https://res.cloudinary.com/abhijithvijayan/image/upload/v1555841580/himuqvjwbrefkv0jtfby.png',
        228,
        60,
    ],

    'custom engine': exphbs({
        extname: '.hbs',
        partialsDir: '../client/views/partials',
        layoutsDir: '../client/views/layouts',
        defaultLayout: 'main',
        helpers: {
            ifeq(a, b, options) {
                if (a === b) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
            ifnoteq(a, b, options) {
                if (a !== b) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
        },
    }),

    'view engine': '.hbs',

    session: true,
    // Updates provide an easy way to seed your database,
    // transition data when your models change,
    // or run transformation scripts against your database.
    'auto update': true,
    // The url for your MongoDB connection
    mongo: process.env.DATABASE || 'mongodb://localhost/db-demo',

    'cloudinary config': process.env.CLOUDINARY_URL,
    // Whether to enable built-in authentication for Keystone's Admin UI,
    auth: true,
    // The key of the Keystone List for users, required if auth is set to true
    'user model': 'User',
    // The encryption key to use for your cookies.
    'cookie secret': process.env.COOKIE_SECRET || 'demosecret',
});

require('./app');

// Start Keystone
keystone.start();
