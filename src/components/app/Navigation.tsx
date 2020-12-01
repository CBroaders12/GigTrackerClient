import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

type NavbarProps = {
  token: string | null,
  handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  isAdmin: boolean,
}

class NavigationComponent extends Component<NavbarProps, {/* state */}> {
  render() {
    return(
      <AppBar position="static" color="secondary" className="navBar">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" color="inherit" id="brand">
              GigTracker
            </Typography>
          </Link>
          <Box>
            { this.props.token 
              ? <>
                  <Link to="/"><Button className="navButton">Home</Button></Link>
                  <Link to="/music"><Button className="navButton">Your Music</Button></Link>
                  {this.props.isAdmin
                    ? <Link to="/users"><Button className="navButton">Users</Button></Link>
                    : <></>
                  }
                  <Link to="/login"><Button className="navButton" onClick={this.props.handleLogout}>Logout</Button></Link>
                </>
              : <>
                  <Link to="/login"><Button className="navButton">Login</Button></Link>
                  <Link to="/register"><Button className="navButton">Register</Button></Link>
                </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavigationComponent;