import React, { Component } from 'react';
import { Box, Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

type GigListProps = {
  token: string | null,
}

type GigState = {
  gigEntries: Array<any>
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
    console.log(this.state.gigEntries)
    return(
      <div>
        <h2>Your Gigs</h2>
        <Box display="flex" flexWrap="wrap">
          {
            this.state.gigEntries.map(gig => {
              return(
                <Card key={gig.id} className="gigCard">
                  <CardContent>
                    <Typography component="h5" variant="h5">{gig.name}</Typography >
                  </CardContent>
                </Card>
              )
            })
          }
          <Card className="gigCard">
            <CardContent>
              <Add style={{ color: green[500], fontSize: 120}}/>
              <Typography>Add a Gig</Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
    )
  }
}

export default GigList;