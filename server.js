const express = require("express");
const http = require("http")
const socket = require("socket.io")

const port = process.env.PORT || 5001;
const app = express();
app.use(express.static(__dirname + "/public"));
const server = http.createServer(app);
const io = socket(server);

io.on("connection", function (socket) {
	socket.removeAllListeners();
    console.log("connected.")
	
	socket.on("customEvent", (msg) => {
        console.log("custom event received.", msg)
		socket.broadcast.emit("customEvent", msg);
	});

	// client disconnection handler
	socket.on("disconnect", function () {
        console.log("disconnected.")
	});
});

server.listen(port, function () {
	console.log("listening on *:" + port);
});
