import React, { Component } from 'react';
import { Modal, TextField, Paper, Button } from '@material-ui/core';
import { Update } from '@material-ui/icons';

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

type MusicModalProps = {
  token: string | null,
  closeModal: () => void,
  isOpen: boolean,
  musicInfo: MusicEntry,
}

type MusicModalState = {
  title: string,
  artist: string | null,
  style: string | null,
  instrument: string | null,
  duration: string | null
}

class UpdateMusicModal extends Component<MusicModalProps, MusicModalState> {
  constructor(props: MusicModalProps) {
    super(props);
    
    this.state = {
      title: this.props.musicInfo.title,
      artist: this.props.musicInfo.artist,
      style: this.props.musicInfo.style,
      instrument: this.props.musicInfo.instrument,
      duration: this.props.musicInfo.duration,
    };

    this.updateArtist = this.updateArtist.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateInstrument = this.updateInstrument.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.musicInfo !== this.props.musicInfo) {
      this.setState({
        title: this.props.musicInfo.title,
        artist: this.props.musicInfo.artist,
        style: this.props.musicInfo.style,
        instrument: this.props.musicInfo.instrument,
        duration: this.props.musicInfo.duration,
      })
    }
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

    await fetch(`http://localhost:5200/music/${this.props.musicInfo.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
      body: JSON.stringify({
        title: this.state.title,
        artist: this.state.artist ? this.state.artist : null,
        style: this.state.style ? this.state.style : null,
        instrument: this.state.instrument ? this.state.instrument : null,
        duration: this.state.duration ? this.state.duration : null,
      }),
    })

    this.props.closeModal();
  }

  render() {
    return(
      <Modal
        id="updateMusicModal"
        open={this.props.isOpen}
        onClose={this.props.closeModal}
      >
        <Paper>
          <h2>Update Music</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="updateMusicTitle"
              label="Title"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.title}
              onChange={this.updateTitle}
            />
            <TextField
              id="updateMusicArtist"
              label="Artist"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.artist}
              onChange={this.updateArtist}
            />
            <TextField
              id="updateMusicStyle"
              label="Style"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.style}
              onChange={this.updateStyle}
            />
            <TextField
              id="updateMusicInstrument"
              label="Instrument"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.instrument}
              onChange={this.updateInstrument}
            />
            <TextField
              id="updateMusicDuration"
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
              variant="contained"
              size="large"
              startIcon={<Update />}
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

export default UpdateMusicModal;