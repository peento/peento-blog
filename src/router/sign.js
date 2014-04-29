/**
 * Router: sign in & sign up & sign out
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var utils = require('../../lib/utils');
  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');


  router.get('/signin', csrf, function (req, res, next) {
    res.render('sign/signin');
  });

  router.post('/signin', multiparty, csrf, function (req, res, next) {
    app.call('user.check_password', req.body, function (err, ok) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signin');
      } else if (!ok) {
        res.setLocals('error', 'E-mail address or password is not correct');
        res.render('sign/signin');
      } else {
        app.call('user.get_info', req.body, function (err, info) {
          if (err) {
            res.setLocals('error', err);
            res.render('sign/signin');
          } else {
            req.session.signin_user = info;
            res.redirect(req.query.return_url || '/');
          }
        });
      }
    });
  });


  router.get('/signup', csrf, function (req, res, next) {
    res.render('sign/signup');
  });

  router.post('/signup', multiparty, csrf, function (req, res, next) {
    app.call('user.add', req.body, function (err, id) {
      if (err) {
        res.setLocals('error', err);
        res.render('sign/signup');
      } else {
        app.call('user.get_info', {id: id}, function (err, userInfo) {
          if (err) res.setLocals('error', err);
          res.setLocals('user_info', userInfo);
          res.render('sign/signup_success');
        });
      }
    });
  });

};
