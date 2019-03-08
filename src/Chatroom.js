import React, { Component } from 'react';
import io from 'socket.io-client';

//const io = require("socket.io-client");
let socket = null;

class ChatMessages extends Component {
    render() {
        return (
             <p>avvy..
                 {this.props.chatInput}
             </p>   
       );
    }
}

class ChatWindow extends Component {
    render() {
        return (
            <div className='chat-header'>
                <h3 className='color-head'>Chat App</h3>
                <form className="chat-input">
                    <div className='chat-container'>
                    <ChatMessages/>
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
                            onClick={this.props.submitHandler}
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
            inlogat: false, chatInput: '',
            messagesFech: [{
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
        this.onClick = this.onClick.bind(this);
    }

    textChangeHandler(event) {
        this.setState({ chatInput: event.target.value });
    }

    onClick() {
        socket.emit("message",
            {
                username: this.props.userName,
                text: this.state.chatInput
            },
            (x) => {
                this.setState({
                    messagesFech: [...this.state.messagesFech, x.data.newMessage],
                    chatInput: ""
                });
            }
        );
    }

    submitHandler(event) {
        event.preventDefault();

        // Call the onSend callback with the chatInput message
        this.props.onSend(this.state.chatInput);
        // Clear the input box
        this.setState({ chatInput: '' });
    }

    componentDidMount() {
        // Create SocketIO instance, connect
        socket = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000");

        socket.on("messages", (messages) => {
            this.setState({ messagesFech: [...messages] });
        });
        socket.on("new_message", (message) => {
            this.setState({ messagesFech: [...this.state.messagesFech, message] });
        });
    }

    componentWillUnmount() {
        socket.disconnect();
        socket = null;
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
                    <ChatWindow onSend={this.submitHandler} />
                    <ChatMessages messages={this.messagesFech} onSave={this.submitHandler}/>
                </header>
            </div>
        );
    }
}

export default UserInfo;
