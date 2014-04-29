module.exports = function (ns, register, debug) {

  register('before.get_article_list', {before: ['test_a'], after: ['test_b']}, function (data, next) {
    console.log('before', data);
    next();
  });

  register('after.get_article_list', {before: ['test_a'], after: ['test_b']}, function (data, next) {
    console.log('after', data);
    next();
  });

};
