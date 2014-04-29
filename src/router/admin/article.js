/**
 * Router: Admin Article Manage
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');
  var checkSignin = ns('middleware.check_signin');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');


  router.get('/admin/article/list', checkSignin, function (req, res, next) {
    async.series([

      function (next) {
        app.call('article.get_list', req.query, function (err, list) {
          res.setLocals('articles', list);
          next(err);
        });
      },

      function (next) {
        app.call('article.get_count', req.query, function (err, list) {
          res.setLocals('article_count', list);
          next(err);
        });
      }

    ], function (err) {
      if (err) return next(err);
      res.render('admin/article/list');
    });
  });


  router.get('/admin/article/:id/edit', checkSignin, csrf, function (req, res, next) {
    app.call('article.get', {id: req.params.id}, function (err, article) {
      if (err) return next(err);

      res.setLocals('article', article);
      res.render('admin/article/edit');
    });
  });

  router.post('/admin/article/:id/edit', checkSignin, multiparty, csrf, function (req, res, next) {
    req.body.id = req.params.id;
    app.call('article.update', req.body, function (err, ret) {
      if (err) {
        res.setLocals('error', err);
        res.setLocals('article', req.body);
        res.render('admin/article/edit');
      } else {
        res.redirect(req.url);
      }
    });
  });

  router.delete('/admin/article/:id.json', checkSignin, function (req, res, next) {
    app.call('article.delete', {id: req.params.id}, function (err, ret) {
      if (err) return next(err);

      res.json(ret);
    });
  });


  router.get('/admin/article/new', checkSignin, csrf, function (req, res, next) {
    res.render('admin/article/new');
  });

  router.post('/admin/article/new', checkSignin, multiparty, csrf, function (req, res, next) {
    req.body.author_id = req.session.signin_user.id;
    app.call('article.add', req.body, function (err, ret) {
      if (err) {
        res.setLocals('error', err);
        res.setLocals('article', req.body);
        res.render('admin/article/new');
      } else {
        res.redirect('/admin/article/list');
      }
    });
  });

};
