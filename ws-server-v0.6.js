// Version: v0.6
// Date: 2019/August
// Tested with NodeJS: v10.16.3
// Tested in x86 PC Linux, RPI3, RPIZero*
// *Zero requires to compile NodeJS-WRTC Module f/ source
//
// Need to install:
//    npm install ws
//
// How to Use (need 3 terminals shell):
//    1. run: node ws-server.js
//    2. run: node webRTC-simple-B.js
//    3. run: node webRTC-simple-A.js
//

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

const WEBSOCKET_PORT = 9000;

//const WEBSOCKET_ADDRESS = "localhost";				// all on same machine, this is also the "ws-server.js"
const WEBSOCKET_ADDRESS = "127.0.0.1";				// all on same machine, this is also the "ws-server.js"
//const WEBSOCKET_ADDRESS = "192.168.200.200";			// use 2 machines, IP of the "ws-server.js"

// Create a server for handling websocket calls
const myWebSock = new WebSocket.Server({ port: WEBSOCKET_PORT, host: WEBSOCKET_ADDRESS })

var currentWebSocket = 0;


myWebSock.on('connection', function(ws) {	
	console.log('WebSocket Connection ON...');
	const symbolKey = Reflect.ownKeys(ws._sender._socket).find(key => key.toString() === 'Symbol(asyncId)')

	currentWebSocket = ws._sender._socket[symbolKey];
	console.log("Connection from client " + currentWebSocket);
	console.log()
	
	ws.on('message', function(message) {
		const symbolKey = Reflect.ownKeys(ws._sender._socket).find(key => key.toString() === 'Symbol(asyncId)')
		currentWebSocket = ws._sender._socket[symbolKey];		
			
		console.log('--------------------------------------------');
		console.log("Received from client " + currentWebSocket);
		console.log('Received: %s', message);
		console.log('--------------------------------------------');
		
		// Send the received msg to the other peer...
		myWebSock.sendToPeer(message, currentWebSocket);
    
	});
});


myWebSock.sendToPeer = function(data, clientOrigemID) {
	console.log("clientID " + clientOrigemID);

	this.clients.forEach(function(client) {

		const symbolKey = Reflect.ownKeys(client._sender._socket).find(key => key.toString() === 'Symbol(asyncId)')
		var clientDestinationID = client._sender._socket[symbolKey];
				
		if (client.readyState === WebSocket.OPEN) {
			// Send the msg to the other peer...
			if (clientDestinationID !== clientOrigemID) {
				console.log("    Sending to client " + clientDestinationID);
				client.send(data);
			} else {
				// This is the same peer that send the msg...
				console.log("    No need to send back to itself...");
			}
		}
	});
};


console.log('--------------------------------------------');
console.log('Server running. ws://' + WEBSOCKET_ADDRESS + ':' + WEBSOCKET_PORT );
console.log('--------------------------------------------');
console.log();

