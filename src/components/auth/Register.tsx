import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Paper, Container, Button } from '@material-ui/core';

type RegisterState = {
  email: string,
  password: string,
  passwordConfirm: string
}

type AcceptedProps = {
  authenticateUser: (token: string) => void,
  token: string | null,
}

let emailRegex = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,}/;
let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()\-+=^_]).{8,20}$/;

class RegisterComponent extends Component<AcceptedProps, RegisterState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    // Bind event handlers
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
  }

  async onRegisterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.state.email && this.state.password && this.state.passwordConfirm) {
      if (this.state.password === this.state.passwordConfirm) {
        let response = await fetch('http://localhost:5200/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          }),
        });

        let parsedResponse = await response.json();
        let token = parsedResponse.token;
        this.props.authenticateUser(token);
      } else {
        alert('Password and Confirm Password must match')
      }
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

  updatePasswordConfirm(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      passwordConfirm: event.target.value
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
            <form onSubmit={this.onRegisterSubmit}>
              <h2>Register</h2>
              <TextField
                id="registerEmail"
                label="Email"
                variant="filled"
                type="email"
                value={this.state.email}
                onChange={this.updateEmail}
                margin="normal"
                error={!emailRegex.test(this.state.email) && this.state.email !== ""}
                helperText="Please enter a valid email address"
                fullWidth={true}
                />

              <TextField
                id="registerPassword"
                label="Password"
                variant="filled"
                type="password"
                value={this.state.password}
                onChange={this.updatePassword}
                margin="normal"
                error={!passwordRegex.test(this.state.password) &&  this.state.password !== ""}
                helperText="Password must include uppercase, lowercase, number, & special character"
                fullWidth={true}
                />

              <TextField
                id="registerPasswordConfirm"
                label="Confirm Password"
                variant="filled"
                type="password"
                value={this.state.passwordConfirm}
                onChange={this.updatePasswordConfirm}
                margin="normal"
                error={this.state.password !== this.state.passwordConfirm && this.state.passwordConfirm !== ""}
                helperText="Passwords must match"
                fullWidth={true}
                />

              <Button
              type="submit"
              disabled={!emailRegex.test(this.state.email) || this.state.password !== this.state.passwordConfirm}
              >
                Register
              </Button>
            </form>
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </Paper>
        </Container>
      )
    }
  }
}

export default RegisterComponent;