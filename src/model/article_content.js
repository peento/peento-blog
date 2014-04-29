/**
 * Model: article_content
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var model = createModel({
    connection: ns('db'),
    table:      'article_content',
    primary:    'article_id',
    limit:      ns('config.model.limit'),
    fields: {
      article_id: 'number',
      content:    '*'
    },
    requiredFields: ['article_id', 'content']
  });

  return model;

};
