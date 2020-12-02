import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Paper, Container, TextField, Button, Typography } from '@material-ui/core';

type LoginState = {
  email: string,
  password: string,
};

type LoginProps = {
  authenticateUser: (token: string, userType: string) => void,
  token: string | null,
}

class LoginComponent extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  async onLoginSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    if (this.state.email && this.state.password) {
      let response = await fetch('https://cpb-gigtracker.herokuapp.com/user/login', {
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
      let userType = parsedResponse.userType;
      this.props.authenticateUser(token, userType);
    } else {
      alert('Enter email AND password');
    }
  }

  updateEmail(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      email: event.target.value
    });
  }
  
  updatePassword(event: React.ChangeEvent<HTMLInputElement>): void {
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
              <Typography component="h2" variant="h4">Login</Typography>
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
              className="authButton"
              type="submit" 
              disabled={!this.state.email || !this.state.password}
              color="inherit"
              >Login</Button>
            </form>
            <Typography component="p">Need to create an account? <Link to="/register">Register here</Link></Typography>
          </Paper>
        </Container>
      )
    }
  }
}

export default LoginComponent;