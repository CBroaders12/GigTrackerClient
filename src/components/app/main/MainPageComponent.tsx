import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core'

import MusicPreview from './MusicPreview';
import GigList from './GigList';
import NewMusicModal from '../modals/NewMusicModal'

type MainProps = {
  token: string | null;
  isMusicModalOpen: boolean,
  handleMusicModalOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleMusicModalClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

class MainPageComponent extends Component<MainProps, {/* state */}> {
  constructor(props: MainProps) {
    super(props);
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
              <GigList token={this.props.token}/>
            </Grid>
          </Grid>
          <NewMusicModal
            isOpen={this.props.isMusicModalOpen}
            handleOpen={this.props.handleMusicModalOpen}
            handleClose={this.props.handleMusicModalClose}
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