function ketvirtispi(coord, radius, rot, ctx) {
	ctx.arc(coord[0],coord[1],radius,rot,rot+(0.5*Math.PI));
	return ctx;}
	
function ketvirtispiccw(coord, radius, rot, ctx) {
	ctx.arc(coord[0],coord[1],radius,rot,rot-0.5*Math.PI, true);
	return ctx;}

function ketvirtis(coord, radius, rot, ctx) {
	ctx.lineTo(coord[0]+(Math.cos(rot)-Math.sin(rot))*radius,coord[1]+(Math.cos(rot)+Math.sin(rot))*radius);
	ctx.lineTo(coord[0]+(Math.cos(rot)-Math.sin(rot))*radius,coord[1]);
	ctx.lineTo(coord[0],coord[1]);
	ctx.lineTo(coord[0],coord[1]+(Math.cos(rot)+Math.sin(rot))*radius);
	ctx.lineTo(coord[0]+(Math.cos(rot)-Math.sin(rot))*radius,coord[1]+(Math.cos(rot)+Math.sin(rot))*radius);
	return ctx;}
	
function rottrans(coord = [0,0], trans, rot) { 
	coord[0] += Math.cos(rot)*trans;
	coord[1] += Math.sin(rot)*trans;
	return coord; }
	
function fiBonaciSpiral(coord, scale, iteration, rot, ctx) {
	var a = scale;
	var b = a;
	var c = a;
	ctx.strokeStyle = "#FFDD00";
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	for(i=1; i<10; i++) {
		ctx = ketvirtis(coord, a, rot, ctx);
		ctx = ketvirtispi(coord, a, rot, ctx);
		rot += 0.5*Math.PI;
		coord = rottrans(coord, a-b, rot);
		a += b;
		c = b;
		b = a;
		a = c; }
	ctx.stroke();}

function fiSpi(coord, scale, iteration, rot, spalva, ctx) {
	var a = scale;
	var b = a;
	var c = a;
	ctx.strokeStyle = spalva;
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	for(i=1; i<iteration; i++) {
		ctx = ketvirtispi(coord, a, rot, ctx);
		rot += 0.5*Math.PI;
		coord = rottrans(coord, a-b, rot);
		a += b;
		c = b;
		b = a;
		a = c; }
	ctx.stroke();}
	
function fiSpiccw(coord, scale, iteration, rot, spalva, ctx) {
	var a = scale;
	var b = a;
	var c = a;
	ctx.strokeStyle = spalva;
	ctx.lineWidth = 1.5;
	ctx.beginPath();
	for(i=1; i<iteration; i++) {
		ctx = ketvirtispiccw(coord, a, rot, ctx);
		rot -= 0.5*Math.PI;
		coord = rottrans(coord, a-b, rot);
		a += b;
		c = b;
		b = a;
		a = c; }
	ctx.stroke();}
	
function draw1(){
	var c = document.getElementById("fiBonaci");
	var ctx = c.getContext("2d");
	fiBonaciSpiral([100,160], 10, 10, 0, ctx);
}
draw1();

document.getElementById("spiralsk").defaultValue = "1";
document.getElementById("spiralsk3").defaultValue = "2";
document.getElementById("spiralsk4").defaultValue = "3";
function sustabdyti(){document.getElementById("spiralsk2").value = 0};

var global = {
	time: 0,
	increment: 0,
	rot: 0}

function draw2(){
	var c = document.getElementById("fiBonaci2");
	var spsk = document.getElementById("spiralsk");
	var spsk2 = document.getElementById("spiralsk2");
	var ctx = c.getContext("2d");
	var spalva = "#FFDD00";
	if (spiralsk2.value != 0) 
	window.setInterval( function() {
		ctx.clearRect(0, 0, 640, 640);
		global.rot += 0.005*spsk2.value/Math.sqrt(spsk.value);
		for (p = 0; p < 2*Math.PI; p += 2*Math.PI/spsk.value){ 
			fiSpi([320,320], 1, 16, p+global.rot, spalva, ctx) } }, 40);
	else{
		ctx.clearRect(0, 0, 640, 640);
		global.rot += 0.005*spsk2.value/Math.sqrt(spsk.value);
		for (p = 0; p < 2*Math.PI; p += 2*Math.PI/spsk.value){ 
			fiSpi([320,320], 1, 16, p+global.rot, spalva, ctx) } }
}

draw2();

function draw3(){
	var c = document.getElementById("fiBonaci3");
	var spsk3 = document.getElementById("spiralsk3");
	var spsk4 = document.getElementById("spiralsk4");
	var ctx = c.getContext("2d");
	var spalva = "#000000";
	ctx.clearRect(0, 0, 640, 640);
	for (p = 0; p < 2*Math.PI; p += 2*Math.PI/spsk3.value){ 
		fiSpi([240,240], 1, 16, p, spalva, ctx) }
	for (p = 0; p < 2*Math.PI; p += 2*Math.PI/spsk4.value){ 
		fiSpiccw([240,240], 1, 16, -p+Math.PI, spalva, ctx) }
	}
	
draw3();