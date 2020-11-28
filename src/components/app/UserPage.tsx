import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type UserPageProps = {
  isAdmin: boolean,
  token: string | null,
}

class UserPageComponent extends Component<UserPageProps, {/* state */}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if(this.props.isAdmin) {
      return(
        <div>
          <h1>Manage Users Here</h1>
        </div>
      )
    } else {
      return(
        <Redirect to="/" />
      )
    }
  }
}

export default UserPageComponent;

