import React, { Component } from 'react';
import { Modal, TextField, Paper, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type MusicModalProps = {
  token: string | null,
  isOpen: boolean,
  closeModal: () => void
}

type MusicModalState = {
  title: string,
  artist: string,
  style: string,
  instrument: string,
  duration: string,
}

class NewMusicModal extends Component<MusicModalProps, MusicModalState> {
  constructor(props: MusicModalProps) {
    super(props);

    this.state = {
      title: "",
      artist: "",
      style: "",
      instrument: "",
      duration: "",
    };

    this.updateArtist = this.updateArtist.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this);
    this.updateDuration = this.updateDuration.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      title: event.target.value,
    })
  }

  updateArtist(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      artist: event.target.value,
    })
  }

  updateStyle(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      style: event.target.value,
    })
  }

  updateInstrument(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      instrument: event.target.value,
    })
  }

  updateDuration(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      duration: event.target.value,
    })
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await fetch('http://localhost:5200/music/new', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token ? this.props.token : "",
      }),
      body: JSON.stringify({
        title: this.state.title,
        artist: this.state.artist ? this.state.artist : null,
        style: this.state.style ? this.state.style : null,
        instrument: this.state.instrument ? this.state.instrument : null,
        duration: this.state.duration ? this.state.duration : null,
      }),
    })

    this.setState({
      title: "",
      artist: "",
      style: "",
      instrument: "",
      duration: "",
    });

    this.props.closeModal();
  }

  render() {
    return(
      <Modal
        id="newMusicModal"
        className="modal"
        open={this.props.isOpen}
        onClose={this.props.closeModal}
      >
        <Paper>
          <h2>Add New Music</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="newMusicTitle"
              label="Title"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.title}
              onChange={this.updateTitle}
            />
            <TextField
              id="newMusicArtist"
              label="Artist"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.artist}
              onChange={this.updateArtist}
            />
            <TextField
              id="newMusicStyle"
              label="Style"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.style}
              onChange={this.updateStyle}
            />
            <TextField
              id="newMusicInstrument"
              label="Instrument"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.instrument}
              onChange={this.updateInstrument}
            />
            <TextField
              id="newMusicDuration"
              label="Duration"
              variant="filled"
              type="time"
              margin="normal"
              fullWidth={true}
              value={this.state.duration}
              onChange={this.updateDuration}
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

export default NewMusicModal;