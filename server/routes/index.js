const keystone = require('keystone');
const express = require('express');
const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

// Get access to our API routes
const importRoutes = keystone.importer(__dirname);

const routes = {
    api: importRoutes('./api'),
    controller: importRoutes('./controllers'),
    middlewares: importRoutes('./middlewares'),
};


/* ------------------------------------------------------------- */
/* ----------------------- CUSTOM ROUTES ----------------------- */
/* ------------------------------------------------------------- */

router.get('/', routes.controller.app.index);


router.get('/login', routes.controller.app.login);


router.get('/logout', routes.controller.app.logout);


router.get('/api/v1/',
    keystone.middleware.api,
    // routes.middlewares.tokens.validateToken,
    routes.api.default.sendStatus
);


// generate a jwt token
router.post('/api/v1/token',
    keystone.middleware.api,
    routes.middlewares.tokens.generateToken
);


/* ------------------------------------------------------------- */
/* ------------------------- END ROUTES ------------------------ */
/* ------------------------------------------------------------- */


// Export our app routes
module.exports = router;