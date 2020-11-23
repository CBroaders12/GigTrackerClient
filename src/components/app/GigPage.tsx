import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

type GigInfo = {
  id: number | null,
  name: string,
  date: string,
}

type GigPageProps = {
  gigInfo: GigInfo,
  token: string | null,
}

type GigPageState = {
  musicList: Array<any>,
}

class GigPageComponent extends Component<GigPageProps, GigPageState> {
  constructor(props: GigPageProps) {
    super(props);

    this.state = {
      musicList: [],
    }
  }

  async componentDidMount() {
    let response = await fetch(`http://localhost:5200/gig/${this.props.gigInfo.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token ? this.props.token : "",
      }),
    });

    let parsedResponse = await response.json();

    this.setState({
      musicList: parsedResponse.targetGig ? parsedResponse.targetGig.music : [], //Catch if user tries to navigate to the page without selecting a gig
    })

    console.log(this.state.musicList);
  }

  //TODO: componentWillUnmount

  render() {
    if (this.props.gigInfo.id) { //Only display the page if there is a chosen gig
      return(
        <div>
          <h1>{this.props.gigInfo.name}</h1>
        </div>
      )
    } else {
      return(
        <Redirect to="/"/>
      )
    }
  }
}

export default GigPageComponent;