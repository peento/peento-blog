/**
 * Call: tag.get_id
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get name: [%s]', params.id);

    ns('model.tag_list').getById(params.id, function (err, tag) {
      if (err) return callback(err);
      if (!tag) return callback(new Error('Tag id "' + params.id + '" does not exists'));
      callback(null, tag.name);
    });

  }
};
