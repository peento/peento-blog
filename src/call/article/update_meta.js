/**
 * Call: article.update_meta
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update meta: [%s] %s', params.id, params.name);
    var article_meta = ns('model.article_meta');

    if (!(params.id > 0)) {
      return callback(article_meta.missingRequiredFieldError('id'));
    }
    if (!params.name) {
      return callback(article_meta.missingRequiredFieldError('name'));
    }

    article_meta.delete({
      article_id: params.id,
      name:       params.name
    }, function (err) {
      if (err) return callback(err);

      article_meta.add({
        article_id: params.id,
        name:       params.name,
        value:      params.value
      }, callback);
    });

  }
};
