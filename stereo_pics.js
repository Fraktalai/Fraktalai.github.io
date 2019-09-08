var rid = document.getElementById('rightImgId');
var lid = document.getElementById('leftImgId');
var dummy = document.getElementById('dummyImg');
var rEye = document.getElementById('rightEye');
var lEye = document.getElementById('leftEye');
var l_cur = document.getElementById('substitute_cursorL');
var r_cur = document.getElementById('substitute_cursorR');
var l_next = document.getElementById('nextIndexL');
var r_next = document.getElementById('nextIndexR');

var pxPerCm = 37.795276;
var imageWidth = 10 * pxPerCm; //units in px
var imageHeight = 10 * pxPerCm;
var centerDistance = 1 * pxPerCm;
var hud_margin, hud_height, hud_width;
var mode = "parallel"; // crossed, parallel eye view
var interaction_state = "empty"; //mouse interaction event
var stepper = .0; // if 0 – crossed, if – 1 parallel
var transX = 0; //displacement of the images "+" is to right, "-" is to left
var transY = 0; //displacement "+" is towards bottom, "-" is towards top 
var offsetx, offsety; // cursor position adjustments
var ghostx = 0, ghosty = 0, ghostimageWidth = 0; // mouse position on the moment of mousedown

index = 0;

function resize(width) {
	if (width < 2*hud_margin) width = 2*hud_margin;
	if (width * dummy.naturalHeight / dummy.naturalWidth < 2*hud_margin+hud_height) width = (2*hud_margin+hud_height)*dummy.naturalWidth/dummy.naturalHeight;
	if (width > (window.innerWidth-centerDistance)/2) width = (window.innerWidth-centerDistance)/2;
	if (width * dummy.naturalHeight / dummy.naturalWidth > window.innerHeight) width = window.innerHeight/dummy.naturalHeight*dummy.naturalWidth;
	imageWidth = width;
	imageHeight = imageWidth * dummy.naturalHeight / dummy.naturalWidth;
	rid.style.top = window.innerHeight/2-imageHeight/2+transY+"px";
	lid.style.top = rid.style.top;
	rid.style.bottom = window.innerHeight/2-imageHeight/2-transY+"px";
	lid.style.bottom = rid.style.bottom;
	if (mode == "parallel") {
		lid.style.right = window.innerWidth/2+centerDistance/2-transX+"px";
		lid.style.left = window.innerWidth/2-imageWidth-centerDistance/2+transX+"px";
		rid.style.right = window.innerWidth/2-imageWidth-centerDistance/2-transX+"px";
		rid.style.left = window.innerWidth/2+centerDistance/2+transX+"px";
	} else if (mode == "crossed") {
		rid.style.right = window.innerWidth/2+centerDistance/2-transX+"px";
		rid.style.left = window.innerWidth/2-imageWidth-centerDistance/2+transX+"px";
		lid.style.right = window.innerWidth/2-imageWidth-centerDistance/2-transX+"px";
		lid.style.left = window.innerWidth/2+centerDistance/2+transX+"px";
	}
	l_next.style.top = (window.innerHeight-hud_height)/2+transY+"px";
	r_next.style.top = l_next.style.top;
}

function hudsize(margin, height, width) {
	hud_margin = margin;
	hud_height = height;
	hud_width = width;
	l_next.style.width = hud_margin+"px";
	r_next.style.width = l_next.style.width;
	l_next.style.height = hud_height+"px";
	r_next.style.height = l_next.style.height;
}

function switchSides() {
	if (mode == "crossed") mode = "parallel";
	else if (mode == "parallel") mode = "crossed";
	var animation = setInterval(flipper, 20);
	var step = 0;
	function flipper() {
		if (stepper > 1.0) { clearInterval(animation); stepper = 1.0; }
		else if (stepper < .0) { clearInterval(animation); stepper = .0; }
		else {
			step = (1-Math.cos(stepper*Math.PI))/2;
			var displacement = step*(imageWidth+centerDistance);
			lid.style.right = window.innerWidth/2+centerDistance/2-displacement-transX+"px";
			lid.style.left = window.innerWidth/2-imageWidth-centerDistance/2+displacement+transX+"px";
			rid.style.right = window.innerWidth/2-imageWidth-centerDistance/2+displacement-transX+"px";
			rid.style.left = window.innerWidth/2+centerDistance/2-displacement+transX+"px";
			rEye.style.transform = "rotate("+step+"rad)";
			lEye.style.transform = "rotate(-"+step+"rad)";	
			if (mode == "crossed") stepper = stepper + 0.025;
			if (mode == "parallel") stepper = stepper - 0.025;
		}
	}
}

