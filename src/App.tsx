import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginComponent from './components/auth/Login';
import RegisterComponent from './components/auth/Register';
import NavigationComponent from './components/app/Navigation';
import MainPageComponent from './components/app/main/MainPageComponent';
import MusicPageComponent from './components/app/MusicPage';
import GigPageComponent from './components/app/GigPage';
import Footer from './components/app/Footer';

type GigInfo = {
  id: number | null,
  name: string,
  date: string
}

type AppState = {
  token: string | null,
  isMusicModalOpen: boolean,
  gigInfo: GigInfo,
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('sessionToken'),
      isMusicModalOpen: false,
      gigInfo: {id: null, name: "", date: ""}
    }

    this.authenticateUser = this.authenticateUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.openNewMusicModal = this.openNewMusicModal.bind(this);
    this.closeNewMusicModal = this.closeNewMusicModal.bind(this);
    this.chooseGig = this.chooseGig.bind(this);
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
    });
  }

  openNewMusicModal(): void {
    this.setState({
      isMusicModalOpen: true,
    });
  }
  
  closeNewMusicModal(): void {
    this.setState({
      isMusicModalOpen: false,
    });
  }

  chooseGig(gigDetails: GigInfo): void {
    this.setState({
      gigInfo: {
        id: gigDetails.id,
        name: gigDetails.name,
        date: gigDetails.date
      }
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavigationComponent
          token={this.state.token}
          handleLogout={this.handleLogout}
          />
          <Switch>
            <Route exact path="/login">
              <LoginComponent
              authenticateUser={this.authenticateUser}
              token={this.state.token}
                />
            </Route>
            <Route exact path="/register">
              <RegisterComponent
              authenticateUser={this.authenticateUser}
              token={this.state.token}
              />
            </Route>
            <Route exact path="/">
              <MainPageComponent
              token={this.state.token}
              isMusicModalOpen={this.state.isMusicModalOpen}
              closeNewMusicModal={this.closeNewMusicModal}
              openNewMusicModal={this.openNewMusicModal}
              chooseGig={this.chooseGig}
              />
            </Route>
            <Route exact path="/music">
              <MusicPageComponent
              token={this.state.token}
              isMusicModalOpen={this.state.isMusicModalOpen}
              openNewMusicModal={this.openNewMusicModal}
              closeNewMusicModal={this.closeNewMusicModal}
              />
            </Route>
            <Route exact path="/gig">
              <GigPageComponent
              gigInfo={this.state.gigInfo}
              token={this.state.token}
              />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
