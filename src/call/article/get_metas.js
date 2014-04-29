/**
 * Call: article.get_metas
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get metas: [%s]', params.id);

    ns('model.article_meta').listByArticleId(params.id, {limit: 10000}, function (err, list) {
      if (err) return callback(err);
      var metas = {};
      list.forEach(function (item) {
        metas[item.name] = item.value;
      });
      callback(null, metas);
    });

  }
};
