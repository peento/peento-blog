/**
 * Call: article.add_tag
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('add tag: [%s] %s', params.id, params.name);
    var article_tag = ns('model.article_tag');
    var app = ns('app');

    if (!(params.id > 0)) {
      return callback(article_tag.missingRequiredFieldError('id'));
    }
    if (!params.name) {
      return callback(article_tag.missingRequiredFieldError('name'));
    }

    var tag_id;
    async.series([

      function (next) {
        app.call('tag.add', {name: params.name}, function (err, ret) {
          tag_id = ret;
          next(err);
        });
      },

      function (next) {
        var data = {
          article_id: params.id,
          tag_id:     tag_id
        };
        article_tag.count(data, function (err, count) {
          if (err) return next(err);
          if (count > 0) return next();
          article_tag.add(data, next);
        });
      }

    ], callback);

  }
};
