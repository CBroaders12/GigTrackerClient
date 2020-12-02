import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Button, Typography} from '@material-ui/core';
import { Add } from '@material-ui/icons';

type MusicEntry = {
  id: number,
  title: string,
  artist: string | null,
  style: string | null,
  instrument: string | null,
  duration: string | null,
  userId: number,
  createdAt: string,
  updatedAt: string,
}

type PreviewProps = {
  token: string | null,
  openModal: () => void,
  isModalOpen: boolean,
}

type PreviewState = {
  musicEntries: Array<MusicEntry>
}

class MusicPreview extends Component<PreviewProps, PreviewState> {
  constructor(props: PreviewProps) {
    super(props);

    this.state = {
      musicEntries: []
    }
  }

  async fetchMusic(): Promise<void> {
    let musicResponse = await fetch('http://localhost:5200/music', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: this.props.token as string,
      }),
    });

    let resultsJSON = await musicResponse.json();
    this.setState({
      musicEntries: resultsJSON.results,
    });
  }

  componentDidMount() {
    this.fetchMusic()
  }

  componentDidUpdate(prevProps: PreviewProps, prevState: PreviewState) {
    if (prevProps.isModalOpen === true) {
      this.fetchMusic();
    }
  }

  render() {
    // Only display the first six music entries in the preview
    let previewEntries = this.state.musicEntries.length < 6
      ? this.state.musicEntries
      : this.state.musicEntries.slice(0, 6);

    return(
      <>
        <Typography component="h2" variant="h4">Your Music</Typography>
        {previewEntries.map(piece => {
          return(
            <Card elevation={5} className="previewCard" key={piece.id}>
              <CardContent>
                <Typography component="h3" variant="h6" noWrap>{piece.title}</Typography>
                <Typography component="h4" variant="subtitle1">{piece.artist}</Typography>
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
        color="primary"
        size="large"
        startIcon={<Add />}
        onClick={this.props.openModal}
        >
          Add Music
        </Button>
      </>
    )
  }
}

export default MusicPreview;