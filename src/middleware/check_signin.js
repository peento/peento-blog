/**
 * Check Sign In
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

module.exports = function (ns, debug) {
  return function (req, res, next) {

    if (req.session && req.session.signin_user && req.session.signin_user.id > 0) {
      return next();
    }

    res.redirect('/signin?return_url=' + req.url);

  };
};
