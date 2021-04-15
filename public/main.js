//Set up the canvas variables for drawing and interaction
let main = document.getElementById("main");
var i = 0;
var p_text = document.createTextNode(`Hello ${i}`);  // create some content
main.appendChild(p_text);

console.log("HEYYYY")

let socket = io();
socket.on("customEvent", (msg) => {
	console.log("incrementing");
	i+=1;
	p_text.data = `Hello ${i}`;
});
