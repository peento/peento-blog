/**
 * Call: user.update
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('update: [%s]', params.id || params.email);

    ns('app').call('user.get_info', params, function (err, user) {
      if (err) return callback(err);

      var data = {};
      if ('email' in params) data.email = params.email;
      if ('password' in params) data.password = params.password;
      if ('display_name' in params) data.display_name = params.display_name;
      ns('model.user_list').updateById(user.id, data, callback);
    });

  }
};
