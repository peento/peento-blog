/**
 * Multiparty
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {

  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart();

  return multipartMiddleware;

};
