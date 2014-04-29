/**
 * Call: article.get_content
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get content: [%s]', params.id);

    ns('model.article_content').getByArticleId(params.id, function (err, data) {
      if (err) return callback(err);
      if (!data) return callback(new Error('Article content "' + params.id + '" does not exists'));
      callback(null, data.content);
    });

  }
};
