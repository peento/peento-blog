/**
 * Filters: tag
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var utils = require('../../lib/utils');
  var app = ns('app');


  function get_tag_all (_, callback, context) {
    app.call('tag.get_list', {limit: 10000}, function (err, ret) {
      if (!ret) ret = [];
      ret = ret.map(function (item) {
        return item.name;
      });
      callback(null, ret);
    });
  }
  get_tag_all.enableCache = true;
  registerFilter('get_tag_allAsync', get_tag_all);

};
