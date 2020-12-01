import React, { Component } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import GigCard from './GigCard';

type GigInfo = {
  id: number,
  name: string,
  date: string,
}

type GigListProps = {
  token: string | null,
  isModalOpen: boolean,
  openModal: () => void,
  chooseGig: (gigDetails: GigInfo) => void,
}

type GigListState = {
  gigEntries: Array<GigInfo>
}

class GigList extends Component<GigListProps, GigListState> {
  constructor(props: GigListProps) {
    super(props);

    this.state = {
      gigEntries: [],
    }

    this.fetchGigs = this.fetchGigs.bind(this);
  }

  async fetchGigs(): Promise<void> {
    let gigResponse = await fetch('http://localhost:5200/gig', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    let gigsJSON = await gigResponse.json();
    
    this.setState({
      gigEntries: gigsJSON.gigs,
    });
  }

  componentDidMount() {
    setTimeout(() => this.fetchGigs(), 250)
  }

  componentDidUpdate(prevProps: GigListProps, prevState: GigListState) {
    if (prevProps.isModalOpen !== this.props.isModalOpen) {
      this.fetchGigs();
    }
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
              onClick={this.props.openModal}
              size="medium"
              >
                <Add htmlColor="white"/>
              </IconButton>
            </CardContent>
          </Card>
        </Box>
      </>
    )
  }
}

export default GigList;