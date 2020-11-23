import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core'

import MusicPreview from './MusicPreview';
import GigList from './GigList';
import NewMusicModal from '../modals/NewMusicModal';
import NewGigModal from '../modals/NewGigModal';

type GigInfo = {
  id: number | null,
  name: string,
  date: string,
}

type MainProps = {
  token: string | null;
  isMusicModalOpen: boolean,
  handleMusicModalOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleMusicModalClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  chooseGig: (gigDetails: GigInfo) => void,
}

type MainState = {
  isGigModalOpen: boolean,
}

class MainPageComponent extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);

    this.state = {
      isGigModalOpen: false,
    }

    this.handleGigModalOpen = this.handleGigModalOpen.bind(this);
    this.handleGigModalClose = this.handleGigModalClose.bind(this);
  }

  handleGigModalOpen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({
      isGigModalOpen: true,
    });
  }
  
  handleGigModalClose(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({
      isGigModalOpen: false,
    });
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <>
          <Grid container spacing={1}>
            <Grid item xs={4} id="musicPreview">
              <MusicPreview
                token={this.props.token}
                handleOpen={this.props.handleMusicModalOpen}
              />
            </Grid>
            <Grid item xs={8} id="gigList">
              <GigList
                token={this.props.token}
                handleOpen={this.handleGigModalOpen}
                chooseGig={this.props.chooseGig}
              />
            </Grid>
          </Grid>
          <NewMusicModal
            isOpen={this.props.isMusicModalOpen}
            handleOpen={this.props.handleMusicModalOpen}
            handleClose={this.props.handleMusicModalClose}
            token={this.props.token}
          />
          <NewGigModal
            isOpen={this.state.isGigModalOpen}
            handleOpen={this.handleGigModalOpen}
            handleClose={this.handleGigModalClose}
            token={this.props.token}
          />
        </>
      )
    } else {
      return(
        <Redirect to="/login"/>
      )
    }
  }
}

export default MainPageComponent;