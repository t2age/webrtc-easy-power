# WebRTC Easy and Power
**Web Real Time Communication - Easy and Powerful.**  
  
This sample intend to show WebRTC simplicity and powerfull mechanism.  
  
It uses NodeJS WebRTC and Simple-Peer Modules.  
  
The language of the scripts is JavaScript (NodeJS).  
  
My goal is to help common users to understand the basic of WebRTC, and start using it in, as much as possible, in daily life stuff...  
  
  

![](img/webrtc-easy-power-001.png)
  
![](img/webrtc-easy-power-002.png)
  
![](img/webrtc-easy-power-003.png)
  
![](img/webrtc-easy-power-004.png)
  
![](img/webrtc-easy-power-005.png)
  
![](img/webrtc-easy-power-006.png)
  
![](img/webrtc-easy-power-007.png)
  
![](img/webrtc-easy-power-008.png)
  
![](img/webrtc-easy-power-009.png)
  

**How to:**  
0) Install the necessary software:  
```
npm install ws
npm install wrtc
npm install simple-peer
```
   
1) Download the .zip package and extract it  
  
2) Enter the directory:  
```
cd webRTC-easy-power   #Or, the name of the extracted folder...
```
  
3) run the server:  
```
node ws-server-v0.6.js   #Adjust for the correct version...
```
  
4) run the peer2 (B):  
```
node webRTC-sample-B-v0.6.js   #Adjust for the correct version...
```
  
5) run the peer1 (A):  
```
node webRTC-sample-A-v0.6.js
```
  
  
**Timming of the samples**  
For learning purposes, the samples uses the following time arrange.  
Second 1: exchange signals to connect  
Second 4: exchange messages  
Second 8: close connection(s)  
  
You can change the timming if you want.  
  
**Internet connection** 
You DO NOT NEED Internet connection, but, the computer need an IP ADDRESS otherwise the sample will not work properly...  
  
  


For RaspberryPI Zero, you need to compile Node-WRTC Module from source. [Instructions here...]()  
My advice is, test on x86 PC or RPI3 before trying on the Zero...  
    
  
