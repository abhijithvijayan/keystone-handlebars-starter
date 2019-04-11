const keystone = require('keystone');
const express = require('express');
const router = express.Router();

// Get access to our API routes
const importRoutes = keystone.importer(__dirname);

const routes = {
    api: importRoutes('./api'),
    controller: importRoutes('./controllers'),
};

/* ----------------------------------------------------------------- */


router.get('/', routes.controller.app.getHomePage);


router.get('/login', routes.controller.app.login);


router.get('/logout', routes.controller.app.logout);


router.get('/api/v1/',
    keystone.middleware.api,
    routes.api.default.sendStatus
);


/* ----------------------------------------------------------------- */


// Export our app routes
module.exports = router;