/**
 * Model: article_meta
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var utils = require('../../lib/utils');

  var model = createModel({
    connection: ns('db'),
    table:      'article_meta',
    primary:    'article_id',
    limit:      ns('config.model.limit'),
    fields: {
      article_id:   'number',
      name:         'string',
      type:         'string',
      value_double: '*',
      value_int:    '*',
      value_text:   '*'
    },
    queryFields: ['name'],
    requiredFields: ['article_id', 'name', 'type'],
    input: function (data, callback, type) {
      if ('name' in data) data.name = data.name.toLowerCase().trim();
      if (type === 'add' || type === 'update2') {
        if (utils.isNumber(data.value)) {
          if (utils.isInteger(data.value)) {
            data.type = 'int';
            data.value_int = data.value;
          } else {
            data.type = 'double';
            data.value_double = data.value;
          }
        } else {
          data.type = 'text';
          data.value_text = data.value;
        }
      }
      callback(null, data);
    },
    output: function (item, callback) {
      if (item) {
        if (item.type === 'double') {
          item.value = item.value_double;
        } else if (item.type === 'int') {
          item.value = item.value_int;
        } else {
          item.value = item.value_text;
        }
        callback(null, {
          article_id: item.article_id,
          name:       item.name,
          value:      item.value
        });
      } else {
        callback(null, item);
      }
    }
  });

  return model;

};
