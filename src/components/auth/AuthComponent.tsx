import React, { Component } from 'react';
import LoginComponent from './Login';
import RegisterComponent from './Register';

type AcceptedProps = {
  authenticateUser: (token: string) => void
}

class AuthComponent extends Component<AcceptedProps, {/* state */}> {
  constructor(props: AcceptedProps) {
    super(props);
  }

  render() {
    return(
      <div>
        {/* <LoginComponent authenticateUser={this.props.authenticateUser}/> */}
        {/* <RegisterComponent authenticateUser={this.props.authenticateUser}/> */}
      </div>
    )
  }
}

export default AuthComponent;