function changeSource(index) {
	dummy.src = pics_left[index];
	dummy.onload = function(){
		resize(imageWidth);
		rid.style.backgroundImage = "url("+pics_right[index]+")";
		lid.style.backgroundImage = "url("+pics_left[index]+")";};
}

function showMouse() {
	l_cur.style.visibility = "visible";
	r_cur.style.visibility = "visible";
}

function hideMouse() {
	if (interaction_state.slice(-6) != "active") {
		l_cur.style.visibility = "hidden";
		r_cur.style.visibility = "hidden";
	} else { document.addEventListener("mousemove", mousePos) }
	l_next.style.visibility = "hidden";
	r_next.style.visibility = "hidden";
}

function mousePos() {
	var getmouseX = event.clientX;
	if (interaction_state.slice(-6) == "active") { //scalellactive
		if (interaction_state.substring(5, 7) == "ll") { resize((window.innerWidth-centerDistance)/2-event.clientX); getmouseX = ghostx+ghostimageWidth-imageWidth; }
		if (interaction_state.substring(5, 7) == "rl") { resize(event.clientX-ghostx+ghostimageWidth); getmouseX = ghostx;}
		if (interaction_state.substring(5, 7) == "lr") { resize(ghostx-event.clientX+ghostimageWidth); getmouseX = ghostx;}
		if (interaction_state.substring(5, 7) == "rr") { resize(event.clientX-(window.innerWidth+centerDistance)/2); getmouseX = ghostx-ghostimageWidth+imageWidth; }
	} else {
		//Section responsible for allowing photo index switching
		if (event.clientY > (window.innerHeight-hud_height)/2+transY && event.clientY < (window.innerHeight+hud_height)/2+transY) {
			if (event.clientX < (window.innerWidth-centerDistance)/2-imageWidth+hud_width+transX ||
				(event.clientX > window.innerWidth/2+transX && event.clientX < (window.innerWidth+centerDistance)/2+hud_width+transX)) {  // Nuotraukos į kairę
				l_next.style.left = lid.style.left;
				r_next.style.left = rid.style.left;
				l_next.style.transform = "rotate(0deg)";
				r_next.style.transform = "rotate(0deg)";
				l_next.style.visibility = "visible";
				r_next.style.visibility = "visible";
				interaction_state = "previous_index";
			} else if (event.clientX > (window.innerWidth+centerDistance)/2+imageWidth-hud_margin+transX ||
				(event.clientX < window.innerWidth/2+transX && event.clientX > (window.innerWidth-centerDistance)/2-hud_margin+transX)) {  // Nuotraukos į dešinę
				if (mode == "parallel") {
					l_next.style.left = (window.innerWidth-centerDistance)/2-hud_width+transX+"px";
					r_next.style.left = (window.innerWidth+centerDistance)/2+imageWidth-hud_width+transX+"px";
				} else if (mode == "crossed") {
					r_next.style.left = (window.innerWidth-centerDistance)/2-hud_width+transX+"px";
					l_next.style.left = (window.innerWidth+centerDistance)/2+imageWidth-hud_width+transX+"px";
				}
				l_next.style.transform = "rotate(180deg)";
				r_next.style.transform = "rotate(180deg)";
				l_next.style.visibility = "visible";
				r_next.style.visibility = "visible";
				interaction_state = "next_index";
			} else {
				l_next.style.visibility = "hidden";
				r_next.style.visibility = "hidden";
				interaction_state = "empty";
			}
		} else {
			l_next.style.visibility = "hidden";
			r_next.style.visibility = "hidden";
			//Section responsible for resizing detection and realization
			if (event.clientX < (window.innerWidth-centerDistance)/2-imageWidth+hud_margin) { // scalelr  means left corner in right image
				interaction_state = "scalell";
			} else if (event.clientX < window.innerWidth/2 && event.clientX > (window.innerWidth-centerDistance)/2-hud_margin) {
				interaction_state = "scalerl";
			} else if (event.clientX > window.innerWidth/2	&& event.clientX < (window.innerWidth+centerDistance)/2+hud_margin) {
				interaction_state = "scalelr";
			} else if (event.clientX > (window.innerWidth+centerDistance)/2+imageWidth-hud_margin) {
				interaction_state = "scalerr";
			} else interaction_state = "empty";
			if (interaction_state.slice(0, 6) == "scalel") {
				if (event.clientY < (window.innerHeight-imageHeight)/2+hud_margin) {
					l_cur.style.transform = "rotate(0deg) translate(0px, 0px)";
				} else if (event.clientY > (window.innerHeight+imageHeight)/2-hud_margin) {
					l_cur.style.transform = "rotate(270deg) translate(10px, -10px)";
				} else interaction_state = "empty";
			} else if (interaction_state.substring(0, 6) == "scaler") {
				if (event.clientY < (window.innerHeight-imageHeight)/2+hud_margin) {
					l_cur.style.transform = "rotate(90deg) translate(-2px, 10px)";
				} else if (event.clientY > (window.innerHeight+imageHeight)/2-hud_margin) {
					l_cur.style.transform = "rotate(180deg) translate(10px, 10px)";
				} else interaction_state = "empty";
			}
		}
		if (interaction_state.substring(0, 5) == "scale") {
			l_cur.style.backgroundImage = "url(../stereo_scale_arrow.png)";
		} else {
			l_cur.style.transform = "rotate(0deg)";
			l_cur.style.backgroundImage = "url(../stereo_arrow.png)";
		}
		r_cur.style.transform = l_cur.style.transform;
		r_cur.style.backgroundImage = l_cur.style.backgroundImage;
	}
	if (getmouseX < window.innerWidth/2) {
		if (mode == "parallel") {
			l_cur.style.left = getmouseX+"px";
			r_cur.style.left = getmouseX+imageWidth+centerDistance+"px";
		} else if (mode == "crossed") {
			r_cur.style.left = getmouseX+"px";
			l_cur.style.left = getmouseX+imageWidth+centerDistance+"px";
	} }	else {
		if (mode == "parallel") {
			l_cur.style.left = getmouseX-imageWidth-centerDistance+"px";
			r_cur.style.left = getmouseX+"px";
		}
		if (mode == "crossed") {
			r_cur.style.left = getmouseX-imageWidth-centerDistance+"px";
			l_cur.style.left = getmouseX+"px";
	} }
	l_cur.style.top = event.clientY+"px";
	r_cur.style.top = event.clientY+"px";
}

