/**
 * Call: tag.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get list');

    ns('model.tag_list').list({}, params, callback);

  }
};
