import React from 'react';
import './App.css';

import AuthComponent from './components/auth/AuthComponent'

type AppState = {
  token: string,
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      token: ''
    }

    this.authenticateUser = this.authenticateUser.bind(this)
  }
  
  authenticateUser(token: string): void {
    localStorage.setItem('sessionToken', token);
    this.setState({
      token: token,
    });
    console.log(token);
  }

  render() {
    return (
      <div className="App">
        <AuthComponent authenticateUser={this.authenticateUser}/>
      </div>
    );
  }
}

export default App;
