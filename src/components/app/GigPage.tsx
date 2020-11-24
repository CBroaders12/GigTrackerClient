import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Container, Box, Button, Card, CardContent } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

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
    this.handleMusicDelete = this.handleMusicDelete.bind(this);
    this.handleGigDelete = this.handleGigDelete.bind(this);
  }

  async componentDidMount() {
    if (this.props.gigInfo.id) {
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

  async handleGigDelete() {
    await fetch(`http://localhost:5200/gig/${this.props.gigInfo.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token ? this.props.token : ""
      })
    });
  }

  async handleMusicDelete(target: number) {
    await fetch(`http://localhost:5200/gig/${this.props.gigInfo.id}/${target}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token ? this.props.token : ""
      })
    });
  }

  //TODO: componentWillUnmount

  render() {
    if (this.props.gigInfo.id) { //Only display the page if there is a chosen gig
      return(
        <Container maxWidth="md">
          <h1>{this.props.gigInfo.name}</h1>
          <h3>Date: {this.props.gigInfo.date ? this.props.gigInfo.date : 'TBD'}</h3>
          <Button
          color="primary"
          variant="contained"
          startIcon={<Edit />}
          // onClick={this.handleOpen}
          >
            Edit Gig
          </Button>
          <Button
          className="addButton"
          color="primary"
          variant="contained"
          startIcon={<Add />}
          onClick={() => this.openModal()}
          >
            Add Song
          </Button>
          <Button
          color="secondary"
          variant="contained"
          startIcon={<Delete />}
          onClick={() => this.handleGigDelete()}
          >
            Delete Gig
          </Button>
          <Box display="flex" flexDirection="column" id="gigRepBox">
            {
              this.state.musicList.map(piece => {
                return(
                  <Card key={piece.id} elevation={2} square className="gigMusicCard">
                    <CardContent>
                      <h4>{piece.title}</h4>
                      <h5>{piece.artist}</h5>
                      <h6>Notes:</h6>
                      <p>{piece.set.notes}</p> 
                      <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      // onClick={() => this.handleMusicDelete(piece.id)}
                      >
                        Edit Notes
                      </Button>
                      <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<Delete />}
                      onClick={() => this.handleMusicDelete(piece.id)}
                      >
                        Remove Song
                      </Button>
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