import React, { Component } from 'react';

class RegisterComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {
    return(
      <div>
        <form>
          <h2>Register</h2>
          <label htmlFor="registerEmail">Email</label>
          <input type="email" id="registerEmail"/>

          <label htmlFor="registerPassword">Password</label>
          <input type="password" id="registerPassword"/>

          <label htmlFor="registerPasswordConfirm">Confirm Password</label>
          <input type="password" id="registerPasswordConfirm"/>
        </form>
      </div>
    )
  }
}

export default RegisterComponent;