/**
 * Call: config.get_all
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get all');

    ns('model.config').list({}, {limit: 1000000000}, function (err, list) {
      if (err) return callback(err);

      var data = {};
      list.forEach(function (item) {
        data[item.name] = item.value;
      });
      callback(null, data);
    });

  }
};
