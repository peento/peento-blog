/**
 * Filters: utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, registerFilter, debug) {
  var formatUrl = require('url').format;
  var utils = require('../../lib/utils');

  registerFilter('gravatar', function (email) {
    return '//www.gravatar.com/avatar/' + utils.md5(email || '');
  });

  registerFilter('make_paginationAsync', function (count, callback, context) {
    context.fetchLocals('_server', function (err, _server) {
      if (err) return callback(err);
      _server = _server || {};
      _server.query = _server.query || {};

      var limit = parseInt(_server.query.limit, 10);
      if (!(limit > 0)) limit = ns('config.model.limit');
      var offset = parseInt(_server.query.offset, 10);
      if (!(offset > 0)) offset = 0;
      var page = parseInt(offset / limit, 10) + 1;

      var info = pagination(count, limit, page);
      var query = utils.cloneObject(_server.query);
      function getOffset (p) {
        return (p - 1) * limit;
      }
      function getUrl (p) {
        var offset = getOffset(p);
        query.offset = offset;
        var url = formatUrl({query: query});
        return url;
      }
      function newItem (p) {
        return {
          text:   p,
          url:   (p > 0 ? getUrl(p) : '#')
        };
      }
      info = {
        current:  newItem(info.current),
        next:     newItem(info.next),
        previous: newItem(info.previous),
        list:     info.list.map(function (item) {
          return newItem(item);
        })
      };

      callback(null, info);
    });
  });

};

function pagination (count, size, page) {
  if (count % size === 0) {
    var maxPage = parseInt(count / size, 10);
  } else {
    var maxPage = parseInt(count / size, 10) + 1;
  }
  if (isNaN(page) || page < 1) {
    page = 1;
  }
  page = parseInt(page);

  var list = [page - 2, page - 1, page, page + 1, page + 2];
  for (var i = 0; i < list.length;) {
    if (list[i] < 1 || list[i] > maxPage) {
      list.splice(i, 1);
    } else {
      i++;
    }
  }
  if (list[0] !== 1) {
    list.unshift('...');
    list.unshift(1);
  }
  if (list[list.length - 1] < maxPage) {
    list.push('...');
    list.push(maxPage);
  }

  var ret = {
    current:    page,
    next:       page + 1,
    previous:   page - 1,
    list:       list
  };
  if (ret.next > maxPage) ret.next = maxPage;
  if (ret.previous < 1)   ret.previous = 1;

  return ret;
}
