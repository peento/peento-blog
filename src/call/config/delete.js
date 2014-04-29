/**
 * Call: config.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('delete: [%s]', params.name);

    ns('model.config').deleteByName(params.name, callback);

  }
};
