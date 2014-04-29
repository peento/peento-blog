;(function () {

  // AJAX Status
  function ajaxLoading () {
    $('.ajax-loader').show();
  }
  function ajaxDone () {
    $('.ajax-loader').hide();
  }
  $(document).ajaxStart(ajaxLoading)
             .ajaxStop(ajaxDone)
             .ajaxError(ajaxDone);
  $(document.body).append('<div class="ajax-loader"><img src="/assets/default/ajax-loader.gif"></div>');

  // AJAX Request
  function makeAjaxRequest (method, url, params, callback) {
    if (method === 'del') method = 'delete';
    $.ajax({
      type:     method,
      url:      url,
      data:     params,
      dataType: 'json',
      success: function (data) {
        if (data.error) return callback(data.error);
        callback(null, data);
      },
      error:  function (req, status, err) {
        callback(status + ' ' + err);
      }
    });
  }
  var ajaxRequest = window.ajaxRequest = {};
  ['get', 'post', 'put', 'delete', 'del', 'head', 'trace', 'option'].forEach(function (method) {
    ajaxRequest[method] = function (url, params, callback) {
      if (typeof params === 'function') {
        callback = params;
        params = {};
      }
      return makeAjaxRequest(method, url, params, callback);
    };
  });

})();
