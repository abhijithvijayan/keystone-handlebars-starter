const keystone = require('keystone');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// Load your project's Models
keystone.import('./server/models');

// Add routes
keystone.set('routes', require('./routes'));
keystone.set('routes', require('./routes/api'));

/* -------------------------------------------------------------- */
/* --------------------- Helpers and Locals --------------------- */
/* -------------------------------------------------------------- */

keystone.pre('routes', errorHandlers.initErrorHandlers);
keystone.pre('routes', errorHandlers.initLocals);
keystone.pre('render', errorHandlers.flashMessages);

keystone.pre('routes', (req, res, next) => {
    res.locals.h = helpers;
    res.locals.user = req.user || null;
    res.locals.currentPath = req.path;
    next();
});

// Handle 404 errors
keystone.set('404', function(req, res, next) {
    res.notfound();
});

// Handle other errors
keystone.set('500', function(err, req, res, next) {
    let title;
    let message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});
