import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Container,
  Button,
  IconButton
} from '@material-ui/core';
import { Delete, Edit, Add } from '@material-ui/icons';

import NewMusicModal from './modals/NewMusicModal';

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
  handleMusicModalOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleMusicModalClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

type MusicPageState = {
  musicList: Array<MusicEntry>
}

class MusicPageComponent extends Component<MusicPageProps, MusicPageState> {
  constructor(props: MusicPageProps) {
    super(props);

    this.state = {
      musicList: [],
    }
  }

  async componentDidMount() {
    let response = await fetch('http://localhost:5200/music', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    let parsedResponse = await response.json();

    this.setState({
      musicList: parsedResponse.results,
    })
  }

  render() {

    if (localStorage.getItem('sessionToken')) {
      return(
        <Container maxWidth="lg">
          <h1>Welcome to the Music Page</h1>
          <Button
          className="addButton"
          color="primary"
          variant="contained"
          startIcon={<Add />}
          onClick={this.props.handleMusicModalOpen}
          >
            Add Song
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
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
                        <IconButton color="primary"><Edit /></IconButton>
                        <IconButton color="secondary"><Delete /></IconButton>
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
          handleOpen={this.props.handleMusicModalOpen}
          handleClose={this.props.handleMusicModalClose}
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