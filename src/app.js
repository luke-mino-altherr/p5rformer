const express = require("express");
const http = require("http")

const app = express();
app.use(express.static(__dirname + "/views"));
const httpServer = http.createServer(app);

const port = process.env.PORT || 5001;
httpServer.listen(port, function () {
	console.log("listening on *:" + port);
});

const socket = require("socket.io")
const io = socket(httpServer)

io.on("connection", (conn) => {
	conn.removeAllListeners();
    console.log("connected on the server side.")
	
	conn.on("customEvent", (msg) => {
        console.log("custom event received.", msg)
		conn.broadcast.emit("customEvent", msg);
	});

	// client disconnection handler
	conn.on("disconnect", function () {
        console.log("disconnected.")
	});
});

const maxApi = require("max-api");

const customEvent = () => {
	console.log("got a bangg");
	io.emit("customEvent")
  }

  const sendNumber = (x) => {
	console.log("send number");
	io.emit("sendNumber", x)
  }
  
  const handlers = {
	  [maxApi.MESSAGE_TYPES.BANG]: () => {
		customEvent()
	  },
	  [maxApi.MESSAGE_TYPES.NUMBER]: (num) => {
		sendNumber(num);
	  },
	  my_message: () => {
		console.log("got my_message");
	  },
	  my_message_with_args: (arg1, arg2) => {
		console.log("got my arged message: ${arg1}, ${arg2} ");
	  },
	  [maxApi.MESSAGE_TYPES.ALL]: (handled, ...args) => {
		console.log("This will be called for ALL messages");
		console.log(`The following inlet event was ${!handled ? "not " : "" }handled`);
		console.log(args);
	  }
	};
maxApi.addHandlers(handlers);
  