peento-blog
===========

一个基于 [peento](https://github.com/peento/peento) 框架的博客系统。
peento-blog实际上是一个peento插件，通过以下方式使用：

1、安装依赖模块：

```bash
$ npm install peento peento-blog
```

2、创建MySQL表结构：

参考文件 [install/tables.sql](https://github.com/peento/peento-blog/blob/master/install/tables.sql)

4、新建配置文件 `config.js` ：

```JavaScript
var config = exports;

// 是否开启调试模式
config.debug = true;

// 监听端口
config.port = 3000;

// MySQL数据库配置
config.mysql = {
  host: '127.0.0.1',
  port: 3306,
  user: 'peento',
  password: 'peento:ooxx=fuck',
  database: 'peento',
  pool: 5
};
```

5、新建启动文件 `app.js` ：

```JavaScript
var peento = require('peento');

var app = peento(require('./config'));

// 载入peento-blog插件
app.use('blog');

app.start();
```

6、启动程序：

```bash
$ node app
```

7、打开URL： http://127.0.0.1:3000


peento-blog提供了以下服务：


## 系统调用

用户相关：

- `user.add` 添加用户，参数：email, password, display_name
- `user.check_password` 检查密码是否正确，参数：email, password
- `user.get_info` 查询用户信息，参数：email|id
- `user.get_display_name` 查询用户的昵称，参数：email|id
- `user.get_email` 查询用户的Email，参数：id
- `user.update` 更新用户信息，参数：id, email, password, display_name
- `user.delete` 删除用户，参数：email|id
- `user.get_list` 取用户列表
- `user.get_count` 取用户数量

文章相关：

- `article.add` 添加文章，参数：author_id, title, summary, sort, content, tags，
说明：tags可以为数组，如果没指定summary时自动从content中生成
- `article.add_tag` 给文章添加标签，参数：id, name
- `article.update` 更新文章，参数：同上
- `article.update_tags` 更新文章标签列表，参数：id, tags，说明：tags可以为数组
- `article.update_content` 更新文章内容，参数：id, content
- `article.update_meta` 更新文章附加属性，参数：id, name, value
- `article.update_metas` 更新一组文章附加属性，参数：id, metas
- `article.get` 获取文章内容（完整），参数：id
- `article.get_tags` 获取文章的标签列表，参数：id
- `article.get_content` 获取文章内容，参数：id
- `article.get_meta` 获取文章附加属性，参数：id, name
- `article.get_metas` 获取文章所有附加属性，参数：id
- `article.get_list` 获取文章列表，参数：offset, limit, author_id, tags, search
- `article.get_count` 获取文章数量，参数：offset, limit, author_id, tags, search
- `article.delete` 删除文章，参数：id

标签相关：

- `tag.add` 添加标签，参数：name
- `tag.get_id` 获取指定标签的ID，参数：name
- `tag.get_name` 获取指定名称标签的ID，参数：id
- `tag.get_list` 获取标签列表
- `tag.get_count` 获取标签的数量
- `tag.delete` 删除标签，参数：name|id

网站配置相关：

- `config.get` 获取指定名称的配置，参数：name
- `config.get_all` 获取所有配置项
- `config.update` 更新配置，参数：name, value
- `config.update_all` 更新一组配置
- `config.delete` 删除配置，参数：name


## 基本页面

前台：

- `/` 首页
- `/articles` 文章列表页面
- `/article/:id` 文章内容页面

后台：

- `/admin` 首页
- `/admin/article/list` 文章列表页面
- `/admin/article/:id/edit` 编辑文章页面
- `/admin/article/new` 添加新文章页面
- `/admin/setting` 网站设置页面
- `/admin/tag` 标签列表页面
- `/admin/tag/:tag` 指定标签的文章列表页面
- `/admin/user/list` 用户列表页面
- `/admin/user/:id/edit` 用户编辑页面
- `/admin/user/new` 添加用户页面


## 模板函数

用户相关：

- `get_user_email(id)` 取用户邮箱地址
- `get_user_display_name(id)` 取用户昵称

文章相关：

- `get_article_content(id)` 取文章内容
- `get_article_tags(id)` 取文章标签列表
- `get_article_metas(id)` 取文章所有附加属性
- `get_article_meta(id, name)` 取文章指定的附加属性

标签相关：

- `get_tag_all` 取所有标签

其他：

- `gravatar` 取用户邮箱对应的头像地址


授权协议
========

**The MIT License**
