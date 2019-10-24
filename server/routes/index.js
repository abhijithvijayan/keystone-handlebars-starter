/* eslint-disable-next-line import/no-extraneous-dependencies */
const express = require('express');
const keystone = require('keystone');

const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();
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

/* ------------------------------------------------------------- */
/* ------------------------- END ROUTES ------------------------ */
/* ------------------------------------------------------------- */

module.exports = router;
