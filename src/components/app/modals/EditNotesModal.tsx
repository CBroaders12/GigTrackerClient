import React, { Component } from 'react';

import { Modal, TextField, Button, Paper } from '@material-ui/core';
import { Update } from '@material-ui/icons';


type EditNotesProps = {
  token: string | null,
  closeModal: () => void,
  isOpen: boolean,
  musicId: number,
  gigId: number
}

type EditNotesState = {
  notes: string | null
}

class EditNotesModal extends Component<EditNotesProps, EditNotesState> {
  constructor(props: EditNotesProps) {
    super(props)

    this.state = {
      notes: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  updateNotes(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      notes: event.target.value
    })
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    await fetch(`https://cpb-gigtracker.herokuapp.com/gig/${this.props.gigId}/${this.props.musicId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
      body: JSON.stringify({notes: this.state.notes})
    });

    this.props.closeModal();
  }

  render() {
    return(
      <Modal
        id="editNotesModal"
        className="modal"
        open={this.props.isOpen}
        onClose={() => this.props.closeModal()}
      >
        <Paper>
          <h2>Edit Notes</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="updateNotes"
              label="Notes"
              variant="filled"
              type="text"
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
              startIcon={<Update />}
              type="submit"
              >
              Update Notes
            </Button>
          </form>
        </Paper>
      </Modal>
    )
  }
}

export default EditNotesModal;