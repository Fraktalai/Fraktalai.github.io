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

function sawsymbol(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x+8, y+9);
	ctx.lineTo(x+8, y-7);
	ctx.lineTo(x-8, y+9);
	ctx.stroke();
}

function sinesymbol(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x-10, y+3);
	ctx.quadraticCurveTo(x-5, y-18, x, y);
	ctx.quadraticCurveTo(x+5, y+18, x+10, y-3)
	ctx.stroke();
}

function sqsymbol(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x-11, y+8);
	ctx.lineTo(x-6, y+8);
	ctx.lineTo(x-6, y-7);
	ctx.lineTo(x+6, y-7);
	ctx.lineTo(x+6, y+8);
	ctx.lineTo(x+11, y+8);
	ctx.stroke();
}

function saw2symbol(ctx, x, y) {
	ctx.beginPath();
	ctx.moveTo(x-10, y+3);
	ctx.lineTo(x-4, y-8);
	ctx.lineTo(x+4, y+8);
	ctx.lineTo(x+10, y-3)
	ctx.stroke();
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
	ctx.stroke();
	ctx.fillStyle = '#BBAA66';
	ctx.fill();
	roundedRect(ctx, 40, 30, 300, 300, 24);
	ctx.fillStyle = '#051A05';
	ctx.fill();
	roundedRect(ctx, 360, 50, 260, 125, 20);
	ctx.fillStyle = '#BBAA66';
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fill();
	roundedRect(ctx, 360, 210, 260, 125, 20);
	ctx.stroke();
	ctx.fill();
	ctx.font = 'bold 24px Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText('X Kanalas', 420, 40);
	ctx.fillText('Y Kanalas', 380, 200);
	ctx.font = 'bold 12px Arial';
	ctx.fillText('Atnaujinimo dažnis:', 420, 347)
	ctx.fillText('Dažnis, Hz', 410, 108);
	ctx.fillText('1', 370, 68);
	ctx.fillText('10', 450, 68);
	ctx.fillText('0', 472, 68);
	ctx.fillText('1', 498, 68);
	ctx.fillText('0', 370, 126);
	ctx.fillText('1', 498, 126);
	ctx.fillText('x0,1', 516, 79);
	ctx.fillText('x1', 556, 79);
	ctx.fillText('x10', 588, 79);
	ctx.fillText('x100', 515, 99);
	ctx.fillText('x1k', 553, 99);
	ctx.fillText('STOP', 581, 99);
	sawsymbol(ctx, 526, 125);
	sinesymbol(ctx, 563, 125);
	sqsymbol(ctx, 598, 125);
	saw2symbol(ctx, 528, 155);
	sawsymbol(ctx, 526, 285);
	sinesymbol(ctx, 563, 285);
	sqsymbol(ctx, 598, 285);
	saw2symbol(ctx, 528, 315);
	ctx.fillText('Dažnis, Hz', 410, 268);
	ctx.fillText('1', 370, 230);
	ctx.fillText('10', 450, 230);
	ctx.fillText('0', 472, 230);
	ctx.fillText('1', 498, 230);
	ctx.fillText('0', 370, 288);
	ctx.fillText('1', 498, 288);
	ctx.fillText('x0,1', 516, 239);
	ctx.fillText('x1', 556, 239);
	ctx.fillText('x10', 588, 239);
	ctx.fillText('x100', 515, 259);
	ctx.fillText('x1k', 553, 259);
	ctx.fillText('STOP', 581, 259);
	ctx.fillText('Amplitudė', 412, 165);
	ctx.fillText('Amplitudė', 412, 325);
	ctx.font = 'regular 18px Arial';
	ctx.fillText('EXT', 550, 325);
	ctx.fillStyle = '#333333';
	ctx.fillRect(590, 20, 30, 20);
	ctx.beginPath();
	ctx.arc(605, 30, 6, 0, 2*Math.PI);
	ctx.fillStyle = "#AA0000";
	ctx.fill();
	ctx.lineWidth = 1;
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
		button.style.borderStyle = "inset";
		ctx.beginPath();
		roundedRect(ctx, 42, 32, 296, 296, 23);
		ctx.fillStyle = ongrad;
		ctx.fill();
		ctx.strokeStyle = '#132813';
		ctx.beginPath();
		for(i=1; i<8; i++){	
			if(i!=4) ctx.lineWidth = 1;
			ctx.moveTo(42, 28+38*i);
			ctx.lineTo(338, 28+38*i);
			ctx.moveTo(38+38*i, 32);
			ctx.lineTo(38+38*i, 328);
			ctx.stroke();
			ctx.lineWidth = 2;
			ctx.moveTo(47.5+38*i, 175);
			ctx.lineTo(47.5+38*i, 185);
			ctx.moveTo(57+38*i, 175);
			ctx.lineTo(57+38*i, 185);
			ctx.moveTo(66.5+38*i, 175);
			ctx.lineTo(66.5+38*i, 185);
			ctx.moveTo(185, 37.5+38*i);
			ctx.lineTo(195, 37.5+38*i);
			ctx.moveTo(185, 47+38*i);
			ctx.lineTo(195, 47+38*i);
			ctx.moveTo(185, 56.5+38*i);
			ctx.lineTo(195, 56.5+38*i);
			ctx.stroke();}
		signalas();	}
	else {
		button.value = "OFF";
		button.style.backgroundColor = "#889977";
		button.style.borderStyle = "outset";
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
	ch2freq: 1,
	ch1amp: 1,
	ch2amp: 0.7,
	ch1magnitude: 1,
	ch2magnitude: 1,
	step: 0.04/1000,
	signaltype1: 0,
	signaltype2: 1,
	phase1: 1,
	phase2: 1}

