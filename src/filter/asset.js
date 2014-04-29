/**
 * Filters: asset
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var utils = require('../../lib/utils');

  registerFilter('asset_url', function (url) {
    if (url[0] !== '/') url = '/' + url;
    return '/assets' + url;
  });

};
