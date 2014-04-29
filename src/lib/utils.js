/**
 * Peento-Blog Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var crypto = require('crypto');
var xss = require('xss');
var utils = module.exports;



utils.argumentsToArray = function (args) {
  return Array.prototype.slice.call(args, 0);
};

utils.objectEachKey = function (obj, fn) {
  Object.keys(obj).forEach(fn);
};

utils.isString = function (str) {
  return (typeof str === 'string');
};

utils.isInteger = function (str) {
  return (Math.round(str) === Number(str));
};

utils.isNumber = function (str) {
  return (!isNaN(str));
};

utils.md5 = function (text) {
  return crypto.createHash('md5').update(text).digest('hex');
};

utils.encryptPassword = function (password) {
  var random = utils.md5(Math.random() + '' + Math.random()).toUpperCase();
  var left = random.substr(0, 2);
  var right = random.substr(-2);
  var newpassword = utils.md5(left + password + right).toUpperCase();
  return [left, newpassword, right].join(':');
};

utils.validatePassword = function (password, encrypted) {
  var random = encrypted.toUpperCase().split(':');
  if (random.length < 3) return false;
  var left = random[0];
  var right = random[2];
  var main = random[1];
  var newpassword = utils.md5(left + password + right).toUpperCase();
  return newpassword === main;
};

utils.encryptData = function (data, secret) {
  var str = JSON.stringify(data);
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
};

utils.decryptData = function (str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  var data = JSON.parse(dec);
  return data;
};

utils.randomString = function (size) {
  size = size || 6;
  var code_string = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
};

utils.cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

utils.merge = function (a, b) {
  var c = {};
  a = utils.cloneObject(a);
  b = utils.cloneObject(b);
  utils.objectEachKey(a, function (k) {
    c[k] = a[k];
  });
  utils.objectEachKey(b, function (k) {
    c[k] = b[k];
  });
  return c;
};

utils.parseQueryBool = function (str, b) {
  str = String(str);
  if (str === '1' || str === 'true' || str === 'yes' || str === 'on') {
    return true;
  } else if (str === '0' || str === 'false' || str === 'no' || str === 'off') {
    return false;
  } else {
    return b;
  }
};

var whiteList = utils.cloneObject(xss.whiteList);
(function () {
  whiteList.strike = [];
})();
var defaultXss = new xss.FilterXSS({
  stripIgnoreTag:     true,
  stripIgnoreTagBody: ['script'],
  whiteList:          whiteList
});
utils.xss = function (html) {
  return defaultXss.process(html);
};

var xssStripHtml = new xss.FilterXSS({
  whiteList:          [],
  stripIgnoreTag:     true,
  stripIgnoreTagBody: ['script']
});
utils.stripHtml = function (html) {
  return xssStripHtml.process(html);
};
