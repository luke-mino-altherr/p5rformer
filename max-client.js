const io = require("socket.io-client");
const maxApi = require("max-api");

const socket = io('http://localhost:5001');

const onBang = () => {
  console.log("got a bangg");
  socket.emit("customEvent")
}

socket.on("connect", () => {
	// print when connection to socket.io is successful
	console.log("max connection: " + socket.connected);
});

socket.on("disconnect", () => {
    console.log("max disconnected");
});

const handlers = {
    [maxApi.MESSAGE_TYPES.BANG]: () => {
      onBang()
    },
    [maxApi.MESSAGE_TYPES.NUMBER]: (num) => {
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