document.getElementById("ch1").defaultValue = "1";	
document.getElementById("ch2").defaultValue = "1";
document.getElementById("ch1div10").defaultValue = "0";	
document.getElementById("ch2div10").defaultValue = "0";
document.getElementById("amplitudech2").defaultValue = "70";
document.getElementById("amplitudech1").defaultValue = "100";
document.getElementById("diskretizavimas").defaultValue = "25";
signal1(0);
signal2(1);
ch1magnitude(1);
ch2magnitude(1);
	
function changech1() {	
	global.ch1freq = global.ch1magnitude*document.getElementById("ch1").value;
	global.ch1freq += document.getElementById("ch1div10").value*0.1;
	global.ch1amp = document.getElementById("amplitudech1").value/100;
	if (global.signaltype1 == 2) {if(global.x<0) {global.x= -global.ch1amp} else {global.x = global.ch1amp}}
}

function changech2() {
	global.ch2freq = global.ch2magnitude*document.getElementById("ch2").value;
	global.ch2freq += document.getElementById("ch2div10").value*0.1;
	global.ch2amp = document.getElementById("amplitudech2").value/100;
	if (global.signaltype2 == 2) {if(global.y<0) {global.y= -global.ch2amp} else {global.y = global.ch2amp}}
}
	
function funcx(ctx) {
	if (global.signaltype1 == 0) {
		global.x += global.ch1amp*2*global.ch1freq*global.step; 
		if(global.x>global.ch1amp) {global.x -= global.ch1amp*2; ctx.stroke(); ctx.beginPath();} }
	else if (global.signaltype1 == 1) {
		global.phase1 += global.ch1freq*2*Math.PI*global.step;
		global.x = global.ch1amp*Math.sin(global.phase1, global.ch1amp); }
	else if (global.signaltype1 == 2) {
		global.phase1 += global.ch1freq*global.step;
		if (global.phase1 > 1) {global.phase1 -= 2; global.x *= -1} }
	else if (global.signaltype1 == 3) {
		global.x += global.ch1amp*global.step*4*global.ch1freq*global.phase1;
		if (global.x <= -global.ch1amp) {global.phase1 = 1; global.x+= 2*global.ch1amp*global.step*4*global.ch1freq}
		if (global.x >= global.ch1amp) {global.phase1 = -1; global.x-= 2*global.ch1amp*global.step*4*global.ch1freq}}
	return global.x;
}

function funcy(ctx) {
	if (global.signaltype2 == 0) {
		global.y += global.ch2amp*2*global.ch2freq*global.step; 
		if(global.y>global.ch2amp) {global.y -= global.ch2amp*2; ctx.stroke(); ctx.beginPath();} }
	else if (global.signaltype2 == 1) {
		global.phase2 += global.ch2freq*2*Math.PI*global.step;
		global.y = global.ch2amp*Math.sin(global.phase2, global.ch2amp); }
	else if (global.signaltype2 == 2) {
		global.phase2 += 2*global.ch2freq*global.step;
		if (global.phase2 > 1) {global.phase2 -= 1; global.y *= -1} }
	else if (global.signaltype2 == 3) {
		global.y += global.ch2amp*global.step*4*global.ch2freq*global.phase2;
		if (global.y <= -global.ch2amp) {global.phase2 = 1; global.y+= 2*global.ch2amp*global.step*4*global.ch2freq}
		if (global.y >= global.ch2amp) {global.phase2 = -1; global.y-= 2*global.ch2amp*global.step*4*global.ch2freq}}
	return global.y;
}

function diskretizavimas() {
	disk = document.getElementById("diskretizavimas");
	global.step = 1/(disk.value*1000);
}

