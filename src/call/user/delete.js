/**
 * Call: user.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('delete: [%s]', params.id || params.email);

    ns('app').call('user.get_info', params, function (err, user) {
      if (err) return callback(err);

      ns('model.user_list').deleteById(user.id, callback);
    });

  }
};
