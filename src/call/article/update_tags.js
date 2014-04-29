/**
 * Call: article.update_tags
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update tags: [%s] [%s]', params.id, params.tags);
    var article_tag = ns('model.article_tag');
    var app = ns('app');

    if (!(params.id > 0)) {
      return callback(article_tag.missingRequiredFieldError('id'));
    }
    if (!params.tags) {
      return callback(article_tag.missingRequiredFieldError('tags'));
    }
    var tags = utils.cloneObject(params.tags);
    if (!Array.isArray(tags)) {
      tags = tags.split(/\s*,\s*/).filter(function (tag) {
        return tag.length > 0;
      });
    }
    var map = {};
    tags.forEach(function (tag) {
      map[tag] = 1;
    });
    tags = Object.keys(map);

    article_tag.deleteByArticleId(params.id, function (err) {
      if (err) return callback(err);

      async.eachSeries(tags, function (tag, next) {
        app.call('article.add_tag', {
          id:   params.id,
          name: tag
        }, next);
      }, callback);
    });

  }
};
