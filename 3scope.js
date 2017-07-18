g = {
	width: 100,
	height: 100,
	freqx: 300.16,
	freqy: 400,
	freqz: 500.3,
	phasex: 0,
	phasey: 0,
	phasez: 0,
	ampx: 0.8,
	ampy: 0.8,
	ampz: 0.8,
	angle: 5,
	depth: 0.15,
	step: 0.00002,
	x: 0,
	y: 0,
	z: 0,
	timerinhibitor: 0}
	
canvas = document.getElementById("3Dscope");
ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
g.width = canvas.width;
g.height = canvas.height;
menu = document.getElementById("menu").getContext('2d');
menu.fillStyle = "rgba(10,10,10,0.8)";
menu.strokeStyle = "#00FF00";
menu.lineWidth = 1.5;
menu.fillRect(0,0,20,200);
menu.beginPath();
menu.moveTo(5, 90);
menu.lineTo(15, 100);
menu.lineTo(5, 110);
menu.stroke();

setInterval( run , 40 );

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	g.width = canvas.width;
	g.height = canvas.height;
}

function change() {
	g.depth = canvas.height*document.getElementById("depth").value/300000;
}

function run() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,g.width,g.height);
	ctx.strokeStyle="#00FF00";
	for(i=0; i <1/(g.step*25); i++) {
		xmem1 = funcx(-1);
		ymem = funcy();
		xmem2 = funcx(+1);
		coordinate();
		ctx.lineWidth=2*(1+g.z);
		ctx.beginPath();
		ctx.moveTo(xmem1, ymem);
		ctx.lineTo(funcx(-1), funcy());
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(xmem2, ymem);
		ctx.lineTo(funcx(+1), funcy());
		ctx.stroke(); }
	//crosshair(g.width/4, g.height/2);
	//crosshair(g.width*3/4, g.height/2);
}

function crosshair(x, y) {
	ctx.beginPath();
	ctx.strokeStyle = "#CC0000";
	ctx.lineWidth = 2;
	ctx.moveTo(x-20, y);
	ctx.lineTo(x+20, y);
	ctx.moveTo(x, y-20);
	ctx.lineTo(x, y+20);
	ctx.stroke();
}

function coordinate() {
	g.phasex += g.freqx*2*Math.PI*g.step;
	g.phasey += g.freqy*2*Math.PI*g.step;
	g.phasez += g.freqz*2*Math.PI*g.step;	
	g.x = g.ampx*Math.sin(g.phasex);
	g.y = g.ampy*Math.sin(g.phasey);
	g.z = g.ampz*Math.sin(g.phasez);
}

function funcx(side){ // side = -1 - kairė; side = 1 - dešinė  
	coord = (g.width*(side+2)/4)+(g.width/4)*(g.x+(g.z-g.ampz)*g.x*g.depth)+(g.width/4)*side*(g.z+g.ampz)*g.depth*0.5 - g.width*side/20;//-g.width*(g.z-g.ampz)/40;
	return coord;
}

function funcy(){
	coord = (g.height/2)-(g.height/2)*(g.y+(g.z-g.ampz)*g.y*g.depth); //(x[2]-1) - gylis
	return coord;
}

