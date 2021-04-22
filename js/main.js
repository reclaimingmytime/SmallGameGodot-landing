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

function nl2br(str) {
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
}

function isHidden(el) {
  return (el.offsetParent === null);
}

/**
 * Retrieves Changelog
 */
retrievedChangelog = false;
document.querySelector("#changelog").addEventListener("click", function() {
  if (!retrievedChangelog) {
    var changelogURL = "https://raw.githubusercontent.com/MisterL2/SmallGameGodot/master/Releases/Changelog.txt";

    fetch(changelogURL)
    .then(function (response) {
      if(response.status < 200 || response.status >= 400) {
        throw new Error("Unsuccessful request.");
      }
      return response.text();
    })
    .then(data => {
      document.querySelector("#changelogCard").classList.add("border-info");
      document.querySelector("#changelogContent").innerHTML = nl2br(sanitizeHTML(data));
    }).catch(error => {
      document.querySelector("#changelogCard").classList.add("border-danger");
      document.querySelector("#changelogContent").innerHTML = '<h5 class="card-title">Error loading changelog.</h5> <a class="btn btn-primary" target="_blank" rel="nofollow noopener noreferrer" href="' + changelogURL + '">View in browser</a>';
      });

    retrievedChangelog = true;
  }

  if (isHidden(document.querySelector('#changelogContent'))) {
    $('#changelogNotice').on('shown.bs.collapse', function (e) {
      window.location.href = "#changelogview";
    });
  }

});