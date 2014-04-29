/**
 * Call: tag.get_id
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('get id: [%s]', params.name);

    ns('model.tag_list').getByName(params.name, function (err, tag) {
      if (err) return callback(err);
      if (!tag) return callback(new Error('Tag "' + params.name + '" does not exists'));
      callback(null, tag.id);
    });

  }
};
