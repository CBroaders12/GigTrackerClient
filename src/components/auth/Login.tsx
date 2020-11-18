import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Paper, Container, TextField, Button } from '@material-ui/core';

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
        <Container className="authContainer" maxWidth={false}>
          <Paper className="authForm" elevation={5}>
            <form onSubmit={this.onLoginSubmit}>
              <h2>Login</h2>
              <TextField
              id="loginEmail"
              label="Email"
              variant="filled"
              type="email"
              value={this.state.email}
              onChange={this.updateEmail}
              margin="normal"
              fullWidth={true}
              />
              <TextField
              id="loginPassword"
              label="Password"
              variant="filled"
              type="password"
              value={this.state.password}
              onChange={this.updatePassword}
              margin="normal"
              fullWidth={true}
              />

              <Button 
              type="submit" 
              disabled={!this.state.email || !this.state.password}
              color="inherit"
              >Login</Button>
            </form>
            <p>Need to create an account? <Link to="/register">Register here</Link></p>
          </Paper>
        </Container>
      )
    }
  }
}

export default LoginComponent;