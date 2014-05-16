/**
 * peento-blog
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, plugin, debug) {

  plugin.load(__dirname);

  var app = ns('app');
  app.once('start', function () {

    // register nav link
    var links = [
      {
        name:  '_admin_home',
        type:  2,
        title: 'Home',
        url:   '/admin'
      },
      {
        name:  '_admin_article_list',
        type:  2,
        title: 'Articles',
        url:   '/admin/article/list'
      },
      {
        name:  '_admin_tag',
        type:  2,
        title: 'Tags',
        url:   '/admin/tag'
      },
      {
        name:  '_admin_user_list',
        type:  2,
        title: 'Users',
        url:   '/admin/user/list'
      },
      {
        name:  '_admin_setting',
        type:  2,
        title: 'Setting',
        url:   '/admin/setting'
      }
    ];
    links.forEach(function (item) {
      app.call('nav.update', item, function (err) {
        if (err) {
          console.error((err && err.stack) || err);
        }
      });
    })

  });

};
