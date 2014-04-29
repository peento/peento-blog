/**
 * Call: article.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update: [%s]', params.id);

    var app = ns('app');
    async.series([

      function (next) {
        ns('model.article_list').getById(params.id, next);
      },

      function (next) {
        var data = {};
        if ('title' in params) data.title = params.title;
        if ('summary' in params) data.summary = params.summary;
        if ('sort' in params) data.sort = params.sort;
        ns('model.article_list').updateById(params.id, data, next);
      },

      function (next) {
        if (!('content' in params)) return next();
        app.call('article.update_content', {id: params.id, content: params.content}, next);
      },

      function (next) {
        if (!params.tags) return next();
        app.call('article.update_tags', {id: params.id, tags: params.tags}, next);
      },

      function (next) {
        if (!params.metas) return next();
        app.call('article.update_metas', {id: params.id, metas: params.metas}, next);
      }

    ], function (err) {
      callback(err, params.id);
    });

  }
};
