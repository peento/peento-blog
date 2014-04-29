/**
 * Call: user.get_count
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get count');

    var query = {};

    ns('model.user_list').count(query, callback);

  }
};
