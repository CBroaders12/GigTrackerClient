import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core'

import MusicPreview from './MusicPreview';
import GigList from './GigList';

class MainPageComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
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
            <MusicPreview />
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