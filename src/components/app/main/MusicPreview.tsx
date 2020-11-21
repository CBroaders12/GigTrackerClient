import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type PreviewProps = {
  token: string | null,
  handleOpen: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
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
      }),
    });

    let resultsJSON = await musicResponse.json();
    this.setState({
      musicEntries: resultsJSON.results,
    });
  }

  render() {
    // Only display the first five music entries in the preview
    let previewEntries = this.state.musicEntries.length < 5
      ? this.state.musicEntries
      : this.state.musicEntries.slice(0, 5);

    return(
      <>
        <h2>Your Music</h2>
        {previewEntries.map(piece => {
          return(
            <Card elevation={5} className="previewCard" key={piece.id}>
              <CardContent>
                <h3>{piece.title}</h3>
                <h4>{piece.artist}</h4>
              </CardContent>
            </Card>
          )
        })}
        <Link to="/music">
          <Button
            variant="contained"
            color="default"
            size="large"
          >
            See More
          </Button>
        </Link>
        <Button
          className="addButton"
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={this.props.handleOpen}
        >
          Add Music
        </Button>
      </>
    )
  }
}

export default MusicPreview;