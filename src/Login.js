import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = { error: '', validName: true };

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
        const regex = /^[\s\wÅÄÖåäö-]+$/;


        if (!this.state.username) {
            return this.setState({ error: '!! Username is required!' });
        }

        // check if username is valid
        if (regex.test(this.state.username)) {
            this.setState({ validName: true });
            console.log("regex funkar");

            this.props.loginFunc(this.state.username);
        } else {
            this.setState({ validName: false });
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

                    {
                        this.state.error && <h3 className='error-text' onClick={this.dismissError}>
                            {this.state.error}
                            <button className="myError" onClick={this.dismissError}>✖</button></h3>
                    }
                </header>

                <form className='form-style'
                    onSubmit={this.handleSubmit}
                >
                    <label
                    >User Name <input type="text"
                        minLength={1}
                        maxLength={12}
                        placeholder=" Write a username!!"
                        className="myInput"
                        onChange={this.changeInput}
                        />
                    </label>

                    <input type="submit"
                        onChange={this.handleSubmit}
                        className="myButton"
                        value="Login"
                    />

                    {!this.state.validName ? (<p className="invalid-username">
                        !!Your name must be between 1-12 characters
                        and can contain only letters, numbers, spaces and symbols('-' '_')!!
                           </p>
                    ) : null}
                </form>
            </div>
        );
    }
}

export default Login;