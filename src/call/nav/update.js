/**
 * Call: nav.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../lib/utils');
  return function (params, callback) {
    debug('update: [%s] %s', params.name, params.type);
    var nav_list = ns('model.nav_list');

    if (!params.name) {
      return callback(nav_list.missingRequiredFieldError('name'));
    }
    if (!(params.type > 0)) {
      params.type = 0;
    }
    if (!params.title) {
      return callback(nav_list.missingRequiredFieldError('title'));
    }
    if (!params.url) {
      return callback(nav_list.missingRequiredFieldError('url'));
    }

    var query = {
      name: params.name,
      type: params.type
    };
    nav_list.get(query, function (err, item) {
      if (err) return callback(err);

      if (item) {
        nav_list.update(query, params, cb);
      } else {
        nav_list.add(params, cb);
      }

      function cb (err) {
        callback(err, query);
      }
    });

  }
};
