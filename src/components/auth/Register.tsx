import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { TextField, Paper, Container, Button, Typography } from '@material-ui/core';

type RegisterState = {
  email: string,
  password: string,
  passwordConfirm: string
}

type RegisterProps = {
  authenticateUser: (token: string, userType: string) => void,
  token: string | null,
}

let emailRegex = /[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,}/;
let passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()\-+=^_]).{8,20}$/;

class RegisterComponent extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: ""
    };

    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updatePasswordConfirm = this.updatePasswordConfirm.bind(this);
  }

  async onRegisterSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (this.state.email && this.state.password && this.state.passwordConfirm) {
      if (this.state.password === this.state.passwordConfirm) {
        let response = await fetch('https://cpb-gigtracker.herokuapp.com/user/register', {
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
        let userType = parsedResponse.userType;
        this.props.authenticateUser(token, userType);
      } else {
        alert('Password and Confirm Password must match')
      }
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

  updatePasswordConfirm(event: React.ChangeEvent<HTMLInputElement>): void {
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
              <Typography component="h2" variant="h4">Register</Typography>
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
              className="authButton"
              type="submit"
              disabled={!emailRegex.test(this.state.email) || this.state.password !== this.state.passwordConfirm}
              >
                Register
              </Button>
            </form>
            <Typography component="p">Already have an account? <Link to="/login">Sign in here</Link></Typography>
          </Paper>
        </Container>
      )
    }
  }
}

export default RegisterComponent;