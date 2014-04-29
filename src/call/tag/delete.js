/**
 * Call: tag.delete
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('delete: [%s]', params.id || params.name);

    ns('app').call('tag.get_id', params, function (err, id) {
      if (err) return callback(err);

      ns('model.tag_list').deleteById(id, callback);
    });

  }
};
