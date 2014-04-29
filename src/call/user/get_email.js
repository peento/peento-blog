/**
 * Call: user.get_email
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get email: [%s]', params.id);

    ns('model.user_list').getById(params.id, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User "' + params.id + '" does not exists'));
      callback(null, user.email);
    });

  }
};
