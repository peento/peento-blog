/**
 * Call: article.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('add: %s', params.title);

    if (!params.summary && params.content) {
      params.summary = utils.stripHtml(params.content).slice(0, 255);
    }
    if (!params.content) params.content = ' ';

    var id;
    var app = ns('app');
    async.series([

      function (next) {
        ns('model.article_list').add(params, function (err, ret) {
          id = ret;
          next(err);
        });
      },

      function (next) {
        app.call('article.update_content', {id: id, content: params.content}, next);
      },

      function (next) {
        if (!params.tags) return next();
        app.call('article.update_tags', {id: id, tags: params.tags}, next);
      },

      function (next) {
        if (!params.metas) return next();
        app.call('article.update_metas', {id: id, metas: params.metas}, next);
      }

    ], function (err) {
      callback(err, id);
    });

  }
};
