import React, { Component } from 'react';
import io from "socket.io-client";
import './App.css';

import Login from './Login.js';
import Chatroom from './Chatroom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inlogat: false, username: '', messages: [{
        time: 0, message: 'test', username: 'user1'
      }]
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.addMessage = this.addMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    // Connect to the server
    this.server = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000");

    this.server.on("messages", data => {
      for (let message of data) {
        // om meddelandet är ifrån samma namn som jag loggat in med (mig själv)
        if (message.username === this.state.username) {
          message.isMine = "true"
        }
        this.addMessage(message);
      }
    });
    this.server.on("new_message", data => {
      this.addMessage(data);
    });
  }

  addMessage(event) {
    this.setState({ messages: [...this.state.messages, event] });
  }

  sendMessage(text) {
    const message = { username: this.state.username, content: text };

    this.server.emit("message", message);
    message.timestamp = Date.now();
    message.isMine = "true"
    this.addMessage(message);
  }

  handleLogin(username) {
    this.setState({ inlogat: true, username: username });
  }

  handleLogout() {
    this.setState({ inlogat: false });
  }

  render() {
    return (
      <div className="App">
        <h1 className='side-color'>React Instant Chat</h1>

        {(!this.state.inlogat) ? <Login loginFunc={this.handleLogin} /> :
          <Chatroom username={this.state.username} logoutFunc={this.handleLogout}
            messages={this.state.messages} sendmessage={this.sendMessage} />}

      </div>
    );
  }
}

export default App;
