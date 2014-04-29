/**
 * Call: article.get_meta
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get meta: [%s] %s', params.id, params.name);
    var article_meta = ns('model.article_meta');

    if (!(params.id > 0)) {
      return callback(article_meta.missingRequiredFieldError('id'));
    }
    if (!params.name) {
      return callback(article_meta.missingRequiredFieldError('name'));
    }
    var query = {
      article_id: params.id,
      name:       params.name
    };

    article_meta.get(query, function (err, meta) {
      if (err) return callback(err);
      if (!meta) return callback(null, undefined);
      callback(null, meta.value);
    });

  }
};
