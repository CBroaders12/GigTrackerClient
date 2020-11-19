import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core'

import MusicPreview from './MusicPreview';
import GigList from './GigList';

type MainProps = {
  token: string | null;
}

class MainPageComponent extends Component<MainProps, {/* state */}> {
  constructor(props: MainProps) {
    super(props);
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h1>Welcome to the main page</h1>
          </Grid>
          <Grid item xs={4}>
            <MusicPreview token={this.props.token}/>
          </Grid>
          <Grid item xs={8}>
            <GigList />
          </Grid>
        </Grid>
      )
    } else {
      return(
        <Redirect to="/login"/>
      )
    }
  }
}

export default MainPageComponent;