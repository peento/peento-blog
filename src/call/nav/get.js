/**
 * Call: nav.get
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../lib/utils');
  return function (params, callback) {
    debug('get: [%s] %s', params.name, params.type);
    var nav_list = ns('model.nav_list');

    if (!params.name) {
      return callback(nav_list.missingRequiredFieldError('name'));
    }
    if (!(params.type > 0)) {
      params.type = 0;
    }

    nav_list.get({
      name: params.name,
      type: params.type
    }, function (err, item) {
      if (err) return callback(err);
      if (!item) return callback(new Error('Nav link "' + params.type + ':' + params.name + '" does not exists'));
      callback(null, item);
    });

  }
};
