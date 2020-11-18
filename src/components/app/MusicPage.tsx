import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class MusicPageComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <div>
          <h1>Welcome to the Music Page</h1>
        </div>
      )
    } else {
      return(
        <Redirect to="/login"/>
      )
    }
  }
}

export default MusicPageComponent;