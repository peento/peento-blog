/**
 * Filters: user
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var utils = require('../../lib/utils');
  var app = ns('app');


  function get_user_email (id, callback, context) {
    if (!(id > 0)) return callback(null, '#ERROR#');
    app.call('user.get_email', {id: id}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_user_email.enableCache = true;
  registerFilter('get_user_emailAsync', get_user_email);


  function get_user_display_name (id, callback, context) {
    if (!(id > 0)) return callback(null, '#ERROR#');
    app.call('user.get_display_name', {id: id}, function (err, ret) {
      callback(null, ret);
    });
  }
  get_user_display_name.enableCache = true;
  registerFilter('get_user_display_nameAsync', get_user_display_name);

};
