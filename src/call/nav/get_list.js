/**
 * Call: nav.get_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  var utils = require('../../lib/utils');
  return function (params, callback) {
    debug('get list');
    var nav_list = ns('model.nav_list');
    params = utils.cloneObject(params);

    var query = {};
    if ('parent' in params) query.parent = params.parent;
    if (params.type >= 0) query.type = params.type;

    if (!params.order) params.order = '';
    params.order = 'sort:desc,' + params.order;

    var options = nav_list.formatListOptions(params);
    nav_list.list(query, options, callback);

  }
};
