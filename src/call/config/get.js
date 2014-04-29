/**
 * Call: config.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get: [%s]', params.name);

    ns('model.config').getByName(params.name, function (err, data) {
      if (err) return callback(err);
      if (data) {
        callback(null, data.value);
      } else {
        callback(null, undefined);
      }
    });

  }
};
