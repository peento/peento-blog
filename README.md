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

+ [系统调用](https://github.com/peento/peento-blog/wiki/%E7%B3%BB%E7%BB%9F%E8%B0%83%E7%94%A8)
+ [基本页面](https://github.com/peento/peento-blog/wiki/%E5%9F%BA%E6%9C%AC%E9%A1%B5%E9%9D%A2)
+ [模板函数](https://github.com/peento/peento-blog/wiki/%E6%A8%A1%E6%9D%BF%E5%87%BD%E6%95%B0)
+ [相关插件](https://github.com/peento/peento-blog/wiki/%E7%9B%B8%E5%85%B3%E6%8F%92%E4%BB%B6)


授权协议
========

**The MIT License**
