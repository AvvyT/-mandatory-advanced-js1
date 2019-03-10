import React, { Component } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

class ChatMessage extends Component {

    time(milliseconds) {
        return new Date(milliseconds).toLocaleString();
    }

    render() {
        //console.log(this.props.message);

        const message = this.props.message;
        let float = "float-left";
        if (message.isMine === "true") {
            float = "float-right";
        }
        let className = 'new-content ' + float;

        return (
            <div className={className}>
                <p className="show-time">{this.time(message.timestamp)}</p>
                <h3>{message.username}</h3>
                <p>{message.content}</p>
            </div>
        );
    }
}

class ChatWindow extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        this.state = { chatInput: '' }

        this.sendMessage = this.sendMessage.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
    }

    sendMessage(e) {
        e.preventDefault();
        // skicka in input-value till fun.
        this.props.sendmessage(this.state.chatInput);
        this.setState({ chatInput: '' });
    }

    textChangeHandler(e) {
        // allt input-value sparas i state:chatInput
        this.setState({ chatInput: e.target.value });
    }

    render() {
        console.log(this.props.messages);

        return (
            <div className='chat-header'>
                <h3 className='color-head'>Chat App</h3>

                <ScrollToBottom className='chat-container'>
                    {
                        // loppa igenom alla meddelanden o rendera ett chat-message för varje
                        this.props.messages.map((item) => <ChatMessage key={item.id} message={item} />
                        )}
                </ScrollToBottom>

                <form onSubmit={this.sendMessage}>
                    <div className='send-container'>
                        <input
                            minLength={1}
                            maxLength={200}
                            className='message-input'
                            type="text"
                            onChange={this.textChangeHandler}
                            value={this.state.chatInput}
                            placeholder=" Write a message..."
                            required />
                        <input
                            className='send-message'
                            type='submit'
                            value='Send'
                        />
                    </div>
                </form>
            </div>
        );
    }
}

class UserInfo extends Component {

    render() {
        return (
            <div className="App">
                <header className="chatRoom" >
                    <br></br>
                    <h1 className='text'>
                        Hello {this.props.username}!
                    </h1>
                    <button
                        className='logOut'
                        onClick={this.props.logoutFunc}
                        value="Logout"
                        data-test="submit"
                    >Logout
                    </button>
                    <ChatWindow messages={this.props.messages} sendmessage={this.props.sendmessage} />
                </header>
            </div>
        );
    }
}

export default UserInfo;
