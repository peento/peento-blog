/**
 * Call: tag.get_count
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get count');

    ns('model.tag_list').count({}, callback);

  }
};
