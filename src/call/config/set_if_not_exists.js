/**
 * Call: config.set_if_not_exists
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../lib/utils');
  return function (params, callback) {
    debug('set_if_not_exists: [%s] %s', params.name, params.value);
    var app = ns('app');

    app.call('config.get', {name: params.name}, function (err, val) {
      if (err) return callback(err);
      if (val === undefined) {
        app.call('config.update', params, function (err) {
          callback(err, true);
        });
      } else {
        callback(null, false);
      }
    });

  }
};
