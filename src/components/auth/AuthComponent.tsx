import React, { Component } from 'react';
import LoginComponent from './Login';
import RegisterComponent from './Register';

class AuthComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {
    return(
      <div>
        <LoginComponent />
        <RegisterComponent />
      </div>
    )
  }
}

export default AuthComponent;