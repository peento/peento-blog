/**
 * Model: config
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var model = createModel({
    connection: ns('db'),
    table:      'config',
    primary:    'name',
    limit:      ns('config.model.limit'),
    fields: {
      name:  'string',
      value: '*'
    },
    requiredFields: ['name', 'value'],
    input: function (data, callback, type) {
      if ('name' in data) data.name = data.name.toLowerCase().trim();
      if (type === 'add' || type === 'update2') {
        if ('value' in data) {
          data.value = JSON.stringify(data.value);
        }
      }
      callback(null, data);
    },
    output: function (item, callback) {
      if (item) {
        try {
          item.value = JSON.parse(item.value);
        } catch (err) {
          return callback(err, item);
        }
      }
      callback(null, item);
    }
  });

  return model;

};
