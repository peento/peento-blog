/**
 * Router: Admin User Manage
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');
  var checkSignin = ns('middleware.check_signin');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');


  router.get('/admin/user/list', checkSignin, function (req, res, next) {
    async.series([

      function (next) {
        app.call('user.get_list', req.query, function (err, list) {
          res.setLocals('users', list);
          next(err);
        });
      },

      function (next) {
        app.call('user.get_count', req.query, function (err, list) {
          res.setLocals('user_count', list);
          next(err);
        });
      }

    ], function (err) {
      if (err) return next(err);
      res.render('admin/user/list');
    });
  });


  router.get('/admin/user/:id/edit', checkSignin, csrf, function (req, res, next) {
    app.call('user.get_info', {id: req.params.id}, function (err, user) {
      if (err) return next(err);

      res.setLocals('user', user);
      res.render('admin/user/edit');
    });
  });

  router.post('/admin/user/:id/edit', checkSignin, multiparty, csrf, function (req, res, next) {
    req.body.id = req.params.id;
    app.call('user.get_info', {id: req.params.id}, function (err, user) {
      if (err) return next(err);

      // if password no changed
      if (user.password === req.body.password) {
        delete req.body.password;
      }

      app.call('user.update', req.body, function (err, ret) {
        if (err) {
          res.setLocals('error', err);
          res.setLocals('user', req.body);
          res.render('admin/user/edit');
        } else {
          res.redirect(req.url);
        }
      });
    });
  });

  router.delete('/admin/user/:id.json', checkSignin, function (req, res, next) {
    app.call('user.delete', {id: req.params.id}, function (err, ret) {
      if (err) return next(err);

      res.json(ret);
    });
  });


  router.get('/admin/user/new', checkSignin, csrf, function (req, res, next) {
    res.render('admin/user/new');
  });

  router.post('/admin/user/new', checkSignin, multiparty, csrf, function (req, res, next) {
    app.call('user.add', req.body, function (err, ret) {
      if (err) {
        res.setLocals('error', err);
        res.setLocals('user', req.body);
        res.render('admin/user/new');
      } else {
        res.redirect('/admin/user/list');
      }
    });
  });

};
