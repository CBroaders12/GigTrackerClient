import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Button, Card, CardContent } from '@material-ui/core';

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
  }

  //TODO: componentWillUnmount

  render() {
    if (this.props.gigInfo.id) { //Only display the page if there is a chosen gig
      return(
        <Container maxWidth="sm" >
          <h1>{this.props.gigInfo.name}</h1>
          <Button color="primary" variant="contained">Add Song</Button>
            {
              this.state.musicList.map(piece => {
                return(
                  <Card key={piece.id} elevation={2} square>
                    <CardContent>
                      <h4>{piece.title}</h4>
                      <h5>{piece.artist}</h5>
                      <h6>Notes:</h6>
                      <p>{piece.set.notes}</p>
                      {/* <Button variant="outlined">Update Notes</Button> */ /* TODO: add endpoint in server to do this */} 
                      <Button variant="outlined" color="secondary">Remove Song</Button>
                    </CardContent>
                  </Card>
                )
              })
            }
        </Container>
      )
    } else {
      return(
        <Redirect to="/"/>
      )
    }
  }
}

export default GigPageComponent;