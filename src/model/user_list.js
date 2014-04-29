/**
 * Model: user_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var utils = require('../../lib/utils');

  var model = createModel({
    connection: ns('db'),
    table:      'user_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:           'number',
      email:        'string',
      password:     'string',
      display_name: 'string'
    },
    queryFields: ['email'],
    requiredFields: ['email', 'password', 'display_name'],
    input: function (data, callback, type) {
      if (type === 'add' || type === 'update2') {
        if ('password' in data) {
          data.password = utils.encryptPassword(data.password);
        }
      }
      callback(null, data);
    }
  });

  return model;

};
