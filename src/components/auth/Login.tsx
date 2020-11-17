import React, { ChangeEvent, Component, FormEvent } from 'react';

type LoginState = {
  email: string,
  password: string,
};

class LoginComponent extends Component<{/* props */}, LoginState> {
  constructor(props: any /* TODO: Update this */) {
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

  async onLoginSubmit(event: FormEvent<HTMLFormElement>) {
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
      console.log(parsedResponse);
    } else {
      alert('Enter email AND password');
    }
  }

  updateEmail(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: event.target.value
    })
  }
  
  updatePassword(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value
    })
  }

  render() {
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
      </div>
    )
  }
}

export default LoginComponent;