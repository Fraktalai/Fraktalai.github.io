var ctx = document.getElementById("signal1").getContext('2d');
global = {
	density: 80} //pikselių skaičius per sekundę
var save_signal = [];
dazniai = rand(10, 1, 20);
fazes = rand(10, 0, 2*Math.PI);
vieneto_plotis = 100; // Kiek pikselių yra 1 sekundė;
x1 = 10;
y1 = 10;
x2 = 470;
y2 = 210;

function axis() {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1, y2);
	ctx.lineTo(x2, y2);
	ctx.moveTo(x1-10, y1+10);
	ctx.lineTo(x1, y1);
	ctx.lineTo(x1+10, y1+10);
	ctx.moveTo(x2-10, y2-10);
	ctx.lineTo(x2, y2);
	ctx.lineTo(x2-10, y2+10);
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.textAlign="center";
	ctx.font = 'bold 14px Arial';
	for (i = 0; i < 5; i++) {
		ctx.beginPath();
		ctx.moveTo(x1+i*vieneto_plotis, y2);
		ctx.lineTo(x1+i*vieneto_plotis, y2+5);
		ctx.stroke();
		ctx.fillText(i, x1+i*vieneto_plotis, y2+20); }
	ctx.fillText('t', x2, y2+20)
	ctx.stroke();
}

function rand(n, y1, y2) {
	var y = [0];
	for (i=0; i<n; i++) y[i]= y1+Math.random()*(y2-y1);
	return y;
}
	
function tolydus(x, y, width, height) {
	ctx.beginPath();
	for (p=0; p<width; p++) {
		funcsin = 0;
		for (i=0; i<freq.length; i++) {funcsin += Math.sin(freq[i]*2*Math.PI*p/width+fazes[i]);}
		save_signal[p]=funcsin;
		ctx.lineTo(x+p,y+(height/2)-funcsin*height/2); }
	ctx.stroke();
}

function diskretus(x, y, width, height) {
	ctx.beginPath();
	for (p=0; p<width; p++) {
		funcsin = 0;
		for (i=0; i<freq.length; i++) {funcsin += Math.sin(freq[i]*2*Math.PI*p/width+fazes[i]);}
		save_signal[p]=funcsin;
		ctx.lineTo(x+p,y+(height/2)-funcsin*height/2); }
	ctx.stroke();
}

	
axis();
//signal(20, 20, 440, 120);
tolydus(10, 110, 460, 25);
diskretus(10, 110, 460, 25);