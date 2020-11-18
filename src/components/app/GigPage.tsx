import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class GigPageComponent extends Component<{/* props */}, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <div>
          <h1>Welcome to the Gig Page</h1>
        </div>
      )
    } else {
      return(
        <Redirect to="/login"/>
      )
    }
  }
}

export default GigPageComponent;