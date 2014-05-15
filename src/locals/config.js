/**
 * Locals: config
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerLocals, debug) {
  var utils = require('../lib/utils');
  var app = ns('app');

  registerLocals(/^_config_/, function (name, callback, context) {
    app.call('config.get', {name: name.slice(8)}, function (err, val) {
      if (err) return callback(null, '#Error:' + name + '#');
      callback(null, val);
    });
  });

};
