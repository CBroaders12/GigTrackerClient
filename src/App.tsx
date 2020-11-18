import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginComponent from './components/auth/Login';
import RegisterComponent from './components/auth/Register';
import NavigationComponent from './components/app/Navigation';
import MainPageComponent from './components/app/main/MainPageComponent';
import MusicPageComponent from './components/app/MusicPage';
import GigPageComponent from './components/app/GigPage';

type AppState = {
  token: string | null,
  isLoggedIn: boolean,
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('sessionToken'),
      isLoggedIn: false,
    }

    this.authenticateUser = this.authenticateUser.bind(this)
  }
  
  authenticateUser(token: string): void {
    localStorage.setItem('sessionToken', token);
    this.setState({
      token: token,
      isLoggedIn: true,
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavigationComponent />
          <Switch>
            <Route exact path="/login">
              <LoginComponent authenticateUser={this.authenticateUser} token={this.state.token} />
            </Route>
            <Route exact path="/register">
              <RegisterComponent authenticateUser={this.authenticateUser} />
            </Route>
            <Route exact path="/">
              <MainPageComponent />
            </Route>
            <Route exact path="/music">
              <MusicPageComponent />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
