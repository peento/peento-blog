/**
 * Call: config.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update: [%s] %s', params.name, params.value);
    var config = ns('model.config');

    config.deleteByName(params.name, function (err) {
      if (err) return callback(err);

      config.add(params, callback);
    });

  }
};
