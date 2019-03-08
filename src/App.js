import React, { Component } from 'react';
import Login from './Login.js';
import Chatroom from './Chatroom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { inlogat: false, username: '' };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(username) {
    this.setState({inlogat: true, username: username});
  }

  handleLogout() {
    this.setState({inlogat: false});
  }

  render() {
    return (
      <div className="App">
      <h1 className='side-color'>React Instant Chat</h1>
        {(!this.state.inlogat) ? <Login loginFunc={this.handleLogin}/> : <Chatroom username={this.state.username} logoutFunc={this.handleLogout}/>}
      </div>
    );
  }
}

export default App;
