// with ES6 import
import io from 'socket.io-client';
// Create SocketIO instance, connect
const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

// Add a connect listener
socket.on('connect', function() {
  console.log('Client has connected to the server!');
});

// Add a connect listener
socket.on('new_message', function(data) {
  console.log('Received a message from the server!', data);
});