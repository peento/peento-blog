/**
 * Call: user.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (params, callback) {
    debug('add: [%s] %s', params.email, params.display_name);
    var user_list = ns('model.user_list');

    user_list.getByEmail(params.email, function (err, user) {
      if (err) return callback(err);
      if (user) return callback(new Error('User email "' + params.email + '" already exists'));

      user_list.add(params, callback);
    });

  }
};