function ch1magnitude(i) {
	var mag = [document.getElementById("mag1"), document.getElementById("mag2"), document.getElementById("mag3"), document.getElementById("mag4"), document.getElementById("mag5"), document.getElementById("mag6")];
	for (p=0; p<6; p++) {
		mag[p].style.borderStyle = 'outset'; }
	mag[i].style.borderStyle = 'inset';
	global.ch1magnitude = Math.pow(10, (i-1));
	if (i == 5) global.ch1magnitude = 0; 
	changech1();
}

function ch2magnitude(i) {
	var mag = [document.getElementById("magb1"), document.getElementById("magb2"), document.getElementById("magb3"), document.getElementById("magb4"), document.getElementById("magb5"), document.getElementById("magb6")];
	for (p=0; p<6; p++) {
		mag[p].style.borderStyle = 'outset'; }
	mag[i].style.borderStyle = 'inset';
	global.ch2magnitude = Math.pow(10, (i-1));
	if (i == 5) global.ch2magnitude = 0; 
	changech2();
}

function signal1(i) {
	var mag = [document.getElementById("sig1"), document.getElementById("sig2"), document.getElementById("sig3"), document.getElementById("sig4"), document.getElementById("sig5")];
	for (p=0; p<5; p++) {
		mag[p].style.borderStyle = 'outset'; }
	mag[i].style.borderStyle = 'inset';
	global.signaltype1 = i;
	global.x = global.ch1amp;
	global.phase1=0;
}

function signal2(i) {
	var mag = [document.getElementById("sig7"), document.getElementById("sig8"), document.getElementById("sig9"), document.getElementById("sig10"), document.getElementById("sig11")];
	for (p=0; p<5; p++) {
		mag[p].style.borderStyle = 'outset'; }
	mag[i].style.borderStyle = 'inset';
	global.signaltype2 = i;
	global.y = global.ch2amp;
	global.phase2=0;
}


function signalas() {
	var ctx = document.getElementById("osciloscopesignal").getContext('2d');
	ctx.strokeStyle = "#00FF00";
	var sigtimer = window.setInterval(function() {
		ctx.clearRect(0,0,280,280);
		ctx.lineWidth = 3;
		if(document.getElementById("ijungimas").value == "OFF") clearInterval(sigtimer)
		else {
		ctx.beginPath();
		for (i=0; i < 1/(global.step*25); i++) {
			ctx.lineTo(140 + 140*funcx(ctx), 140 - 140*funcy(ctx)); }
		ctx.stroke();}}, 40);
}

function download(){
    if(document.getElementById("ijungimas").value == "ON") {
	var ctx = document.getElementById("osciloscopephoto").getContext('2d');
	ctx.clearRect(0,0,280,280);
	var ongrad = ctx.createRadialGradient(140, 140, 0, 140, 140, 140);	
		ongrad.addColorStop(0, '#204900');
		ongrad.addColorStop(1, '#152A15');
		ctx.rect(0, 0, 280, 280);
		ctx.fillStyle = ongrad;
		ctx.fill();
		ctx.strokeStyle = '#132813';
		ctx.beginPath();
		for(i=1; i<8; i++){	
			if(i!=4) ctx.lineWidth = 1;
			ctx.moveTo(0, 35*i);
			ctx.lineTo(280, 35*i);
			ctx.moveTo(35*i, 0);
			ctx.lineTo(35*i, 280);
			ctx.stroke();
			ctx.lineWidth = 2;
			ctx.moveTo(7+35*i, 135);
			ctx.lineTo(7+35*i, 145);
			ctx.moveTo(14+35*i, 135);
			ctx.lineTo(14+35*i, 145);
			ctx.moveTo(21+35*i, 135);
			ctx.lineTo(21+35*i, 145);
			ctx.moveTo(28+35*i, 135);
			ctx.lineTo(28+35*i, 145);
			ctx.moveTo(135, 7+35*i);
			ctx.lineTo(145, 7+35*i);
			ctx.moveTo(135, 14+35*i);
			ctx.lineTo(145, 14+35*i);
			ctx.moveTo(135, 21+35*i);
			ctx.lineTo(145, 21+35*i);
			ctx.moveTo(135, 28+35*i);
			ctx.lineTo(145, 28+35*i);
			ctx.stroke();}
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#00FF00";
	for (i=0; i < 2/(global.step*25); i++) {
			ctx.lineTo(140 + 140*funcx(ctx), 140 - 140*funcy(ctx)); }
	ctx.stroke();
	ctx.beginPath();
	//ctx.fillStyle= "#FFFFFF";
	//ctx.fillRect(200,250,40,20);
	var download = document.getElementById("download");
    var signalas = document.getElementById("osciloscopephoto").toDataURL("image/jpg")
        .replace("image/jpg", "image/octet-stream");
    download.setAttribute("href", signalas);
	ctx.clearRect(0, 0, 280, 280);}
}

osciloskopo_maketas();