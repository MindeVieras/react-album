
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Player } from 'video-react'

class LightboxVideo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { mime, videos } = this.props.media
    // console.log(videos.video_hd)
    if (mime.includes('video')) {
      return (
        <div className="lightbox-video">
          <div className="video">
            <Player
              playsInline
              // poster="/assets/poster.png"
              src={ videos.video_hd }
            />
          </div>
        </div>
      )
    }
    else {
      return <div className="error-wrapper">Unknown format</div>
    }
  }
}

LightboxVideo.propTypes = {
  media: PropTypes.object.isRequired
}

export default LightboxVideo
