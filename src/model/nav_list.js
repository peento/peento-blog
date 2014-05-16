/**
 * Model: nav_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var model = createModel({
    connection: ns('db'),
    table:      'nav_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      name:      'string',
      type:      'number',
      parent:    'string',
      title:     'string',
      url:       'string',
      sort:      'number'
    },
    queryFields: ['parent', 'name', 'type'],
    requiredFields: ['name', 'title', 'url'],
    input: function (data, callback, type) {
      if ('name' in data) data.name = data.name.trim();
      if ('parent' in data) data.parent = data.parent.trim();
      if ('title' in data) data.title = data.title.trim();
      if ('url' in data) data.url = data.url.trim();

      if (type === 'add' || type === 'update') {
        if (!(data.type > 0)) data.type = 0;
      }
      callback(null, data);
    }
  });

  return model;

};
