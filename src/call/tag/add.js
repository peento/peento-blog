/**
 * Call: tag.add
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../../lib/utils');
  return function (params, callback) {
    debug('add: [%s]', params.name);

    ns('model.tag_list').getByName(params.name, function (err, tag) {
      if (err) return callback(err);
      if (tag) return callback(null, tag.id);

      ns('model.tag_list').add({name: params.name}, callback);
    });

  }
};