/* Global keyboard keys lockers: If key pressed then "true" */
leftkey = false;
rightkey = false;

document.addEventListener("keydown", function(event) {
    if (event.keyCode == 39 && rightkey == false) {
		rightkey = true;
        if (index < pics_nameLT.length-1) {
			index = index + 1;
			changeSource(index);
		}
		setTimeout(function(){rightkey = false;},300);
    }
	if (event.keyCode == 37 && leftkey == false) {
        leftkey = true;
		if (index > 0) {
			index = index - 1;
			changeSource(index);
		}
		setTimeout(function(){leftkey = false;},300);
    }
})

document.addEventListener("keyup", function(event) {
	if (event.keyCode == 39) {
		rightkey = false;
	}
	if (event.keyCode == 37) {
		leftkey = false;
	}	
})

document.addEventListener("click", function(event) {
	if (interaction_state == "previous_index") {
		if (index > 0) {
			index = index - 1;
			changeSource(index);
		}
	}
	if (interaction_state == "next_index") {
		if (index < pics_nameLT.length-1) {
			index = index + 1;
			changeSource(index);
		}
	}
})

document.addEventListener("mousedown", function(event) {
	if (interaction_state.slice(0, 5) == "scale") {
		interaction_state = interaction_state+"active";
		document.body.style.cursor = 'none';
		ghostx = event.clientX;
		ghosty = event.clientY;
		ghostimageWidth = imageWidth;
} })

