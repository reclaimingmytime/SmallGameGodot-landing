function nl2br(str) {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
}
  
/*!
 * Sanitize and encode all HTML in a user-submitted string
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
var sanitizeHTML = function (str) {
	var temp = document.createElement('div');
	temp.textContent = str;
	return temp.innerHTML;
};

hasChangelog = false;
$("#changelog").on("click", function() {
  if (!hasChangelog) {
    var changelogURL = "https://raw.githubusercontent.com/MisterL2/SmallGameGodot/master/Releases/Changelog.txt";

    fetch(changelogURL)
    .then(function (response) {
      if(response.status != 200) {
        throw new Error("Unsuccessful request.");
      }
      return response.text();
    })
    .then(data => {
      document.querySelector("#changelogContent").innerHTML = nl2br(data);
    }).catch(error => {
      console.log(error);
      document.querySelector("#changelogContent").innerHTML = '<p><span class="text-danger">Error loading changelog</span>. <a class="text-primary" target="_blank" rel="nofollow noopener noreferrer" href="' + changelogURL + '">View in browser</a>.</span></p>';
      });

    hasChangelog = true;
  }

  if (!$('#changelogContent').is(':visible')) {
    $('html').animate({
      scrollTop: $('#changelogScrollTarget').offset().top //scrolls to START of changelog
    }, 'slow');
  }

});