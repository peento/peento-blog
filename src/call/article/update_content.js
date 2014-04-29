/**
 * Call: article.update_content
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update content: [%s]', params.id);
    var article_content = ns('model.article_content');

    if (!params.content) {
      return callback(article_content.missingRequiredFieldError('content'));
    }

    article_content.countByArticleId(params.id, function (err, count) {
      if (err) return callback(err);
      if (count > 0) {
        article_content.updateByArticleId(params.id, {content: params.content}, callback);
      } else {
        article_content.add({
          article_id: params.id,
          content:    params.content
        }, callback);
      }
    });

  }
};
