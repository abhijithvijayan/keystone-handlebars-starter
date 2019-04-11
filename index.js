const keystone = require('keystone');
const engine  = require('express-handlebars');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Set up our keystone instance
keystone.init({
  // The name of the KeystoneJS application
  'name': process.env.NAME || 'Simple Backend Boilerplate',
  // Paths to our application static files
  'static': [
    './server/public/dist/',
    './server/public/img/',
  ],

  'views': './client/views',

	'custom engine': engine({
    extname: '.hbs',
		layoutsDir: './client/views/layouts',
		defaultLayout: 'main',
  }),
  
  'view engine': '.hbs',
  
  'session': true,
  // Updates provide an easy way to seed your database, 
  // transition data when your models change, 
  // or run transformation scripts against your database.
  'auto update': true,
  // The url for your MongoDB connection
  'mongo': process.env.DATABASE || 'mongodb://localhost/db-demo',
  // Whether to enable built-in authentication for Keystone's Admin UI,
  'auth': true,
  // The key of the Keystone List for users, required if auth is set to true
  'user model': 'User',
  // The encryption key to use for your cookies.
  'cookie secret': process.env.COOKIE_SECRET || 'demosecret',

});

// Load your project's Models
keystone.import('./server/models');

// Add routes
keystone.set('routes', require('./server/routes'));

// Start Keystone
keystone.start();