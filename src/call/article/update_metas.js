/**
 * Call: article.update_metas
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update metas: [%s]', params.id);
    var article_meta = ns('model.article_meta');
    var app = ns('app');

    if (!params.metas) {
      return callback(article_meta.missingRequiredFieldError('metas'));
    }

    async.eachSeries(Object.keys(params.metas), function (name, next) {
      app.call('article.update_meta', {
        id:    params.id,
        name:  name,
        value: params.metas[name]
      }, next);
    }, callback);

  }
};
