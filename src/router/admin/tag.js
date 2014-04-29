/**
 * Router: Admin Tag Manage
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');
  var checkSignin = ns('middleware.check_signin');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');


  router.get('/admin/tag', checkSignin, function (req, res, next) {
    res.render('admin/tag/list');
  });


  router.get('/admin/tag/:tag', checkSignin, function (req, res, next) {
    async.series([

      function (next) {
        req.query.tags = req.params.tag;
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
      res.render('admin/tag/list');
    });

  });

};
