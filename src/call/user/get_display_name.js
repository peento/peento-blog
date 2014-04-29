/**
 * Call: user.get_display_name
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get display name: [%s]', params.email || params.id);

    if (params.id > 0) {
      var field = 'Id';
      var value = params.id;
    } else {
      var field = 'Email';
      var value = params.email;
    }

    ns('model.user_list')['getBy' + field](value, function (err, user) {
      if (err) return callback(err);
      if (!user) return callback(new Error('User ' + field.toLowerCase() + ' "' + value + '" does not exists'));
      callback(null, user.display_name);
    });

  }
};
