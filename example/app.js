/**
 * Peento Example
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var peento = require('peento');

var app = peento(require('./config'));

app.use('blog');

app.use('blog-simditor');
app.use('blog-share-jiathis');
app.use('blog-comment-disqus');
app.use('blog-comment-duoshuo');
app.use('blog-comment-local');
app.use('blog-search-google');

app.start();



//console.log(app);
//console.log(app.ns());

//app.call('get_article_list', Math.random(), console.log);
//app.call('user.check_password', {email: 'test@ucdok.com', password: '1234a56'}, console.log);
function callback (err, data) {
  if (err) console.log((err && err.stack) || err);
  console.log(data);
  process.exit();
}
/*
app.call('article.update', {
  id: 13,
  author_id: 1,
  title: '大家好，这里是修改后的文章标题',
  summary: '和尚和庙的故事',
  content: '！！！！很久很久以前，有一座山，山里有座庙，庙里有个和尚在讲故事：很久很久以前……',
  tags: '庙',
  metas: {
    fuck: 'yes'
  }
}, callback);
*/
//app.call('article.get_list', {author_id: 1, limit: 2}, callback);
//app.call('user.get_count', {}, callback);
/*
app.call('nav.update', {
  name: 'comment_local_admin_list',
  type: 2,
  title: 'Comments',
  url: '/admin/comment/list'
}, callback);
*/
/*
app.call('nav.get_list', {
  type: 2
}, callback);
*/