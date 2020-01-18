function nl2br(str) {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
}
  
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) {
    return map[m];
  });
}

hasChangelog = false;
$("#changelog").click(function() {
  if (!hasChangelog) {
    var changelogURL = "https://raw.githubusercontent.com/MisterL2/SmallGameGodot/master/Releases/Changelog.txt";
    $.ajax({
      url: changelogURL,
      success: function(result) {
        $("#changelogContent").html(nl2br(escapeHtml(result)));
      },
      error: function(result) {
        $("#changelogContent").html('<p><span class="text-danger">Error loading changelog</span>. <a class="text-primary" target="_blank" rel="nofollow noopener noreferrer" href="' + changelogURL + '">View in browser</a>.</span></p>');
      },
    });
    hasChangelog = true;
  }

  if (!$('#changelogContent').is(':visible')) {
    $('html').animate({
      scrollTop: $('#changelogScrollTarget').offset().top //scrolls to START of changelog
    }, 'slow');
  }

});