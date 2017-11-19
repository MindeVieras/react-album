
import React from 'react';
import Dropzone from 'react-dropzone';

export class UserCreateAvatar extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  onDrop(accepted, rejected) {
    this.setState({
      accepted,
      rejected
    });
  }

  render() {
    console.log(this.state);
    let dropzoneRef;
    return (
      <div>
        <Dropzone
          ref={(node) => { dropzoneRef = node; }}
          onDrop={this.onDrop.bind(this)}
          multiple={false}
        >
          <p>Drop files here.</p>
        </Dropzone>
        <button type="button" onClick={() => { dropzoneRef.open() }}>
          Open File Dialog
        </button>
      </div>
    );
  }
}
