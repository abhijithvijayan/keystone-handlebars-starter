const keystone = require('keystone');

const { catchErrors } = require('../handlers/errorHandlers');

const router = keystone.createRouter();
// import all files in a folder
const importRoutes = keystone.importer(__dirname);

const routes = {
    controllers: importRoutes('../controllers'),
    middlewares: importRoutes('../middlewares'),
};

/* ------------------------------------------------------------- */
/* ----------------------- CUSTOM ROUTES ----------------------- */
/* ------------------------------------------------------------- */

router.get('/', routes.controllers.app.index);

router.get('/login', routes.controllers.views.login);

router.get('/logout', routes.controllers.views.logout);

router.get(
    '/api/v1',
    keystone.middleware.api,
    // routes.middlewares.tokens.validateToken,
    routes.controllers.api.sendStatus
);

// generate a jwt token
router.post('/api/v1/token', keystone.middleware.api, routes.middlewares.tokens.generateToken);

/* ------------------------------------------------------------- */
/* ------------------------- END ROUTES ------------------------ */
/* ------------------------------------------------------------- */

module.exports = router;
