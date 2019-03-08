
// with ES6 import
import io from 'socket.io-client';
const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

// Sends a message to the server via sockets
socket.emit('message',{
  username: "",
  content: "wowww yes!!!"
});
