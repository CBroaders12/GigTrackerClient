import React, { Component } from 'react';
import { Modal, TextField, Button, Paper } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type GigModalProps = {
  token: string | null,
  isOpen: boolean,
  closeModal: () => void
}

type GigModalState = {
  name: string,
  date: string,
}

class NewGigModal extends Component<GigModalProps, GigModalState> {
  constructor(props: GigModalProps) {
    super(props);

    this.state = ({
      name: "",
      date: ""
    })

    this.updateName = this.updateName.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: event.target.value,
    })
  }

  updateDate(event: React.ChangeEvent<HTMLInputElement>):void {
    this.setState({
      date: event.target.value,
    })
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await fetch('https://cpb-gigtracker.herokuapp.com/gig/new', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token ? this.props.token : "",
      }),
      body: JSON.stringify({
        name: this.state.name,
        date: this.state.date ? this.state.date : null,
      }),
    });

    this.setState({
      name: "",
      date: "",
    });

    this.props.closeModal();
  }

  render() {
    return(
      <Modal
        id="newGigModal"
        className="modal"
        open={this.props.isOpen}
        onClose={this.props.closeModal}
      >
        <Paper>
          <h2>Add New Music</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="newGigName"
              label="Gig Name"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.name}
              onChange={this.updateName}
            />
            <TextField
              id="newGigDate"
              label="Date"
              variant="filled"
              type="date"
              margin="normal"
              fullWidth={true}
              value={this.state.date}
              onChange={this.updateDate}
            />
            <Button
              className="addButton"
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Add />}
              type="submit"
              >
              Add Gig
            </Button>
          </form>
        </Paper>
      </Modal>
    )
  }
}

export default NewGigModal;