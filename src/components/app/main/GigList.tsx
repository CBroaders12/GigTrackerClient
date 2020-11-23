import React, { Component } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import GigCard from './GigCard';

// Create a type for the relevant information from the fetch
type GigInfo = {
  id: number,
  name: string,
  date: string,
}

type GigListProps = {
  token: string | null,
  handleOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  chooseGig: (gigDetails: GigInfo) => void,
}

type GigState = {
  gigEntries: Array<GigInfo>
}

class GigList extends Component<GigListProps, GigState> {
  constructor(props: GigListProps) {
    super(props);

    this.state = {
      gigEntries: [],
    }
  }

  async componentDidMount() {
    let gigResponse = await fetch('http://localhost:5200/gig', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token ? this.props.token : "",
      }),
    });

    let gigsJSON = await gigResponse.json();
    
    this.setState({
      gigEntries: gigsJSON.gigs,
    });
  }

  render() {
    return(
      <>
        <Typography component="h2" variant="h4">Your Gigs</Typography>
        <Box display="flex" flexWrap="wrap">
          {
            this.state.gigEntries.map(gig => {
              return(
                <GigCard
                key={gig.id}
                gigInfo={gig}
                chooseGig={this.props.chooseGig}
                />
              )
            })
          }
          <Card className="gigCard" id="addGigCard" elevation={4}>
            <CardContent>
              <Typography component="h4" variant="h5">New Gig</Typography>
              <IconButton
              id="addGigButton"
              className="addButton"
              onClick={this.props.handleOpen}
              size="medium"
              >
                <Add />
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      </>
    )
  }
}

export default GigList;