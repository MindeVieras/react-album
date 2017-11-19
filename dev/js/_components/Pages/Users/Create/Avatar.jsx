
import React from 'react';
import Dropzone from 'react-dropzone';

import { uploadService } from '../../../../_services';

export class UserCreateAvatar extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: []
    }
  }

  onDropAccepted(accepted) {
    // console.log(accepted[0]);
    this.setState({
      accepted
    });
    uploadService.avatar(accepted[0])
      .then(function(res) {
        // console.log(res);
        // if (res.ack == 'ok') {
        //     dispatch(success(res.data));
        //     history.push('/');
        // } else {
        //     dispatch(failure(res.msg));
        //     dispatch(alertActions.error(res.msg));
        // }
    });
  }

  render() {
    // console.log(this.state);
    let dropzoneRef;

    let previews = this.state.accepted.map(function(file, i){
      return <div key={i} className="file-preview-item">
              {file.name}
              <div className="image-wrapper"><img src={file.preview} /></div>
            </div>
    });

    return (
      <div className="inner">
        <div className="preview">
          {previews}
        </div>
        <Dropzone
          className="drop-area"
          ref={(node) => { dropzoneRef = node; }}
          onDropAccepted={this.onDropAccepted.bind(this)}
          multiple={false}
        >
        </Dropzone>
        <div className="btn btn-sm btn-info" onClick={() => { dropzoneRef.open() }}>
          Upload file
        </div>
        
      </div>
    );
  }
}
