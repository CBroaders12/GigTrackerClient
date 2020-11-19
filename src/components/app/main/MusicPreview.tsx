import React, { Component } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

type PreviewProps = {
  token: string | null,
}

type PreviewState = {
  musicEntries: Array<any>
}

class MusicPreview extends Component<PreviewProps, PreviewState> {
  constructor(props: PreviewProps) {
    super(props);

    this.state = {
      musicEntries: []
    }
  }

  async componentDidMount() {
    let musicResponse = await fetch('http://localhost:5200/music', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token ? this.props.token : "",
      })
    });

    let resultsJSON = await musicResponse.json();
    this.setState({
      musicEntries: resultsJSON.results,
    });
  }

  render() {

    console.log(this.state.musicEntries);

    return(
      <div>
        <h2>Your Music</h2>
        {this.state.musicEntries.map(piece => {
          return(
            <Card elevation={5} className="previewCard">
              <CardContent>
                <h3>{piece.title}</h3>
                <h4>{piece.artist}</h4>
              </CardContent>
            </Card>
          )
        })}
      </div>
    )
  }
}

export default MusicPreview;