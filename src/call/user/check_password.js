/**
 * Call: user.check_password
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('check password: [%s] %s', params.email, params.password);
    var user_list = ns('model.user_list');

    if (!params.email) {
      return callback(user_list.missingRequiredFieldError('email'));
    }
    if (!params.password) {
      return callback(user_list.missingRequiredFieldError('password'));
    }

    user_list.getByEmail(params.email, function (err, user) {
      if (err) return callback(err);
      if (!(user && user.password)) return callback(null, false);
      callback(null, utils.validatePassword(params.password, user.password));
    });

  }
};
