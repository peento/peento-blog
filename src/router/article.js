/**
 * Router: article
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');

  router.get('/', function (req, res, next) {
    async.series([

      function (next) {
        app.call('article.get_list', req.query, function (err, list) {
          res.setLocals('articles', list);
          next(err);
        });
      }

    ], function (err) {
      if (err) return next(err);
      res.render('front/index');
    });
  });

};
