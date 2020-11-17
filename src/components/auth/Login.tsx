import React, { Component } from 'react';

class LoginComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {
    return(
      <div>
        <form>
          <h2>Login</h2>
          <label htmlFor="loginEmail">Email</label>
          <input type="email" id="loginEmail"/>

          <label htmlFor="loginPassword">Password</label>
          <input type="password" id="loginPassword"/>
        </form>
      </div>
    )
  }
}

export default LoginComponent;