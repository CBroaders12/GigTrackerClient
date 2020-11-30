import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Modal, TextField, Button, Paper } from '@material-ui/core';
import { Update } from '@material-ui/icons';

type GigInfo = {
  id: number | null,
  name: string,
  date: string,
}

type UpdateGigProps = {
  token: string | null,
  openModal: () => void,
  closeModal: () => void,
  isOpen: boolean,
  gigInfo: GigInfo,
}

type UpdateGigState = {
  name: string,
  date: string,
}

class UpdateGigModal extends Component<UpdateGigProps, UpdateGigState> {
  constructor(props: UpdateGigProps) {
    super(props);

    this.state = {
      name: this.props.gigInfo.name,
      date: this.props.gigInfo.date,
    }

    this.updateName = this.updateName.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      name: event.target.value
    });
  }

  updateDate(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      date: event.target.value
    })
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await fetch(`http://localhost:5200/gig/${this.props.gigInfo.id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string
      }),
      body: JSON.stringify({
        name: this.state.name,
        date: this.state.date
      })
    });

    this.props.closeModal();
  }

  render() {
    return(
      <Modal
        id="newGigModal"
        open={this.props.isOpen}
        onClose={() => this.props.closeModal()}
      >
        <Paper>
          <h2>Edit Gig Info</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="updateGigName"
              label="Gig Name"
              variant="filled"
              type="text"
              margin="normal"
              fullWidth={true}
              value={this.state.name}
              onChange={this.updateName}
            />
            <TextField
              id="updateGigDate"
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
              startIcon={<Update />}
              type="submit"
              >
              Update Gig
            </Button>
          </form>
        </Paper>
      </Modal>
    )
  }
}

export default UpdateGigModal;