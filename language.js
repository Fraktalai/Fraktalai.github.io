function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + "path=/";
}

function redirect(lang) {
	window.location.assign("../");
}

function setEnglish(){
	setCookie("language","en",360);
	redirect("en");
}

function setLithuanian(){
	setCookie("language",window.location.pathname,360);
	redirect("lt");
}

//+lang+window.location.pathname.slice(3)