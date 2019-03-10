import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { error: '' };
        this.changeInput = this.changeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        //alert('A name was submitted: ' + this.state.username);
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: '!! Username is required' });
        }

        if (this.state.username) {
            this.props.loginFunc(this.state.username);
        }
    }

    changeInput(event) {// lägg value från inputen
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="Login">
                <header className="text-header">
                    <h1 className="page-name">Login</h1>
                    {this.state.error && <h3 data-test="error"
                            className='error-text'
                            onClick={this.dismissError}
                        >
                            {this.state.error}
                            <button
                                className="myError"
                                onClick={this.dismissError}
                            >✖
                            </button>
                        </h3>
                        }
                </header>
                
                    <form className='form-style'
                    onSubmit={this.handleSubmit}
                    >
                        <label
                        >User Name <input type="text"
                                placeholder=" Write a username!!"
                                className="myInput"
                                data-test="username"
                                onChange={this.changeInput}
                            />
                        </label>

                        <button type="submit"
                            onChange={this.handleSubmit}
                            className="myButton"
                            value="Login"
                            data-test="submit"
                        >Login
                        </button>
                    </form>
            </div>
        );
    }
}

export default Login;