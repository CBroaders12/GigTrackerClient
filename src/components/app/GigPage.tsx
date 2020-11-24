import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Box, Button, Card, CardContent } from '@material-ui/core';

import MusicSearchModal from './modals/MusicSearchModal';

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
  isAddMusicModalOpen: boolean,
}

class GigPageComponent extends Component<GigPageProps, GigPageState> {
  constructor(props: GigPageProps) {
    super(props);

    this.state = {
      musicList: [],
      isAddMusicModalOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  openModal(): void {
    this.setState({
      isAddMusicModalOpen: true,
    })
  }

  closeModal(): void {
    this.setState({
      isAddMusicModalOpen: false,
    })
  }

  handleOpen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    this.openModal();
  }

  async handleDelete(target: number) {
    console.log(target);
    await fetch(`http://localhost:5200/${this.props.gigInfo.id}/${target}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string
      })
    })
  }

  //TODO: componentWillUnmount

  render() {
    console.log(this.props.gigInfo)

    if (this.props.gigInfo.id) { //Only display the page if there is a chosen gig
      return(
        <Container maxWidth="md">
          <h1>{this.props.gigInfo.name}</h1>
          <Button color="primary" variant="contained" onClick={this.handleOpen}>Add Song</Button>
          <Box display="flex" flexDirection="column" flexWrap={true} id="gigRepBox">
            {
              this.state.musicList.map(piece => {
                return(
                  <Card key={piece.id} elevation={2} square className="gigMusicCard">
                    <CardContent>
                      <h4>{piece.title}</h4>
                      <h5>{piece.artist}</h5>
                      <h6>Notes:</h6>
                      <p>{piece.set.notes}</p>
                      {/* <Button variant="outlined">Update Notes</Button> */ /* TODO: add endpoint in server to do this */} 
                      <Button variant="outlined" color="secondary" onClick={() => this.handleDelete(piece.id)}>Remove Song</Button>
                    </CardContent>
                  </Card>
                )
              })
            }
          </Box>
          <MusicSearchModal
          token={this.props.token}
          openModal={this.openModal}
          closeModal={this.closeModal}
          isOpen={this.state.isAddMusicModalOpen}
          gigId={this.props.gigInfo.id}
          />
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