document.addEventListener("mouseup", function(event) {
	if (interaction_state.slice(-6) == "active") {
		interaction_state = "empty";
		document.body.style.cursor = 'auto';
		document.removeEventListener("mousemove", mousePos);
		ghostx = 0;
		ghosty = 0;
		ghostimageWidth = 0;
		if (event.clientY < (window.innerHeight-imageHeight)/2+transY || event.clientY > (window.innerHeight+imageHeight)/2+transY ||
		event.clientX < (window.innerWidth-centerDistance)/2-imageWidth+transX || event.clientX < (window.innerWidth+centerDistance)/2+imageWidth+transX ||
		(event.clientX > (window.innerWidth-centerDistance)/2+transX && event.clientX < (window.innerWidth+centerDistance)/2+transX)) hideMouse();
	}
})

// Photos database  From Google Album archive
var pics_nameLT = [];
var pics_nameEN = [];
var pics_author = [];
var pics_date = [];
var pics_vieta = [];
var pics_right = [];
var pics_left = [];
//0
pics_nameLT[0] = "Cirkliškio dvaras"; pics_nameEN[0] = "Dvaras of Cirkliskis"; pics_author[0] = "Oskaras Venckus"; pics_date[0] = "2019-06-30";
pics_right[0] = "https://images2.imgbox.com/5c/1a/ydtNi4oN_o.jpg";
pics_left[0] = "https://images2.imgbox.com/8c/ee/boiuSYAs_o.jpg";
//1
pics_nameLT[1] = "Cirkliškio dvaras"; pics_nameEN[1] = ""; pics_author[1] = "Oskaras Venckus"; pics_date[1] = "2019-06-30";
pics_right[1] = "https://images2.imgbox.com/17/73/JUSTHFFZ_o.jpg";
pics_left[1] = "https://images2.imgbox.com/33/d4/WrvVHACi_o.jpg";
//2
pics_nameLT[2] = "Cirkliškio dvaras"; pics_nameEN[2] = "Dvaras of Cirkliskis"; pics_author[2] = "Oskaras Venckus"; pics_date[2] = "2019-06-30";
pics_right[2] = "https://images2.imgbox.com/ba/5e/LNcUI4Xf_o.jpg";
pics_left[2] = "https://images2.imgbox.com/3a/5b/p9VkFzh3_o.jpg";
//3
pics_nameLT[3] = "Bokštas"; pics_nameEN[3] = "Tower"; pics_author[3] = "Oskaras Venckus"; pics_date[3] = "2019-06-30";
pics_right[3] = "https://images2.imgbox.com/51/dc/EatAZXn8_o.jpg";
pics_left[3] = "https://images2.imgbox.com/6d/ab/9G0tNwfs_o.jpg";
//4
pics_nameLT[4] = "Pelėdų sodyba"; pics_nameEN[4] = "The Owls homestead"; pics_author[4] = "Oskaras Venckus"; pics_date[4] = "2019-06-30";
pics_right[4] = "https://images2.imgbox.com/6a/fd/obaVTUW2_o.jpg";
pics_left[4] = "https://images2.imgbox.com/84/65/szqTy0vK_o.jpg";
//5
pics_nameLT[5] = "Ąžuolo žiauberis"; pics_nameEN[5] = "Oak bark"; pics_author[5] = "Oskaras Venckus"; pics_date[5] = "2019-06-30";
pics_right[5] = "https://images2.imgbox.com/0d/97/UJkyAZQC_o.jpg";
pics_left[5] = "https://images2.imgbox.com/aa/cb/zaCP4mNa_o.jpg";

/*
http://imgbox.com/UJkyAZQC
http://imgbox.com/zaCP4mNa
http://imgbox.com/EatAZXn8
http://imgbox.com/9G0tNwfs
http://imgbox.com/ydtNi4oN
http://imgbox.com/boiuSYAs
http://imgbox.com/JUSTHFFZ
http://imgbox.com/WrvVHACi
http://imgbox.com/LNcUI4Xf
http://imgbox.com/p9VkFzh3
http://imgbox.com/1vRupvTx
http://imgbox.com/sZ3MJtR1
http://imgbox.com/zmOJ7qzc
http://imgbox.com/1OeNwdem
http://imgbox.com/obaVTUW2
http://imgbox.com/szqTy0vK
http://imgbox.com/xcz5YvkN
http://imgbox.com/Ss6lhRT0
http://imgbox.com/9jh4h8b0
http://imgbox.com/fIpo7Njx
http://imgbox.com/P5sykL2u
http://imgbox.com/5w8cBjrC
*/

/* Initialization */
changeSource(0);
hudsize(30, 40, 30);
resize(imageWidth);