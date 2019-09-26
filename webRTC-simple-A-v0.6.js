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

var serverConn1;
serverConn1 = new WebSocket('ws://' + WEBSOCKET_ADDRESS + ':9000');
serverConn1.onmessage = gotMessageFromServer;

var peer1
peer1 = new Peer({ initiator: true, wrtc: wrtc })

function gotMessageFromServer(message) {
  var signal = JSON.parse(message.data);
  console.log('--> Received From Server:');
  console.log(signal.msg);  
  console.log();
  peer1.signal(signal.msg);
  
}


// connection/negotiation section...
peer1.on('signal', data => {
  // when peer1 has signaling data, send it to peer2
  try {
    setTimeout(function() {
      serverConn1.send( JSON.stringify({'msg': data}) )
    }, 250);
  } catch (err) {
    console.log(err)  
  }
  
})


// link is complete
peer1.on('connect', () => {
  // wait for 'connect' event before using the data channel
  setTimeout(function() {
    console.log('----------');
    console.log('----------');
    peer1.send('Hello Peer2!')
  }, 4000);
})


// data exchange section
peer1.on('data', data => {
  // got a data channel message
  console.log('Received message from Peer2: ' + data)
  
  if (data == 'closeItPlease#') {
    peer1.destroy()
    serverConn1.close()
  }
  
})


// shutdown section...
peer1.on('close', () => {
  console.log()
  console.log('Connection with Peer2 is closed...');
  console.log('----------');
  console.log('----------');  
})
