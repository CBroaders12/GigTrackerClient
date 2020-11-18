import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

type NavbarProps = {
  token: string | null,
  handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

class NavigationComponent extends Component<NavbarProps, {/* state */}> {
  constructor(props: NavbarProps) {
    super(props);
  }

  render() {
    return(
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" >
            GigTracker
          </Typography>
          <Box>
            { this.props.token 
              ? <>
                  <Link to="/"><Button >Home</Button></Link>
                  <Button  onClick={this.props.handleLogout}>Logout</Button>
                </>
              : <>
                  <Link to="/login"><Button >Login</Button></Link>
                  <Link to="/register"><Button >Register</Button></Link>
                </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    )
  }
}

export default NavigationComponent;