/**
 * CSRF
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {

  var csurf = require('csurf');

  var csrf = csurf();
  return function (req, res, next) {
    csrf(req, res, function (err) {
      if (err) return next(err);
      res.context.setLocals('_csrf', req.csrfToken());
      next();
    });
  };

};
