function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=../../";
}

function redirect(lang) {
	var restofpath = lang+window.location.pathname.slice(3);
	window.location.assign("../"+restofpath);
}

function setEnglish(){
	setCookie("language","en",365);
	redirect("en");
}

function setLithuanian(){
	setCookie("language","lt",365);
	redirect("lt");
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function language_persist() {
	var lang = getCookie("language");
	if (lang != "") {
		if (lang != window.location.pathname.slice(1, 3)) 
			redirect(lang);
	}
}

language_persist();

