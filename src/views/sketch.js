function setup() {
	createCanvas(720, 720);
	noCursor();

	colorMode(HSB, 360, 100, 100);
	rectMode(CENTER);
	noStroke();
}

x=0


function draw() {
	background(mouseY / 2, 100, 100);

	fill(360 - mouseY / 2, 100, 100);
	rect(360, 360, x + 1, x + 1);
}

function keyPressed() {
	if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}

let socket = io("ws://localhost:5001");
socket.on("sendNumber", (msg) => {
	x = msg;
});
