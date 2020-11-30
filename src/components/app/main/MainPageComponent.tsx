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
  openNewMusicModal: () => void,
  closeNewMusicModal: () => void,
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

    this.openNewGigModal = this.openNewGigModal.bind(this);
    this.closeNewGigModal = this.closeNewGigModal.bind(this);
  }

  openNewGigModal(): void {
    this.setState({
      isGigModalOpen: true,
    });
  }
  
  closeNewGigModal(): void {
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
                openModal={this.props.openNewMusicModal}
              />
            </Grid>
            <Grid item xs={8} id="gigList">
              <GigList
                token={this.props.token}
                openModal={this.openNewGigModal}
                chooseGig={this.props.chooseGig}
              />
            </Grid>
          </Grid>
          <NewMusicModal
            isOpen={this.props.isMusicModalOpen}
            closeModal={this.props.closeNewMusicModal}
            token={this.props.token}
          />
          <NewGigModal
            isOpen={this.state.isGigModalOpen}
            closeModal={this.closeNewGigModal}
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