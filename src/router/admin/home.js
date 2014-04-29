/**
 * Router: Admin Home
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');
  var checkSignin = ns('middleware.check_signin');

  router.get('/admin', checkSignin, function (req, res, next) {
    res.render('admin/home');
  });

};
