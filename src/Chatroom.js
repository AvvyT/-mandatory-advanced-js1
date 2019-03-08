import React, { Component } from 'react';

import io from 'socket.io-client';
// Create SocketIO instance, connect
const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

class ChatWindow extends Component {
    render() {
        return (
            <div className='chat-header'>
                <h3 className='color-head'>Chat App</h3>
                <form className="chat-input"
                    onSubmit={this.props.submitHandler
                    }>
                    <div className='chat-container'>

                    </div><div className='send-container'
                    >
                    <input 
                        className='message-input'
                        type="text"
                        onChange={this.props.textChangeHandler} 
                        value={this.props.chatInput}
                        placeholder=" Write a message..."
                        required />
                     <button
                        className='send-message'
                        onClick={this.props}
                        value="Send"
                        data-test="submit"
                    >Send
                    </button> 
                    </div>  
                </form>
            </div>
        );
    }
}

class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '', text: '', inlogat: false, chatInput: '',
            messages: [{
                id: '',
                username: '',
                text: '',
                timestamp: ''
            }]
        };
        // Connect to the server
        //this.socket = io(config.api).connect();
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
    }

    submitHandler(event) {
        event.preventDefault();

        // Call the onSend callback with the chatInput message
        this.props.onSend(this.state.chatInput);
        // Clear the input box
        this.setState({ chatInput: '' });
    }

    render() {
        return (
            <div className="App">
                <header className="chatRoom" >
                <br></br>
                    <h1 className='text'
                    >
                        Hello {this.props.username}!
                    </h1>
                    <button
                        className='logOut'
                        onClick={this.props.logoutFunc}
                        value="Logout"
                        data-test="submit"
                    >Logout
                    </button>
                    <ChatWindow />
                </header>
            </div>
        );
    }
}

export default UserInfo;
