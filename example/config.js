var config = exports;


config.debug = true;

config.port = 3001;


config.mysql = {
  host: '127.0.0.1',
  port: 3306,
  user: 'peento',
  password: 'peento:ooxx=fuck',
  database: 'peento',
  pool: 5
};

config.model = {
  limit: 10
};

// 多说插件配置
config.duoshuo = {
  name: 'peento'
};
