import React, { Component, ReactPropTypes } from 'react';

type RegisterState = {
  email: string,
  password: string,
  passwordConfirm: string
}

type AcceptedProps = {
  authenticateUser: (token: string) => void,
}

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
    return(
      <div>
        <form onSubmit={this.onRegisterSubmit}>
          <h2>Register</h2>
          <label htmlFor="registerEmail">Email</label>
          <input type="email" id="registerEmail" value={this.state.email} onChange={this.updateEmail} />

          <label htmlFor="registerPassword">Password</label>
          <input type="password" id="registerPassword" value={this.state.password} onChange={this.updatePassword} />

          <label htmlFor="registerPasswordConfirm">Confirm Password</label>
          <input type="password" id="registerPasswordConfirm" value={this.state.passwordConfirm} onChange={this.updatePasswordConfirm} />

          <button type="submit">Register</button>
        </form>
      </div>
    )
  }
}

export default RegisterComponent;