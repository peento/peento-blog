peento
======

博客系统


插件
=====

目录结构：

```
hook -------------- 钩子目录，xxx.js => hook.xxx
model ------------- 数据模型目录，xxx.js => model.xxx
call -------------- 系统调用程序目录，xxx.js => call.xxx
moddleware -------- 中间件目录，xxx.js => middleware.xxx
view -------------- 模板文件目录，xxx.liquid => view.xxx
asset ------------- 资源文件目录，xxx.xx => asset.xxx.xx
router ------------ 路由处理目录，自由注册
filter ------------ 模板函数目录，自由注册
index.js ---------- 入口文件，初始化插件时调用
```

所有目录数据均为可选，按照载入顺序依次覆盖相同命名空间的数据。



使用方法
========

```JavaScript
var peento = require('peento');

// 创建应用
var app = peento();

// 载入配置
app.config(require('./config'));


// 监听端口
app.listen(80);
```

系统调用
=======

使用方法： `app.call(name, params, callback);`

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


基本页面
=====

- `/` 首页
- `/articles` 文章列表
- `/article/:id` 文章内容页面



模板函数
========

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



钩子
=====

钩子可以为系统内置、第三方模块和程序hook目录文件。

优先级： hook目录 > 第三方模块 > 系统内置

hook名称为小写，比如执行 `app.useHook('xxx')` 时，先检查运行目录下是否存在
`./hook/xxx.js` 文件，如果不存在则检查是否安装了模块 `peento-hook-xxx` ，如果还
不存在则检查是否存在内置的 'hook.xxx'。

模块输出格式：

```JavaScript
module.exports = function (ns, register, debug) {
  // ns是全局命名空间
  // debug用来输出调试信息

  var options = {};
  options.before = ['abc', 'efg']; // 指定必须在哪些hook之前运行，可选
  options.after = ['jkl'];         // 指定必须在哪些hook之后运行，可选
  // 系统会自动检查冲突，如果有冲突则报错

  // 注册hook: 在get_article_list执行之前， after表示之后
  register('before.get_article_list', options, function (data, next, end) {
    // next();             执行下一个hook
    // next(null, data);   执行下一个hook，更改数据
    // next(err);          出错
    // end();              不再执行后面的hook
    // end(data);          不再执行后面的hook，更改数据
  });
}
```

## 执行机制

+ `app.call('get_blog_detail', params, callback)`
+ 准备执行`hook.call.get_blog_detail`
+ 执行所有`before call.get_blog_detail`的hook
+ 执行 `hook.call.get_blog_detail`
+ 执行所有`after call.get_blog_detail`的hook
+ 执行`callback`


