import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@material-ui/core';

type GigInfo = {
  id: number,
  name: string,
  date: string,
}

type GigCardProps = {
  gigInfo: GigInfo,
  chooseGig: (gigDetails: GigInfo) => void,
}

type GigCardState = {}

class GigCard extends Component<GigCardProps, GigCardState> {
  constructor(props: GigCardProps) {
    super(props)

    this.onGigSelect = this.onGigSelect.bind(this);
  }

  onGigSelect(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.props.chooseGig(this.props.gigInfo);
  }

  render() {
    return(
      <Card className="gigCard" elevation={3}>
        <CardContent>
          <Typography component="h5" variant="h5">{this.props.gigInfo.name}</Typography >
          <Typography component="h6" variant="subtitle1">{this.props.gigInfo.date ? this.props.gigInfo.date : "TBD"}</Typography >
        </CardContent>
        <Link to="/gig">
          <Button variant="contained" color="primary" onClick={this.onGigSelect}>See More</Button>
        </Link>
      </Card>
    )
  }

}

export default GigCard;