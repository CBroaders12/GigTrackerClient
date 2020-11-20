import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/auth/Login';
import RegisterComponent from './components/auth/Register';
import NavigationComponent from './components/app/Navigation';
import MainPageComponent from './components/app/main/MainPageComponent';
import MusicPageComponent from './components/app/MusicPage';
import Footer from './components/app/Footer';

type AppState = {
  token: string | null,
  isMusicModalOpen: boolean,
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('sessionToken'),
      isMusicModalOpen: false,
    }

    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleMusicModalOpen = this.handleMusicModalOpen.bind(this);
    this.handleMusicModalClose = this.handleMusicModalClose.bind(this);
  }
  
  authenticateUser(token: string): void {
    localStorage.setItem('sessionToken', token);
    this.setState({
      token: token,
    });
  }

  handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    localStorage.removeItem('sessionToken');
    this.setState({
      token: null,
    })
  }

  handleMusicModalOpen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({
      isMusicModalOpen: true,
    })
  }
  
  handleMusicModalClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({
      isMusicModalOpen: false,
    })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavigationComponent
            token={this.state.token}
            handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/login">
              <LoginComponent
                authenticateUser={this.authenticateUser}
                token={this.state.token} />
            </Route>
            <Route exact path="/register">
              <RegisterComponent
                authenticateUser={this.authenticateUser}
                token={this.state.token}/>
            </Route>
            <Route exact path="/">
              <MainPageComponent
                token={this.state.token}
                isMusicModalOpen={this.state.isMusicModalOpen}
                handleMusicModalClose={this.handleMusicModalClose}
                handleMusicModalOpen={this.handleMusicModalOpen}
                />
            </Route>
            <Route exact path="/music">
              <MusicPageComponent />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
