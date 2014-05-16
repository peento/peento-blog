/**
 * Filters: nav
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var utils = require('../lib/utils');
  var app = ns('app');


  function get_nav_list (parent, callback, context) {
    if (!parent) return callback(null, []);
    app.call('nav.get_list', {
      parent: parent,
      limit:  1000
    }, function (err, ret) {
      callback(null, ret || []);
    });
  }
  get_nav_list.enableCache = true;
  registerFilter('get_nav_listAsync', get_nav_list);


};
