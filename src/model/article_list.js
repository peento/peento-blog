/**
 * Model: article_list
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, createModel, debug) {

  var async = require('async');
  var parseCondition = require('lei-mysql').parseCondition;

  function cloneObject (obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  var model = createModel({
    connection: ns('db'),
    table:      'article_list',
    primary:    'id',
    limit:      ns('config.model.limit'),
    fields: {
      id:         'number',
      author_id:  'number',
      title:      'string',
      summary:    '*',
      created_at: 'number',
      updated_at: 'number',
      is_removed: 'number',
      sort:       'number'
    },
    queryFields: ['is_removed'],
    requiredFields: ['author_id', 'title'],
    input: function (data, callback, type) {
      if (type === 'add') {
        data.created_at = model.timestamp();
      }
      if (type === 'add' || type === 'update2') {
        data.updated_at = model.timestamp();
      }
      if (type === 'get' || type === 'list' || type === 'count') {
        data.is_removed = 0;
      }
      callback(null, data);
    },
    output: function (item, callback) {
      if (item) {
        item.is_removed = !!item.is_removed;
        item.created_at = new Date(item.created_at * 1000);
        item.updated_at = new Date(item.updated_at * 1000);
      }
      callback(null, item);
    }
  });


  model.customQuerySql = function (type, fields, query, callback) {
    query = cloneObject(query);
    var me = this;
    var db = me.base.connection;

    var tags = query.tags;
    var search = query.search;

    me.formatInput(query, function (err, query) {

      // valide data
      query = me.filterData(query);
      var err = me.validData(query);
      if (err) return callback(err);

      // generate search sql
      delete query.tags;
      var where = parseCondition(query);
      var sql = 'SELECT ' + fields + ' FROM `article_list` WHERE ' + where;
      if (search) {
        search = '"%' + db.escape(search).slice(1, -1) + '%"';
        sql += ' AND (`title` LIKE ' + search + ' OR `summary` LIKE ' + search + ')';
      }
      if (!tags) return callback(null, sql);

      // generate tags sql
      if (!Array.isArray(tags)) tags = tags.split(/\s*,\s*/);
      var app = ns('app');
      async.mapSeries(tags, function (tag, next) {
        app.call('tag.get_id', {name: tag}, function (err, id) {
          next(null, id || 0);
        });
      }, function (err, ids) {
        if (err) return callback(err);

        sql += ' AND `id` IN (SELECT `article_id` FROM `article_tag` WHERE `tag_id` IN (' + ids.join(',') + '))';
        callback(null, sql);
      });

    }, type);
  }

  model.list = function (query, options, callback) {
    if (!(query.tags || query.search)) {
      return model.base.list(query, options, callback);
    }

    var me = this;
    var db = me.base.connection;
    options = cloneObject(options);

    // sql tail
    var tail = ' ';
    if (Array.isArray(options.order)) {
      tail += ' ORDER BY ' + options.order.map(function (item) {
        return db.escapeId(item[0]) + ' ' + (String(item[1]).toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
      }).join(', ');
    }
    if (!(options.offset > 0)) options.offset = 0;
    if (!(options.limit > 0)) options.limit = options.limit = me._limit;
    tail += ' LIMIT ' + Number(options.offset) + ', ' + Number(options.limit);

    me.customQuerySql('list', '*', query, function (err, sql) {
      if (err) return callback(err);

      db.query(sql + tail, function (err, list) {
        if (err) return callback(err);

        async.mapSeries(list, function (data, next) {
          me.formatOutput(data, next);
        }, callback);
      });
    });
  };


  model.count = function (query, callback) {
    if (!(query.tags || query.search)) {
      return model.base.count(query, callback);
    }

    var me = this;
    var db = me.base.connection;
    me.customQuerySql('count', 'COUNT(*) AS `c`', query, function (err, sql) {
      if (err) return callback(err);

      db.query(sql, function (err, list) {
        callback(err, (list && list[0] && list[0].c) || 0);
      });
    });
  };


  return model;

};
