/**
 * Filters: article
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var utils = require('../../lib/utils');
  var app = ns('app');


  function get_article_content (id, callback, context) {
    if (!(id > 0)) return callback(null, '#ERROR#');
    app.call('article.get_content', {id: id}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_article_content.enableCache = true;
  registerFilter('get_article_contentAsync', get_article_content);


  function get_article_tags (id, callback, context) {
    if (!(id > 0)) return callback(null, ['#ERROR#']);
    app.call('article.get_tags', {id: id}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_article_tags.enableCache = true;
  registerFilter('get_article_tagsAsync', get_article_tags);


  function get_article_metas (id, callback, context) {
    if (!(id > 0)) return callback(null, {'#ERROR#': 'NOT EXISTS'});
    app.call('article.get_metas', {id: id}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_article_metas.enableCache = true;
  registerFilter('get_article_metasAsync', get_article_metas);


  function get_article_meta (id, name, callback, context) {
    if (!(id > 0)) return callback(null, '#ERROR#');
    app.call('article.get_meta', {id: id, name: name}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_article_meta.enableCache = true;
  registerFilter('get_article_metaAsync', get_article_meta);

};
