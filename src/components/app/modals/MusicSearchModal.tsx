import React, { Component } from 'react';

import { Modal, Select, MenuItem, TextField, Button, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type SearchModalProps = {
  token: string | null,
  openModal: () => void,
  closeModal: () => void,
  isOpen: boolean,
  gigId: number | null
}

type SearchModalState = {
  musicId: number | null,
  notes: string | null,
  musicList: Array<any>
}

class MusicSearchModal extends Component<SearchModalProps, SearchModalState> {
  constructor(props: SearchModalProps) {
    super(props);

    this.state = {
      musicId: null,
      notes: null,
      musicList: []
    }

    this.fetchMusic = this.fetchMusic.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMusicId = this.updateMusicId.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  async fetchMusic(): Promise<void> {
    let response = await fetch('http://localhost:5200/music', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      })
    });

    let parsedResponse = await response.json();

    this.setState({
      musicList: parsedResponse.results
    });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await fetch(`http://localhost:5200/gig/${this.props.gigId}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token as string
      },
      body : JSON.stringify({
        musicId: this.state.musicId,
        notes: this.state.notes
      })
    });

    this.setState({
      musicList: []
    })

    this.props.closeModal();
  }

  updateMusicId(event: React.ChangeEvent<{name?: string | undefined; value: unknown;}>): void {
    this.setState({
      musicId: event.target.value as number | null,
    });
  }

  updateNotes(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      notes: event.target.value
    });
  }

  // componentDidMount() {
  //   this.fetchMusic();
  // }

  componentDidUpdate(prevProps: SearchModalProps, prevState: SearchModalState) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.fetchMusic();
      this.setState({
        musicId: null,
      })
    }
  }

  render() {
    return(
      <Modal
      id="musicSearchModal"
      className="modal"
      open={this.props.isOpen}
      onClose={this.props.closeModal}
      >
        <Paper>
          <h2>Add New Music</h2>
          <form onSubmit={this.handleSubmit}>
            <Select
            id="musicSelect"
            label="Your Music"
            variant="filled"
            value={this.state.musicId}
            fullWidth={true}
            onChange={this.updateMusicId}
            >
              <MenuItem value={''}>---</MenuItem>
              {
                this.state.musicList.map(piece => {
                  return(
                  <MenuItem key={piece.id} value={piece.id}>{piece.title} - {piece.artist}</MenuItem>
                  )
                })
              }
            </Select>
            <TextField
            id="musicSelectNotes"
            label="Notes"
            variant="filled"
            type="text"
            multiline
            rowsMax={4}
            margin="normal"
            fullWidth={true}
            value={this.state.notes}
            onChange={this.updateNotes}
            />
            <Button
            className="addButton"
            color="primary"
            variant="contained"
            size="large"
            startIcon={<Add />}
            type="submit"
            >
              Add Song
            </Button>
          </form>
        </Paper>
      </Modal>
    )
  }
}

export default MusicSearchModal;