function openmenu(state) {
	menu.clearRect(0,0,200,200);
	menu.fillStyle = "rgba(10,10,10,0.8)";
	menu.strokeStyle = "#00FF00";
	menu.lineWidth = 1.5;
	if (state == 1) {
		menu.fillRect(0,0,200,200);
		menu.beginPath();
		menu.moveTo(195, 90);
		menu.lineTo(185, 100);
		menu.lineTo(195, 110);
		menu.stroke();
		menu.fillStyle = "#AA0000";
		menu.fillRect(10, 40, 30, 20);
		menu.fillRect(45, 40, 30, 20);
		menu.fillRect(80, 40, 30, 20);
		menu.fillRect(10, 175, 30, 20);
		menu.fillRect(45, 175, 30, 20);
		menu.fillRect(80, 175, 30, 20);
		menu.fillStyle = "#EE6600";
		menu.fillRect(10, 60, 30, 20);
		menu.fillRect(45, 60, 30, 20);
		menu.fillRect(80, 60, 30, 20);
		menu.fillRect(10, 155, 30, 20);
		menu.fillRect(45, 155, 30, 20);
		menu.fillRect(80, 155, 30, 20);
		menu.fillStyle = "#FFFF11";
		menu.fillRect(10, 80, 30, 20);
		menu.fillRect(45, 80, 30, 20);
		menu.fillRect(80, 80, 30, 20);
		menu.fillRect(10, 135, 30, 20);
		menu.fillRect(45, 135, 30, 20);
		menu.fillRect(80, 135, 30, 20);
		menu.font = '14px Arial';
		menu.fillStyle = "#FFFFFF";
		menu.fillText("Dažnis, Hz", 26, 15);
		menu.fillText("X", 20, 36);
		menu.fillText("Y", 54, 36);
		menu.fillText("Z", 90, 36);
		menu.textAlign="center"; 
		displayfreq(g.freqx, 24, 115);
		displayfreq(g.freqy, 59, 115);
		displayfreq(g.freqz, 94, 115);
		menu.font = 'bold 20px Arial';
		menu.fillStyle = "rgba(0,0,0,0.6)";
		menu.fillText("+", 24, 57);
		menu.fillText("+", 59, 57);
		menu.fillText("+", 94, 57);
		menu.fillText("+", 24, 77);
		menu.fillText("+", 59, 77);
		menu.fillText("+", 94, 77);
		menu.fillText("+", 24, 97);
		menu.fillText("+", 59, 97);
		menu.fillText("+", 94, 97);
		menu.fillText("-", 24, 150);
		menu.fillText("-", 59, 150);
		menu.fillText("-", 94, 150);
		menu.fillText("-", 24, 170);
		menu.fillText("-", 59, 170);
		menu.fillText("-", 94, 170);
		menu.fillText("-", 24, 190);
		menu.fillText("-", 59, 190);
		menu.fillText("-", 94, 190);
		menu.font = '14px Arial';
		menu.fillStyle = "#EEEE00";
		menu.fillText("x2", 130, 110);
		menu.fillText("x1/2", 130, 135);
		menu.textAlign="left"; 
		document.getElementById('menuopen').style.visibility = 'hidden';
		document.getElementById('makeinvisible').style.visibility = 'visible';		}
	else {
		document.getElementById('menuopen').style.visibility = 'visible';
		document.getElementById('makeinvisible').style.visibility = 'hidden';		
		menu.fillRect(0,0,20,200);
		menu.beginPath();
		menu.moveTo(5, 90);
		menu.lineTo(15, 100);
		menu.lineTo(5, 110);
		menu.stroke(); }
}

function displayfreq(sk, x, y) {
	sveikieji = Math.floor(sk);
	pokabl1 = Math.floor(10*(sk - sveikieji));
	pokabl2 = Math.floor(10*(10*(sk-sveikieji)-pokabl1));
	pokabl = ","+pokabl1+pokabl2 ;
	menu.fillText(sveikieji, x, y);
	menu.fillText(pokabl, x, y+15);
}

function menubutton(ch, val) {
	g.timerinhibitor = 0;
	window.setTimeout(function() {
		var buttontimer = window.setInterval(function() {
			if (ch==0) g.freqx += val
			else if (ch==1) g.freqy += val
			else g.freqz += val;
			openmenu(1);
			if (g.timerinhibitor == 1) {clearInterval(buttontimer); return}}, 50); }, 200);
}

function menubutton2x(ch, val) {
	if (ch==0) g.freqx += val
	else if (ch==1) g.freqy += val
	else g.freqz += val;
	openmenu(1);
}

function timerinhibitoractivation() {
	g.timerinhibitor = 1;
}