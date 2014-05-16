/**
 * Locals: nav
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerLocals, debug) {
  var utils = require('../lib/utils');
  var app = ns('app');

  function genList (type) {
    return function (name, callback, context) {
      app.call('nav.get_list', {
        parent: '',
        type:   type,
        limit:  1000
      }, function (err, ret) {
        callback(null, ret || []);
      });
    };
  }
  registerLocals('_nav_front', genList(0));
  registerLocals('_nav_user', genList(1));
  registerLocals('_nav_admin', genList(2));

};
