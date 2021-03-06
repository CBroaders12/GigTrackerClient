import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper, Container, IconButton, Button, Typography } from '@material-ui/core';
import { Delete, Edit, Add } from '@material-ui/icons';

import NewMusicModal from './modals/NewMusicModal';
import UpdateMusicModal from './modals/UpdateMusicModal';

type MusicEntry = {
  id: number,
  title: string,
  artist: string | null,
  style: string | null,
  instrument: string | null,
  duration: string | null,
  userId: number,
  createdAt: string,
  updatedAt: string,
}

type MusicPageProps = {
  token: string | null,
  isMusicModalOpen: boolean,
  openNewMusicModal: () => void,
  closeNewMusicModal: () => void,
}

type MusicPageState = {
  musicList: Array<MusicEntry>,
  isUpdateModalOpen: boolean,
  activeEntry: MusicEntry,
}

class MusicPageComponent extends Component<MusicPageProps, MusicPageState> {
  constructor(props: MusicPageProps) {
    super(props);

    this.state = {
      musicList: [],
      isUpdateModalOpen: false,
      activeEntry: {} as MusicEntry,
    }

    this.deleteMusic = this.deleteMusic.bind(this);
    this.fetchMusic = this.fetchMusic.bind(this);
    this.openUpdateModal = this.openUpdateModal.bind(this); 
    this.closeUpdateModal = this.closeUpdateModal.bind(this); 
  }

  async fetchMusic(): Promise<void> {
    let response = await fetch('https://cpb-gigtracker.herokuapp.com/music', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    let parsedResponse = await response.json();

    this.setState({
      musicList: parsedResponse.results,
    });
  }

  async deleteMusic(musicId: number): Promise<void> {
    await fetch(`https://cpb-gigtracker.herokuapp.com/music/${musicId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });
    this.setState({ //Reset state so the component re-renders properly
      musicList: []
    });
  }

  openUpdateModal(entry: MusicEntry): void {
    this.setState({
      isUpdateModalOpen: true,
      activeEntry: entry,
    });
  }

  closeUpdateModal(): void {
    this.setState({
      isUpdateModalOpen: false,
    });
  }

  componentDidMount() {
    this.fetchMusic();
  }

  componentDidUpdate(prevProps: MusicPageProps, prevState: MusicPageState) {
    if (prevState.musicList.length !== this.state.musicList.length || prevProps.isMusicModalOpen === true || prevState.isUpdateModalOpen === true) {
      this.fetchMusic();
    }
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <Container maxWidth="lg" id="musicPageContainer">
          <Typography component="h1" variant="h4">Your Music</Typography>
          <Button
          className="addButton"
          color="primary"
          variant="contained"
          startIcon={<Add />}
          onClick={this.props.openNewMusicModal}
          >
            Add Song
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{backgroundColor: "lightgrey"}}>
                  <TableCell>Title</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Style</TableCell>
                  <TableCell>Instrument</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                this.state.musicList.map(row => {
                  return(
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.artist}</TableCell>
                      <TableCell>{row.style}</TableCell>
                      <TableCell>{row.instrument}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                      <TableCell align="center">
                        <IconButton color="primary" onClick={() => this.openUpdateModal(row)}><Edit /></IconButton>
                        <IconButton color="secondary" onClick={() => this.deleteMusic(row.id)}><Delete /></IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <NewMusicModal
          token={this.props.token}
          isOpen={this.props.isMusicModalOpen}
          closeModal={this.props.closeNewMusicModal}
          />
          <UpdateMusicModal
          token={this.props.token}
          isOpen={this.state.isUpdateModalOpen}
          closeModal={this.closeUpdateModal}
          musicInfo={this.state.activeEntry}
          />
        </Container>
      )
    } else {
      return(
        <Redirect to="/login"/>
      )
    }
  }
}

export default MusicPageComponent;