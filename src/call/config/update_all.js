/**
 * Call: config.update_all
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var async = require('async');
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update all');
    var config = ns('model.config');
    var app = ns('app');

    async.eachSeries(Object.keys(params), function (n, next) {
      var v = params[n];
      app.call('config.update', {
        name:  n,
        value: v
      }, next);
    }, callback);

  }
};
