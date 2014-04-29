/**
 * Call: article.get_tags
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get tags: [%s]', params.id);

    ns('model.article_tag').listByArticleId(params.id, {limit: 10000}, function (err, list) {
      if (err) return callback(err);

      var tag_list = ns('model.tag_list');
      async.mapSeries(list, function (item, next) {
        tag_list.getById(item.tag_id, function (err, tag) {
          next(err, tag && tag.name);
        });
      }, callback);
    });

  }
};
