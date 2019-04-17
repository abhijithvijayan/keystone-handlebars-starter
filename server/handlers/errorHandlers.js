const path = require('path');
const _ = require('lodash');

/**
  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch any errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


/**
  Initialises the standard view locals.
  Include anything that should be initialised before route controllers are executed.
*/
exports.initLocals = function (req, res, next) {

  const locals = res.locals;
  locals.user = req.user || null;
  locals.currentPath = req.path;
  next();

};


/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function (req, res, next) {

  res.err = function (err, title, message) {
    res.status(500).render('errors/500', {
      err: err,
      errorTitle: title,
      errorMsg: message
    });
  }

  res.notfound = function (title, message) {
    res.status(404).render('errors/404', {
      errorTitle: title,
      errorMsg: message
    });
  }

  next();

};


/**
  Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {

  const flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  res.locals.messages = _.some(flashMessages, function (msgs) {
    return msgs.length
  }) ? flashMessages : false;

  next();

};