/* Peento default JavaScript */
$(document).ready(function () {

   // init tag-it
  $('input[role="tag-it"]').each(function () {
    var $me = $(this);
    var tags = $me.data('tags');
    if (!tags) tags = '';
    tags = tags.split(',');
    $me.tagit({
      availableTags: tags
    });
  });

  // delete article
  $('.delete-article').click(function () {
    var $me = $(this);
    var id = $me.data('id');
    if (!confirm('Are you sure delete article #' + id + '?')) return;
    ajaxRequest.delete('/admin/article/' + id + '.json', function (err, ret) {
      if (err) return alert(err);
      $me.closest('.article-item').hide();
    });
  });

  // delete user
  $('.delete-user').click(function () {
    var $me = $(this);
    var id = $me.data('id');
    if (!confirm('Are you sure delete user #' + id + '?')) return;
    ajaxRequest.delete('/admin/user/' + id + '.json', function (err, ret) {
      if (err) return alert(err);
      $me.closest('.user-item').hide();
    });
  });

});
