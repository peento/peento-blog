/**
 * Model: tag_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var model = createModel({
    connection: ns('db'),
    table:      'tag_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:   'number',
      name: 'string'
    },
    queryFields: ['name'],
    requiredFields: ['name'],
    input: function (data, callback, type) {
      if ('name' in data) data.name = data.name.trim();
      callback(null, data);
    }
  });

  return model;

};
