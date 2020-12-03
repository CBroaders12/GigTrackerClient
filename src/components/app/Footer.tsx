import React, { Component } from 'react';
import { Container } from '@material-ui/core';

class Footer extends Component<{}, {}> {

  render() {
    return(
      <Container id="footer" maxWidth={false} style={{marginTop: '-10%'}}>
        <p>&copy; Conor Broaders 2020</p>
      </Container>
    )
  }
}

export default Footer;