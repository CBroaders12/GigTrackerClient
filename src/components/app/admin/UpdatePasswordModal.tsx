import React, { Component } from 'react';

import { Modal, TextField, Paper, Button } from '@material-ui/core';
import { Update } from '@material-ui/icons';

type UpdatePasswordProps = {
  token: string | null,
  isOpen: boolean,
  closeModal: () => void,
  userId: number | null,
}

type UpdatePasswordState = {
  password: string,
}

class UpdatePasswordModal extends Component<UpdatePasswordProps, UpdatePasswordState> {
  constructor(props: UpdatePasswordProps) {
    super(props);

    this.state = {
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch(`http://localhost:5200/admin/updatepassword/${this.props.userId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
      body: JSON.stringify({password: this.state.password}),
    });

    this.props.closeModal();
  }

  updatePassword(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return(
      <Modal
        id="updateMusicModal"
        open={this.props.isOpen}
        onClose={this.props.closeModal}
      >
        <Paper>
          <h2>Update Password</h2>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="updatePassword"
              label="New Password"
              variant="filled"
              type="password"
              margin="normal"
              fullWidth={true}
              value={this.state.password}
              onChange={this.updatePassword}
            />
            <Button
              className="addButton"
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Update />}
              type="submit"
              >
              Update Password
            </Button>
          </form>
        </Paper>
      </Modal>
    )
  }
}

export default UpdatePasswordModal;