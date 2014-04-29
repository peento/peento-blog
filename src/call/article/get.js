/**
 * Call: article.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get: [%s]', params.id);

    ns('model.article_list').getById(params.id, function (err, article) {
      if (err) return callback(err);
      if (!article) return callback(new Error('Article "' + params.id + '" does not exists'));

      if (!utils.parseQueryBool(params._get_detail, true)) return callback(null, article);

      var app = ns('app');
      async.series([

        function (next) {
          app.call('article.get_content', {id: article.id}, function (err, content) {
            article.content = content;
            next(err);
          });
        },

        function (next) {
          app.call('article.get_tags', {id: article.id}, function (err, tags) {
            article.tags = tags;
            next(err);
          });
        },

        function (next) {
          app.call('article.get_metas', {id: article.id}, function (err, metas) {
            article.metas = metas;
            next(err);
          });
        }

      ], function (err) {
        callback(err, article);
      });
    });

  }
};
