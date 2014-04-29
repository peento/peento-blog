/**
 * Model: article_tag
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var model = createModel({
    connection: ns('db'),
    table:      'article_tag',
    primary:    'article_id',
    limit:      ns('config.model.limit'),
    fields: {
      article_id: 'number',
      tag_id:     'number'
    },
    queryFields: ['tag_id'],
    requiredFields: ['article_id', 'tag_id']
  });

  return model;

};
