import React, { Component } from 'react';

type PreviewProps = {
  token: string | null,
}

class MusicPreview extends Component<PreviewProps, {/* state */}> {
  constructor(props: any /* TODO: Update this */) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2>Music Preview Component</h2>
      </div>
    )
  }
}

export default MusicPreview;