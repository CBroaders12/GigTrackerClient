import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

type LoginState = {
  email: string,
  password: string,
};

type AcceptedProps = {
  authenticateUser: (token: string) => void,
  token: string | null,
}

class LoginComponent extends Component<AcceptedProps, LoginState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    // Bind event handlers
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  async onLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (this.state.email && this.state.password) {
      let response = await fetch('http://localhost:5200/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });

      let parsedResponse = await response.json();
      let token = parsedResponse.token;
      this.props.authenticateUser(token)
    } else {
      alert('Enter email AND password');
    }
  }

  updateEmail(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.target.value
    });
  }
  
  updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    if (this.props.token) {
      return(
        <Redirect to="/" />
      )
    } else {
      return(
        <div>
          <form onSubmit={this.onLoginSubmit}>
            <h2>Login</h2>
            <label htmlFor="loginEmail">Email</label>
            <input type="email" id="loginEmail" value={this.state.email} onChange={this.updateEmail}/>

            <label htmlFor="loginPassword">Password</label>
            <input type="password" id="loginPassword" value={this.state.password} onChange={this.updatePassword}/>

            <button type="submit">Login</button>
          </form>
          <p>Need to create an account? <Link to="/register">Register here</Link></p>
        </div>
      )
    }
  }
}

export default LoginComponent;