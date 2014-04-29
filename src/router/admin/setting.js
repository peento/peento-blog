/**
 * Router: Admin Setting
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, router) {
  var async = require('async');
  var app = ns('app');
  var csrf = ns('middleware.csrf');
  var multiparty = ns('middleware.multiparty');
  var checkSignin = ns('middleware.check_signin');


  router.get('/admin/setting', checkSignin, csrf, function (req, res, next) {
    app.call('config.get_all', {}, function (err, data) {
      if (err) {
        res.setLocals('error', err);
        res.render('admin/setting');
        return;
      }

      var list = [];
      Object.keys(data).forEach(function (i) {
        list.push({
          name:  i,
          value: data[i]
        });
      });
      res.setLocals('config_list', list);
      res.render('admin/setting');
    });
  });

  router.post('/admin/setting', checkSignin, multiparty, csrf, function (req, res, next) {
    function renderPage (data) {
      var list = [];
      Object.keys(data).forEach(function (i) {
        list.push({
          name:  i,
          value: data[i]
        });
      });
      res.setLocals('config_list', list);
      res.render('admin/setting');
    }
    delete req.body._csrf;
    app.call('config.update_all', req.body, function (err) {
      if (err) {
        res.setLocals('error', err);
        return renderPage(req.body);
      }
      app.call('config.get_all', {}, function (err, data) {
        if (err) {
          res.setLocals('error', err);
          renderPage(req.body);
        } else {
          renderPage(data);
        }
      });
    });
  });

};
