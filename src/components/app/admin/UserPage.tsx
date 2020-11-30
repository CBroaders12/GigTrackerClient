import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper, Container, IconButton } from '@material-ui/core';
import { Delete, AccountCircle, VpnKey } from '@material-ui/icons';

import UpdatePasswordModal from './UpdatePasswordModal';

type UserEntry = {
  id: number,
  email: string,
  password: string,
  userType: string,
  createdAt: string,
  updatedAt: string,
}

type UserPageProps = {
  isAdmin: boolean,
  token: string | null,
}

type UserPageState = {
  users: Array<UserEntry>
  isPasswordModalOpen: boolean,
  activeUser: number | null,
}

class UserPageComponent extends Component<UserPageProps, UserPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      isPasswordModalOpen: false,
      activeUser: null,
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.closePasswordModal = this.closePasswordModal.bind(this);
    this.openPasswordModal = this.openPasswordModal.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
  }
  
  async fetchUsers() {
    let response = await fetch('http://localhost:5200/admin/users', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    let parsedResponse = await response.json();

    this.setState({
      users: parsedResponse.users,
    });
  }

  async deleteUser(userId: number) {
    await fetch(`http://localhost:5200/admin/users/${userId}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    this.setState({
      users: [],
    });
  }

  async makeAdmin(userId: number) {
    fetch(`http://localhost:5200/admin/add/${userId}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    this.setState({
      users: [],
    })
  }

  openPasswordModal(userId: number) {
    this.setState({
      isPasswordModalOpen: true,
      activeUser: userId,
    });
  }

  closePasswordModal() {
    this.setState({
      isPasswordModalOpen: false,
    });
  }

  componentDidMount() {
    this.fetchUsers()
  }

  componentDidUpdate(prevProps: UserPageProps, prevState: UserPageState) {
    if (prevState.users.length !== this.state.users.length) {
      this.fetchUsers();
    }
  }

  render() {
    if(this.props.isAdmin) {
      return(
        <Container maxWidth="sm">
          <h1>Manage Users Here</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  this.state.users.map(user => {
                    return(
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.userType}</TableCell>
                        <TableCell>
                          {
                          user.userType !== "admin"
                            ? <>
                              <IconButton
                              color="primary"
                              title="Make user admin"
                              onClick={() => this.makeAdmin(user.id)}
                              >
                                <AccountCircle />
                              </IconButton>
                              <IconButton
                              color="secondary"
                              title="Delete user"
                              onClick={() => this.deleteUser(user.id)}
                              >
                                <Delete />
                              </IconButton>
                            </>
                            : <></>
                          }
                          <IconButton 
                          color="default"
                          title="change user's password"
                          onClick={() => this.openPasswordModal(user.id)}
                          >
                            <VpnKey />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <UpdatePasswordModal
          token={this.props.token}
          isOpen={this.state.isPasswordModalOpen}
          closeModal={this.closePasswordModal}
          userId={this.state.activeUser}
          />
        </Container>
      )
    } else {
      return(
        <Redirect to="/" />
      )
    }
  }
}

export default UserPageComponent;

