// Version: v0.6
// Date: 2019/August
// Tested with NodeJS: v10.16.3
// Tested in x86 PC Linux, RPI3, RPIZero*
// *Zero requires to compile NodeJS-WRTC Module f/ source
//
// Need to install:
//    npm install ws
//    npm install wrtc
//    npm install simple-peer
//
// How to Use (need 3 terminals shell):
//    1. run: node ws-server.js
//    2. run: node webRTC-simple-B.js
//    3. run: node webRTC-simple-A.js
//
// For Learning/Debbuging Purpose (you can change it)
//    second 1: exchange signals to connect
//    second 4: exchange messages
//    second 8: close connection
//

var Peer = require('simple-peer')
var wrtc = require('wrtc')
var WebSocket = require('ws')

//const WEBSOCKET_ADDRESS = "localhost";        // all on the same machine, this is also the "ws-server.js"
const WEBSOCKET_ADDRESS = "127.0.0.1";				// all on same machine, this is also the "ws-server.js"
//const WEBSOCKET_ADDRESS = "192.168.200.200";      // use 2 machines, IP of the "ws-server.js"

var serverConn2;
serverConn2 = new WebSocket('ws://' + WEBSOCKET_ADDRESS + ':9000');
serverConn2.onmessage = gotMessageFromServer2;

var peer2
peer2 = new Peer({ wrtc: wrtc })

function gotMessageFromServer2(message) {
  var signal = JSON.parse(message.data);
  console.log('--> Received From Server:');
  console.log(signal.msg);  
  console.log();
  peer2.signal(signal.msg);
}


// connection/negotiation section...
peer2.on('signal', data => {
  // when peer2 has signaling data, send it to peer1
  try {
    serverConn2.send( JSON.stringify({'msg': data}) )
  } catch (err) {
    console.log(err)  
  }

})


// link is complete
peer2.on('connect', () => {
  // wait for 'connect' event before using the data channel
  setTimeout( function() {
  console.log('----------');
  console.log('----------');
  }, 3000);
})


// data exchange section
peer2.on('data', data => {
  // got a data channel message
  console.log('Received message from Peer1: ' + data)
  
  peer2.send('Hello Peer1, how are you?')

  setTimeout( function () {
    peer2.send('closeItPlease#')
  }, 8000)
})


// shutdown section...
peer2.on('close', () => {
	console.log()
	console.log('Connection with Peer1 is closed...');
  serverConn2.close();
  console.log('----------');
  console.log('----------'); 
})

