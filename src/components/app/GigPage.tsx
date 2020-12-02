import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { Container, Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

import MusicSearchModal from './modals/MusicSearchModal';
import UpdateGigModal from './modals/UpdateGigModal';
import EditNotesModal from './modals/EditNotesModal';

type GigMusicEntry = {
  id: number,
  title: string,
  artist: string | null,
  style: string | null,
  instrument: string | null,
  duration: string | null,
  userId: number,
  createdAt: string,
  updatedAt: string,
  set: any
}

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
  musicList: Array<GigMusicEntry>,
  gigName: string,
  gigDate: string,
  isAddMusicModalOpen: boolean,
  isUpdateGigModalOpen: boolean,
  isEditNotesModalOpen: boolean,
  activeMusic: GigMusicEntry
}

class GigPageComponent extends Component<GigPageProps, GigPageState> {
  constructor(props: GigPageProps) {
    super(props);

    this.state = {
      musicList: [],
      gigName: this.props.gigInfo.name,
      gigDate: this.props.gigInfo.date,
      isAddMusicModalOpen: false,
      isUpdateGigModalOpen: false,
      isEditNotesModalOpen: false,
      activeMusic: {} as GigMusicEntry
    }

    this.fetchGigMusic = this.fetchGigMusic.bind(this);
    this.openAddSongModal = this.openAddSongModal.bind(this);
    this.closeAddSongModal = this.closeAddSongModal.bind(this);
    this.openUpdateGigModal = this.openUpdateGigModal.bind(this);
    this.closeUpdateGigModal = this.closeUpdateGigModal.bind(this);
    this.openEditNotesModal = this.openEditNotesModal.bind(this);
    this.closeEditNotesModal = this.closeEditNotesModal.bind(this);
    this.handleMusicDelete = this.handleMusicDelete.bind(this);
    this.handleGigDelete = this.handleGigDelete.bind(this);
  }

  openAddSongModal(): void {
    this.setState({
      isAddMusicModalOpen: true,
    });
  }

  closeAddSongModal(): void {
    this.setState({
      isAddMusicModalOpen: false,
    });
  }

  openUpdateGigModal(): void {
    this.setState({
      isUpdateGigModalOpen: true
    });
  }

  closeUpdateGigModal(): void {
    this.setState({
      isUpdateGigModalOpen: false
    });
  }

  openEditNotesModal(piece: GigMusicEntry): void {
    this.setState({
      isEditNotesModalOpen: true,
      activeMusic: piece
    });
  }

  closeEditNotesModal(): void {
    this.setState({
      isEditNotesModalOpen: false,
      activeMusic: {} as GigMusicEntry
    });
  }

  async handleGigDelete(): Promise<void> {
    await fetch(`https://cpb-gigtracker.herokuapp.com/gig/${this.props.gigInfo.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.token ? this.props.token : ""
      })
    });
  }

  async handleMusicDelete(target: number): Promise<void> {
    await fetch(`https://cpb-gigtracker.herokuapp.com/gig/${this.props.gigInfo.id}/${target}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      })
    });

    this.setState({
      musicList: []
    });
  }

  async fetchGigMusic(): Promise<void> {
    let response = await fetch(`https://cpb-gigtracker.herokuapp.com/gig/${this.props.gigInfo.id}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.token ? this.props.token : "",
        }),
      });

      let parsedResponse = await response.json();

      this.setState({
        musicList: parsedResponse.targetGig ? parsedResponse.targetGig.music : [], //Catch if user tries to navigate to the page without selecting a gig
        gigName: parsedResponse.targetGig ? parsedResponse.targetGig.name : "",
        gigDate: parsedResponse.targetGig ? parsedResponse.targetGig.date: ""
      });
  }

  componentDidMount() {
    if (this.props.gigInfo.id) {
      this.fetchGigMusic();
    }
  }
  
  componentDidUpdate(prevProps: GigPageProps, prevState: GigPageState) {
    if (prevState.isAddMusicModalOpen !== this.state.isAddMusicModalOpen
      || prevState.musicList.length !== this.state.musicList.length
      || prevState.isUpdateGigModalOpen !== this.state.isUpdateGigModalOpen
      || prevState.isEditNotesModalOpen !== this.state.isEditNotesModalOpen
    ) {
      this.fetchGigMusic();
    }
  }

  render() {
    if (this.props.gigInfo.id) { //Only display the page if there is a chosen gig
      return(
        <Container maxWidth="md" id="gigPageContainer">
          <Typography component="h1" variant="h4">{this.state.gigName}</Typography>
          <Typography component="h3" variant="subtitle1">Date: {this.state.gigDate ? this.state.gigDate : 'TBD'}</Typography>
          <Button
          color="primary"
          variant="contained"
          startIcon={<Edit />}
          onClick={() => this.openUpdateGigModal()}
          >
            Edit Gig
          </Button>
          <Button
          className="addButton"
          color="primary"
          variant="contained"
          startIcon={<Add />}
          onClick={() => this.openAddSongModal()}
          >
            Add Song
          </Button>
          <Link to='/'>
            <Button
            color="secondary"
            variant="contained"
            startIcon={<Delete />}
            onClick={() => this.handleGigDelete()}
            >
              Delete Gig
            </Button>
            </Link>
          <Box display="flex" flexDirection="column" id="gigRepBox">
            {
              this.state.musicList.map(piece => {
                return(
                  <Card key={piece.id} elevation={0} square className="gigMusicCard">
                    <CardContent>
                      <Typography component="h4" variant="h5" gutterBottom>{piece.title}</Typography>
                      <Typography component="h5" variant="subtitle1" gutterBottom>{piece.artist}</Typography>
                      <Typography component="h6" variant="subtitle2" align="left" style={{textDecoration: "underline"}}>Notes:</Typography>
                      <Typography component="p" align="left" gutterBottom>{piece.set.notes}</Typography> 
                      <Box style={{padding: '1rem'}}>
                        <Button
                        className="gigMusicButton"
                        variant="outlined"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() => this.openEditNotesModal(piece)}
                        >
                          Edit Notes
                        </Button>
                        <Button
                        className="gigMusicButton"
                        variant="outlined"
                        color="secondary"
                        startIcon={<Delete />}
                        onClick={() => this.handleMusicDelete(piece.id)}
                        >
                          Remove Song
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                )
              })
            }
          </Box>
          <MusicSearchModal
          token={this.props.token}
          openModal={this.openAddSongModal}
          closeModal={this.closeAddSongModal}
          isOpen={this.state.isAddMusicModalOpen}
          gigId={this.props.gigInfo.id}
          />
          <UpdateGigModal
          token={this.props.token}
          openModal={this.openUpdateGigModal}
          closeModal={this.closeUpdateGigModal}
          isOpen={this.state.isUpdateGigModalOpen}
          gigInfo={this.props.gigInfo}
          />
          <EditNotesModal
          token={this.props.token}
          closeModal={this.closeEditNotesModal}
          isOpen={this.state.isEditNotesModalOpen}
          musicId={this.state.activeMusic.id}
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