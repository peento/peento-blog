/**
 * Call: nav.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../lib/utils');
  return function (params, callback) {
    debug('delete: [%s] %s', params.name, params.type);
    var nav_list = ns('model.nav_list');

    if (!params.name) {
      return callback(nav_list.missingRequiredFieldError('name'));
    }
    if (!(params.type > 0)) {
      params.type = 0;
    }

    nav_list.delete({
      name: params.name,
      type: params.type
    }, callback);

  }
};
