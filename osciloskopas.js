//linear-gradient(10deg, #33383B, #889977)

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
}

function osciloskopo_maketas() {
	var ctx = document.getElementById("osciloscopebody").getContext('2d');
	var lingrad = ctx.createLinearGradient(0, 0, 20, 360);
	lingrad.addColorStop(0, '#AABB99');
	lingrad.addColorStop(1, '#BBCC99');
	roundedRect(ctx, 1, 1, 638, 358, 20);
	ctx.fillStyle = '#BBAA66';
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fill();
	roundedRect(ctx, 10, 10, 620, 340, 16);
	ctx.fillStyle = lingrad;
	ctx.stroke();
	ctx.fill();
	roundedRect(ctx, 30, 20, 320, 320, 30);
	//ctx.arc(180, 180, 150, 0, 2*Math.PI);
	ctx.stroke();
	ctx.fillStyle = '#BBAA66';
	ctx.fill();
	ctx.beginPath();
	roundedRect(ctx, 40, 30, 300, 300, 24);
	//ctx.arc(180, 180, 140, 0, 2*Math.PI);
	ctx.fillStyle = '#051A05';
	ctx.fill();
}

function isjungimas(){
	var ctx = document.getElementById("osciloscopebody").getContext('2d');
	var button = document.getElementById("ijungimas");
	var ongrad = ctx.createRadialGradient(180, 180, 0, 180, 180, 135);	
		ongrad.addColorStop(0, '#204900');
		ongrad.addColorStop(1, '#152A15');
	if (button.value == "OFF") {
		button.value = "ON";
		button.style.backgroundColor = "#DEE5BB";
		ctx.beginPath();
		roundedRect(ctx, 42, 32, 296, 296, 23);
		ctx.fillStyle = ongrad;
		ctx.fill();	}
	else {
		button.value = "OFF";
		button.style.backgroundColor = "#889977";
		roundedRect(ctx, 40, 30, 300, 300, 24);
		ctx.fillStyle = '#051A05';
	ctx.fill(); }
}

//langelio vertės nuo -1 iki 1.

var global = {
	time: 0,
	x: -1,
	y: 0,
	frames: 10,
	ch1freq: 1,
	ch2freq: 2,
	ch1amp: 1,
	ch2amp: 0.7}

document.getElementById("ch1").defaultValue = "2";	
document.getElementById("ch2").defaultValue = "1";
document.getElementById("amplitudech2").defaultValue = "70";
	
function changech1() {	
	global.ch1freq = document.getElementById("ch1").value;
	global.time = 0;
	global.x = -1;
	global.y = 0;
}

function changech2() {
	global.ch2freq = document.getElementById("ch2").value;
	global.ch2amp = document.getElementById("amplitudech2").value/100;
	global.time = 0;
	global.x = -1;
	global.y = 0;
}
	
function funcx(ctx) {
	global.x += 2*global.ch1freq*0.04/1000; 
	if(global.x>1) {global.x -= 2 + 2*global.ch1freq*0.04/1000; ctx.stroke(); ctx.beginPath()}
	else if(global.x<-1) {global.x += 2 + 2*global.ch1freq*0.04/1000; ctx.stroke(); ctx.beginPath()};
	return global.x;
}

function funcy(ctx) {
	global.time += 0.04/1000;
	global.y = global.ch2amp*Math.cos(global.ch2freq*2*Math.PI*global.time);
	return global.y;
}

function signalas() {
	var ctx = document.getElementById("osciloscopesignal").getContext('2d');
	ctx.strokeStyle = "#00FF00";
	window.setInterval(function() {
		ctx.clearRect(0,0,280,280);
		ctx.beginPath();
		for(i=0; i<1000; i++) {
			ctx.lineTo(140 + 140*funcx(ctx), 140 - 140*funcy(ctx)); }
		ctx.stroke();}, 40);
}

osciloskopo_maketas();
signalas();